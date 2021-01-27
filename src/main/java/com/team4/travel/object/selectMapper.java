package com.team4.travel.object;

import java.util.List;

public interface selectMapper {
	public List<selectVO> getContinentList();
	public List<selectVO> getCountryList();
	public int insertCountry(countryVO country);
	public int insertArea(areaVO area);
	public String getCountryName(int countryNumber);
	public List<placeVO> getAddPlaceList();
	public int allowPlace(int placeNumber);
	public int denyPlace(int placeNumber);
	public List<reviewVO> getReviewList();
	public int deleteReview(int reviewNumber);
}
