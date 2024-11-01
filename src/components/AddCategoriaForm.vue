<template>
  <div class="add-category-form">
    <h3>Add New Category</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="categoryName" class="form-label">Category Name</label>
        <input
          type="text"
          v-model="categoryName"
          class="form-control"
          id="categoryName"
          placeholder="Enter category name"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Category</button>
    </form>
  </div>
</template>

<script>

</script>
<style scoped>
.add-category-form {
  max-width: 400px;
  margin: 20px auto;
}
</style>
