package com.team4.travel.object;

import java.util.HashMap;
import java.util.List;

public interface reviewMapper
{
	public List<reviewVO> getReviewList(HashMap<String, Integer> list);
	public List<reviewCountVO> getReviewInfo(int placeNumber);
	public int addNewReview(reviewVO review);
	public reviewVO reviewLikeCheck(HashMap<String, Integer> list);
	public int addReviewLike(HashMap<String, Integer> list);
}
