import Message from './message.js';
class Chat {
    constructor(nick) {
        this.nick = nick;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        this.initHTML();
        this.initMessagesListening(this);
    }
    // Create HTML chat elements
    initHTML() {
        const appEl = document.getElementById("app");
        // Container
        this.messagesEl = document.createElement("div");
        this.messagesEl.id = "messages";
        // Editor
        const messageEditorEl = document.createElement("div");
        messageEditorEl.id = "message-editor";
        // Input
        this.messageInputEl = document.createElement("input");
        this.messageInputEl.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              document.getElementById("send-button").click();
            }
        });
        this.messageInputEl.placeholder = "Type a message...";
        // Button
        const sendButtonEl = document.createElement("div");
        sendButtonEl.id = "send-button";
        sendButtonEl.onclick = this.sendMessage.bind(this);
        // Appending
        messageEditorEl.appendChild(this.messageInputEl);
        messageEditorEl.appendChild(sendButtonEl);
        appEl.appendChild(this.messagesEl);
        appEl.appendChild(messageEditorEl);
    }
    // If new message appears on the server this ajax will download it and display
    async initMessagesListening(chatObject) {
        const response = await $.ajax({
            type: "GET",
            url: `http://localhost/alp-chat/php/send.php?time=${Math.floor(new Date().getTime()/1000)}`,
            dataType: "json",
        })
        .always(function() {
            chatObject.initMessagesListening(chatObject);
        });
        // If response is not null 
        if (response) {
            // For each object in response create message
            response.forEach(message => new Message(message));
            // Scroll to the bottom of the chat
            this.messagesEl.scrollTo(0, this.messagesEl.scrollHeight);
        }  
    }
    // Send message to server with ajax
    sendMessage() {
        const message = this.messageInputEl.value;
        this.messageInputEl.value = "";
        switch (message){
            case "/nick":
                let nick; 
                while (!nick) {
                    nick = prompt("Enter username");
                }
                this.nick = nick;
                break;
            case "/color":
                this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
                break;
            case "/quit":
                location.reload();
                break;
            default:
                if(message) {
                    const data = {
                        time: new Date().getTime(),
                        message: message,
                        nick: this.nick,
                        color: this.color
                    };
                    $.ajax({
                        type: "POST",
                        url: "http://localhost/alp-chat/php/receive.php",
                        data: data,
                        dataType: "json",
                    });   
                }
        }
            
    }
}
export default Chat;