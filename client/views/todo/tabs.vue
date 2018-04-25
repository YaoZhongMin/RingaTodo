<template>
    <div class='helper'>
        <span class='left'>{{unFinishedTodoLength}} items left</span>
        <span class='tabs'>
            <span 
            v-for='state in states'
            :key='state'
            :class='[state ,filter === state ? "actived" : ""]'
            @click='toggleFilter(state)'
            >
                {{state}}
            </span>
        </span>
        <span class='clear' @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
      props: {
        filter: {
          type: String,
          required: true
        },
        todos: {
          type: Array,
          required: true
        }
      },
      data () {
        return {
          states: ['all', 'active', 'completed']
        }
      },
      computed: {
        unFinishedTodoLength () {
          return this.todos.filter(todo => !todo.completed).length
        }
      },
      methods: {
        clearAllCompleted () {
          this.$emit('clearCompleted')
        },
        toggleFilter (state) {
          this.$emit('toggle', state)
        }
      }
    }
</script>

<style scoped>
    .helper
    {
        font-weight:100;
        display:flex;
        justify-content:space-between;
        padding:5px 0;
        line-height:30px;
        background:#ffffff;
        font-size:14px;
        color:#333;
        letter-spacing:0
    }
    .left, .tabs, .clear
    {
        padding:0 10px;
        box-sizing:border-box;
    }
    .clear
    {
        cursor:pointer;
    }

    .left
    {
        cursor:default;
    }

    .tabs
    {
        display:flex;
        justify-content:space-around;
    }
    .tabs span
    {
        padding:0 10px;
        cursor:pointer;
        border:1px solid rgba(175,47,47,0)
    }
    .tabs .actived
    {
        border-color: rgba(175,47,47,0.4);
        border-radius: 5px;
    }
</style>