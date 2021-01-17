var socket = io("http://localhost:3000");
var user = {};
socket.on('login', (socketId) => {
    $('.login').show();
    $('#login').click(() => {
        user = {
            id: socketId,
            name: $("#name").attr('value')
        }
        socket.emit('registerUser', user);
    })
});

socket.on('updateMessage', (messages) => {
    let p = document.createElement('p');
    let message = messages[messages.length-1]
    p.innerHTML = `${message.user.name}: ${message.message}`;
    $(".box").appendChild(p);
});

socket.on('newUser', (newUser) => {
    if(newUser.id != user.id){
        let p = document.createElement('p');
        p.innerHTML = `${newUser.name} joined the chat.`;
        $(".box").appendChild(p);
    }
})

socket.on('auth', () => {
    $('.login').hide();
    $('.chat').show();
    $("#send").click(() => {
        let message = $("#message").attr('value');
        socket.emit('newMessage', {
            user,
            message
        })
        $("#message").value = "";
    })
})


