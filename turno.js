// Datos simulados para turnos (esto es solo un ejemplo, en una aplicación real, usarías una base de datos o LocalStorage)
const turnos = [
    { nombre: 'Paciente 1', fecha: '2023-08-01', hora: '09:30', profesional: 'Dr. Juan Pérez' },
    { nombre: 'Paciente 2', fecha: '2023-08-02', hora: '14:00', profesional: 'Dra. María Gómez' },
  ];
  
  // Función para obtener los turnos almacenados en LocalStorage
  function obtenerTurnos() {
    const turnosString = localStorage.getItem('turnos');
    return JSON.parse(turnosString) || [];
  }
  
  // Función para guardar los turnos en LocalStorage
  function guardarTurnos(turnos) {
    const turnosString = JSON.stringify(turnos);
    localStorage.setItem('turnos', turnosString);
  }
  
  // Función para mostrar los turnos en la página
  function mostrarTurnos(turnos) {
    const turnosList = document.getElementById('turnosList');
    turnosList.innerHTML = '';
  
    // Recorrer cada turno en el array de turnos
    turnos.forEach((turno, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Paciente: ${turno.nombre} - Fecha: ${turno.fecha} - Hora: ${turno.hora} - Profesional: ${turno.profesional}`;
  
      const btnModificar = document.createElement('button');
      btnModificar.className = 'btn btn-info btn-sm mx-2';
      btnModificar.textContent = 'Modificar';
  
      // Eliminar el event listener anterior antes de agregar uno nuevo
      btnModificar.removeEventListener('click', mostrarFormularioModificacion);
  
      // Agregar event listener al botón "Modificar" para mostrar el formulario de modificación
      btnModificar.addEventListener('click', function () {
        mostrarFormularioModificacion(turno, index);
      });
  
      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger btn-sm';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', function () {
        // Eliminar el turno del array y actualizar la lista mostrada
        turnos.splice(index, 1);
        guardarTurnos(turnos);
        mostrarTurnos(turnos);
      });
  
      listItem.appendChild(btnModificar);
      listItem.appendChild(btnEliminar);
      turnosList.appendChild(listItem);
    });
  }
  
  // Función para mostrar el formulario de modificación del turno
  function mostrarFormularioModificacion(turno, index) {
    const nombreInput = document.getElementById('nombreMod');
    const fechaInput = document.getElementById('fechaMod');
    const horaInput = document.getElementById('horaMod');
    const profesionalInput = document.getElementById('profesionalMod');
  
    // Asignar los valores actuales del turno al formulario de modificación
    nombreInput.value = turno.nombre;
    fechaInput.value = turno.fecha;
    horaInput.value = turno.hora;
    profesionalInput.value = turno.profesional;
  
    const modal = document.getElementById('modalModificar');
    modal.style.display = 'block';
  
    const btnGuardarModificacion = document.getElementById('btnGuardarModificacion');
    btnGuardarModificacion.addEventListener('click', function () {
      // Actualizar los valores del turno con los nuevos valores ingresados en el formulario
      turno.nombre = nombreInput.value;
      turno.fecha = fechaInput.value;
      turno.hora = horaInput.value;
      turno.profesional = profesionalInput.value;
  
      // Guardar los cambios en LocalStorage y actualizar la lista mostrada
      guardarTurnos(turnos);
      mostrarTurnos(turnos);
  
      modal.style.display = 'none'; // Cerrar el formulario de modificación
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const turnoForm = document.getElementById('turnoForm');
  
    // Obtener los turnos almacenados en LocalStorage y mostrarlos en la lista
    const turnos = obtenerTurnos();
    mostrarTurnos(turnos);
  
    // Agregar evento submit al formulario para agregar nuevos turnos
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
  
      // Agregar el nuevo turno al array de turnos y guardar en LocalStorage
      turnos.push(nuevoTurno);
      guardarTurnos(turnos);
  
      // Mostrar los turnos actualizados en la lista de turnos
      mostrarTurnos(turnos);
  
      turnoForm.reset(); // Limpiar el formulario después de agregar el turno
  
      // Eliminar automáticamente el último turno después de 10 segundos
      setTimeout(function () {
        turnos.pop();
        guardarTurnos(turnos);
        mostrarTurnos(turnos);
      }, 10000);
    });
  });
  