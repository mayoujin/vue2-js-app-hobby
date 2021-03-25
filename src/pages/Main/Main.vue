<template>
  <div :class="$style.page">
    <h1>Управление списками хобби</h1>
    <div :class="$style.list">
      <h2>Ваши хобби</h2>
      <Suspense>
        <template v-slot:fallback>
          <div>Загрузка списка...</div>
        </template>
        <PickedHobbyList />
      </Suspense>
    </div>
    <div :class="$style.list">
      <h2>Хобби друзей</h2>
      <Suspense>
        <template v-slot:fallback>
          <div>Загрузка списка...</div>
        </template>
        <OptionalHobbyList />
      </Suspense>
    </div>
  </div>
</template>

<script>
import OptionalHobbyList from './components/OptionalHobbyList'
import PickedHobbyList from './components/PickedHobbyList'

export default {
  name: 'Main',
  components: {
    PickedHobbyList,
    OptionalHobbyList,
  },
}
</script>

<style>
h2 {
  text-align: start;
  margin-bottom: 30px;
  border-bottom: 3px solid dimgray;
}
</style>
<style module lang="postcss">
.page {
  padding: 0 20px;
  min-height: 100vh;
}
.list {
  min-height: 40vh;
  padding: 0 20px;
}
</style>
