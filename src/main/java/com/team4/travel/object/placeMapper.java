package com.team4.travel.object;

import java.util.List;
import java.util.HashMap;

public interface placeMapper {
	public String getAreaName(int areaNumber);
	public placeVO getPlace(int placeNumber);
	public List<placeVO> getPlaceListLike(HashMap<String, Integer> opction);
	public List<placeVO> getPlaceListNew(HashMap<String, Integer> opction);
	public List<placeVO> getPlaceListName(HashMap<String, Integer> opction);
	public int placeNameCheck(String name);
	public int addNewPlace(placeVO place);
}
