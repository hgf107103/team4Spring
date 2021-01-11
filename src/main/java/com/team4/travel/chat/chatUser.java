package com.team4.travel.chat;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class chatUser {
	private String userName;
	private String chatServer;
	private WebSocketSession session;
	
	public chatUser(String userName, String chatServer, WebSocketSession session) {
		this.userName = userName;
		this.chatServer = chatServer;
		this.session = session;
	}
	
	
}
