<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
	<title>방구석여행기 - 회원가입</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/signupScript.js"></script>
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/signupStyle.css">
    <c:if test="${userLogin ne null}">
    	<script type="text/javascript">
    		alert('이미 로그인되어 있습니다.');
    		location.href=`${pageContext.request.contextPath}`;
    	</script>
   </c:if>
</head>
<body>
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection">
        <h1>회원가입</h1>
        <form id="mainForm">
            <div id="IDSection" class="signupSection">
                <input type="text" id="signupID" class="signupInputText" name="signupID" onkeyup="if (window.event.keyCode == 13) {idCheck()}" placeholder="아이디 입력">
                <input type="button" id="signupIDCheck" class="signupInputButton" onclick="idCheck()" value="중복확인">
                <p id="IDLog" class="log">아이디를 입력해주십시오</p>
            </div>
            <div id="PWDSection" class="signupSection">
                <input type="password" id="signupPWD" class="signupInputText" name="signupPWD" onkeyup="pwdCheck()" placeholder="비밀번호 입력">
                <p id="PWDLog" class="log">비밀번호를 입력해주십시오</p>
                <input type="password" id="signupPWDCheck" class="signupInputText" name="signupPWDCheck" onkeyup="pwdCheckCheck()" placeholder="비밀번호 재입력">
                <p id="PWDCheckLog" class="log">비밀번호를 한번 더 입력해주십시오</p>
            </div>
            <div id="NameSection" class="signupSection">
                <input type="text" id="signupName" class="signupInputText" name="signupName" onkeyup="nameCheck()" placeholder="이름 입력">
                <p id="nameLog" class="log">이름을 입력해주십시오</p>
                <input type="text" id="signupNick" class="signupInputText" onkeyup="if (window.event.keyCode == 13) {nickCheck()}" name="signupNick" placeholder="별명 입력">
                <input type="button" id="signupNickCheck" class="signupInputButton" onclick="nickCheck()" value="중복확인">
                <p id="nickLog" class="log">별명을 입력해주십시오</p>
            </div>
            <div class="g-recaptcha" data-sitekey="6Ldrnw0aAAAAAOEcPwQhjP8e1TW1uMFD75H_oO8x"></div>
            <div id="submitSection" class="signupSection">
                <input type="button" id="signupSubmit" class="signupInputButton" onclick="userSignupSubmit()" value="회원가입">
            </div>
        </form>
    </section>
    <jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>