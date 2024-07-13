const express = require("express");
const { createServer } = require("http");
const servidorTiempoReal = require("./servidorTiempoReal");
const path = require("path");




const app = express();
const httpServer = createServer(app);

//configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
//rutas
app.use(require("./routes"));
//archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//iniciar el servidor
httpServer.listen(app.get("port"), () => {
  console.log("Escuchando en puerto:", app.get("port"));
});

// Inicializar el servidor de tiempo real
servidorTiempoReal(httpServer); 