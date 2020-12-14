<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
	<title>방구석여행기 - 회원가입</title>
    <script src="/travel/resources/JS/jquery-3.5.1.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/travel/resources/CSS/defaultStyle.css">
    <link rel="stylesheet" href="/travel/resources/CSS/signupStyle.css">
    <% if(session.getAttribute("userlogin") != null) {%>
    	<script type="text/javascript">
    		alert('이미 로그인되어 있습니다.');
    		location.href="index";
    	</script>
    <%} %>
</head>
<body>
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection">
        <h1>회원가입</h1>
        <form id="mainForm">
            <div id="IDSection" class="sginupSection">
                <input type="text" id="sginupID" class="sginupInputText" name="sginupID" placeholder="아이디 입력">
                <input type="button" id="sginupIDCheck" class="sginupInputButton" onclick="alert('중복확인되었습니다.');" value="중복확인">
                <p id="IDLog" class="log">아이디를 입력해 해주십시오</p>
            </div>
            <div id="PWDSection" class="sginupSection">
                <input type="password" id="sginupPWD" class="sginupInputText" name="sginupPWD" placeholder="비밀번호 입력">
                <p id="PWDLog" class="log">비밀번호를 입력해주십시오</p>
                <input type="password" id="sginupPWDCheck" class="sginupInputText" name="sginupPWDCheck" placeholder="비밀번호 재입력">
                <p id="PWDLog" class="log">비밀번호를 한번 더 입력해주십시오</p>
            </div>
            <div id="NameSection" class="sginupSection">
                <input type="text" id="sginupName" class="sginupInputText" name="sginupName" placeholder="이름 입력">
                <p id="PWDLog" class="log">이름을 입력해주십시오</p>
                <input type="text" id="sginupNick" class="sginupInputText" name="sginupNick" placeholder="별명 입력">
                <input type="button" id="sginupNickCheck" class="sginupInputButton" onclick="alert('중복확인되었습니다.');" value="중복확인">
                <p id="PWDLog" class="log">별명을 입력해주십시오</p>
            </div>
            <div id="submitSection" class="sginupSection">
                <input type="button" id="sginupSubmit" class="sginupInputButton" onclick="alert('회원가입 되었습니다.'); location.href='index2.html';" value="회원가입">
            </div>
        </form>
    </section>
    <jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>