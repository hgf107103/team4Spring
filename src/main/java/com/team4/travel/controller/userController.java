package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.module.recaptchaModule;
import com.team4.travel.object.userMapper;
import com.team4.travel.object.userVO;

@Controller
public class userController {
	
	@Autowired
	userMapper mapper;
	
	@PostMapping(value = "/user/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		HttpSession session = request.getSession();
		
		try {
			
			session.removeAttribute("userLogin");
			session.invalidate();
			jo.add("check", create.toJsonTree("success"));
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	@PostMapping(value = "/user/login")
	public void login(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "userID") String userID, @RequestParam(value = "userPassword") String userPassword, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		HttpSession session = request.getSession();
		
		try {
			
			userVO user = mapper.getUser(userID);
			
			if (user != null) {
				boolean check = BCrypt.checkpw(userPassword, user.getUserPassword());
				
				if(check) {
					jo.add("result", create.toJsonTree("loginOK"));
					session.setAttribute("userLogin", user);
					session.setMaxInactiveInterval(3600);//¼¼¼ÇÀ¯Áö½Ã°£ ÇÑ½Ã°£
				}
				else if(!check) {
					jo.add("result", create.toJsonTree("pwdworng"));
				}
			}
			else if (user == null) {
				jo.add("result", create.toJsonTree("idworng"));
			}
			

			jo.add("check", create.toJsonTree("success"));
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	@PostMapping(value = "/user/signup/idcheck")
	public void idcheck(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "userID") String userID, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			int check = mapper.getIDCheck(userID);
			
			boolean result = true;
			if (check > 0) {
				result = false;
			}
			
			jo.add("result", create.toJsonTree(result));
			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	@PostMapping(value = "/user/signup/nickcheck")
	public void nickcheck(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "userNickname") String userNickname, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			int check = mapper.getNickCheck(userNickname);
			
			boolean result = true;
			if (check > 0) {
				result = false;
			}
			
			jo.add("result", create.toJsonTree(result));
			jo.add("check", create.toJsonTree("success"));
			
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	
	
	@PostMapping(value = "/user/signup")
	public void userSignup(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "userID") String userID, @RequestParam(value = "userPassword") String userPassword, @RequestParam(value = "userName") String userName, @RequestParam(value = "userNickname") String userNickname, @RequestParam(value = "recode") String recode, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			recaptchaModule.setSecretKey("6Ldrnw0aAAAAAKnen1bMB_iaftwT7DiCJCSwDhw-");
		    String gRecaptchaResponse = recode;
		    boolean reCheck = recaptchaModule.verify(gRecaptchaResponse);
		    
		    if(reCheck == true) {
		    	boolean check = false;
				if(regex("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,15}$", userID) && regex("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,15}$", userPassword) && regex("(?!^[0-9]*$)^([°¡-ÆR]{1,8})$", userName) && regex("(?!^[0-0]*$)^([°¡-ÆR||¤¡-¤¾||¤¿-¤Ó||a-z||A-Z||0-9||ª¢-ªó||?~!@#%^&*]{4,15})$", userNickname)) {
					check = true;
				}
				
				if(!check) {
					Exception e = new Exception();
					throw e;
				}
				
				userVO temp = new userVO();
				temp.setUserID(userID);
				temp.setUserPassword(BCrypt.hashpw(userPassword, BCrypt.gensalt(10)));
				temp.setUserName(userName);
				temp.setUserNickname(userNickname);
				
				int signCheck = mapper.signUser(temp);
				boolean result = true;
				
				if (signCheck != 1) {
					result = false;
				}
				
				jo.add("result", create.toJsonTree(result));
		    }
			
		    else if(reCheck == false) {
		    	jo.add("result", create.toJsonTree("denaiCode"));
		    }
		    
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
	
	private boolean regex(String pattern, String target) {
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(target);
		return m.find();
	}
	
}
