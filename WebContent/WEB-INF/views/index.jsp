<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <title>방구석여행기</title>
    <script src="/travel/resources/JS/jquery-3.5.1.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/travel/resources/CSS/defaultStyle.css">
    <link rel="stylesheet" href="/travel/resources/CSS/indexStyle.css">
</head>
<body>
    <jsp:include page="header.jsp"></jsp:include>
    <!--continent 대륙 country 나라 area 지역 place 장소-->
    <section id="mainSection">
        <div id="searchBox">
            <div id="bestAreaSection">
                <h1 id="bestAreaTitle">최고 인기 여행지를 확인하세요</h1>
                <div id="bestAreaList">
                    <div class="bestArea">
                        <p class="bestAreaName">도쿄</p>
                        <img class="bestAreaImg" src="img/city/japan_tokyo.jpg" alt="">
                    </div>
                    <div class="bestArea">
                        <p class="bestAreaName">오사카</p>
                        <img class="bestAreaImg" src="img/city/japan_osaka.jpg" alt="">
                    </div>
                    <div class="bestArea">
                        <p class="bestAreaName">후쿠오카</p>
                        <img class="bestAreaImg" src="img/city/japan_hukuoka.jpg" alt="">
                    </div>
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
                <div id="countryListAsia" class="countryList">
                    <div id="korea" class="country" onclick="window.open('country/1', '_blank')">
                        <p>한국</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div id="japan" class="country">
                        <p>일본</p>
                        <img src="img/country/japan_img.jpg" alt="">
                    </div>
                    <div id="china" class="country">
                        <p>중국</p>
                        <img src="img/country/china_img.jpg" alt="">
                    </div>
                    <div id="vietnam" class="country">
                        <p>베트남</p>
                        <img src="img/country/vietnam_img.jpg" alt="">
                    </div>
                    <div id="india" class="country">
                        <p>인도</p>
                        <img src="img/country/india_img.jpg" alt="">
                    </div>
                </div>
            </div>
            <hr>
            <div id="northAmericaCountry" class="continent">
                <h2 class="countryHeader">북아메리카</h2>
                <div id="countryListNorthAmerica" class="countryList">
                    <div class="country">
                        <p>미국</p>
                        <img src="img/city/amerika_newyork.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>캐나다</p>
                        <img src="img/country/canada_img.jpg" alt="">
                    </div>
                </div>
            </div>
            <hr>
            <div id="southAmericaCountry" class="continent">
                <h2 class="countryHeader">남아메리카</h2>
                <div id="countryListSouthAmerica" class="countryList">
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                </div>
            </div>
            <hr>
            <div id="oceaniaCountry" class="continent">
                <h2 class="countryHeader">오세아니아</h2>
                <div id="countryListOceania" class="countryList">
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                </div>
            </div>
            <hr>
            <div id="europeCountry" class="continent">
                <h2 class="countryHeader">유럽</h2>
                <div id="countryListEurope" class="countryList">
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                </div>
            </div>
            <hr>
            <div id="africaCountry" class="continent">
                <h2 class="countryHeader">아프리카</h2>
                <div id="countryListAfrica" class="countryList">
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                    <div class="country">
                        <p>샘플</p>
                        <img src="img/country/korea_img.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <jsp:include page="footer.jsp"></jsp:include>
</body>
</html>