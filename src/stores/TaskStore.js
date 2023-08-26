import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  let loading = ref(false)
  const storeName = 'Pinia task store'

  const favs = computed(() => tasks.value.filter((i) => i.isFav))

  const favsCount = computed(() => {
    const counter = tasks.value.reduce((p, c) => {
      return c.isFav ? p + 1 : 0
    }, 0)
    return counter
  })

  function totalTasks() {
    return tasks.value.length
  }

  const getTasks = async () => {
    loading.value = true
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    tasks.value = data
    loading.value = false
  }

  const addTask = async (newTask) => {
    tasks.value.push(newTask)
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: { 'Content-type': 'application/json' }
    })

    if (res.error) {
      console.log(res.error)
    }
  }

  // const deleteTask = (taskId) => (tasks.value = tasks.value.filter((t) => t.id !== taskId))

  const deleteTask = async (taskId) => {
    tasks.value = tasks.value.filter((t) => t.id !== taskId)

    const res = await fetch('http://localhost:3000/tasks/' + taskId, {
      method: 'DELETE'
    })

    if (res.error) {
      console.log(res.error)
    }
  }

  const setFav = async (taskId) => {
    const task = tasks.value.find((t) => t.id === taskId)
    task.isFav = !task.isFav

    const res = await fetch('http://localhost:3000/tasks/' + taskId, {
      method: 'PATCH',
      body: JSON.stringify({ isFav: task.isFav }),
      headers: { 'Content-type': 'application/json' }
    })

    if (res.error) {
      console.log(res.error)
    }
  }

  // const totalTasks = computed(() => tasks.value.length)

  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return {
    tasks,
    storeName,
    favs,
    favsCount,
    totalTasks,
    addTask,
    deleteTask,
    setFav,
    getTasks,
    loading
  }
})
