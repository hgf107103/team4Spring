package com.team4.travel;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class test {

	public static void main(String[] args) {
		Pattern p = Pattern.compile("^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$");
		Matcher m = p.matcher("abc123");
		boolean check = m.find();
		System.out.println(check);
	}

}
