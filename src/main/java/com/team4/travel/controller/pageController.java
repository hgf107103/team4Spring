package com.team4.travel.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	public String home(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) {
		return "index";
	}
	
	@GetMapping("/error")
	public String error(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) {
		return "error";
	}
	
	@GetMapping("/signup")
	public String signup(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) {
		return "user/signup";
	}
	
	@GetMapping("/country/{countryNumber}")
	public String country(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, Locale locale, Model model) {
		return "goTravel/country";
	}
	
	@GetMapping("/country/{countryNumber}/area/{areaNumber}")
	public String area(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "countryNumber") int countryNumber, @PathVariable(value = "areaNumber") int areaNumber, Locale locale, Model model) {
		return "goTravel/area";
	}
	
	
}
