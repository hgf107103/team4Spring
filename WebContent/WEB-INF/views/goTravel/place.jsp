<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
	<title>방구석여행기 - 장소</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/placeScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-RE27wVARCBrtj-pd3u0fTXBnv1JLAIA&callback=initMap&libraries=&v=weekly"
      defer
    ></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/placeStyle.css">
</head>
<body onload="readyFunction()">
	<input id="placeNumber" type="hidden" value="${placeNumber}">
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection" onclick="alwaysCloseBookmark()">
		<div id="placeImg">
			<h1 id="placeNameTitle"></h1>
            <img id="placeTitleImage" src="" alt="">
		</div>
		<div id="placeInfo">
			<p id="placeCategory"></p>
			<p id="placeCount" onclick="addCount()"></p>
		</div>
		<div id="placeMaps"></div>
		<div id="placeReview">
			<div id="reviewInfo">
				<div id="allReview">
					<p id="allTitle">리뷰 수</p>
					<p id="allCount">50</p>
				</div>
				<div id="goodCountBox" class="countBox">
					<p class="countTitle">추천리뷰</p>
					<p class="countNumber">30</p>
					<meter id="goodCount" value="30" min="0" max="50"></meter>
				</div>
				<div id="badCountBox" class="countBox">
					<p class="countTitle">비추천리뷰</p>
					<p class="countNumber">20</p>
					<meter id="badCount" value="20" min="0" max="50"></meter>
				</div>
			</div>
			<div id="goodReview" class="reviewBoxStyle">
				<div class="sampleReview">
					<p class="sampleTitle">이것은 리뷰샘플 제목 이것은 리뷰샘플 제목 이것은 리뷰샘플 제목 이것은 리뷰샘플 제목 이것은 리뷰샘플 제목</p>
					<p class="sampleText">리뷰내용입니다 리뷰sdasdasdadasdasddasdsadsadasdasdasdsadsadasdasdsadsadsadasdasdsadasdsadasdasdas내용입니다</p>
					<p class="sampleDate">2021년 1월 6일</p>
				</div>
				<div class="sampleReview">
					<p class="sampleTitle">이것은 리뷰샘플 제목</p>
					<p class="sampleText">리뷰내용입니다 리뷰내용입니다</p>
					<p class="sampleDate">2021년 1월 6일</p>
				</div>
				<input class="buttonStyle" type="button" value="한번에 보기">
			</div>
			<div id="badReview" class="reviewBoxStyle">
				<div class="sampleReview">
					<p class="sampleTitle">이것은 리뷰샘플 제목</p>
					<p class="sampleText">리뷰내용입니다 리뷰내용입니다</p>
					<p class="sampleDate">2021년 1월 6일</p>
				</div>
				<div class="sampleReview">
					<p class="sampleTitle">이것은 리뷰샘플 제목</p>
					<p class="sampleText">리뷰내용입니다 리뷰내용입니다</p>
					<p class="sampleDate">2021년 1월 6일</p>
				</div>
				<input class="buttonStyle" type="button" value="한번에 보기">
			</div>
		</div>
	</section>
	<div id="reviewBoxBackground">
		<div id="reviewBoxMain">
			<div id="reviewBoxInfo">
				<p id="reviewBoxTitle">광화문 광장</p>
				<p id="reviewBoxCategory">추천리뷰</p>
				<p id="reviewBoxCount">30개</p>
				<select id="reviewBoxOrder">
					<option value="new">최신순</option>
					<option value="best">추천순</option>
				</select>
			</div>
			<div id="reviewBoxList">
			</div>
		</div>
	</div>
	<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>