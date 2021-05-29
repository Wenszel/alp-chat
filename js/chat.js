class chat {
    constructor(nick) {
        this.nick = nick;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        this.initHTML();
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
    // Send message to server with ajax
    sendMessage() {
        const message = this.messageInputEl.value;
        this.messageInputEl.value = "";
        const data = {
            message: message,
            nick: this.nick,
            color: this.color
        };
        $.ajax({
            type: "POST",
            url: "http://localhost/alp-chat/server.php",
            data: data,
            success: function() {

            },
            dataType: "application/json",
        });
    }
}
export default chat;