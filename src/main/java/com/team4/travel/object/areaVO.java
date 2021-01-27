package com.team4.travel.object;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class areaVO {
	private int areaNumber;
	private int countryNumber;
	private String countryName;
	private String countryKoreanName;
	private String englishName;
	private String koreanName;
	private double areaLat;
	private double areaLng;
}
