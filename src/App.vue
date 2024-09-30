<script setup>
import Sazid from "./components/Sazid.vue";
import { ref, onMounted } from "vue";

const name = "Sazidul";
const status = ref(true);
const tasks = ref([
  "List 1",
  "List 2",
  "List 3",
  "List 4",
  "List 5",
  "List 6",
  "List 7",
  "List8",
]);
const works = ref([
  { name: "sazid", age: 21 },
  { name: "Aziz", age: 21 },
  { name: "Weiner", age: 71 },
]);
const title = ref("");

const toggleClick = () => {
  status.value = !status.value;
};

const addTask = (e) => {
  if (title.value.trim() !== "") {
    tasks.value.push(title.value);
    title.value = "";
  }
};

const deletetask = (id) => {
  tasks.value.splice(id, 1);
};

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    const data = await response.json();
    tasks.value = data.slice(0,10).map((task) => task.title);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <Sazid :name="name" />
  <p class="" v-if="status">User is Active</p>
  <p class="" v-else="!status">User is Inactive</p>
  <p>Hello</p>
  <button @click="toggleClick">Change</button>

  <br />
  <br />
  <br />
  <!-- forms -->
  <form @submit.prevent="addTask">
    <label for="newTask">Title : </label>
    <input type="text" name="newTask" id="newTask" v-model="title" />
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, idx) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="deletetask(idx)">x</button>
    </li>
  </ul>

  <h3>workers:</h3>
  <div v-for="(work, index) in works" :key="work">
    <div>
      <span>{{ index + 1 }}</span>
      <p>
        Name : <span>{{ work.name }}</span>
      </p>
      <p>
        age : <span>{{ work.age }}</span>
      </p>
    </div>
  </div>
</template>
