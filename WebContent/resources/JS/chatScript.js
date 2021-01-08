let userName;

function connect(name, url){
    console.log('입장');
    userName = name;
    websocket = new WebSocket(`ws://${url}/chat-ws`);
    //웹 소켓에 이벤트가 발생했을 때 호출될 함수 등록
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onclose = onClose;
}

function onOpen(){
    websocket.send(userName + "님 입장하셨습니다.");
}
//웹 소켓에서 연결이 해제 되었을 때 호출될 함수

function onMessage(evt){
    data= evt.data;
    let text = data.split(' : ');
    if (text[1] == undefined) {
        $('#chatLog').append(`<div class="messageBox"><p class="id">시스템</p><p class="message">${text[0]}</p></div>`);
        return;
    }
    let check = '';
    if (text[0] == userName) {
        check = 'my';
    }
    $('#chatLog').append(`<div class="messageBox"><p class="${check}id">${text[0]}</p><p class="message">${text[1]}</p></div>`);
}

function onClose(){
    websocket.send(userName + "님이 퇴장하셨습니다.");
}


function send(){
    let message = $('#writeChat').val();
    websocket.send(userName + " : " + message);
    $('#writeChat').val('');
}