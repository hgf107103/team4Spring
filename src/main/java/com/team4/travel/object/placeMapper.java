package com.team4.travel.object;

import java.util.List;
import java.util.HashMap;

public interface placeMapper {
	public String getAreaName(int areaNumber);
	public placeVO getPlace(int placeNumber);
	public List<placeVO> getPlaceListLike(HashMap<String, Integer> option);
	public List<placeVO> getPlaceListNew(HashMap<String, Integer> option);
	public List<placeVO> getPlaceListName(HashMap<String, Integer> option);
	public int placeNameCheck(String name);
	public int addNewPlace(placeVO place);
	public placeVO placeDetail(HashMap<String, Integer> option);
	public HashMap<String, Integer> placeLikeCheck(HashMap<String, Integer> option);
	public int placeLikeAdd(HashMap<String, Integer> option);
	public int placeLikeDel(HashMap<String, Integer> option);
}
