// https://superheroapi.com/api.php/894449015759708/pone el usuario a buscar

//funcion que captura el numero en el seach 
function capturarInformacion() {
  return $('#heroNumber').val();
}
//FUNCION QUE BUSCA HEROE Y LO GUARDA EN LA CONSTANTE NUMEROHEROE
function buscarHeroe() {
  const numeroHeroe = capturarInformacion();
// IF PARA LA VALIDACION
  if (!validarNumeroHeroe(numeroHeroe)) {
    mostrarError('Por favor, ingresa un número válido para el héroe.');
    return;
  }
  consultarAPI(numeroHeroe);
}
//FUNCOION QUE VALIDA SI ES UN NUMERO LO QUE EL USUARIO INGRESO
function validarNumeroHeroe(numero) {
  return !isNaN(numero);
}
//FUNCION EN CASO DE ERROR
function mostrarError(mensaje) {
  $('#errorAlert').text(mensaje).show();
}
//FUNCION SE RENDERIZA LA INFORMACION
function renderizarInformacion(heroes) {
  $('#heroInfo').empty();
//CARD CON LA INFORMACION DESPLEGADA
  heroes.forEach(function (heroe) {
    var cardHtml = `
    <div class="container mt-4">
            <h4>Super heroe encontrado</h4>
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row justify-content-center">
              <div class="col-md-4">
              <img src="${heroe.imagen}" class="card-img-top" alt="${heroe.nombre}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Nombre: ${heroe.nombre}</h5>
                  <p class="card-text"> Ocupacion: ${heroe.ocupacion}</p>
                  <p class="card-text"> 
                  Super Poderes: 
                    <ul>
                      <li>Durabilidad:${heroe.durabilidad}</li>
                      <li>Rapidez:${heroe.rapidez}</li>
                      <li>Poder:${heroe.poder}</li>
                      <li>Combate:${heroe.combate}</li>
                    </ul> 
                   </p>
                  <p class="card-text"> Primera Aparicion: ${heroe.primeraAparicion}</p>
                  <p class="card-text"> Altura:${heroe.altura}</p>
                  <p class="card-text"> Peso: ${heroe.peso}</p>
                  <p class="card-text"> Alianzas: ${heroe.aliansa}</p>
                </div>
              </div>
            </div>
          </div>
     </div>
    `;
    $('#heroInfo').append(cardHtml);
  });
}
//FUNCION DE CONSULTA HACIA EL AJAX REALIZADA CON DATA(RESPONSIVE LO VUELVE LENTO Y TARDA EN GESTIONAR LA CONSULTA)
function consultarAPI(numeroHeroe) {
  $.ajax({
    url: `https://superheroapi.com/api.php/894449015759708/${numeroHeroe}`,
    method: 'GET',
    success: function (data) { //RESPONSIVE ES REMPLAZADO POR DATA
      var heroes = procesarDatos(data);
      procesarGrafico(data)
      renderizarInformacion(heroes);
    }, //ERROR EN CASO DE QUE NO SE PUEDA CONECTAR CON LA API O QUE NO SE PUEDA PROCESARDATOS, MOSTRARGRAFICO, RENDERISAR INFORMACION
    error: function () {
      mostrarError('No se pudo obtener la información del héroe.');
    }
  });
}

// TOMA VALORES DE LA API Y LOS PASA A DATA (RESPONSIVE) Y DERIVA A LAS CARD QUE SERAN MOSTRADAS EN EL HTML
function procesarDatos(data) {
  return [{
    nombre: data.name,
    descripcion: data.descripcion,
    imagen: data.image.url,
    ocupacion: data.work.occupation,
    durabilidad:data.powerstats.durability,
    rapidez: data.powerstats.speed,
    aliansa:data.biography.aliases,
    poder: data.powerstats.power,
    combate: data.powerstats.combat,
    primeraAparicion: data.biography.firstappearance,
    altura: data.appearance.height,
    peso: data.appearance.weight,
    
  }];
}
//FUNCION DEL GRAFICO
function procesarGrafico(data) {
  // Ejemplo de datos para el gráfico de pastel (puedes adaptar según los datos de tu API)
  var datosGrafico = [
    { label: 'Fuerza', y: parseInt(data.powerstats.strength) || 0 },
    { label: 'Agilidad', y: parseInt(data.powerstats.speed) || 0 },
    { label: 'Inteligencia', y: parseInt(data.powerstats.intelligence) || 0 },
    { label: 'Rapidez', y: parseInt(data.powerstats.speed) || 0 }
  ];

  // Configura y muestra el gráfico de pastel
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Distribución de habilidades del héroe"
    },
    data: [{
      type: "pie",
      startAngle: 240,
      yValueFormatString: "##0.00'%'",
      indexLabel: "{label} {y}",
      dataPoints: datosGrafico
    }]
  });

  chart.render();
}