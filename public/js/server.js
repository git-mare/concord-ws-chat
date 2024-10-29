var socket = io("http://192.168.1.12:3000")
socket.on("disconnect", () => {})

$(document).ready(function () {
    $("#burger-icon").click(function () {
        $("#menu-nav").toggleClass("active")
        $("#burger-icon").toggle()
        $("#close-icon").toggle()
    })
    
    $("#close-icon").click(function () {
        $("#menu-nav").removeClass("active")
        $("#burger-icon").toggle()
        $("#close-icon").toggle()
    })
})

function checkEnter(event) {
    if (event.key === 'Enter') {
        send()
    }
}

function send() {
    var msgField = document.getElementById("msg")
    var userField = document.getElementById("username")
    var msg = msgField.value
    var username = userField.value
    
    if(msg == '' || username == '') {
        return
    } else {
        socket.emit("msg", {msg, username})
        msgField.value = ''
    }
}

socket.on("showmsg", (data) => {
    var chat = document.getElementById("chat-message")
    var message = document.createElement("div")

    message.className = "message"
    message.innerHTML = `<div class="avatar">${data.username.charAt(0)}</div><div class="message-content">
    <span class="username">${data.username}</span>
    <span class="text">${data.msg}</span></div>`

    chat.append(message)
})