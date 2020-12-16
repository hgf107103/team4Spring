package com.team4.travel.object;

import java.util.List;
import java.util.HashMap;

public interface placeMapper {
	public placeVO getPlace(int placeNumber);
	public List<placeVO> getPlaceListLike(HashMap<String, Integer> opction);
	public List<placeVO> getPlaceListNew(HashMap<String, Integer> opction);
	public List<placeVO> getPlaceListName(HashMap<String, Integer> opction);
}
