import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
    name: "hruaia",
  }),
  //getter z`is used to get specfic data
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFavs);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFavs ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTask() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json(); //array of object ah dah
      console.log("get return log", data);
      this.tasks = data;

      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);
      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task), // json type a siam phot a ngai
          headers: { "content-Type": "application/json" },
        });
        if (res.error) {
          console.log(res.error);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteTask(id) {
      console.log("clickkkkk");
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
      console.log("deleted log", id);
      try {
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "DELETE",
        });
        if (res.error) {
          console.log(res.error);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async toggleFavorate(id) {
      console.log(id);
      const task = this.tasks.find((t) => t.id === id);
      //the task is not a copy is manipulate in the memory
      task.isFavs = !task.isFavs;
      try {
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "PATCH",
          body: JSON.stringify({ isFavs: task.isFavs }), // json type a siam phot a ngai
          // headers: { "content-Type": "application/json" },
        });
        if (res.error) {
          console.log(res.error);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
