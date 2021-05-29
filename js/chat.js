class chat {
    constructor() {
        this.initHTML();
    }
    // Create HTML chat elements
    initHTML() {
        const appEl = document.getElementById("app");
        const messagesEl = document.createElement("div");
        messagesEl.id = "messages";
        const messageEditorEl = document.createElement("div");
        messageEditorEl.id = "message-editor";
        const messageInputEl = document.createElement("input");
        messageInputEl.placeholder = "Type a message...";
        const sendButtonEl = document.createElement("div");
        sendButtonEl.id = "send-button";
        sendButtonEl.onclick = this.sendMessage;
        messageEditorEl.appendChild(messageInputEl);
        messageEditorEl.appendChild(sendButtonEl);
        appEl.appendChild(messagesEl);
        appEl.appendChild(messageEditorEl);
    }
    // Send message to server with ajax
    sendMessage() {
        const message = document.querySelector("input").value;
        const data = {
            message: message,
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