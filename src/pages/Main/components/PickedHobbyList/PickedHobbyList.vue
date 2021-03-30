<template>
  <ErrorBoundary #boundary="{ hasError }" tag="div" stop-propagation>
    <template v-if="hasError">
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
          :disabled="isAddingNew"
          @keypress.enter="addNewHobby"
          @keypress="resetAdderError"
        />
        <button @click="addNewHobby" :disabled="isBusy">
          добавить
        </button>
        <div v-if="addingErrorString" :class="$style['adder__error-message']">
          {{ addingErrorString }}
        </div>
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
            (...обрабатывается)
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
import { createResource } from 'vue-async-manager'
import { PickedHobbyListViewModel } from './domain/PickedHobbyListViewModel'

export default {
  name: 'PickedHobbyList',
  data: () => ({
    isAddError: false,
    addingErrorString: null,
  }),
  components: {
    HobbyList,
  },
  computed: {
    /**
     *
     */
    pickedHobbies() {
      return this.vm.pickedHobbies
    },
    /**
     * @return {boolean}
     */
    meta() {
      return this.vm.meta
    },
    /**
     * @return {boolean}
     */
    isBusy() {
      return this.isDropping || this.isAddingNew
    },
    /**
     * @return {boolean}
     */
    isAddingNew() {
      return this.vm
        .getTasksByAction(this.vm.addNewHobby)
        .some(({ isRunning }) => isRunning)
    },
    /**
     * @return {boolean}
     */
    isDropping() {
      return this.vm
        .getTasksByAction(this.vm.dropHobby)
        .some(({ isRunning }) => isRunning)
    },
  },
  created() {
    this.vm = new PickedHobbyListViewModel({ storage: this.$storage })
    createResource(() => this.vm.fetchHobbies()).read()
  },
  methods: {
    /**
     * @return Promise<void>
     */
    async addNewHobby() {
      const { addNewInput } = this.$refs
      const result = await this.vm.addNewHobby(addNewInput.value)
      result
        .do(() => {
          addNewInput.value = ''
          this.resetAdderError()
        })
        .elseDo((error) => {
          this.isAddError = true
          this.addingErrorString = error.message
        })
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
      await this.vm.dropHobby(hobby)
    },
    /**
     *
     */
    resetAdderError() {
      this.isAddError = false
      this.addingErrorString = null
    },
  },
}
</script>

<style module lang="postcss">
.adder {
  display: flex;
  flex-wrap: wrap;
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
  &__error-message {
    width: 100%;
    color: red;
    padding: 5px 0;
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
