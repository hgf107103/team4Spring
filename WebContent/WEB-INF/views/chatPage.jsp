<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
	<title>방구석여행기 - 채팅</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/chatScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/chatStyle.css">
    <script type="text/javascript">
    	let a = '<%= request.getRequestURL() %>';
    	let b = '<%= request.getRequestURI() %>';
    	let c = a.split(b);
    	let d = c[0].split('http://');
    	let f = d[1] + `${pageContext.request.contextPath}`;
    </script>
</head>
<body onload="getCountry();">
<c:if test="${userLogin ne null}">
	<h1 id="title"></h1>
	<div id="chatLog"></div>
	<div id="write">
		<input type="text" id="writeChat" onkeyup="if (window.event.keyCode == 13)  {send()}" placeholder="채팅 입력">
		<input type="button" id="goButton" onclick="send()" value="채팅송신">
		<input type="button" id="outButton" onclick="exit()" value="방나가기">
	</div>
	<div id="ready">
		<h2 id="serverTitle">채팅 서버</h2>
		<select id="serverlist">
			<option value="null">선택하세요</option>
			<c:if test="${userLogin.userAdminCheck}">
			<option value="admin">관리자서버</option>
			</c:if>
		</select>
		<input type="button" onclick="connect('${userLogin.userID}','${userLogin.userNickname}', f)" value="선택">
	</div>
</c:if>
</body>
</html>