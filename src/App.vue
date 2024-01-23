<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="ff" />
      <h1>Pinia Task</h1>
    </header>
    <div class="new-task-form">
      <TaskForm />
    </div>
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Favs Task</button>
    </nav>

    <!-- Loading -->
    <div class="loaing" v-if="taskStore.loaing">Loading task...</div>
    <div class="task-list" v-if="filter === 'all'">
      <p>All task {{ taskStore.totalCount }}</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>Favorite task {{ taskStore.favCount }}</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetailss.vue";
const taskStore = useTaskStore();
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
taskStore.getTask();

const filter = ref("all");
</script>

<style  scoped>
</style>