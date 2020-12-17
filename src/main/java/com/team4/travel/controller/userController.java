package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.userMapper;
import com.team4.travel.object.userVO;

@Controller
public class userController {
	
	@Autowired
	userMapper mapper;
	
	@PostMapping(value = "/user/login")
	public void login(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "userID") String userID, @RequestParam(value = "userPassword") String userPassword, @RequestParam(value = "userName") String userName, @RequestParam(value = "userNickname") String userNickname, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			userVO temp = new userVO();
			temp.setUserID("");
			
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
