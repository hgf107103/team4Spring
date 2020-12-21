<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
    <title>방구석여행기 - 관리</title>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/hbjScript.js"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-RE27wVARCBrtj-pd3u0fTXBnv1JLAIA&callback=initMap&libraries=&v=weekly"
      defer
    ></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/hbjStyle.css">
</head>
<body>
	<c:if test="${userLogin eq null}">
		<script type="text/javascript">
			alert('관리자가 아닌 사람은 들어올 수 없습니다.');
			self.close();
		</script>
	</c:if>
	<c:if test="${userLogin ne null}">
		<c:if test="${userLogin.userAdminCheck}">
			<script type="text/javascript">
				location.href='#';
			</script>
			<div id="menu">
				<div class="menuButton" id="countryAdd" onclick="location.href='#countryAdd'; menuChacng('country', '대륙');">나라추가</div>
				<div class="menuButton" id="areaAdd" onclick="location.href='#areaAdd'; menuChacng('area', '나라');">지역추가</div>
				<div class="menuButton" id="reviewList" onclick="location.href='#reviewList'">리뷰목록</div>
			</div>
			<div id="screen">
				<h1>메뉴를 선택해주십시오</h1>
			</div>
        </c:if>
	</c:if>
</body>
</html>