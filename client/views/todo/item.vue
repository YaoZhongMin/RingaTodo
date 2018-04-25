<template>
    <div :class="['todo-item' ,todo.completed ? 'completed' : '']">
        <input 
        type='checkbox'
        class='toggle'
        v-model='todo.completed'
        >
        <label>{{todo.content}}</label>
        <button class='destory' @click="deleteTodo">x</button>
    </div>
</template> 

<script>
    export default {
      props: {
        todo: {
          type: Object,
          required: true
        }
      },
      methods: {
        deleteTodo () {
          this.$emit('del', this.todo.id)
        }
      }
    }
    </script>

<style scoped>
    .todo-item
    {
        background:#ffffff;
        font-size:24px;
        border-bottom:1px solid rgba(0 ,0 ,0 ,0.1);
        display:flex;
        align-items:center;
    }
    .todo-item:hover>.destory
    {
        display:block;
    }
    
    label
    {
        word-break:break-all;
        white-space:pre-line;
        padding:15px 0 15px 0;
        margin:0 45px 0 45px;
        display:block;
        line-height:1.2;
        transition:color 0.4s;
        width:450px;
        color:#999
    }
    .completed>label
    {
        color:#d9d9d9;
        text-decoration:line-through;
    }
    
    .toggle
    {
        text-align:center;
        border:none;
        outline:none;
        margin-left:10px;
        appearance:none;
    }

    .toggle:before
    {
        content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfeBgkRKABWEQo4AAABI0lEQVQ4y53ULW4CURQF4I8JCAQkKFCoBkUgmBpMd1DHClgEghWwCbZARX3dJCyBNAgcJJCAAFFBBY/pTEEw3OfuPee9c/9eQdpKXr1786KKg29fPsz9uGs9Uxvnf2djqncLLhpa3YCvZ2WomIWPHFN3xmZm4tR7R6M0ZZjAl8Y6KoqKKjrGlgll+Kf9KuZT+0Zs22cirHepzDSBN+4Wo5FQpkr0g9Jl6vaarq5a6pVlyK7PJLDHIRgZiG1txQai4B0H1IR54HZCaGCf1GZvELydoGPOztlZrBLExJkOxEFYJfh3kSpYO4GmVibhliY4WYNqJKdFDqCuDFYWmfjCCpTVweGJpHOXNXfjco9G7uF7YryfWKDcK3qxhz6BQobywDfzC5Ec/BfNRD7QAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTEyVDEwOjUzOjMzKzA4OjAw0J/3FwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNi0wOVQxNzo0MDowMCswODowMIIzzf0AAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE0MDIzMDY4MDAWijoGAAAAEnRFWHRUaHVtYjo6U2l6ZQAxMC43S0K1YUQtAAAAX3RFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTY5NS8xMTY5NTY4LnBuZ4MvTloAAAAASUVORK5CYII=');
        cursor: pointer;
    }
    .toggle:checked:before
    {
        content: url('http://111.231.86.225:8080/done-aaa.png');
        cursor: pointer;
    }

    .destory
    {
        font-size:30px;
        color:#cc9a9a;
        transition:color 0.2s ease-out;
        background:transparent;
        border-width:0;
        cursor:pointer;
        outline:none;
        display:none;
    }
</style>