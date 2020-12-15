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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.areaMapper;
import com.team4.travel.object.areaVO;

@Controller
public class areaController {
	
	@Autowired
	private areaMapper mapper;
	
	@RequestMapping(value = "/country/{countryNumber}/area/list", method = RequestMethod.POST)
	public void getAreaList(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, Locale locale, Model model) throws Exception {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			Gson create = new GsonBuilder().setPrettyPrinting().create();
			JsonObject jo = new JsonObject();
			List<areaVO> list = mapper.getAreaList(countryNumber);
			System.out.println(list.toString());
			jo.add("list", create.toJsonTree(list));
			
			pw.write(create.toJson(jo));
		} catch (Exception e) {
			response.sendError(400);
		}
		
	}
	
	@PostMapping(value = "/country/list/area/best")
	public void getBestArea(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		try {
			
		} catch (Exception e) {
			response.sendError(400);
		}
	}
}
