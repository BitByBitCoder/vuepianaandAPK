<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder=" I need to" v-model="newTask" />
    <button>AddTask</button>
  </form>
</template>

<script setup>
import { useTaskStore } from "@/store/TaskStore";
import { ref } from "vue";
const taskStore = useTaskStore();
const newTask = ref("");
function handleSubmit() {
  if (newTask.value.length > 0) {
    const ids = Math.floor(Math.random() * 10000);
    const idString = ids.toString();
    console.log(ids);
    taskStore.addTask({
      title: newTask.value.trim(),
      isFavs: false,
      id: idString,
    });
    newTask.value = "";
  }
}
</script>

<style  scoped>
</style>