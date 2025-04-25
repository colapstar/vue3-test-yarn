<script setup>
import { reactive, ref, onMounted } from 'vue';

const name = 'Moran Toulisse';

const tasks = reactive([
  { name: 'Task one', status: 'active' },
  { name: 'Task two', status: 'pending' },
  { name: 'Task Three', status: 'inactive' }
]);

const newTaskName = ref('');

const toggleTaskStatus = (task) => {
  if (task.status === 'active') {
    task.status = 'pending';
  } else if (task.status === 'pending') {
    task.status = 'inactive';
  } else {
    task.status = 'active';
  }
};

const addTask = () => {
  const trimmedName = newTaskName.value.trim();
  if (trimmedName) {
    tasks.push({ name: trimmedName, status: 'active' });
    newTaskName.value = '';
  }
};

onMounted(() => {
  import('angular_remote/MyElement')
    .then(() => {
      console.log('Angular remote element loaded ✅');
    })
    .catch((err) => {
      console.error('Failed to load Angular remote:', err);
    });
});
</script>

<template>
  <div>
    <h2>This is a test page on a new route 🧪</h2>
    <p><strong>Name:</strong> {{ name }}</p>
    <p><strong>Tasks:</strong></p>
    <ul>
      <li v-for="task in tasks" :key="task.name">
        {{ task.name }} - <strong>{{ task.status }}</strong>
        <button @click="toggleTaskStatus(task)">Toggle Status</button>
      </li>
    </ul>

    <form @submit.prevent="addTask">
      <label for="newTask">Add Task:</label>
      <input type="text" id="newTask" v-model="newTaskName" placeholder="Enter task name" />
      <button type="submit">Add</button>
    </form>

    <h2>From Angular:</h2>
    <angular-element />
  </div>
</template>
