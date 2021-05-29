import Chat from './js/chat.js';
import Message from './js/message.js';

function main(){
    let nick; 
    while (!nick) {
        nick = prompt("Enter username");
    }
    const chat = new Chat(nick);
}

main();