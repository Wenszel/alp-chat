export default class Message{
    constructor({nick, time, color, message}) {
        const container = document.getElementById("messages");
        const messageEl = document.createElement("div");
        messageEl.className = "message";
        // Nick
        const nickEl = document.createElement("p");
        nickEl.innerHTML = `<@${nick}>: `;
        nickEl.style.color = color;
        // Time
        const timeEl = document.createElement("p");
        const formatDate =  new Date(parseInt(time));
        // Getting time units from a date
        // If the unit is less than 10 add a zero to the front
        const seconds = formatDate.getSeconds() < 10 ? "0" + formatDate.getSeconds() : formatDate.getSeconds();
        const minutes = formatDate.getMinutes() < 10 ? "0" + formatDate.getMinutes() : formatDate.getMinutes();
        const hours = formatDate.getHours() < 10 ? "0" + formatDate.getHours() : formatDate.getHours();
        timeEl.innerHTML = `[${hours}:${minutes}.${seconds}]`;
        // Text
        const textEl = document.createElement("p");
        textEl.innerHTML = message;
        textEl.className = "text";
        // Appending to containers
        messageEl.appendChild(timeEl);
        messageEl.appendChild(nickEl);
        messageEl.appendChild(textEl);
        container.appendChild(messageEl);
        // Using CSS Emoticons Library converts symbols to emoji
        $('.text').emoticonize();
    }
}