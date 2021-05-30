class chat {
    constructor(nick) {
        this.nick = nick;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        this.initHTML();
        this.initMessagesListening();
    }
    // Create HTML chat elements
    initHTML() {
        const appEl = document.getElementById("app");
        const messagesEl = document.createElement("div");
        messagesEl.id = "messages";
        const messageEditorEl = document.createElement("div");
        messageEditorEl.id = "message-editor";
        this.messageInputEl = document.createElement("input");
        this.messageInputEl.placeholder = "Type a message...";
        const sendButtonEl = document.createElement("div");
        sendButtonEl.id = "send-button";
        sendButtonEl.onclick = this.sendMessage.bind(this);
        messageEditorEl.appendChild(this.messageInputEl);
        messageEditorEl.appendChild(sendButtonEl);
        appEl.appendChild(messagesEl);
        appEl.appendChild(messageEditorEl);
    }
    // If new message appears on the server this ajax will download it and display
    initMessagesListening() {
        $.ajax({
            type: "GET",
            url: `http://localhost/alp-chat/php/send.php?time=${new Date().getTime()}`,
            dataType: "application/json",
        })
        .done(function() {
        })
        .always(function() {
        });
    }
    // Send message to server with ajax
    async sendMessage() {
        const message = this.messageInputEl.value;
        this.messageInputEl.value = "";
        switch (message){
            case "/nick":
                let nick; 
                while (!nick) {
                    nick = prompt("Enter username");
                }
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
                    await $.ajax({
                        type: "POST",
                        url: "http://localhost/alp-chat/php/receive.php",
                        data: data,
                        dataType: "application/json",
                    });   
                }
        }
            
    }
}
export default chat;