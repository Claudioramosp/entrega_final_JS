function calcularPrestamoConsumo(monto, cuotas) {
  monto = parseFloat(monto);
  cuotas = parseInt(cuotas);

  if (cuotas === 1 && monto > 0) {
    return monto;
  } else if (cuotas === 3 && monto > 0) {
    return monto * 1.1;
  } else if (cuotas === 6 && monto > 0) {
    return monto * 1.2;
  } else if (cuotas === 12 && monto > 0) {
    return monto * 1.4;
  }
}

function calcularPrestamoHipotecario(monto, años) {
  monto = parseFloat(monto);
  años = parseInt(años);
  cuotas = años * 12;

  if (monto > 0 && años > 0) {
    return monto * (1 + cuotas * 0.005);
  }
}

console.log("Bienvenidos/as a préstamos del Banco BCI");

let tipoPrestamo = prompt("Ingrese el tipo de préstamo: consumo o hipotecario");

/* Seccion Credito de Consumo */
if (tipoPrestamo === "consumo") {
  let monto = prompt("Ingrese el monto que desea solicitar");
  let cuotas = prompt("Ingrese la cantidad de cuotas: 1, 3, 6 o 12");

  let prestamoFinal = calcularPrestamoConsumo(monto, cuotas);
  
  console.log("Tipo de préstamo:", tipoPrestamo);
  console.log("Pediste:", monto);
  console.log("Cuotas:", cuotas);
  console.log("Monto Total a devolver:", prestamoFinal);
  console.log("Monto a pagar por cuota:", prestamoFinal / cuotas);


  let prestamo = {
    tipo: tipoPrestamo,
    monto: monto,
    cuotas: cuotas,
    montoTotal: prestamoFinal
  };

  let prestamosRealizados = [];
  prestamosRealizados.push(prestamo);

  console.log("Préstamos realizados:", prestamosRealizados);
} 

/* Seccion de Credito Hipotecario */
  else if (tipoPrestamo === "hipotecario") {
  let monto = prompt("Ingrese el monto que desea solicitar");
  let años = prompt("Ingrese la cantidad de años para el crédito");

  let prestamoFinal = calcularPrestamoHipotecario(monto, años);
  
  console.log("Tipo de préstamo:", tipoPrestamo);
  console.log("Pediste:", monto);
  console.log("Años:", años);
  console.log("Cuotas:", años * 12);
  console.log("Monto Total a devolver:", prestamoFinal);
  console.log("Monto a pagar por cuota:", prestamoFinal / (años * 12));


  let prestamo = {
    tipo: tipoPrestamo,
    monto: monto,
    cuotas: años * 12,
    montoTotal: prestamoFinal
  };

  let prestamosRealizados = [];
  prestamosRealizados.push(prestamo);

  console.log("Préstamos realizados:", prestamosRealizados);
} 