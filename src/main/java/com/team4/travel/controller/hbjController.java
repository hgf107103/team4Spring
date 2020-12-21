package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.selectMapper;
import com.team4.travel.object.selectVO;
import com.team4.travel.object.userVO;

@Controller
public class hbjController {

	@Autowired
	selectMapper mapper;
	
	@PostMapping(value = {"/hbj/category"})
	public void getCategoryList(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "title") String title, Locale locale, Model model) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			HttpSession session = request.getSession();
			userVO temp = (userVO)session.getAttribute("userLogin");
			
			if(!temp.isUserAdminCheck()) {
				Exception ex = new Exception();
				throw ex;
			}
			
			List<selectVO> list = null;
			if (title.equals("country")) {
				list = mapper.getContinentList();
			}
			else if (title.equals("area")) {
				list = mapper.getCountryList();
			}
			
			jo.add("list", create.toJsonTree(list));

			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
}
