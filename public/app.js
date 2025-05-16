const gastoForm = document.getElementById('gasto-form');
const descriptionInput = document.getElementById('description-input');
const montoInput = document.getElementById('monto-input');
const categoriaInput = document.getElementById('categoria-input');
const gastosTableBody = document.querySelector('tbody');
const clearBtn = document.getElementById('clear-gastos');

// Cargar gastos al iniciar
document.addEventListener('DOMContentLoaded', cargarGastos);

// Agregar gasto
gastoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  agregarGasto(descriptionInput.value, parseFloat(montoInput.value), categoriaInput.value);

  // Limpiar inputs
  descriptionInput.value = '';
  montoInput.value = '';
  categoriaInput.value = '';
});

// Eliminar todos los gastos
clearBtn.addEventListener('click', function () {
  gastosTableBody.innerHTML = '';
  localStorage.removeItem('gastos');
});

function agregarGasto(descripcion, monto, categoria, guardar = true) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${descripcion}</td>
    <td>$${monto.toFixed(2)}</td>
    <td>${categoria}</td>
    <td><button class="delete-btn">X</button></td>
  `;

  // Asignar evento al botón de eliminar
  row.querySelector('.delete-btn').addEventListener('click', function () {
    row.remove();
    eliminarGastoLocal(descripcion, monto, categoria);
  });

  gastosTableBody.appendChild(row);

  if (guardar) {
    guardarGastoLocal(descripcion, monto, categoria);
  }
}

function guardarGastoLocal(descripcion, monto, categoria) {
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.push({ descripcion, monto, categoria });
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

function cargarGastos() {
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.forEach(gasto => {
    agregarGasto(gasto.descripcion, gasto.monto, gasto.categoria, false);
  });
}
function eliminarGastoLocal(descripcion, monto, categoria) {
  let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos = gastos.filter(g => 
    g.descripcion !== descripcion || 
    g.monto !== monto || 
    g.categoria !== categoria
  );
  localStorage.setItem('gastos', JSON.stringify(gastos));
}