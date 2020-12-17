package com.team4.travel.object;

public interface userMapper {
	public userVO getUser(userVO user);
	public int signUser(userVO user);
	public int getIDCheck(String userID);
	public int getNameCheck(String userName);
}
