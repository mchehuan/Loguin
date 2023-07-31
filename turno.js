// Datos simulados para turnos guardados (esto es solo un ejemplo, en una aplicación real, usarías una base de datos o LocalStorage)
const turnosGuardados = [];

// Función para obtener los turnos guardados almacenados en LocalStorage
function obtenerTurnosGuardados() {
  const turnosGuardadosString = localStorage.getItem('turnosGuardados');
  return JSON.parse(turnosGuardadosString) || [];
}

// Función para guardar los turnos guardados en LocalStorage
function guardarTurnosGuardados(turnosGuardadosArray) {
  const turnosGuardadosString = JSON.stringify(turnosGuardadosArray);
  localStorage.setItem('turnosGuardados', turnosGuardadosString);
}

// Función para mostrar los turnos guardados en la página
function mostrarTurnosGuardados(turnosGuardadosArray) {
  const turnosGuardadosList = document.getElementById('turnosGuardadosList');
  turnosGuardadosList.innerHTML = '';

  // Recorrer cada turno guardado en el array de turnosGuardadosArray
  turnosGuardadosArray.forEach((turno, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `Paciente: ${turno.nombre} - Fecha: ${turno.fecha} - Hora: ${turno.hora} - Profesional: ${turno.profesional}`;

    // Agregar botón de eliminar al ítem de la lista de turnosGuardadosArray
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      eliminarTurnoGuardado(index, turnosGuardadosArray);
    });

    listItem.appendChild(deleteButton);
    turnosGuardadosList.appendChild(listItem);

    // Ocultar el turno después de 10 segundos
    setTimeout(function () {
      listItem.style.display = 'none';
    }, 10000);
  });
}

// Función para eliminar un turno guardado del array y actualizar la lista en el HTML
function eliminarTurnoGuardado(index, turnosGuardadosArray) {
  // Eliminar el turno guardado del array de turnosGuardadosArray
  const turnoGuardadoEliminado = turnosGuardadosArray.splice(index, 1)[0];

  // Guardar los turnosGuardadosArray actualizados en LocalStorage
  guardarTurnosGuardados(turnosGuardadosArray);
  // Mostrar los turnosGuardadosArray actualizados en la lista de turnosGuardadosArray
  mostrarTurnosGuardados(turnosGuardadosArray);

  // Mostrar un alert con el turno guardado eliminado
  alert(`El turno de ${turnoGuardadoEliminado.nombre} - Fecha: ${turnoGuardadoEliminado.fecha} - Hora: ${turnoGuardadoEliminado.hora} - Profesional: ${turnoGuardadoEliminado.profesional} ha sido eliminado de los turnos guardados`);
}

document.addEventListener('DOMContentLoaded', function () {
  const turnoForm = document.getElementById('turnoForm');

  // Obtener los turnos guardados almacenados en LocalStorage y mostrarlos en la lista
  const turnosGuardadosArray = obtenerTurnosGuardados();
  mostrarTurnosGuardados(turnosGuardadosArray);

  turnoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario para el nuevo turno
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const profesional = document.getElementById('profesional').value;

    // Crear un nuevo objeto de turno con los datos del formulario
    const nuevoTurno = {
      nombre,
      fecha,
      hora,
      profesional
    };

    // Agregar el nuevo turno al array de turnos guardados
    turnosGuardados.push(nuevoTurno);
    // Guardar los turnos guardados actualizados en LocalStorage
    guardarTurnosGuardados(turnosGuardados);

    // Mostrar los turnos guardados actualizados en la lista
    mostrarTurnosGuardados(turnosGuardados);

    turnoForm.reset(); // Limpiar el formulario después de agregar el turno
  });
});
