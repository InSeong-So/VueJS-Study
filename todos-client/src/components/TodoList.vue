<main id="todolist">
  <h1>
    Todo List
    <span>Get things done, one item at a time.</span>
  </h1>

  <template v-if="todo.length">
    <transition-group name="todolist" tag="ul">
      <li v-for="item in todoByStatus" v-bind:class="item.done ? 'done' : ''" v-bind:key="item.id">
        <span class="label">{{item.label}}</span>
        <div class="actions">
          <button class="btn-picto" type="button" v-on:click="markAsDoneOrUndone(item)" v-bind:aria-label="item.done ? 'Undone' : 'Done'" v-bind:title="item.done ? 'Undone' : 'Done'">
            <i aria-hidden="true" class="material-icons">{{ item.done ? 'check_box' : 'check_box_outline_blank' }}</i>
          </button>
          <button class="btn-picto" type="button" v-on:click="deleteItemFromList(item)" aria-label="Delete" title="Delete">
            <i aria-hidden="true" class="material-icons">delete</i>
          </button>
        </div>
      </li>
    </transition-group>
    <togglebutton 
                  label="Move done items at the end?"
                  name="todosort"
                  v-on:clicked="clickontoogle" />
  </template>
  <p v-else class="emptylist">Your todo list is empty.</p>

  <form name="newform" v-on:submit.prevent="addItem">
    <label for="newitem">Add to the todo list</label>
    <input type="text" name="newitem" id="newitem" v-model="newitem">
    <button type="submit">Add item</button>
  </form>
</main>

<script>
Vue.component('togglebutton', {
  props: ['label', 'name'],
  template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">{{ label }}</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
  </div>`,
  model: {
    prop: 'checked',
    event: 'change'
  },
  data: function() {
    return {
      isactive:false
    }
  },
  methods: {
    onToogle: function() {
       this.$emit('clicked', this.isactive)
    }
  }
});

var todolist = new Vue({
  el: '#todolist',
  data: {
    newitem:'',
    sortByStatus:false,
    todo: [
      { id:1, label: "Learn VueJs", done: true },
      { id:2, label: "Code a todo list", done: false },
      { id:3, label: "Learn something else", done: false }
    ]
  },
  methods: {
    addItem: function() {
      this.todo.push({id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false});
      this.newitem = '';
    },
    markAsDoneOrUndone: function(item) {
      item.done = !item.done;
    },
    deleteItemFromList: function(item) {
      let index = this.todo.indexOf(item)
      this.todo.splice(index, 1);
    },
    clickontoogle: function(active) {
      this.sortByStatus = active;
    }
  },
  computed: {
    todoByStatus: function() {

      if(!this.sortByStatus) {
        return this.todo;
      }

      var sortedArray = []
      var doneArray = this.todo.filter(function(item) { return item.done; });
      var notDoneArray = this.todo.filter(function(item) { return !item.done; });
      
      sortedArray = [...notDoneArray, ...doneArray];
      return sortedArray;
    }
  }
});
</script>