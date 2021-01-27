package com.team4.travel;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class test {

	public static void main(String[] args) {
		String a = "123.12";
		try {

			int b = Integer.parseInt(a);
			System.out.println(b);
		} catch (Exception e) {
			System.out.println("asd");
		} finally {
			System.out.println("qwe");
		}
	}

}
