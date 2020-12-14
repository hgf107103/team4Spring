<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<img id="mainBackground" src="/travel/resources/background/background.jpg" alt="">
<div id="menuBarOuter">
	<div id="menuBar">
		<div id="mainIcon">
			<img src="/travel/resources/background/mainIcon.png" onclick="location.href=''" alt="">
            <p id="pageTitle" onclick="location.href='index2.html'">방구석여행기</p>
        </div>
        <% if(session.getAttribute("userlogin") == null) {%>
        <div id="login">
            <input type="text" id="loginID" class="inputTextStyle" placeholder="아이디 입력">
            <input type="password" id="loginPWD" class="inputTextStyle" placeholder="비밀번호 입력">
            <input type="button" id="loginSubmit" class="inputButtonStyle" value="로그인" onclick="location.href = 'index_login.html'">
            <input type="button" id="signupSubmit" class="inputButtonStyle" value="회원가입" onclick="location.href = 'signup'">
        </div>
        <%} else if(session.getAttribute("userlogin") != null) {%>
        <div id="user">
             <p id="userInfo"><span><c:out value="${userlogin.userNick}"></c:out></span>님 환영합니다!</p>
             <input id="userBookMark" type="button" class="inputButtonStyle" value="북마크확인">
             <input id="logout" type="button" class="inputButtonStyle" value="로그아웃" onclick="location.href='index.html'">
        </div>
        <%} %>
    </div>
</div>