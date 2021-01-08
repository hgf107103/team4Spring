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
	private static List<WebSocketSession> list = new ArrayList<WebSocketSession>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		list.add(session);
		System.out.println("ä�ÿ� ���� ���ӵ�");
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	// ���۵� �޽����� List�� ��� ���ǿ� ����
		String msg = message.getPayload();
	
		for (WebSocketSession s : list) {
			s.sendMessage(new TextMessage(session.getAcceptedProtocol()+""+msg));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		System.out.println("Ŭ���̾�Ʈ�� ���� ������");
		list.remove(session);
		
	}
}
