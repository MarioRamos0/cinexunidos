const contenedor = document.querySelector(".container");
const asientos = document.querySelectorAll(".row .seat:not(.occupied)");
const contador = document.getElementById("count");
const total = document.getElementById("total");
const seleccionPelicula = document.getElementById("movie");

cargarUI();
let precioBoleto = +seleccionPelicula.value;

// Guardar índice y precio de la película seleccionada
function guardarDatosPelicula(indicePelicula, precioPelicula) {
  localStorage.setItem("indicePeliculaSeleccionada", indicePelicula);
  localStorage.setItem("precioPeliculaSeleccionada", precioPelicula);
}

// Actualizar total y contador
function actualizarContadorSeleccionados() {
  const asientosSeleccionados = document.querySelectorAll(
    ".row .seat.selected"
  );

  const indicesAsientos = [...asientosSeleccionados].map((asiento) =>
    [...asientos].indexOf(asiento)
  );

  localStorage.setItem(
    "asientosSeleccionados",
    JSON.stringify(indicesAsientos)
  );

  const cantidadAsientosSeleccionados = asientosSeleccionados.length;

  contador.innerText = cantidadAsientosSeleccionados;
  total.innerText = cantidadAsientosSeleccionados * precioBoleto;
}

// Obtener datos del almacenamiento local y cargar la interfaz
function cargarUI() {
  const asientosGuardados = JSON.parse(
    localStorage.getItem("asientosSeleccionados")
  );
  if (asientosGuardados !== null && asientosGuardados.length > 0) {
    asientos.forEach((asiento, indice) => {
      if (asientosGuardados.indexOf(indice) > -1) {
        asiento.classList.add("selected");
      }
    });
  }

  const indicePeliculaSeleccionada = localStorage.getItem(
    "indicePeliculaSeleccionada"
  );

  if (indicePeliculaSeleccionada !== null) {
    seleccionPelicula.selectedIndex = indicePeliculaSeleccionada;
  }
}

// Evento de selección de película
seleccionPelicula.addEventListener("change", (e) => {
  precioBoleto = +e.target.value;
  guardarDatosPelicula(e.target.selectedIndex, e.target.value);
  actualizarContadorSeleccionados();
});

// Evento de clic en el asiento
contenedor.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    actualizarContadorSeleccionados();
  }
});

// Inicializar contador y total
actualizarContadorSeleccionados();
  