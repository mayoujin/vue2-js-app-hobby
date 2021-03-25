<template>
  <div id="app">
    <transition name="fade">
      <Suspense :delay="300">
        <template v-slot:fallback>
          <div>Загрузка страницы...</div>
        </template>
        <router-view />
      </Suspense>
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
