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
import com.team4.travel.object.reviewCountVO;
import com.team4.travel.object.reviewMapper;
import com.team4.travel.object.reviewVO;
import com.team4.travel.object.userVO;

@Controller
public class reviewController {
	
	@Autowired
	private reviewMapper mapper;
		
	@PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}/review/info")
	public void getReviewInfo (
			HttpServletRequest  request,
			HttpServletResponse response,
			@PathVariable(value = "placeNumber") int placeNumber,
			Locale locale,
			Model model
	) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create	= new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		
		try 
		{
			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("placeNumber", placeNumber);
			map.put("reviewCategory", 1);
			map.put("reviewOrder", 0);
			map.put("limit", 2);
			List<reviewVO> goodList = mapper.getReviewList(map);
			
			map.put("reviewCategory", 0);
			List<reviewVO> badList = mapper.getReviewList(map);
			
			List<reviewCountVO> countList = mapper.getReviewInfo(placeNumber);
			int goodCount = 0;
			int badCount = 0;
			
			for (reviewCountVO reviewCountVO : countList) {
				if(reviewCountVO.getReviewCategory() == 1) {
					goodCount = reviewCountVO.getReviewCount();
					continue;
				}
				if(reviewCountVO.getReviewCategory() == 0) {
					badCount = reviewCountVO.getReviewCount();
				}
			}
			
			int allCount = goodCount + badCount;
			
			jo.add("check", create.toJsonTree("success"));
			jo.add("goodCount", create.toJsonTree(goodCount));
			jo.add("badCount", create.toJsonTree(badCount));
			jo.add("allCount", create.toJsonTree(allCount));
			jo.add("goodList", create.toJsonTree(goodList));
			jo.add("badList", create.toJsonTree(badList));
			
		} catch (Exception e) {
			
			jo = new JsonObject();
			jo.add("check", create.toJsonTree("fail"));
			jo.add("error", create.toJsonTree(e.toString()));
			
		} finally {
			pw.write(create.toJson(jo));
		}
	}
	
	
	  @PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}/review/add") 
	  public void writeReview
	  (
			HttpServletRequest request,
			HttpServletResponse response,
			@PathVariable(value = "placeNumber" ) int placeNumber,
			@RequestParam(value = "reviewTitle" ) String reviewTitle,
			@RequestParam(value = "reviewText" )  String reviewText,
			@RequestParam(value = "reviewCategory" ) int reviewCategory,
			Locale locale,
			Model model  
	  )
	  throws Exception
	  {
		   
		  	HttpSession session = request.getSession();
		  	userVO temp = (userVO)session.getAttribute("userLogin");
		  			
		  	request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			Gson create	= new GsonBuilder().setPrettyPrinting().create();
			JsonObject jo = new JsonObject();
			
			try 
			{
				reviewVO review = new reviewVO();
				
				review.setPlaceNumber(placeNumber);
				review.setUserNumber(temp.getUserNumber());
				review.setReviewTitle(reviewTitle);
				review.setReviewText(reviewText);
				review.setReviewCategory(reviewCategory);
				
				int insertCheck = mapper.addNewReview(review);
				String result = "false";
				
				if(insertCheck == 1) {
					result = "true";
				}

				jo.add("check", create.toJsonTree("success"));
				jo.add("result", create.toJsonTree(result));
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
	 
	  
	  @PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}/review/good")
		public void getGoodReview (
				HttpServletRequest  request,
				HttpServletResponse response,
				@PathVariable(value = "placeNumber") int placeNumber,
				@RequestParam(value = "reviewOrder") int reviewOrder,
				Locale locale,
				Model model
		) throws Exception {
			
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			Gson create	= new GsonBuilder().setPrettyPrinting().create();
			JsonObject jo = new JsonObject();
			
			try 
			{
				HashMap<String, Integer> map = new HashMap<String, Integer>();
				map.put("placeNumber", placeNumber);
				map.put("reviewCategory", 1);
				map.put("reviewOrder", reviewOrder);
				List<reviewVO> list = mapper.getReviewList(map);
				
				jo.add("check", create.toJsonTree("success"));
				jo.add("list", create.toJsonTree(list));
				
			} catch (Exception e) {
				
				jo = new JsonObject();
				jo.add("check", create.toJsonTree("fail"));
				jo.add("error", create.toJsonTree(e.toString()));
				
			} finally {
				pw.write(create.toJson(jo));
			}
		}
	  
	  
	  	@PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}/review/bad")
		public void getBadReview (
				HttpServletRequest  request,
				HttpServletResponse response,
				@PathVariable(value = "placeNumber") int placeNumber,
				@RequestParam(value = "reviewOrder") int reviewOrder,
				Locale locale,
				Model model
		) throws Exception {
			
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			Gson create	= new GsonBuilder().setPrettyPrinting().create();
			JsonObject jo = new JsonObject();
			
			try 
			{
				HashMap<String, Integer> map = new HashMap<String, Integer>();
				map.put("placeNumber", placeNumber);
				map.put("reviewCategory", 0);
				map.put("reviewOrder", reviewOrder);
				List<reviewVO> list = mapper.getReviewList(map);
				
				jo.add("check", create.toJsonTree("success"));
				jo.add("list", create.toJsonTree(list));
				
			} catch (Exception e) {
				
				jo = new JsonObject();
				jo.add("check", create.toJsonTree("fail"));
				jo.add("error", create.toJsonTree(e.toString()));
				
			} finally {
				pw.write(create.toJson(jo));
			}
		}
	  
	  @PostMapping(value = "/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}/review/{reviewNumber}/like")
	  public void reviewLike ( HttpServletRequest  request, HttpServletResponse response, @PathVariable(value = "reviewNumber") int reviewNumber, Locale locale, Model model ) throws Exception {
		  
		  request.setCharacterEncoding("UTF-8");
		  response.setCharacterEncoding("UTF-8");
		  response.setContentType("application/json");
		  PrintWriter pw = response.getWriter();
		  Gson create	= new GsonBuilder().setPrettyPrinting().create();
		  JsonObject jo = new JsonObject();
		  HttpSession session = request.getSession();
			
		  try {
			  userVO temp = (userVO)session.getAttribute("userLogin");
			  
			  String result = "";
			  
			  if(temp == null || session.getAttribute("userLogin") == null) {
				  result = "notUser";
			  } 
			  
			  if(temp != null && session.getAttribute("userLogin") != null) {
				  HashMap<String, Integer> tempMap = new HashMap<String, Integer>();
				  tempMap.put("reviewNumber", reviewNumber);
				  tempMap.put("userNumber", temp.getUserNumber());
				  
				  
				  reviewVO reviewCheck = mapper.reviewLikeCheck(tempMap);
				  
				  if(reviewCheck == null) {
					  int addCheck = mapper.addReviewLike(tempMap);
					  result = "likeError";
					  if(addCheck == 1) {
						  result = "okay";
					  }
				  }
				  
				  else if(reviewCheck != null) {
					  result = "already";
				  }
			  }
			  
			  jo.add("check", create.toJsonTree("success"));
			  jo.add("result", create.toJsonTree(result));
			  
		  } catch (Exception e) {
			  e.printStackTrace();
			  jo = new JsonObject();
			  jo.add("check", create.toJsonTree("fail"));
			  jo.add("error", create.toJsonTree(e.toString()));
				
		  } finally {
			  pw.write(create.toJson(jo));
		  }
		  
	 }
	  
}
