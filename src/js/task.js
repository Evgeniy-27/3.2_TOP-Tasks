export default class Task {
    constructor(value, id) {
      this.value = value;
      this.id = id;
    }
  
    set getValue(el) {
      this.value = el;
    }
  
    get getValue() {
      return this.value;
    }
  
    set getId(el) {
      this.id = el;
    }
  
    get getId() {
      return this.id;
    }
  
    //   set getStatus(el) {
    //     this.status = el;
    //   }
  
  //   get getStatus() {
  //     return this.status;
  //   }
  }