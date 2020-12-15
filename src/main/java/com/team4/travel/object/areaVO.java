package com.team4.travel.object;

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
	private String englishName;
	private String koreanName;
	private double areaLat;
	private double areaLng;
}
