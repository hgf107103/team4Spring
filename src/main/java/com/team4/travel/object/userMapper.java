package com.team4.travel.object;

public interface userMapper {
	public userVO getUser(String userID);
	public int signUser(userVO user);
	public int getIDCheck(String userID);
	public int getNickCheck(String userNickname);
}
