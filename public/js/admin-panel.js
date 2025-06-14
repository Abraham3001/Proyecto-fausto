document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tabla-usuarios');

  const res = await fetch('/api/usuarios');
  const usuarios = await res.json();

  usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.email}</td>
      <td>${usuario.rol}</td>
      <td>
        <select>
          <option value="estudiante" ${usuario.rol === 'estudiante' ? 'selected' : ''}>Estudiante</option>
          <option value="profesor" ${usuario.rol === 'profesor' ? 'selected' : ''}>Profesor</option>
        </select>
      </td>
      <td>
        <button class="btn-guardar" data-id="${usuario.id}">Guardar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  tabla.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-guardar')) {
      const userId = e.target.dataset.id;
      const select = e.target.closest('tr').querySelector('select');
      const nuevoRol = select.value;

      await fetch(`/api/usuarios/${userId}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: nuevoRol }),
      });

      alert('Rol actualizado correctamente');
    }
  });
});
