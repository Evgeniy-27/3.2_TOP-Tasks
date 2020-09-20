export default class Task {
  constructor(value) {
    this.value = value;
  }

  get newTask() {
    const task = document.createElement('div');
    task.textContent = this.value;
    task.classList.add('task');
    task.innerHTML += `<label class="taskLabel">
    <input class="checkbox" type="checkbox">
    <span class="checkbox-text"></span>
    </label>`;
    return task;
  }
}
