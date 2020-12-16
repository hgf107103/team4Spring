package com.team4.travel.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class placeVO {
	private int placeNumber;
	private int userNumber;
	private int areaNumber;
	private int categoryNumber;
	private String englishName;
	private String koreanName;
	private String categoryName;
	private double placeLat;
	private double placeLng;
	private boolean placeCheck;
	private int count;
}
