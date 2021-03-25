<template>
  <ErrorBoundary #boundary="{ hasError }" tag="div" stop-propagation>
    <template v-if="hasError">
      <!-- Hobby List Creation Error Placeholder  -->
      <div>Не удалось загрузить список хобби друзей</div>
    </template>
    <template v-else>
      <HobbyList :hobbies="optionalHobbies">
        <template #actions="{ hobby }">
          <button
            v-if="false === isBusy && false === meta[hobby.uuid].isPicked"
            :class="$style['pick-button']"
            title="Добавить"
            @click="pickHobby(hobby)"
          ></button>
        </template>
        <template #status="{ hobby }">
          <div v-if="meta[hobby.uuid].isPicked" :class="$style.status">
            Добавлено в ваши хобби
          </div>
          <div v-else-if="itemErrors[hobby.hash]" :class="$style.error">
            Ошибка добвления
          </div>
        </template>
        <template #empty>
          <div :class="$style.empty">В этом списке пока нет хобби</div>
        </template>
      </HobbyList>
    </template>
  </ErrorBoundary>
</template>

<script>
import HobbyList from '@/components/HobbyList'
import { ifHobbyInList } from '@/domain/entities/hobby'
import { createResource } from 'vue-async-manager'

/**
 *
 * @param hobby
 * @param hobbyList
 * @return {{ isPicked?: boolean }}
 */
const buildHobbyMeta = (hobby, hobbyList) => ({
  [hobby.uuid]: {
    isPicked: ifHobbyInList(hobby, hobbyList),
  },
})

export default {
  name: 'OptionalHobbyList',
  data: () => ({
    isBusy: false,
    itemErrors: {},
  }),
  components: {
    HobbyList,
  },
  computed: {
    optionalHobbies() {
      return this.$storage.getters.optionalHobbies
    },
    meta() {
      return this.optionalHobbies.reduce(
        (acc, hobby) => ({
          ...acc,
          ...buildHobbyMeta(hobby, this.$storage.getters.pickedHobbies),
        }),
        {},
      )
    },
  },
  created() {
    createResource(async () =>
      this.$storage.actions.fetchOptionalHobbies(),
    ).read()
  },
  methods: {
    /**
     *
     * @param {Hobby} hobby
     * @return {Promise<void>}
     */
    async pickHobby(hobby) {
      this.isBusy = true
      delete this.itemErrors[hobby.hash]
      const result = await this.$storage.actions.pickHobby(hobby)
      this.isBusy = false
      result.elseDo((error) => {
        this.itemErrors[hobby.hash] = error.message
      })
    },
  },
}
</script>

<style module lang="postcss">
.status {
  display: flex;
  color: #449f1b;
  &:before {
    content: '';
    display: block;
    background-image: url('./img/ok.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    font-size: 16px;
    font-weight: 600;
  }
}
.error {
  color: red;
}
.pick-button {
  cursor: pointer;
  border: none;
  background-image: url('./img/add.gif');
  background-size: cover;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}
</style>
