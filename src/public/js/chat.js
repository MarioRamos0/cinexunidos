const socket = io();
const send = document.getElementById("send-message");
const allMessages = document.getElementById("all-messages");

send.addEventListener("click", (evt) => {
    const message = document.getElementById("message");
    socket.emit("message", message.value);
    message.value = "";
});

socket.on("message", ({user, message}) => {

    if(user == "soporte"){
         const msg = document.createRange().createContextualFragment(`
        <div class="message">
            <div class="image-container">
                <img src='image/atencionAlCliente.jpg' class="imagen-perfil"> 
            </div>
            <div class="message-body">
                <div class="user-info">
                    <span class="username">${user}</span>
                    <br>
                    <span class="time">hace 1 segundo</span>
                </div>
            </div>
            <p>${message}</p>
        </div>
    `);
     allMessages.appendChild(msg);
    }else{
      const msg = document.createRange().createContextualFragment(`
        <div class="message">
            <div class="image-container">
                <img src='image/imagenUsuario.jpg' class="imagen-perfil"> 
            </div>
            <div class="message-body">
                <div class="user-info">
                    <span class="username">${user}</span>
                    <br>
                    <span class="time">hace 1 segundo</span>
                </div>
            </div>
            <p>${message}</p>
        </div>
    `);
     allMessages.appendChild(msg);
    }
});

const usuarioLista = document.getElementById("user");
const salirBtn = document.getElementById("disconnect-btn");
const entrarBtn = document.getElementById("connect-btn");
const myChat = document.getElementById("myChat");

const renderUsers = (user) => {
    usuarioLista.innerHTML = user;
};

const usuario = JSON.parse(localStorage.getItem("nameUser"));
renderUsers(usuario);


/*
const container = document.querySelector(".container");
    container.classList.add("hidden");
*/
entrarBtn.addEventListener("click", (evt) => {
    entrarBtn.classList.add("hidden");
    myChat.classList.remove("hidden");
    myChat.classList.add("chat-window");
});

salirBtn.addEventListener("click", (evt) => {
   // evt.preventDefault();
   // localStorage.removeItem("nameUser");
   // window.location.href = "/registro";
   myChat.classList.remove("chat-window");
    myChat.classList.add("hidden");
    entrarBtn.classList.remove("hidden");
});

