const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let welcome = document.querySelector('.welcome')

do{
    name = prompt('Please Enter you name!')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

appendUserName(name)

function sendMessage(message){
    let msg ={
        user: name,
        message: message.trim()
    }

    //message append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom();

    // send to server

    socket.emit('message', msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}
function appendUserName(name){
    let mainDiv = document.createElement('h1')
    // let className = type
    // mainDiv.classList.add(className, 'message')

    let markup = `
       Logged in as ${name}
    `

    mainDiv.innerHTML = markup

    welcome.appendChild(mainDiv)
}

// recieve message 

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}