package com.team4.travel.object;

import java.util.HashMap;
import java.util.List;

public interface reviewMapper
{
	public List<reviewVO> getReviewList(HashMap<String, Integer> review);
	public int writeReview(reviewVO vo);
}
