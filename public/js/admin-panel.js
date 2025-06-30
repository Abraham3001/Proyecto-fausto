document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tabla-usuarios');
  const paginaSpan = document.getElementById('pagina-actual');
  const btnPrev = document.getElementById('prev-page');
  const btnNext = document.getElementById('next-page');
  const btnEliminar = document.getElementById('btn-eliminar');
  const selectAllCheckbox = document.getElementById('select-all');
  const selectRolMasivo = document.getElementById('rol-masivo');

  const res = await fetch('/api/usuarios');
  const usuarios = await res.json();

  const porPagina = 10;
  let paginaActual = 1;
  const totalPaginas = Math.ceil(usuarios.length / porPagina);

  function mostrarPopup(texto, tipo = 'success') {
    const popup = document.createElement('div');
    popup.className = `guardado-popup ${tipo}`;
    popup.innerHTML = `
      <div class="checkmark-circle">
        <div class="background"></div>
        <div class="${tipo === 'success' ? 'checkmark' : 'crossmark'}"></div>
      </div>
      ${texto}
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  }

function renderPagina(pagina) {
  tabla.innerHTML = '';
  const inicio = (pagina - 1) * porPagina;
  const fin = pagina * porPagina;

  usuarios.slice(inicio, fin).forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><input type="checkbox" class="usuario-checkbox" data-id="${usuario.id}"></td>
      <td>${usuario.email}</td>
      <td style="color: #ffc107; font-weight: bold;">${usuario.rol}</td>
    `;
    tabla.appendChild(fila);
  });

  paginaSpan.textContent = `Página ${paginaActual}`;
  selectAllCheckbox.checked = false;
}


  renderPagina(paginaActual);

  btnPrev.addEventListener('click', () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderPagina(paginaActual);
    }
  });

  btnNext.addEventListener('click', () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderPagina(paginaActual);
    }
  });

  selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = tabla.querySelectorAll('.usuario-checkbox');
    checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
  });

btnEliminar.addEventListener('click', async () => {
  const checkboxes = tabla.querySelectorAll('.usuario-checkbox:checked');

  if (checkboxes.length === 0) return mostrarPopup('Nada seleccionado', 'error');

  if (!confirm('¿Estás seguro de eliminar los usuarios seleccionados?')) return;

  let eliminados = [];

  for (let checkbox of checkboxes) {
    const userId = checkbox.dataset.id;

    try {
      const res = await fetch(`/api/usuarios/${userId}`, { method: 'DELETE' });

      if (!res.ok) throw new Error();

      eliminados.push(userId);
    } catch {
      mostrarPopup(`No se pudo eliminar ${userId}`, 'error');
    }
  }

  if (eliminados.length > 0) {
    // Elimina del array de usuarios
    for (const id of eliminados) {
      const index = usuarios.findIndex(u => u.id == id);
      if (index !== -1) usuarios.splice(index, 1);
    }

    mostrarPopup('Usuarios eliminados correctamente');

    // Re-renderiza la tabla
    renderPagina(paginaActual);
  }
});


  selectRolMasivo.addEventListener('change', async () => {
    const nuevoRol = selectRolMasivo.value;
    const seleccionados = tabla.querySelectorAll('.usuario-checkbox:checked');

    if (seleccionados.length === 0) {
      return mostrarPopup('Selecciona al menos un usuario', 'error');
    }

    for (let checkbox of seleccionados) {
      const userId = checkbox.dataset.id;

      try {
        const res = await fetch(`/api/usuarios/${userId}/rol`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rol: nuevoRol }),
        });

        if (!res.ok) throw new Error();
      } catch {
        mostrarPopup(`Error al cambiar a ${userId}`, 'error');
        continue;
      }
    }

    mostrarPopup('Roles actualizados correctamente');
    setTimeout(() => location.reload(), 2000);
  });
});
