package com.team4.travel.object;

import java.util.HashMap;
import java.util.List;

public interface bookmarkMapper {
	public List<bookmarkVO> getBookmarkList(int userNumber);
	public int bookmarkAdd(HashMap<String, Integer> map);
	public int bookmarkRemove(HashMap<String, Integer> map);
	public bookmarkVO bookmarkCheck(HashMap<String, Integer> map);
}
