package com.team4.travel.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class selectVO {
	private int number;
	private String koreanName;
	private String englishName;
	private double countryLat;
	private double countryLng;
}
