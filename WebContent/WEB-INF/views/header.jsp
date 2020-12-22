<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script src="${pageContext.request.contextPath}/JS/defaultScript.js"></script>
<img id="mainBackground" src="${pageContext.request.contextPath}/background/background.jpg" alt="">
<div id="menuBarOuter">
	<div id="menuBar">
		<div id="mainIcon">
			<img src="${pageContext.request.contextPath}/background/mainIcon.png" onclick="location.href='${pageContext.request.contextPath}/'" alt="">
            <p id="pageTitle" onclick="location.href='${pageContext.request.contextPath}/'">방구석여행기</p>
        </div>
        <c:if test="${userLogin eq null}">
         <form id="login">
            <input type="text" id="loginID" class="inputTextStyle" autocomplete="off" onkeyup="if (window.event.keyCode == 13)  {userLogin('${pageContext.request.contextPath}')}" placeholder="아이디 입력">
            <input type="password" id="loginPWD" class="inputTextStyle" autocomplete="current-password" onkeyup="if (window.event.keyCode == 13) {userLogin('${pageContext.request.contextPath}')}" placeholder="비밀번호 입력">
            <input type="button" id="loginButton" class="inputButtonStyle" value="로그인" onclick="userLogin('${pageContext.request.contextPath}')">
            <input type="button" id="signupButton" class="inputButtonStyle" value="회원가입" onclick="location.href = '${pageContext.request.contextPath}/user/signup'">
        </form>
        </c:if>
       
        <c:if test="${userLogin ne null}">
        <div id="user">
             <p id="userInfo"><span><c:out value="${userLogin.userNickname}"></c:out></span>님 환영합니다!</p>
             <c:if test="${userLogin.userAdminCheck}">
             <input id="adminPage" type="button" class="inputButtonStyle" onclick="window.open('${pageContext.request.contextPath}/hbj', '_blank');" value="관리페이지">
        	 </c:if>
             <input id="userBookMark" type="button" class="inputButtonStyle" value="북마크열기" onclick="bookmarkButton('${pageContext.request.contextPath}')">
             <input id="logout" type="button" class="inputButtonStyle" value="로그아웃" onclick="userLogout('${pageContext.request.contextPath}')">
        </div>
        </c:if>
    </div>
    <c:if test="${userLogin ne null}">
    <div id="bookmarkBar"></div>
    </c:if>
</div>