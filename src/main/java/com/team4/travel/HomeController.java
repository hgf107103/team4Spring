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
	@RequestMapping(value = "/asdasdasdasdasd", method = RequestMethod.GET)
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
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public String upload(@RequestParam(value="file1", required = false) MultipartFile mf) {
		System.out.println(SAVE_PATH);
		
		
		String originalFileName = mf.getOriginalFilename();//파일의원래이름
		//String root_path = request.getSession().getServletContext().getRealPath("/");
		
		
        long fileSize = mf.getSize();
        System.out.println(mf.getSize());//바이트수
        
        
        System.out.println(mf.getName());//홈에서 보낸 file 태그의 name
        
        
        int index = originalFileName.lastIndexOf('.');
        String hwak = originalFileName.substring(index + 1);
        System.out.println(hwak);//확장자
        
        String safeFile = SAVE_PATH + System.currentTimeMillis() + originalFileName;
        System.out.println(safeFile);
        
        
        /*try {
        	System.out.println(1);
        	mf.transferTo(new File(safeFile));
        	System.out.println(1);
        } catch (IllegalStateException e) {
        	System.out.println(1);
        	e.printStackTrace();
        	
        } catch (IOException e) {
        	System.out.println(1);
            e.printStackTrace();
            
        }*/
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
