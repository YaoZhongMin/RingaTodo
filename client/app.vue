<template>
    <div id='app'>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
    </div>
</template>


<script>
import Header from './layout/header.vue'
import Todo from './views/todo/todo.vue'
import Footer from './layout/footer.jsx'

export default{
  components: {
    Header: Header,
    Todo: Todo,
    Footer: Footer
  }
}
</script>

<style scoped>
#app
{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display:flex;
    flex-direction:column;
    align-items:center;
    letter-spacing: 1px;
}

</style>