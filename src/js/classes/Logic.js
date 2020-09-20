import { setTimeout } from 'core-js';
import Task from './Task';

export default class Logic {
  constructor() {
    this.tasks = document.querySelector('.tasks');
    this.area = document.querySelector('.area');
    this.divAllTask = document.querySelector('.allTask');
    this.divPinTasks = document.querySelector('.pinTasks');
    this.pinnedSpan = document.createElement('span');
    this.pinnedSpan.textContent = 'No pinned tasks';
    this.tasksArr = [];
  }

  listnerEnter() {
    this.area.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        if (this.area.value !== '\n') {
          this.tasksArr.push(new Task(this.area.value).newTask);
        } else {
          const error = document.createElement('div');
          error.textContent = 'Ничего не введено!';
          error.classList.add('error');
          this.area.before(error);
          setTimeout(() => error.remove(), 2000);
        }
        this.area.value = '';
      }
      this.sorting();
    });
    this.listnerPin();
    this.sorting();
  }

  listnerPin() {
    this.tasks.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('checkbox')) {
        const child = target.closest('.task');
        const parent = child.parentNode;
        this.tasksArr.forEach((e) => {
          if (e.textContent === child.textContent) {
            // eslint-disable-next-line no-param-reassign
            e = child;
            if (parent === this.divAllTask) {
              child.remove();
              this.divPinTasks.append(child);
            }
          }
        });
        this.sorting();
      }
    });
  }

  sorting() {
    this.divAllTask.innerHTML = '';
    this.tasksArr.forEach((e) => {
      if (!e.querySelector('.checkbox').checked
         && e.textContent.toUpperCase().includes(this.area.value.toUpperCase())) {
        this.divAllTask.append(e);
      }
    });
    if (this.divAllTask.innerHTML === '') {
      this.divAllTask.textContent = 'No tasks found';
    }
    // console.log(this.divPinTasks.innerHTM !== '<span class="noPin">No pinned tasks</span>');
    if (this.divPinTasks.innerHTML !== '<span class="noPin">No pinned tasks</span>') {
      if (this.divPinTasks.innerHTML === '') {
        // this.pinnedSpan.textContent = 'No pinned tasks';
        this.divPinTasks.innerHTML = '<span class="noPin">No pinned tasks</span>';
      } else {
        document.querySelector('.noPin').remove();
      }
    }
  }
}
