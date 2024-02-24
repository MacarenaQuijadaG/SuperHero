// https://superheroapi.com/api.php/894449015759708/pone el usuario a buscar


function capturarInformacion() {
  return $('#heroNumber').val();
}

function buscarHeroe() {
  var numeroHeroe = capturarInformacion();

  if (!validarNumeroHeroe(numeroHeroe)) {
    mostrarError('Por favor, ingresa un número válido para el héroe.');
    return;
  }
  consultarAPI(numeroHeroe);
}
function validarNumeroHeroe(numero) {
  return !isNaN(numero);
}
function mostrarError(mensaje) {
  $('#errorAlert').text(mensaje).show();
}
function renderizarInformacion(heroes) {
  $('#heroInfo').empty();

  heroes.forEach(function (heroe) {
    var cardHtml = `
      <div class="card">
        <img src="${heroe.imagen}" class="card-img-top w-25" alt="${heroe.nombre}">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${heroe.nombre}</h5>
          <p class="card-text"> Descripcion:${heroe.descripcion}</p>
          <p class="card-text"> Inteligencia: ${heroe.durabili}</p>
        </div>
      </div>
    `;

    $('#heroInfo').append(cardHtml);
  });
}

function consultarAPI(numeroHeroe) {
  $.ajax({
    url: `https://superheroapi.com/api.php/894449015759708/${numeroHeroe}`,
    method: 'GET',
    success: function (data) {
      var heroes = procesarDatos(data);
      mostrarGrafico(heroes);
      renderizarInformacion(heroes);
    },
    error: function () {
      mostrarError('No se pudo obtener la información del héroe. Intenta nuevamente más tarde.');
    }
  });
}

function procesarDatos(data) {
  return [{
    nombre: data.name,
    descripcion: data.description,
    imagen: data.image.url
  }];
}

function mostrarGrafico(heroes) {
  
}