//practica de socket antes de hacer el chat

const socket = io();

socket.on("hello", message => {
  console.log(message);
});

function verificarEstadoDelSocket() {
  console.log("Estado del socket:", socket.connected);
}

socket.on("disconnect", () => {
  console.log("Desconectado del servidor", socket.id);
  verificarEstadoDelSocket();
});

socket.on("connect_error", (error) => {
  console.log("Error de conexión");
  verificarEstadoDelSocket();
});

socket.on("connect", () => {
  console.log("Conectado al servidor", socket.id);
  verificarEstadoDelSocket();
});

// Manejo de desconexión al recargar la página
window.addEventListener("beforeunload", () => {
  socket.disconnect(); // Desconecta el socket antes de recargar la página
});

socket.on("reconnect_attempt", () => {
  console.log("Reconectando... al servidor", socket.id);
  verificarEstadoDelSocket();
});

socket.on("reconnect", () => {
  console.log("Reconectado al servidor, siuuuuu", socket.id);
  verificarEstadoDelSocket();
});


