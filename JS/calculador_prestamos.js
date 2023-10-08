class Prestamo {
  constructor(rut, monto, cuota, valorCuota, costoTotal) {
      this.rut = rut;
      this.monto = monto;
      this.cuota = cuota;
      this.valorCuota = valorCuota;
      this.costoTotal = costoTotal;
  }
}
function guardarPrestamo() {
  let rut = document.getElementById("rut").value;
  let monto = parseFloat(document.getElementById("montoConsumo").value);
  let cuotas = parseInt(document.getElementById("cuotasConsumo").value);

  if (rut === "" || isNaN(monto) || isNaN(cuotas)) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos con valores válidos.',
      icon: 'error',
    });
    return;
  }

  let prestamo = new Prestamo(rut, monto, cuotas, valorCuota, costoTotal);
  let prestamosGuardados = obtenerPrestamosGuardados();
  prestamosGuardados.push(prestamo);
  localStorage.setItem("prestamos", JSON.stringify(prestamosGuardados));

  mostrarDatosPrestamo(prestamo);

  Swal.fire({
    title: 'Éxito',
    text: 'El préstamo ha sido guardado exitosamente.',
    icon: 'success',
  }).then(() => {
    mostrarDatosPrestamo(prestamo);
  });
}

function obtenerPrestamosGuardados() {
  let prestamosJSON = localStorage.getItem("prestamos");
  return prestamosJSON ? JSON.parse(prestamosJSON) : [];
}

function calcularInteres(cuotas) {
  let interes = 0;

  if (cuotas >= 2 && cuotas <= 6) {
      interes = 0.02;
  } else if (cuotas >= 7 && cuotas <= 12) {
      interes = 0.04;
  } else if (cuotas > 12) {
      interes = 0.05;
  }

  return interes;
}

function mostrarDatosPrestamo(prestamo) {
  let prestamosContainer = document.getElementById("prestamosContainer");
  let datosPrestamo = document.createElement("div");
  datosPrestamo.innerHTML = `
      <p>Monto solicitado: $${prestamo.monto}</p>
      <p>Cuotas: ${prestamo.cuota}</p>
      <p>Valor por cuota: $${prestamo.valorCuota}</p>
      <p>Costo total del crédito: $${prestamo.costoTotal}</p>
  `;

  prestamosContainer.appendChild(datosPrestamo);
}

  function mostrarPrestamos() {
  let rut = document.getElementById("rut").value;
  let prestamosGuardados = obtenerPrestamosGuardados();

  let prestamosFiltrados = prestamosGuardados.filter(
      (prestamo) => prestamo.rut === rut
  );

  let prestamosContainer = document.getElementById("prestamosContainer");
  prestamosContainer.innerHTML = "";

  if (prestamosFiltrados.length === 0) {
    Swal.fire({
      title: 'Error',
      text: 'No se encontraron préstamos para el RUT indicado.',
      icon: 'error',
    });
    return;
  }

  let prestamosList = document.createElement("ul");

  for (let prestamo of prestamosFiltrados) {
      let prestamoItem = document.createElement("li");
      prestamoItem.textContent = `RUT: ${prestamo.rut}, Monto: $${prestamo.monto}, Cuotas: ${prestamo.cuota}`;
      prestamosList.appendChild(prestamoItem);
  }

  prestamosContainer.appendChild(prestamosList);
}

document.getElementById("calcular").addEventListener("click", guardarPrestamo);
document.getElementById("verPrestamos").addEventListener("click", mostrarPrestamos);

document.getElementById("calcular").addEventListener("click", function() {
  Swal.fire({
    title: '¿Deseas generar la simulación?',
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      let rut = document.getElementById("rut").value;
      let monto = parseFloat(document.getElementById("montoConsumo").value);
      let cuotas = parseInt(document.getElementById("cuotasConsumo").value);

      if (rut === "" || isNaN(monto) || isNaN(cuotas)) {
        Swal.fire({
          title: 'Error',
          text: 'Por favor, complete todos los campos con valores válidos.',
          icon: 'error',
        });
        return;
      }

      Swal.fire({
        title: 'Realizando simulación...',
        icon: 'info',
        showConfirmButton: false,
      });

      setTimeout(() => {
        realizarSimulacion(rut, monto, cuotas);
      }, 2000);
    } else if (result.isDenied) {
      Swal.fire('Operación cancelada', '', 'info');
    }
  });
});

function realizarSimulacion(rut, monto, cuotas) {
  let interes = calcularInteres(cuotas);
  let montoTotal = monto + (monto * interes);
  let valorCuota = montoTotal / cuotas;
  let costoTotal = montoTotal + interes;

  const prestamoSimulado = new Prestamo(rut, monto, cuotas, valorCuota, costoTotal);

  mostrarDatosPrestamo(prestamoSimulado);

  Swal.fire({
    title: '¡Simulación realizada!',
    text: 'La simulación ha sido generada exitosamente.',
    icon: 'success',
  });
}

