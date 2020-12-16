<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
    <title>방구석여행기</title>
    <script src="${pageContext.request.contextPath}/resources/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/JS/indexScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/CSS/indexStyle.css">
</head>
<body>
    <jsp:include page="header.jsp"></jsp:include>
    <!--continent 대륙 country 나라 area 지역 place 장소-->
    <section id="mainSection">
        <div id="searchBox">
            <div id="bestAreaSection">
                <h1 id="bestAreaTitle">최고 인기 여행지를 확인하세요</h1>
                <div id="bestAreaList">
                </div>
            </div>
            <div id="searchSection">
                <input type="text" id="searchText" placeholder="검색어 입력">
                <div id="searchResultBox">
                    <p class="searchResult">검색어 샘플</p>
                    <p class="searchResult">검색어 샘플</p>
                    <p class="searchResult">검색어 샘플</p>
                    <p class="searchResult">검색어 샘플</p>
                </div>
            </div>
        </div>
        <div id="allCountryList">
            <div id="informationTitle">
                <h3 id="informationTitleText">대륙별 관광지 목록</h3>
                <hr>
            </div>
            
            <div id="asiaCountry" class="continent">
                <h2 class="countryHeader">아시아</h2>
                <div id="asiaCountryList" class="countryList">
                </div>
            </div>
            <hr>
            <div id="northAmericaCountry" class="continent">
                <h2 class="countryHeader">북아메리카</h2>
                <div id="northamericaCountryList" class="countryList">
                </div>
            </div>
            <hr>
            <div id="southAmericaCountry" class="continent">
                <h2 class="countryHeader">남아메리카</h2>
                <div id="southamericaCountryList" class="countryList">
                </div>
            </div>
            <hr>
            <div id="oceaniaCountry" class="continent">
                <h2 class="countryHeader">오세아니아</h2>
                <div id="oceaniaCountryList" class="countryList">
                </div>
            </div>
            <hr>
            <div id="europeCountry" class="continent">
                <h2 class="countryHeader">유럽</h2>
                <div id="europeCountryList" class="countryList">
                </div>
            </div>
            <hr>
            <div id="africaCountry" class="continent">
                <h2 class="countryHeader">아프리카</h2>
                <div id="africaCountryList" class="countryList">
                </div>
            </div>
        </div>
    </section>
    <jsp:include page="footer.jsp"></jsp:include>
</body>
</html>