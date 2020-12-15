package com.team4.travel.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.countryMapper;
import com.team4.travel.object.countryVO;

@Controller
public class countryController {
	@Autowired
	private countryMapper mapper;
	
	@PostMapping(value = "/country/list")
	public void getCountryList(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			Gson create = new GsonBuilder().setPrettyPrinting().create();
			JsonObject jo = new JsonObject();
			List<countryVO> list = mapper.getCountryList();
			
			jo.add("list", create.toJsonTree(list));
			
			pw.write(create.toJson(jo));
		} catch (Exception e) {
			response.sendError(400);
		}
		
	}
}
