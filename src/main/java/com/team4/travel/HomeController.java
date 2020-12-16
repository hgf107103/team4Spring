package com.team4.travel;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@SuppressWarnings("finally")
	@RequestMapping(value = "/asdasdasdasdasd", method = RequestMethod.POST)
	public String home(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		try {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			
			Date date = new Date();
			DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
			
			String formattedDate = dateFormat.format(date);
			
			model.addAttribute("serverTime", formattedDate );
		} catch (Exception e) {
			// TODO: handle exception
		}
		return "home";
	}
	
	@Autowired
	private String SAVE_PATH;
	
	@RequestMapping(value = "/wqeqwewqaasdasda", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public String upload(@RequestParam(value="file1", required = false) MultipartFile mf) {
		System.out.println(SAVE_PATH);
		String originalFileName = mf.getOriginalFilename();
        long fileSize = mf.getSize();
        String safeFile = SAVE_PATH + System.currentTimeMillis() + originalFileName;
        System.out.println(1);
        try {
        	System.out.println(1);
        	mf.transferTo(new File(safeFile));
        	System.out.println(1);
        } catch (IllegalStateException e) {
        	System.out.println(1);
        	e.printStackTrace();
        	
        } catch (IOException e) {
        	System.out.println(1);
            e.printStackTrace();
            
        }
            return "home";
    }
    
	@GetMapping("/abc/{num}")
	public void abc(Locale locale, Model model, @PathVariable(value = "num") int num) {
		System.out.println(num);
	}
	@GetMapping("/abc/{num}/aaa/{aaa}")
	public void abc(Locale locale, Model model, @PathVariable(value = "num") int num, @PathVariable(value = "aaa") int aaa) {
		System.out.println("aa" + num);
		System.out.println(aaa);
	}
}
