var socket = io();

// Remove notification on click.
$('body').on('click', ()=> {
    newMSGNotif(false);
})
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
    newMSGNotif(true);

    // Create new DOM element.
    var new_message = $(`<div class="message-container"><div class="message">[Name]: ${msg}</div></div>`);
    $('.message-box').append(new_message);
})

// Notify user on tab when new message is received. 
function newMSGNotif(received) {
    if (received) $("title").text("New Message!");
    else $("title").text("Chat!");
}