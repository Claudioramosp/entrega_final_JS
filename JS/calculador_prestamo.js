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
        alert("Por favor, complete todos los campos con valores válidos.");
        return;
    }

    let interes = calcularInteres(cuotas);
    let montoTotal = monto + (monto * interes);
    let valorCuota = montoTotal / cuotas;
    let costoTotal = montoTotal + interes;
    let prestamo = new Prestamo(rut, monto, cuotas, valorCuota, costoTotal);
    let prestamosGuardados = obtenerPrestamosGuardados();
    prestamosGuardados.push(prestamo);
    localStorage.setItem("prestamos", JSON.stringify(prestamosGuardados));

    mostrarDatosPrestamo(prestamo);

    alert("El préstamo ha sido guardado exitosamente.");
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
    prestamosContainer.innerHTML = ""; // Limpiar contenido previo

    if (prestamosFiltrados.length === 0) {
        let noPrestamosMsg = document.createElement("p");
        noPrestamosMsg.textContent = "No se encontraron préstamos para el RUT indicado.";
        prestamosContainer.appendChild(noPrestamosMsg);
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