document.getElementById("tipoPrestamo").addEventListener("change", function() {
  let tipoPrestamo = this.value;
  let consumoDiv = document.getElementById("creditoConsumo");
  let hipotecarioDiv = document.getElementById("creditoHipotecario");

  if (tipoPrestamo === "consumo") {
      consumoDiv.style.display = "block";
      hipotecarioDiv.style.display = "none";
  } else if (tipoPrestamo === "hipotecario") {
      consumoDiv.style.display = "none";
      hipotecarioDiv.style.display = "block";
  } else {
      consumoDiv.style.display = "none";
      hipotecarioDiv.style.display = "none";
  }
});

document.getElementById("calcular").addEventListener("click", function() {
  let tipoPrestamo = document.getElementById("tipoPrestamo").value;
  let resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpiar el contenido previo

  if (tipoPrestamo === "consumo") {
      let monto = parseFloat(document.getElementById("montoConsumo").value);
      let cuotas = parseInt(document.getElementById("cuotasConsumo").value);

      if (isNaN(monto) || isNaN(cuotas)) {
          resultadoDiv.innerHTML = "Por favor, ingrese valores numéricos válidos.";
      } else {
          let total = monto * 1.1; // Cálculo de total con un interés del 10%
          let cuotaMensual = total / cuotas;

          resultadoDiv.innerHTML = `El total a pagar será de $${total.toFixed(2)}, y la cuota mensual será de $${cuotaMensual.toFixed(2)}.`;
      }
  } else if (tipoPrestamo === "hipotecario") {
      let monto = parseFloat(document.getElementById("montoHipotecario").value);
      let años = parseInt(document.getElementById("añosHipotecario").value);

      if (isNaN(monto) || isNaN(años)) {
          resultadoDiv.innerHTML = "Por favor, ingrese valores numéricos válidos.";
      } else {
          let total = monto * 1.2; // Cálculo de total con un interés del 20%
          let cuotaMensual = total / (años * 12); // Se considera 12 meses por año

          resultadoDiv.innerHTML = `El total a pagar será de $${total.toFixed(2)}, y la cuota mensual será de $${cuotaMensual.toFixed(2)}.`;
      }
  } else {
      resultadoDiv.innerHTML = "Por favor, seleccione un tipo de préstamo válido.";
  }
});