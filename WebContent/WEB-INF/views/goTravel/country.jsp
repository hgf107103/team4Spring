<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
	<title>방구석여행기</title>
    <script src="${pageContext.request.contextPath}/resources/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/JS/countryScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/CSS/countryStyle.css">
</head>
<body>
	<input type="hidden" id="countryNumber" value='<c:out value="${countryNumber}"></c:out>'>
	<div id="mainDiv">
    </div>
    <p id="clickInfo">원하는 지역을 선택해 주십시오</p>
</body>
</html>