
const spinner = document.getElementById("spinner");
const sprinerLoader = document.getElementById("sprinerLoader");

const imagen = document.getElementById("imagen");


function ocultarSpinner() {
    spinner.classList.add("d-none");
    sprinerLoader.classList.remove("contentSpinnerLoading");
}
function mostrarSpinner() {
  spinner.classList.remove("d-none");
  sprinerLoader.classList.add("contentSpinnerLoading");
}
ocultarSpinner();
formulario.addEventListener('submit', function(event) {
    mostrarSpinner();
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        const ciudad = document.getElementById('ciudad').value.toLowerCase();
       
        const pais = document.getElementById('pais').value;
        const apiKey = "820cddd47e33de3748340cd01ed36e70";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        obtenerClima(ciudad, pais, apiKey);
      
      });

      async function obtenerClima(ciudad, pais, apiKey) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        try {
          let response = await fetch(url);
          let data = await response.json();
          mostrarResultado(data);
        } catch (error) {
          ocultarSpinner();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo obtener el clima para la ubicación seleccionada.",
          });
        }
      }

    function mostrarResultado(data) {
        setTimeout(ocultarSpinner, 2000);

      let temperatura = data.main.temp;
      temperatura = parseInt(temperatura);
      temperatura = (temperatura - 273.15).toFixed(2);
      const descripcion = data.weather[0].main;
      const traduccion = descripcionTraducciones[descripcion] || descripcion;
      const icono = cargarImagen(traduccion);

      Swal.fire({
        icon: "success",
        title: "Clima Actual",
        html: `<img src="${icono}" alt="${traduccion}" id="imagen"> <br> Temperatura: ${temperatura} C°<br>Descripción: ${traduccion}`,
      });
    }


    const descripcionTraducciones = {
      Clear: "Despejado",
      Clouds: "Nublado",
      Rain: "Lluvia",
      Thunderstorm: "Tormenta",
      Drizzle: "Llovizna",
      Snow: "Nieve",
      Mist: "Neblina",
      Smoke: "Humo",
      Haze: "Neblina",
      Dust: "Polvo",
      Fog: "Niebla",
      Sand: "Arena",
      Ash: "Ceniza",
      Squall: "Chubasco",
      Tornado: "Tornado",
    };
    
    function cargarImagen(descripcion) {
        if(descripcion.toLowerCase() === "despejado") {
            return "./assets/img/despejado.jpg";
        }
        if(descripcion.toLowerCase() === "nublado") {
            return "./assets/img/nublado.png";
        }
        if(descripcion.toLowerCase() === "lluvia") {
            return "./assets/img/lluvia.png";
        }
        if(descripcion.toLowerCase() === "tormenta") {
            return "./assets/img/tormenta.png";
        }
        if(descripcion.toLowerCase() === "llovizna") {
            return "./assets/img/nublado.png";
        }
        if(descripcion.toLowerCase() === "nieve") {
            return "./assets/img/nueve.jpg";
          }
        if(descripcion.toLowerCase() === "neblina") {
            return "./assets/img/nublado.jpg";
        }
        if(descripcion.toLowerCase() === "humo") {
            return "./assets/img/humo.jfif";
        }
        if(descripcion.toLowerCase() === "polvo") {
            return "./assets/img/arena.jpg";
        }
        if(descripcion.toLowerCase() === "niebla") {
            return "./assets/img/nublado.jpg";
        }
        if(descripcion.toLowerCase() === "arena") {
            return "./assets/img/arena.jpg";
        }
        if(descripcion.toLowerCase() === "ceniza") {
            return "./assets/img/ceniza.jpg";
        }
        if(descripcion.toLowerCase() === "chubasco") {
            return "./assets/img/chubasco.jpg";
        }
        if(descripcion.toLowerCase() === "tornado") {
            return "./assets/img/tornado.jpg.png";
        }
    }

   
    