package com.team4.travel.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.reviewMapper;
import com.team4.travel.object.reviewVO;
import com.team4.travel.object.userVO;

@Controller
public class reviewController {
	
	@Autowired
	private reviewMapper mapper;
		
	@PostMapping(value = "/getReviewlist/{placeNumber}")
	public void getReviewlist
	(
			HttpServletRequest  request,
			HttpServletResponse response,
			@PathVariable(value = "placeNumber"  ) 	int placeNumber,
			//@RequestParam(value = "revieworder"  )  int revieworder,
			Locale locale,
			Model model
	) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw 		= response.getWriter();
		Gson 		create	= new GsonBuilder().setPrettyPrinting().create();
		JsonObject 	jo 		= new JsonObject();
		
		
		try 
		{
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("placeNumber", placeNumber);
			List<reviewVO> list = mapper.getReviewList(map);
			jo.add("list", create.toJsonTree(list));
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
			System.out.println(create.toJson(jo));
			
			
		}
	}
	
	
	  @PostMapping(value = "/writeReview/{placeNumber}") 
	  public void writeReview
	  (
			HttpServletRequest  request,
			HttpServletResponse response,
			@PathVariable(value = "placeNumber"  ) 	int placeNumber,
			@RequestParam(value = "revieworder"  )  int revieworder,
			@RequestParam(value = "reviewTitle"  )  String reviewTitle,
			@RequestParam(value = "reviewText"  )  	String reviewText,
			Locale locale,
			Model model  
	  )
	  throws Exception
	  {
		   
		  	HttpSession session = request.getSession();
		  	userVO 	 	temp 	= (userVO)session.getAttribute("userLogin");
		  			
		  	
		  	request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw 		= response.getWriter();
			Gson 		create	= new GsonBuilder().setPrettyPrinting().create();
			JsonObject 	jo 		= new JsonObject();
			
			try 
			{
				reviewVO vo = new reviewVO();
				vo.setPlaceNumber(placeNumber);
				vo.setReviewCategory(revieworder);
				vo.setReviewTitle(reviewTitle);
				vo.setReviewText(reviewText);
				vo.setUserNumber(1);
				int write = mapper.writeReview(vo);
				jo.add("check", create.toJsonTree("ok"));
			} 
			catch (Exception e) 
			{
				jo = new JsonObject();
				jo.add("check", create.toJsonTree("fail"));
				jo.add("error", create.toJsonTree(e.toString()));
			}
			finally 
			{
				pw.write(create.toJson(jo));
				System.out.println(create.toJson(jo));
			}
			
			
			
			
	  }
	 
}
