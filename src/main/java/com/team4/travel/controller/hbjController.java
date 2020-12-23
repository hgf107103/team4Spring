package com.team4.travel.controller;

import java.io.File;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.areaVO;
import com.team4.travel.object.countryVO;
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
	
	@Autowired
	private String SAVE_PATH;
	
	@PostMapping(value = "/hbj/add/area", produces = "text/plain;charset=UTF-8")
	public void areaAdd(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "number") int countryNumber, @RequestParam(value = "koreanName") String koreanName, @RequestParam(value = "englishName") String englishName,  @RequestParam(value = "lat") double lat, @RequestParam(value = "lng") double lng, @RequestParam(value="uploadImage", required = false) MultipartFile upload) throws Exception{
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		
		try {
			HttpSession session = request.getSession();
			userVO temp = (userVO)session.getAttribute("userLogin");
			
			if(!temp.isUserAdminCheck()) {
				Exception ex = new Exception();
				throw ex;
			}
			
			if(upload.getSize() > 2097152) {
				
				pw.write("<script>alert('이미지 용랑이 너무 큽니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");
				
			} else {
				
				
				String countryName = mapper.getCountryName(countryNumber);
				
				
				
				String originalFileName = upload.getOriginalFilename();
				int index = originalFileName.lastIndexOf('.');
		        String hwak = originalFileName.substring(index);
				String fileName = countryName + "_" + englishName + hwak;
				String savePath = SAVE_PATH + "/area/" + fileName;
				upload.transferTo(new File(savePath));
				
				areaVO tempArea = new areaVO();
				tempArea.setCountryNumber(countryNumber);
				tempArea.setKoreanName(koreanName);
				tempArea.setEnglishName(englishName);
				tempArea.setAreaLat(lat);
				tempArea.setAreaLng(lng);
				
				int insertCheck = mapper.insertArea(tempArea);
				
				if(insertCheck == 1) {
					pw.write("<script>alert('성공했습니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");
				} else if(insertCheck != 1) {
					pw.write("<script>alert('실패했습니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");
					File tempFile = new File(savePath);
					
					if( tempFile.exists() ){ 
						
						if(tempFile.delete()){
							System.out.println("파일삭제 성공"); 
						} else { 
							System.out.println("파일삭제 실패"); 
						} 
						
					} else {
						System.out.println("파일이 존재하지 않습니다."); 
					}

					
				}
				
			}
			
			
			
			
		} catch (Exception e) {
			System.out.println(e);
			
		}
	}
	
	
	
	@PostMapping(value = "/hbj/add/country", produces = "text/plain;charset=UTF-8")
	public void countryAdd(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "number") int number, @RequestParam(value = "koreanName") String koreanName, @RequestParam(value = "englishName") String englishName,  @RequestParam(value = "lat") double lat, @RequestParam(value = "lng") double lng, @RequestParam(value="uploadImage", required = false) MultipartFile upload) throws Exception{
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		
		try {
			HttpSession session = request.getSession();
			userVO temp = (userVO)session.getAttribute("userLogin");
			
			if(!temp.isUserAdminCheck()) {
				Exception ex = new Exception();
				throw ex;
			}
			
			if(upload.getSize() > 2097152) {
				
				pw.write("<script>alert('이미지 용랑이 너무 큽니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");				
			} else {
				System.out.println(request.getContextPath());
				String originalFileName = upload.getOriginalFilename();
				int index = originalFileName.lastIndexOf('.');
		        String hwak = originalFileName.substring(index);
				String fileName = englishName + hwak;
				String savePath = SAVE_PATH + "/country/" + fileName;
				upload.transferTo(new File(savePath));
				
				countryVO tempArea = new countryVO();
				tempArea.setContinentNumber(number);
				tempArea.setKoreanName(koreanName);
				tempArea.setEnglishName(englishName);
				tempArea.setCountryLat(lat);
				tempArea.setCountryLng(lng);
				
				int insertCheck = mapper.insertCountry(tempArea);
				
				if(insertCheck == 1) {
					pw.write("<script>alert('등록성공했습니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");
				} else if(insertCheck != 1) {
					pw.write("<script>alert('등록실패했습니다.'); location.href='" +request.getContextPath() + "/hbj'</script>");
					File tempFile = new File(savePath);
					
					if( tempFile.exists() ){ 
						
						if(tempFile.delete()){
							System.out.println("파일삭제 성공"); 
						} else { 
							System.out.println("파일삭제 실패"); 
						} 
						
					} else {
						System.out.println("파일이 존재하지 않습니다."); 
					}

					
				}
				
			}
			
			
			
			
		} catch (Exception e) {
			System.out.println(e);
			
		}
	}
	
	
	public void nameCheck() throws Exception {
		
	}
}
