package com.team4.travel.controller;

import java.io.File;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.team4.travel.object.areaMapper;
import com.team4.travel.object.areaVO;
import com.team4.travel.object.placeMapper;
import com.team4.travel.object.placeVO;
import com.team4.travel.object.userVO;

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
	
	@Autowired
	private String SAVE_PATH;
	
	@PostMapping("/country/{countryNumber}/area/{areaNumber}/place/add")
	public void addPlace(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, @RequestParam(value = "category") int categoryNumber, @RequestParam(value = "koreanName") String koreanName, @RequestParam(value = "englishName") String englishName, @RequestParam(value = "imageFile", required = false) MultipartFile imageFile, @RequestParam(value = "placeLat") double placeLat, @RequestParam(value = "placeLng") double placeLng) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		
		try {
			HttpSession session = request.getSession();
			userVO temp = (userVO)session.getAttribute("userLogin");
			
			if(temp == null) {
				Exception ex = new Exception();
				throw ex;
			}
			
			if(imageFile.getSize() > 2097152) {
				
				pw.write("<script>alert('이미지 용랑이 너무 큽니다.'); location.href='" +request.getContextPath() + "/country/" + countryNumber + "/area/" + areaNumber + "'</script>");
				
			} else {
				
				
				String areaName = mapper.getAreaName(areaNumber);
				
				
				
				String originalFileName = imageFile.getOriginalFilename();
				int index = originalFileName.lastIndexOf('.');
		        String hwak = originalFileName.substring(index);
				String fileName = areaName + "_" + englishName + hwak;
				String savePath = SAVE_PATH + "/place/" + areaName + "/" + fileName;
				
				File pathCheck = new File(SAVE_PATH + "/place/" + areaName + "/");
				
				if (!pathCheck.exists()) {
					try {
						pathCheck.mkdir();
					} catch (Exception e) {
						e.printStackTrace();
						return;
					}
				}
				
				imageFile.transferTo(new File(savePath));
				
				placeVO placeTemp = new placeVO();
				placeTemp.setUserNumber(temp.getUserNumber());
				placeTemp.setAreaNumber(areaNumber);
				placeTemp.setCategoryNumber(categoryNumber);
				placeTemp.setEnglishName(englishName);
				placeTemp.setKoreanName(koreanName);
				placeTemp.setPlaceLat(placeLat);
				placeTemp.setPlaceLng(placeLng);
				
				
				int insertCheck = mapper.addNewPlace(placeTemp);
				
				if(insertCheck == 1) {
					pw.write("<script>alert('성공했습니다.'); location.href='" +request.getContextPath() + "/country/" + countryNumber + "/area/" + areaNumber + "'</script>");
				} else if(insertCheck != 1) {
					pw.write("<script>alert('실패했습니다.'); location.href='" +request.getContextPath() + "/country/" + countryNumber + "/area/" + areaNumber + "'</script>");
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
			System.out.println(e.getMessage());
			e.printStackTrace();
			pw.write("<script>alert('오류가 발생하였습니다.'); location.href='" +request.getContextPath() + "/country/" + countryNumber + "/area/" + areaNumber + "/'</script>");
		}
	}
	
	@PostMapping("/country/{countryNumber}/area/{areaNumber}/place/name")
	public void addPlaceNameCheck(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "koreanName") String koreanName, @RequestParam(value = "englishName") String englishName) throws Exception {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		Gson create = new GsonBuilder().setPrettyPrinting().create();
		JsonObject jo = new JsonObject();
		
		try {

			String result = "false";
			
			int kcheck = mapper.placeNameCheck(koreanName);
			int echeck = mapper.placeNameCheck(englishName);
			
			if(kcheck == 0 && echeck == 0) {
				result = "true";
			}
			else if(kcheck == 1 && echeck == 0) {
				result = "kerror";
			}
			else if(kcheck == 0 && echeck == 1) {
				result = "eerror";
			}
			else if(kcheck == 1 && echeck == 1) {
				result = "aerror";
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
}
