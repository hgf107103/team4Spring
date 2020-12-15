package com.team4.travel.object;

import java.util.List;

public interface areaMapper {
	public List<areaVO> getAreaList(int countryNumber);
	public areaVO getOneArea(int areaNumber);
	public List<areaVO> getBestArea();
}
