package com.team4.travel.chat;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class chatSocket extends TextWebSocketHandler{
	private static List<chatUser> list = new ArrayList<chatUser>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		list.add(new chatUser(null, null, session));
		System.out.println("채팅에 유저 접속됨");
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	// 전송된 메시지를 List의 모든 세션에 전송
		String msg = message.getPayload();
		String[] part = msg.split(":");
		for (chatUser user : list) {
			
			if(user.getSession().equals(session) && user.getUserName() == null && user.getChatServer() == null) {
				user.setUserName(part[0]);
				user.setChatServer(part[1]);
			}
			
			if(user.getChatServer() != null) {
				if(user.getChatServer().equals(part[1])) {
					user.getSession().sendMessage(new TextMessage(session.getAcceptedProtocol()+""+part[2]));
				}
			}
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		System.out.println("클라이언트와 연결 해제됨");
		
		for (chatUser user : list) {
			if(user.getSession().equals(session)) {
				list.remove(user);
			}
		}
		
	}
}
