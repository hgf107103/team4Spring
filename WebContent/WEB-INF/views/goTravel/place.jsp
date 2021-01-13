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
			<c:if test="${userLogin eq null}">
				<p id="placeCount" onclick="alert('로그인하지 않은 사람은 추천할 수 없습니다.')"></p>
			</c:if>
			<c:if test="${userLogin ne null}">
				<p id="placeCount" onclick="countButtonClick()"></p>
			</c:if>
		</div>
		<div id="placeMaps"></div>
		<div id="placeReview">
			<div id="reviewInfo">
				<div id="allReview">
					<p id="allTitle">리뷰 수</p>
					<p id="allCount"></p>
				</div>
				<div id="goodCountBox" class="countBox">
					<p class="countTitle">추천리뷰</p>
					<p id="goodCountTitle" class="countNumber"></p>
					<meter id="goodCount" value="0" min="0" max="1"></meter>
				</div>
				<div id="badCountBox" class="countBox">
					<p class="countTitle">비추천리뷰</p>
					<p id="badCountTitle" class="countNumber"></p>
					<meter id="badCount" value="0" min="0" max="1"></meter>
				</div>
				<c:if test="${userLogin ne null}">
				<input id="writeReview" type="button" onclick="writeReviewOpen()" value="리뷰쓰기">
				</c:if>
			</div>
			<div id="goodReview" class="reviewBoxStyle">
				<div class="emptyReviewBox">
					추천 리뷰가 없습니다.
				</div>
			</div>
			<div id="badReview" class="reviewBoxStyle">
				<div class="emptyReviewBox">
					비추천 리뷰가 없습니다.
				</div>
			</div>
		</div>
	</section>
	<div id="writeReviewBox">
		<form id="writeReviewForm">
			<h3 id="writeReviewHead">새로운 리뷰 작성</h3>
        	<label class="writeReviewRadio" id="goodRadio"><input type="radio" class="writeReviewCategory" checked="checked" name="reviewCategory" value="1"><span class="radioBox"></span><span id="goodRadioText" class="radioText">이 장소를 추천합니다.</span></label>
			<label class="writeReviewRadio" id="badRadio"><input type="radio" class="writeReviewCategory" name="reviewCategory" value="0"><span class="radioBox"></span><span id="badRadioText" class="radioText">이 장소를 추천하지 않습니다.</span></label>
			<input type="text" id="writeReviewTitle" maxlength="30" placeholder="리뷰 제목">
			<textarea id="writeReviewText" maxlength="400" onkeyup="writeTextLengthCheck()" placeholder="리뷰 본문"></textarea>
			<div id="writeReviewButtonBox">
				<p id="writeReviewTextCount">0 / 400</p>
				<input type="button" id="writeReviewSubmit" class="writeReviewButtonStyle" onclick="writeSubmit()" value="작성">
				<input type="button" id="writeReviewClose" class="writeReviewButtonStyle" onclick="writeClose()" value="취소">
			</div>
		</form>
	</div>
	<div id="reviewBoxBackground">
		<div id="reviewBoxInfo">
			<p id="reviewBoxTitle"></p>
			<p id="reviewBoxCategory"></p>
			<p id="reviewBoxCount"></p>
			<select id="reviewBoxOrder" onchange="reviewCategoryChange()">
				<option value="0">추천순</option>
				<option value="1">최신순</option>
			</select>
			<input id="reviewBoxClose" type="button" onclick="outReviewListBox()" value="창닫기">
		</div>
		<div id="reviewBoxList">
		</div>
	</div>


	<jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>