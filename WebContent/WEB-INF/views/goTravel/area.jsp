<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
	<title>방구석여행기 - 지역</title>
    <script src="../../../resources/JS/jquery-3.5.1.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../resources/CSS/defaultStyle.css">
    <link rel="stylesheet" href="../../../resources/CSS/areaStyle.css">
</head>
<body>
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection">
        <div id="areaImg">
            <h1>서울</h1>
            <img src="img/city/korea_seoul2.jpg" alt="">
        </div>
        <div id="areaInfo">
            <input type="button" class="areaButton" value="북마크넣기">
            <input type="button" class="areaButton" value="지역추천">
            <input type="button" class="areaButton" value="장소신청">
        </div>
        <div id="placeSection">
            <div id="placeListOrder">
                <div id="categoryButtonMenu">
                    <label><input type="radio" name="categoryRadio" class="categorySelect" checked value="all"><span>전체</span></label>
                    <label><input type="radio" name="categoryRadio" class="categorySelect" value="tour"><span>관광</span></label>
                    <label><input type="radio" name="categoryRadio" class="categorySelect" value="food"><span>음식</span></label>
                    <label><input type="radio" name="categoryRadio" class="categorySelect" value="shopping"><span>쇼핑</span></label>
                </div>
                <div id="categoryRadioMenu">
                    <label><input type="radio" class="categoryRadio" name="orderRadio" value="like"><span>추천순</span></label>
                    <label><input type="radio" class="categoryRadio" name="orderRadio" checked value="name"><span>이름순</span></label>    
                </div>
            </div>
            <div id="placeList">
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
                <div class="place">
                    <div class="placeImage">
                        <img src="img/city/amerika_shicago.jpg" alt="">
                    </div>
                    <p class="placeScore">추천수 : 5</p>
                    <p class="placeName">샘플이름</p>
                    <p class="placeCategory">쇼핑</p>
                </div>
            </div>
        </div>
    </section>
    <jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>