package com.team4.travel.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class countryVO {
	private int countryNumber;
	private int continentNumber;
	private String continentName;
	private String englishName;
	private String koreanName;
	private double countryLat;
	private double countryLng;
}
