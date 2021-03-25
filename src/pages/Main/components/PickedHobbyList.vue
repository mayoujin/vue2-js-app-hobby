<template>
  <ErrorBoundary #boundary="{ hasError }" tag="div" stop-propagation>
    <template v-if="hasError">
      <!-- Activity List Error Placeholder  -->
      <div>Не удалось загрузить список ваших хобби</div>
    </template>
    <template v-else>
      <div :class="$style.adder">
        <input
          ref="addNewInput"
          placeholder="Введите название"
          :class="{
            [$style['adder__error']]: isAddError,
            [$style['adder__input']]: true,
          }"
          :disabled="isBusy"
          @keypress.enter="addNewHobby"
          @keypress="resetAdderError"
        />
        <button @click="addNewHobby" :disabled="isBusy">добавить</button>
      </div>
      <HobbyList :hobbies="pickedHobbies">
        <template #actions="{ hobby }">
          <button
            v-if="false === isBusy && false === meta[hobby.uuid].isOptimistic"
            :class="$style['drop-button']"
            title="Убрать"
            @click="dropHobby(hobby)"
          ></button>
        </template>
        <template #hobby-name="{ hobby }">
          <div
            :class="{
              [$style['optimistic']]: meta[hobby.uuid].isOptimistic,
              [$style['hobby-name']]: true,
            }"
          >
            {{ hobby.hobby }}
          </div>
        </template>
        <template #status="{ hobby }">
          <div
            v-if="meta[hobby.uuid].isOptimistic"
            :class="$style['optimistic']"
          >
            {{ meta[hobby.uuid].status }}
          </div>
        </template>
        <template #empty>
          <div>В Вашем списке пока нет хобби</div>
        </template>
      </HobbyList>
    </template>
  </ErrorBoundary>
</template>

<script>
import HobbyList from '@/components/HobbyList'
import { ifHobbyInList, isValidHobbyData } from '@/domain/entities/hobby'
import { createResource } from 'vue-async-manager'
import { HobbyOptimistic } from '@/app/models/hobby-optimistic'

/**
 * @param {string} hobbyName
 * @return {string}
 */
const sanitizeHobbyName = (hobbyName) => {
  return hobbyName.trim()
}

const buildHobbyMeta = (hobby, hobbyList) => ({
  [hobby.uuid]: {
    isPicked: ifHobbyInList(hobby, hobbyList),
    status: hobby instanceof HobbyOptimistic ? '(...обрабатывается)' : '',
    isOptimistic: hobby instanceof HobbyOptimistic,
  },
})

/**
 * @param {string} hobbyName
 * @return {{hobbyData: {hobby: string}}}
 */
const buildHobbyData = (hobbyName) => {
  const name = sanitizeHobbyName(hobbyName)
  const hobbyData = { hobby: name }
  return hobbyData
}

export default {
  name: 'PickedHobbyList',
  data: () => ({
    isAddError: false,
    isBusy: false,
  }),
  components: {
    HobbyList,
  },
  // COMPUTED
  computed: {
    pickedHobbies() {
      return this.$storage.getters.pickedHobbies
    },
    meta() {
      return this.pickedHobbies.reduce(
        (acc, hobby) => ({
          ...acc,
          ...buildHobbyMeta(hobby, this.$storage.getters.optionalHobbies),
        }),
        {},
      )
    },
  },
  created() {
    createResource(() => this.fetchHobbies()).read()
  },
  methods: {
    /**
     * @return Promise<void>
     */
    async fetchHobbies() {
      await this.$storage.actions.fetchPickedHobbies()
    },
    /**
     * @return Promise<void>
     */
    async addNewHobby() {
      this.isAddError = false
      this.isBusy = true
      const hobbyData = buildHobbyData(this.$refs.addNewInput.value)

      if (false === isValidHobbyData(hobbyData)) {
        this.$refs.addNewInput.value = hobbyData.hobby
        this.isAddError = true
        return
      }
      const result = await this.$storage.actions.addNewHobby(hobbyData)
      result.do(() => {
        this.$refs.addNewInput.value = ''
      })
      this.isBusy = false
    },
    /**
     *
     * @param {Hobby} hobby
     * @return {Promise<void>}
     */
    async dropHobby(hobby) {
      const isConfirmed = confirm('Удалить хобби их списка?')
      if (false === isConfirmed) {
        return
      }
      this.isBusy = true
      await this.$storage.actions.dropHobby(hobby)
      this.isBusy = false
    },
    /**
     *
     */
    resetAdderError() {
      this.isAddError = false
    },
  },
}
</script>

<style module lang="postcss">
.adder {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-left: 40px;
  &__error {
    color: red;
    border: 1px solid red;
  }
  &__input {
    width: 300px;
    font-size: 16px;
    padding: 5px 5px;
    margin-left: -10px;
  }
}
.optimistic {
  color: #2c3e508c;
}
.hobby-name {
  text-align: left;
}
.drop-button {
  cursor: pointer;
  border: none;
  background-image: url('./img/close.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}
</style>
