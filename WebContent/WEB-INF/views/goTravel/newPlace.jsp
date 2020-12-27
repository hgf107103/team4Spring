<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko" oncontextmenu="return false" ondragstart="return false" onselectstart='return false'>
<head>
    <meta charset="UTF-8">
    <meta name="path" id="path" content="${pageContext.request.contextPath}">
    <title>방구석여행기 - 장소신청</title>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-RE27wVARCBrtj-pd3u0fTXBnv1JLAIA&callback=initMap&libraries=&v=weekly"
      defer
    ></script>
    <script src="${pageContext.request.contextPath}/JS/jquery-3.5.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/JS/newPlaceScript.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/defaultStyle.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/newPlaceStyle.css">
</head>
<body>
	<c:if test="${userLogin eq null}">
		<script type="text/javascript">
			alert('로그인이 필요한 서비스입니다.');
			location.href=`${pageContext.request.contextPath}/country/${countryNumber}/area/${areaNumber}`;
		</script>
	</c:if>
    <jsp:include page="../header.jsp"></jsp:include>
    <section id="mainSection">
        <form id="addPlaceForm" action="" method="post" enctype="multipart/form-data">
        	<input type="hidden" id="countryNumber" name="countryNumber" value="${countryNumber}">
        	<input type="hidden" id="areaNumber" name="areaNumber" value="${areaNumber}">
            <h1 id="addPlaceTitle">새 장소 추가하기</h1>
            
            <div id="placeName" class="placeSection">
                <p id="areaNameLog" class="placeLog">선택하신 지역은 아래와 같습니다.<br>(이 페이지에서 변경불가합니다.)</p>
                <input type="text" id="areaNameText" class="placeReadOnlyText" value="" readonly>
            </div>
            
            <div id="placeCategory" class="placeSection">
                <p id="placeCategoryLog" class="placeLog">카테고리를 선택해주십시오</p>
            	<select id="placeCategorySelect" name="category">
            		<option value="0">카테고리 선택</option>
            	</select>
            </div>
            
            <div id="placeName" class="placeSection">
                <input type="text" id="placeKoreanText" name="koreanName" autocomplete="off" class="placeText" placeholder="한글이름 입력">
                <br>
                <input type="text" id="placeEnglishText" name="englishName" autocomplete="off" class="placeText" placeholder="영문이름 입력">
                <br>
                <input type="button" id="placeNameCheck" class="placeButton" onclick="nameCheck()" value="중복확인">
                <p id="placeNameLog" class="placeLog">장소이름을 입력해주십시오</p>
            </div>
            
            <div id="placeImg" class="placeSection">
                <img id="placeImage" src="" alt="">
                <label><span class="placeButton">사진업로드</span><input type="file" id="placeImageSelect" name="imageFile" onchange="imageChange(event)" value="" accept="image/jpg"></label>
                <span class="placeButton" onclick="imageReset()">사진초기화</span>
                <p id="placeImageLog" class="placeLog">사진을 업로드해주십시오</p>
            </div>
            
            <div id="placeAddress" class="placeSection">
                <div id="maps"></div>
                <label><span class="latlngLabel">위도</span><input type="text" id="placeLatText" name="placeLat" class="placeReadOnlyText" placeholder="lat" value="0" readonly></label>
                <br>
                <label><span class="latlngLabel">경도</span><input type="text" id="placeLngText" name="placeLng" class="placeReadOnlyText" placeholder="lng" value="0" readonly></label>
                <p id="placeAddressLog" class="placeLog">지역을 선택해주십시오</p>
            </div>
            
            <div id="placeSubmit" class="placeSection">
                <input type="button" class="placeButton" onclick="submitSend()" value="신청하기">
            </div>
            
        </form>
    </section>
    <jsp:include page="../footer.jsp"></jsp:include>
</body>
</html>