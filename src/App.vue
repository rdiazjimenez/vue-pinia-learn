<script setup>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore'

const taskStore = useTaskStore()

const taskTitle = ref('')

taskStore.getTasks()

const handleSubmit = () => {
  if (taskTitle.value.length > 0) {
    taskStore.addTask({
      id: Math.floor(Math.random() * 1000),
      title: taskTitle.value,
      isFav: false
    })
    taskTitle.value = ''
  }
}
</script>

<template>
  <main>
    <div class="wrapper" v-if="taskStore.loading">
      <div class="loader"></div>
    </div>
    <div v-else>
      <!-- heading -->
      <header>
        <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo" />
        <h1>Pinia Tasks</h1>
      </header>
      <div class="new-task-form">
        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="taskTitle" />
          <button @click="handleSubmit">Add task</button>
        </form>
      </div>
      <!-- task list -->
      <div class="task-list">
        <p>You have {{ taskStore.totalTasks() }} tasks pending</p>
        <div v-for="(task, index) in taskStore.tasks" :key="index">
          <!-- <p>{{ task.title }}</p> -->
          <TaskDetails :task="task" />
        </div>
      </div>
      <button @click="taskStore.$reset()">reset the state</button>
    </div>
  </main>
</template>
