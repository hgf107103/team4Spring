package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.areaVO;
import com.team4.travel.object.placeMapper;
import com.team4.travel.object.placeVO;

@Controller
public class placeController {
	
	@Autowired
	private placeMapper mapper;
	
	@PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/list")
	public void getPlaceList(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, @RequestParam(value = "order") String order, @RequestParam(value = "categoryNumber") int categoryNumber, Locale locale, Model model) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {
			
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("areaNumber", areaNumber);
			map.put("categoryNumber", categoryNumber);
			
			
			List<placeVO> list = null;
			
			
			if(order.equals("like")) {
				list = mapper.getPlaceListLike(map);
			} else if(order.equals("new")) {
				list = mapper.getPlaceListNew(map);
			} else if(order.equals("name")) {
				list = mapper.getPlaceListName(map);
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
	
	
	
	@PostMapping("/insert")
	public void addPlace(MultipartHttpServletRequest mr) {
		System.out.println(mr.getAttribute("koreanName"));
	}
}
