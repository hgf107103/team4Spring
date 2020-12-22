package com.team4.travel.object;

import java.util.List;

public interface selectMapper {
	public List<selectVO> getContinentList();
	public List<selectVO> getCountryList();
	public int insertCountry(countryVO country);
	public int insertArea(areaVO area);
	public String getCountryName(int countryNumber);
}
