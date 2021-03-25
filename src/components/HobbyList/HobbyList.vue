<template functional>
  <transition name="fade" mode="out-in" tag="div">
    <template v-if="props.hobbies.length">
      <transition-group name="fade" mode="out-in" tag="ul" :class="$style.list">
        <template v-for="hobby in props.hobbies">
          <li :key="hobby.hash" :class="$style.item">
            <div :class="$style.actions">
              <slot name="actions" :hobby="hobby" />
            </div>
            <slot name="hobby-name" :hobby="hobby">
              {{ hobby.hobby }}
            </slot>
            <slot name="status" :hobby="hobby" />
          </li>
        </template>
      </transition-group>
    </template>
    <div v-else :class="$style.empty">
      <slot name="empty" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HobbyList',
  props: {
    hobbies: Array,
  },
}
</script>

<style module lang="postcss">
.list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  align-items: flex-start;
  padding-inline-start: 0;
  gap: 10px;
}
.empty {
  padding: 16px 0;
  color: dimgray;
}
.item {
  cursor: default;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item:hover {
  .actions {
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    opacity: 1;
    visibility: visible;
  }
}

.actions {
  transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
  opacity: 0;
  visibility: hidden;
  text-align: right;
  min-width: 30px;
}

.button {
  display: none;
  &:hover {
    display: initial;
  }
}
</style>
