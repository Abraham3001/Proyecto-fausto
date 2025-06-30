document.addEventListener('DOMContentLoaded', async () => {
  const userInfo = document.getElementById('user-info');
  const authButtons = document.getElementById('auth-buttons');

  try {
    const response = await fetch('/api/sesion');
    const sesion = await response.json();

    if (sesion.autenticado) {
      // Mostrar nombre o email
      userInfo.textContent = sesion.nombre || sesion.email;

      // Limpiar botones previos
      authButtons.innerHTML = '';

      if (sesion.rol === 'profesor') {
        authButtons.innerHTML = `
          <a href="/admin" class="btn btn-primary">Panel Admin</a>
          <a href="/logout" class="btn btn-outline-danger">Cerrar sesión</a>
        `;
      } else if (sesion.rol === 'estudiante') {
        authButtons.innerHTML = `
          <a href="/estudiante" class="btn btn-primary">Panel Estudiante</a>
          <a href="/juego" class="btn btn-success">Juego</a>
          <a href="/logout" class="btn btn-outline-danger">Cerrar sesión</a>
        `;
      }
    } else {
      // Usuario NO autenticado
      userInfo.textContent = '';
      authButtons.innerHTML = `
        <a href="/iniciar-sesion" class="btn btn-outline-primary">Iniciar sesión</a>
        <a href="/registro" class="btn btn-primary">Registrarse</a>
      `;
    }
  } catch (error) {
    console.error('Error al consultar la sesión:', error);
  }
});
