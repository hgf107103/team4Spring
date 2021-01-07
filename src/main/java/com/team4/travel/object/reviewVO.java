package com.team4.travel.object;

import java.sql.Date;

import lombok.Data;

@Data
public class reviewVO 
{
	private int 	reviewNumber;
	private int 	placeNumber;
	private int 	userNumber;
	private String 	reviewTitle;
	private String 	reviewText;
	private Date 	reviewDate;
	private int 	reviewPhotoCheck;
	private int 	reviewCategory;
	private int 	reviewCount;
}
