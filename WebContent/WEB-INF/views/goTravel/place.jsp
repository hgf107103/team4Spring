<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
	<title>방구석여행기 - 장소</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/placeStyle.css">
</head>
<body>
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection" onclick="alwaysCloseBookmark()">
		<div id="placeImg">
			<h1 id="placeNameTitle"></h1>
            <img id="placeTitleImage" src="" alt="">
		</div>
		<div id="placeMaps"></div>
		<div id="placeReview"></div>
	</section>
	<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>