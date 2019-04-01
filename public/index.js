var socket = io();

$('form.message-form').submit((e)=>{
    e.preventDefault();

    // Talk to server.
    // 'chat message' could be called anything.
    var msg = $('#m').val();
    socket.emit('chat message', msg); 
    $('#m').val(''); // Reset input text.

    // Create DOM element. 
    // Displays message sent.
    var new_message = $(`<div class="message-container"><div class="self-message">[Name]: ${msg}</div></div>`);
    $('.message-box').append(new_message);

    return false;
});

// Do something when client receives a message. 
socket.on('chat message', (msg)=>{
    // Create new DOM element.
    var new_message = $(`<div class="message-container"><div class="message">[Name]: ${msg}</div></div>`);
    $('.message-box').append(new_message);
})