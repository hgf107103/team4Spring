package com.team4.travel.object;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class reviewVO 
{
	private int reviewNumber;
	private int placeNumber;
	private int userNumber;
	private String reviewTitle;
	private String reviewText;
	private Timestamp reviewDate;
	private int reviewPhotoCheck;
	private int reviewCategory;
	private int reviewCount;
}
