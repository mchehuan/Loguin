// Datos simulados para usuarios y administrador (esto es solo un ejemplo, en una aplicación real, usarías una base de datos)
const users = [
    { email: 'usuario1@example.com', password: 'usuario123' },
    { email: 'usuario2@example.com', password: 'usuario456' },
  ];
  
  const admin = { email: 'admin@example.com', password: 'admin123' };
  
  // Función para manejar el evento submit del formulario
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Verificar si el usuario es el administrador
    if (email === admin.email && password === admin.password) {
      alert('¡Bienvenido, administrador!');
      // Redireccionar a la página del administrador
      window.location.href = 'admin.html';
    } else {
      // Verificar si el usuario es un usuario registrado
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        alert('¡Bienvenido, usuario!');
        // Redireccionar a la página del usuario
        window.location.href = 'user.html';
      } else {
        alert('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    }
  });