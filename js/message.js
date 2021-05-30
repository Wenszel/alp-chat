export default class Message{
    constructor({nick, time, color, message}) {
        const container = document.getElementById("messages");
        const messageEl = document.createElement("div");
        messageEl.className = "message";
        const nickEl = document.createElement("p");
        nickEl.innerHTML = `< ${nick} > `;
        nickEl.style.color = color;
        const timeEl = document.createElement("p");
        const formatDate =  new Date(time * 1000);
        timeEl.innerHTML = `[${formatDate.getHours()}:${formatDate.getMinutes()}]: `;
        const textEl = document.createElement("p");
        textEl.innerHTML = message;
        messageEl.appendChild(nickEl);
        messageEl.appendChild(timeEl);
        messageEl.appendChild(textEl);
        container.appendChild(messageEl);
        $('.message > p').emoticonize();
    }
}