<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Marcas</h2>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-outline-success">
        Agregar categoria
      </button>
    </div>
    <br />
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-striped text-center">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <button type="button" class="btn btn-outline-warning">
                Editar
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script></script>
