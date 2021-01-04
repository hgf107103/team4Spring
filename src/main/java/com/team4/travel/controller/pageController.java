package com.team4.travel.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class pageController {
	private static final Logger logger = LoggerFactory.getLogger(pageController.class);
	
	@GetMapping({"/", "/index"})
	public String home(HttpServletRequest request, Locale locale, Model model) {
		return "index";
	}
	
	@GetMapping("/error")
	public String error(HttpServletRequest request, Locale locale, Model model) {
		
		return "error";
	}
	
	@GetMapping("/user/signup")
	public String signup(HttpServletRequest request, Locale locale, Model model) {
		return "user/signup";
	}
	
	@GetMapping("/country/{countryNumber}")
	public String country(HttpServletRequest request, @PathVariable(value = "countryNumber") int countryNumber, Locale locale, Model model) {
		model.addAttribute("countryNumber", countryNumber);
		return "goTravel/country";
	}
	
	@GetMapping("/country/{countryNumber}/area/{areaNumber}")
	public String area(HttpServletRequest request, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, Locale locale, Model model) {
		model.addAttribute("countryNumber", countryNumber);
		model.addAttribute("areaNumber", areaNumber);
		return "goTravel/area";
	}
	
	@GetMapping("/hbj")
	public String hanamori(HttpServletRequest request, Locale locale, Model model) {
		return "hanamori/hanamori";
	}
	
	@GetMapping("/country/{countryNumber}/area/{areaNumber}/place/add")
	public String addPlace(HttpServletRequest request, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, Locale locale, Model model) {
		model.addAttribute("countryNumber", countryNumber);
		model.addAttribute("areaNumber", areaNumber);
		return "goTravel/newPlace";
	}
	@GetMapping("/country/{countryNumber}/area/{areaNumber}/place/{placeNumber}")
	public String place(HttpServletRequest request, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber,@PathVariable(value = "placeNumber") int placeNumber, Locale locale, Model model) {
		model.addAttribute("countryNumber", countryNumber);
		model.addAttribute("areaNumber", areaNumber);
		model.addAttribute("placeNumber", placeNumber);
		return "goTravel/place";
	}
}
