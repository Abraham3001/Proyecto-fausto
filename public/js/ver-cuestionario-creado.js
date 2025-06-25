let cuestionarioAEliminar = null; // ID temporal para eliminar

    function cargarCuestionarios() {
      fetch('/cuestionarios')
        .then(res => res.json())
        .then(data => {
          const contenedor = document.getElementById('cuestionarios');
          if (!data || data.length === 0) {
            contenedor.innerHTML = '<p class="text-center text-muted">No hay cuestionarios aún.</p>';
          } else {
            let html = '';
            data.forEach(c => {
              html += `
                <div class="col">
                  <div class="card h-100 shadow-sm">
                    <div class="card-body">
                      <h5 class="card-title">${c.titulo}</h5>
                      <p class="card-text text-muted">${c.descripcion || '(Sin descripción)'}</p>
                      <div class="d-flex justify-content-between">
                        <a href="/cuestionario/${c.id}" class="btn btn-outline-primary btn-sm">Ver preguntas</a>
                        <button class="btn btn-outline-danger btn-sm" onclick="mostrarModalEliminar(${c.id})">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
            contenedor.innerHTML = html;
          }
        })
        .catch(err => {
          console.error(err);
          document.getElementById('cuestionarios').innerHTML = '<p class="text-danger">Error al cargar los cuestionarios.</p>';
        });
    }

    function mostrarModalEliminar(id) {
      cuestionarioAEliminar = id;
      const modal = new bootstrap.Modal(document.getElementById('modalConfirmarEliminacion'));
      modal.show();
    }

    document.getElementById('btnConfirmarEliminar').addEventListener('click', () => {
      if (cuestionarioAEliminar) {
        fetch(`/cuestionarios/${cuestionarioAEliminar}`, { method: 'DELETE' })
          .then(res => {
            if (res.ok) {
              cargarCuestionarios();
              bootstrap.Modal.getInstance(document.getElementById('modalConfirmarEliminacion')).hide();
            } else {
              alert('Error al eliminar el cuestionario.');
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error de conexión con el servidor.');
          });
      }
    });

    cargarCuestionarios();