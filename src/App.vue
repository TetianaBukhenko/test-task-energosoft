<script>
// import { RouterLink, RouterView } from 'vue-router'

export default {}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-light bg-light justify-content-center">
        <ul class="nav justify-content-center align-items-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link text-dark text-lg" aria-current="All Applications"
              >Всі заяви
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/new" class="nav-link" aria-current="New Application">
              <button class="btn btn-outline-primary me-2">Подати заяву</button>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style></style>
