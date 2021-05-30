import Chat from './js/chat.js';

function main(){
    let nick; 
    while (!nick) {
        nick = prompt("Enter username");
    }
    const chat = new Chat(nick);
}

main();