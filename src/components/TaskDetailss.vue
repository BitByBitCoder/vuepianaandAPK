<template>
  <div class="task">
    <h3>{{ props.task.title }}</h3>
    <h3>{{ props.task.id }}</h3>
    <div class="icons">
      <i class="material-icons" @click="task.deleteTask(props.task.id)"
        >delete</i
      >
      <i
        class="material-icons"
        :class="{ active: props.task.isFavs }"
        @click="task.toggleFavorate(props.task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/store/TaskStore";
const task = useTaskStore();
const props = defineProps(["task"]);
</script>

