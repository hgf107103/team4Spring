package com.team4.travel.object;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class userVO {
	private int userNumber;
	private String userID;
	private String userPassword;
	private String userName;
	private String userNickname;
	private Date userDate;
	private boolean userAdminCheck;
}
