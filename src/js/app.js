/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import Task from './task.js';
import notepad from './notepad.js';
import addList, { addPinnedList, redraw } from './addlist.js';

const elementInput = document.querySelector('#inputform');
let elementPinned = document.querySelector('.pinned');
export const elementAllTasks = document.querySelector('.alltasks');

// Добавляем элементы в tasklist
elementInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && elementInput.value.length > 0) {
    event.preventDefault();
    const task = new Task(elementInput.value);
    task.getId = notepad.getAllArrayList.length;
    notepad.getAllArrayList = task;
    redraw();
    elementInput.value = '';
  }
  // if (event.key === 'Backspace' && elementInput.value.length === 0) {
  //   // console.log(notepad.getAllArrayList);
  //   elementAllTasks.innerHTML = '';
  //   redraw();
  // }
// });
});

document.addEventListener('click', (event) => {
  // event.preventDefault();
  if (event.target.id === 'inputform') {
    elementInput.value = '';
    elementAllTasks.innerHTML = '';
    redraw();
  }

  // Добавляем элементы в PinnedList
  if ((event.target.id === 'inputAllTasks') && (event.target.closest('[class = alltasks]'))) {
    if (event.target.checked) {
      elementPinned = document.querySelector('.pinned');
      if (elementPinned.innerText === 'No pinned tasks') {
        elementPinned.innerText = '';
      }
      const dataid = (event.target.closest('.liInTask').dataset.id);
      let task = {};
      notepad.getAllArrayList.forEach((element) => {
        if (element.id === Number(dataid)) {
          task = element;
        }
      });
      notepad.getPinnedArrayList = task;
      elementPinned.insertAdjacentHTML('beforeEnd', addPinnedList(task));
      notepad.deleteAllArrayList(task);
      elementInput.value = '';
      // перерисовываем alltasks после pinned задания
      elementAllTasks.innerHTML = '';
      redraw();
      elementInput.value = '';
      elementInput.innerText = '';
    }
  }

  // Удаляем элементы из pinnedlist
  if ((event.target.id === 'inputPinned') && (event.target.closest('[class = pinned]'))) {
    if (!event.target.checked) {
      const dataid = (event.target.closest('.liInPinned').dataset.id);
      let task = {};
      notepad.getPinnedArrayList.forEach((element) => {
        if (element.id === Number(dataid)) {
          task = element;
        }
      });
      notepad.getAllArrayList = task;
      elementAllTasks.insertAdjacentHTML('beforeEnd', addList(task));
      notepad.deletePinnedArrayList(task);
      elementPinned.innerHTML = '';
      if (notepad.getPinnedArrayList.length === 0) {
        elementPinned.innerText = 'No pinned tasks';
      }
      notepad.getPinnedArrayList.forEach((element) => {
        if (element) {
          elementPinned.insertAdjacentHTML('beforeEnd', addPinnedList(element));
        }
      });
    }
  }
});

elementInput.addEventListener('input', () => {
  if (elementInput.value.length > 0) {
    elementAllTasks.innerHTML = '';
    const array = notepad.getAllArrayList;
    const newarray = array.filter((element) => {
      if (element.value.includes(elementInput.value)) {
        return element.value;
      }
    });
    newarray.forEach((element) => {
      elementAllTasks.insertAdjacentHTML('beforeEnd', addList(element));
    });
  } else redraw();
});