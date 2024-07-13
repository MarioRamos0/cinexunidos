
const contenedorOpcionesCine = document.getElementById("tabla-container");

let ruta = "https://cinexunidos-production.up.railway.app/theatres/";

function mostrarInformacionEnFilaDeCineEnTabla(datos) {
  datos.forEach((dato) => {
    if (contenedorOpcionesCine) {
      // lógica de tu función
      const nuevoDato = document.createElement("tr");
      nuevoDato.classList = "fila-tabla";
      nuevoDato.innerHTML = `
        <td data-titulo="id">${dato.id}</td>
        <td data-titulo="name">${dato.name}</td>
        <td data-titulo="location">${dato.location}</td>
        <td>
          <button>Cine donde ir</button>
        </td>
      `;

      console.log(nuevoDato.innerHTML);

      contenedorOpcionesCine.appendChild(nuevoDato);
      nuevoDato
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => mostrarAuditorios(dato.auditoriums, dato.id));
    } else {
      console.log("El elemento con ID 'proveedores-container' no se encontró.");
    }
  });
}

// Obtiene los datos de las funciones desde la API
async function obtenerInfoCompletaCine() {
  try {
    const response = await fetch(
      "https://cinexunidos-production.up.railway.app/theatres/"
    );
    const data = await response.json();
    mostrarInformacionEnFilaDeCineEnTabla(data);
  } catch (error) {
    console.error("Error al obtener las funciones:", error);
  }
}

obtenerInfoCompletaCine();

// Función para mostrar los auditorios en la tabla
function mostrarAuditorios(auditoriums, cineId) {
  ruta = `https://cinexunidos-production.up.railway.app/theatres/${cineId}/`; // Reinicia la ruta con el ID del cine
  const tablaAuditorios = document.getElementById("tabla-auditorios-container");
  tablaAuditorios.innerHTML = ""; // Limpia la tabla antes de agregar nuevos datos

  auditoriums.forEach((auditorio) => {
    const nuevaFilaAuditorio = document.createElement("tr");
    nuevaFilaAuditorio.innerHTML = `
      <td>${auditorio.name}</td>
      <td>${auditorio.capacity}</td>
      <td>${auditorio.showtimes
        .map((showtime) => showtime.startTime)
        .join(", ")}</td>
      <td>
        <button>Escoje sala</button>
      </td>
    `;
    tablaAuditorios.appendChild(nuevaFilaAuditorio);
    nuevaFilaAuditorio
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => mostrarSalas(auditorio.showtimes, cineId, auditorio.id));
  });
}

// Función para mostrar las salas en la tabla
function mostrarSalas(salas, cineId, auditorioId) {
  ruta += `auditoriums/${auditorioId}/`; // Agrega el ID del auditorio a la ruta
  const tablaSalas = document.getElementById("tabla-salas-container");
  tablaSalas.innerHTML = ""; // Limpia la tabla antes de agregar nuevos datos

  salas.forEach((sala) => {
    const nuevaFilaSala = document.createElement("tr");
    nuevaFilaSala.classList = "tabla-fila-imagen";
    nuevaFilaSala.innerHTML = `
      <td><img src="https://cinexunidos-production.up.railway.app/${sala.movie.poster}" alt=""></td>
      <td>${sala.startTime}</td>
      <td>${sala.movie.name}</td>
      <td>${sala.movie.rating}</td>
      <td>
        <button>Escoje opción</button>
      </td>
    `;
    tablaSalas.appendChild(nuevaFilaSala);
    nuevaFilaSala
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => mostrarAsientos(sala, cineId, auditorioId));
  });
}


function mostrarAsientos(dato, cineId, auditorioId) {
  console.log("asientos de la funcion:");
  console.log(dato.seats);
  ruta = `https://cinexunidos-production.up.railway.app/theatres/${cineId}/`; // Reinicia la ruta con el ID del cine
  ruta += `auditoriums/${auditorioId}/`; // Agrega el ID del auditorio a la ruta
  ruta += `showtimes/${dato.id}`; // Agrega el ID de la función a la ruta
  console.log("Sala seleccionada");
  console.log("Ruta completa:", ruta);

  const container = document.querySelector(".container");
  container.innerHTML = ""; // Limpia el contenedor antes de cargar los nuevos asientos

  // Agrega la pantalla primero
  const screenDiv = document.createElement("div");
  screenDiv.classList.add("screen");
  container.appendChild(screenDiv);

  const seatsData = dato.seats;
  const asientosSeleccionados = [];

  // Mapea los valores en el arreglo a los colores correspondientes
  const colorMap = {
    "-1": "red", // No se puede vender (rojo)
    "0": "gray", // Disponible (gris)
    "1": "white", // Ocupado (blanco)
    "2": "blue", // Reservado o seleccionado (azul)
  };

  // Genera los asientos en función de los datos
  for (const row in seatsData) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let i = 0; i < seatsData[row].length; i++) {
      const seatDiv = document.createElement("div");
      seatDiv.classList.add("seat");

      const seatValue = seatsData[row][i];
      seatDiv.style.backgroundColor = colorMap[seatValue] || "transparent";

      if (seatValue === 0) {
        const seatId = `${row}${i}`;
        seatDiv.id = seatId;

        seatDiv.addEventListener("click", () => {
          if (!asientosSeleccionados.includes(seatId)) {
            asientosSeleccionados.push(seatId);
            seatDiv.style.backgroundColor = "green";
            console.log("Asiento seleccionado:", seatId);
            verficacionReservacionAsiento(ruta);
            reservarAsiento(ruta,seatId);
          } else {
            asientosSeleccionados.splice(
              asientosSeleccionados.indexOf(seatId),
              1
            );
            seatDiv.style.backgroundColor =
              colorMap[seatValue] || "transparent";
            console.log("Asiento deseleccionado:", seatId);
             eliminarReservacionAsiento(ruta, seatId);
          }
        });
      }
      if (seatsData[row][i] === 1) {
        seatDiv.classList.add("occupied");
       
      }

      // Asignamos el ID al asiento (por ejemplo, "H5")
      seatDiv.id = `Seat:${row}${i + 1}`;

      rowDiv.appendChild(seatDiv);
    }

    container.appendChild(rowDiv);

    
  }

  const selectedMovieElement = document.getElementById("selected-movie");
  selectedMovieElement.textContent = "Película seleccionada: " + dato.movie.name; 
  
     console.log("Asientos seleccionados:", asientosSeleccionados);

}


function reservarAsiento(ruta, seatId) {
  ruta += `/reserve`;
  console.log("Ruta de reserva:", ruta);
  fetch(ruta, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      seat: seatId, 
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function eliminarReservacionAsiento(ruta, seatId) {
  ruta += `/reserve`;
  console.log("Ruta se quito reservacion:", ruta);
  fetch(ruta, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      seat: seatId, 
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function verficacionReservacionAsiento(ruta) {
  ruta += `/reservation-updates`;
  console.log("Ruta de revisar reservacion:", ruta);
  fetch(ruta, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}