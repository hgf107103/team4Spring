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
				<form id="countryForm" name="countryForm" class="formClass" method="post" action="hbj/add/country" enctype="multipart/form-data">
				
				<label><span id="listSpan">대륙선택 : </span>
				<select id="countrylist" name="number">
				<option value="0">대륙선택</option>
				</select>
				</label>
				
				<div class="formdiv">
				<label><span id="listSpan">한국어이름 : </span>
				<input type="text" autocomplete="off" id="countryKoreanName" name="koreanName" class="text" placeholder="한국어이름">
				</label>
				
				<br>
				<label><span id="listSpan">　영어이름 : </span>
				<input type="text" autocomplete="off" id="countryEnglishName" name="englishName" class="text" placeholder="영어이름">
				</label>
				</div>
				
				<div class="formdiv">
				<img class="imageBox" id="countryImage"></img>
				<label><span class="button">사진업로드</span>
				<input type="file" id="countryImageSelect" name="uploadImage" onchange="imageChange(event, this, 'countryImage')" value="" accept="image/jpg, image/png, image/jpeg">
				</label>
				<span class="button" onclick="imageReset('countryImageSelect', 'countryImage')">사진초기화</span>
				</div>
				<div class="formdiv">
    			<div id="countryMap" class="map"></div>
    			<label><span class="latlngLabel">위도</span><input type="text" id="countryLatText" name="lat" class="readOnlyText" placeholder="lat" value="0" readonly></label>
    			<br>
    			<label><span class="latlngLabel">경도</span><input type="text" id="countryLngText" name="lng" class="readOnlyText" placeholder="lng" value="0" readonly></label>
    			</div>
    			<div class="formdiv">
    			<input class="button" type="button" onclick="formSubmit('country')" value="추가하기">
    			</div>
				</form>
				
				
				
				<form id="areaForm" name="areaForm" class="formClass" method="post" action="hbj/add/area" enctype="multipart/form-data">
				
				<label><span id="listSpan">나라선택 : </span>
				<select id="arealist" name="number">
				<option value="0">나라선택</option>
				</select>
				</label>
				
				<div class="formdiv">
				<label><span id="listSpan">한국어이름 : </span>
				<input type="text" autocomplete="off" id="areaKoreanName" name="koreanName" class="text" placeholder="한국어이름">
				</label>
				
				<br>
				<label><span id="listSpan">　영어이름 : </span>
				<input type="text" autocomplete="off" id="areaEnglishName" name="englishName" class="text" placeholder="영어이름">
				</label>
				</div>
				
				<div class="formdiv">
				<img class="imageBox" id="areaImage"></img>
				<label><span class="button">사진업로드</span>
				<input type="file" id="areaImageSelect" name="uploadImage" onchange="imageChange(event, this, 'areaImage')" value="" accept="image/jpg, image/png, image/jpeg">
				</label>
				<span class="button" onclick="imageReset('areaImageSelect', 'areaImage')">사진초기화</span>
				</div>
				<div class="formdiv">
    			<div id="areaMap" class="map"></div>
    			<label><span class="latlngLabel">위도</span><input type="text" id="areaLatText" name="lat" class="readOnlyText" placeholder="lat" value="0" readonly></label>
    			<br>
    			<label><span class="latlngLabel">경도</span><input type="text" id="areaLngText" name="lng" class="readOnlyText" placeholder="lng" value="0" readonly></label>
    			</div>
    			<div class="formdiv">
    			<input class="button" type="button" onclick="formSubmit('area')" value="추가하기">
    			</div>
				</form>
			</div>
        </c:if>
	</c:if>
</body>
</html>