package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.bookmarkMapper;
import com.team4.travel.object.bookmarkVO;
import com.team4.travel.object.userVO;

@Controller
public class bookmarkController {
	
	@Autowired
	bookmarkMapper mapper;
	
	@PostMapping(value = "/bookmark")
	public void getBookmarkList(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		HttpSession session = request.getSession();
		
		try {
			userVO temp = (userVO) session.getAttribute("userLogin");
			
			List<bookmarkVO> list = mapper.getBookmarkList(temp.getUserNumber());
			System.out.println(list.toString());
			jo.add("list", create.toJsonTree(list));
			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	
	@PostMapping(value = "/bookmark/add")
	public void bookmarkAdd(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "areaNumber") int areaNumber, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		HttpSession session = request.getSession();
		
		try {
			userVO temp = (userVO) session.getAttribute("userLogin");
			
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("userNumber", temp.getUserNumber());
			map.put("areaNumber", areaNumber);
			
			bookmarkVO book = mapper.bookmarkCheck(map);

			String check = "false";
			
			if(book == null) {
				int result = mapper.bookmarkAdd(map);
				if(result == 1) {
					check = "true";
				}
			} else if(book != null) {
				check = "already";
			}
			
			
			
			jo.add("result", create.toJsonTree(check));
			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	@PostMapping(value = "/bookmark/remove")
	public void bookmarkRemove(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "areaNumber") int areaNumber, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		HttpSession session = request.getSession();
		
		try {
			userVO temp = (userVO) session.getAttribute("userLogin");
			
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("userNumber", temp.getUserNumber());
			map.put("areaNumber", areaNumber);
			
			bookmarkVO book = mapper.bookmarkCheck(map);

			String check = "false";
			
			if(book != null) {
				int result = mapper.bookmarkRemove(map);
				if(result >= 1) {
					check = "true";
				}
			} else if(book == null) {
				check = "already";
			}
			
			jo.add("result", create.toJsonTree(check));
			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
}
