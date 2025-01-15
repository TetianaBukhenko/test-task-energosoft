<script>
export default {}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-light bg-light justify-content-center">
        <ul class="nav justify-content-center align-items-center">
          <li class="nav-item">
            <RouterLink
              to="/"
              activeClass="fw-bold"
              class="nav-link text-dark text-lg"
              aria-current="All Applications"
              >Всі заяви
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/new"
              activeClass="btn-primary text-white"
              class="nav-link btn btn-outline-primary me-2"
              aria-current="New Application"
            >
              Подати заяву
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style></style>
