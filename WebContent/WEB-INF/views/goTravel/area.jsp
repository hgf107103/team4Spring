<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>

    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
    <meta name="areaNumber" id="areaNumber" content="${areaNumber}">
	<title>방구석여행기 - 지역</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/areaScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/areaStyle.css">
</head>
<body>
	
    <jsp:include page="../header.jsp"></jsp:include>
	<section id="mainSection" onclick="alwaysCloseBookmark()">
        <div id="areaImg">
            <h1 id="areaNameTitle"></h1>
            <img id="areaTitleImage" src="" alt="">
        </div>
        <c:if test="${userLogin ne null}">
        <div id="areaInfo">
            <input type="button" class="areaButton" value="북마크넣기">
            <input type="button" class="areaButton" value="장소신청">
        </div>
        </c:if>
        <c:if test="${userLogin eq null}">
        <div id="emptyMenu">
        </div>
        </c:if>
        <div id="placeSection">
            <div id="placeListOrder">
                <div id="categoryButtonMenu">
                    <label><input type="radio" name="categoryRadio" class="categorySelect" checked value="0"><span onclick="getAgainList()">전체</span></label>
                </div>
                <div id="categoryRadioMenu">
                    <label class="clickLabel"><input type="radio" class="categoryRadio" name="orderRadio" checked value="like"><span onclick="getAgainList()">추천순</span></label>
                    <label class="clickLabel"><input type="radio" class="categoryRadio" name="orderRadio" value="new"><span onclick="getAgainList()">최신순</span></label>
                    <label class="clickLabel"><input type="radio" class="categoryRadio" name="orderRadio" value="name"><span onclick="getAgainList()">이름순</span></label>
                </div>
            </div>
            <div id="placeList">
                <h2 id="placeEmpty">등록된 장소가 없습니다.</h2>
            </div>
        </div>
    </section>
    <jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>