var socket = io({
    'sync disconnect on unload': true 
});
var NAME = "";

/* CLIENT EVENT TRIGGERS */
// Remove notification on click.
$('body').on('click', ()=> {
    newMSGNotif(false);
})
$('.submit-name-button').on('click', (e)=>{
    e.preventDefault();
    var nameInput = $('#name-input');
    var name = nameInput.val();

    // Can't add empty name.
    if (name != '') {
        socket.emit('new user', name);
    }
});
$('form.message-form').submit((e)=>{
    e.preventDefault();

    // Message object that holds the senders name and message.
    var message = {
        "text": $("#m").val(),
        "name": NAME
    }
    socket.emit('chat message', message); // Send message object through the socket.
    $('#m').val(''); // Reset input text.

    // Create DOM element and append self message. 
    var new_message = $(`<div class="message-container"><div class="self-message">[${message["name"]}]: ${message["text"]}</div></div>`);
    $('.message-box').append(new_message);
});

/* SOCKET ACTIVITIES */
// Do something when client receives a message. 
socket.on('chat message', (msg)=>{
    // Whenever we receive a message from someone.
    newMSGNotif(true); // Activate tab notification.

    // Create new DOM element and append.
    var new_message = $(`<div class="message-container"><div class="message">[${msg["name"]}]: ${msg["text"]}</div></div>`);
    $('.message-box').append(new_message);
})
socket.on('existing user', (msg)=>{
    // As the sender, we get a message that our username already exists.
    $('.error-msg').toggle(true);
    $('.error-msg').text(msg);
})
socket.on('user added', (name)=> {
    // As the sender, we get the message that we were succesfully added to the chat.
    $('.error-msg').toggle(false);
    $('.name-input-container').toggle(false);
    $('form.message-form').toggle(true);
    NAME = name;
});
socket.on('disconnect', ()=> {
    io.emit('user disconnected', NAME);
})


/* SOME FUNCTIONS */
// Notify user on tab when new message is received. 
function newMSGNotif(received) {
    if (received) $("title").text("New Message!");
    else $("title").text("Chat!");
}