<template>
    <div class='container'>
        <section class='real-app'>
            <input
            type='text'
            class='add-input'
            autofocus="auto"
            placeholder="接下来要做些什么呢？"
            @keyup.enter='addTodo'
            >
            <Item
            :todo='todo'
            v-for='todo in filteredTodos'
            :keys='todo.id'
            @del='deleteTodo'
            />
            <Tabs
            :filter="filter" 
            :todos='todos'
            @toggle='toggleFilter'
            @clearCompleted='clearAllCompleted'
            />
        </section>
    </div>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    let id = 0

    export default {
      data () {
        return {
          todos: [],
          filter: 'all'
        }
      },
      components: {
        Item: Item,
        Tabs: Tabs
      },
      computed: {
        filteredTodos () {
          if (this.filter === 'all') {
            return this.todos
          }
          const completed = this.filter === 'completed' // 判断选中的是不是completed，以此来传出true或false
          return this.todos.filter(todo => completed === todo.completed)// 此行第一个completed是上一行的常量传下来的布尔值,第二个completed是对应列表项值，
        } // 由于列表项是一个单选框，所以todo.completed的值也是一个布尔值
      },
      methods: {
        addTodo (e) { // 添加一个列表项
          if (!e.target.value) {
            return false
          }
          this.todos.unshift({
            id: id++,
            content: e.target.value.trim(),
            completed: false
          })
          e.target.value = ''
        },
        deleteTodo (id) { // 删除某一个列表项
          this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        },
        toggleFilter (state) {
          this.filter = state
        },
        clearAllCompleted () { // 删除所有已完成的列表项
          this.todos = this.todos.filter(todo => !todo.completed) // 这里实际上是给todos传入一个新值，传入的是由原本的todos使用filter方法过滤出来的，
        } // 未完成的列表项，也就是todo.completed为false的列表项，用于展示。
      }
    }
</script>

<style scoped>
    .container
    {
        width:100%;
        flex-basis:auto;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .real-app
    {
        flex-basis:600px;
        box-shadow: 0 0 5px #666
    }
    .real-app>input
    {
        width:100%;
        height:100%;
        font-size:24px;
        line-height:1.4em;
        outline:none;
        color:#333;
        padding:16px 16px 16px 60px;
        box-shadow:inset 0 -1px 2px 0 rgba(0 ,0 ,0 ,0.1);
        box-sizing:border-box;
        border:0;
    }
</style>