package com.team4.travel.object;

import java.util.List;

public interface areaMapper {
	public List<areaVO> getAreaList(int countryNumber);
	public areaVO getOneArea(areaVO area);
	public List<areaVO> getBestArea();
	public List<areaVO> getSearch(String searchText);
}
