package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.annotations.JsonAdapter;
import com.team4.travel.object.areaMapper;
import com.team4.travel.object.areaVO;

@Controller
public class areaController {
	
	@Autowired
	private areaMapper mapper;
	
	@PostMapping(value = "/country/{countryNumber}/area/{areaNumber}")
	public void getArea(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			areaVO temp = new areaVO();
			temp.setCountryNumber(countryNumber);
			temp.setAreaNumber(areaNumber);
			
			areaVO area = mapper.getOneArea(temp);
			
			if(area == null) {
				Exception e = new Exception();
				throw e;
			}
			
			jo.add("area", create.toJsonTree(area));

			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
		
	}
	
	@PostMapping(value = "/country/{countryNumber}/area/list")
	public void getAreaList(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			List<areaVO> list = mapper.getAreaList(countryNumber);
			
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
	
	@PostMapping(value = "/country/list/area/best")
	public void getBestArea(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			List<areaVO> list = mapper.getBestArea();
			
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
	
	
	
	@PostMapping(value = "/search")
	public void search(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "searchText") String searchText, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			List<areaVO> list = mapper.getSearch(searchText);
			
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
