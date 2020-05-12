
const itemCountContainer = document.getElementById('item-count')
const uncheckedCountContainer = document.getElementById('unchecked-count')
const todoList = document.getElementById('todo-list')

class Todo {
  constructor(description, deleteHandler, checkHandler) {
    this.id = Date.now()
    this.task = description
    this.node = this.createNode(this.id, this.task, deleteHandler, checkHandler)
    this.checked = false
  }

  getNode() {
    return this.node
  }

  toggleCheckbox(val) {
    this.checked = val
  }

  // creates a <li> node like:
  // <li>
  //   <checkbox>
  //   <text>
  //   <delete>
  // </li>
  createNode(id, text, deleteHandler, checkHandler) {
    const listItem = document.createElement('li')
    listItem.setAttribute('id', id)
    
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.addEventListener('change', (e) => { this.toggleCheckbox(e.target.checked); checkHandler(id) })

    const textNode = document.createElement('span')
    textNode.appendChild(document.createTextNode(text))
    
    const deleteButton = document.createElement('button')
    deleteButton.appendChild(document.createTextNode('Delete'))
    deleteButton.addEventListener('click', function() {deleteHandler(id)})

    listItem.appendChild(checkbox)
    listItem.appendChild(deleteButton)
    listItem.appendChild(textNode)

    return listItem
  }
}

class TodoList {
  constructor() {
    this.todos = []
  }

  addTodo(item) {
    this.todos.push(item)
    this.renderList()
  }

  removeTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
    const child = document.getElementById(id)
    todoList.removeChild(child)
    itemCountContainer.innerHTML = this.todos.length
    uncheckedCountContainer.innerHTML = this.todos.filter(todo => todo.checked).length
  }

  handleCheck = id => {
    uncheckedCountContainer.innerHTML = this.todos.filter(todo => todo.checked).length
  }

  renderList() {
    this.todos.forEach(todo => todoList.appendChild(todo.getNode()))
    itemCountContainer.innerHTML = this.todos.length
    uncheckedCountContainer.innerHTML = this.todos.filter(todo => todo.checked).length
  }
}

const myTodos = new TodoList()

function newTodo() {
  const description = prompt("Enter Todo Description:")
  const newTodo = new Todo(description, myTodos.removeTodo, myTodos.handleCheck)
  myTodos.addTodo(newTodo)
  myTodos.renderList
}

const throttle = function(fn, delay) {
  let throttled = false
  return function() {
    if (throttled)
      return

    throttled = setTimeout(() => throttled = false, delay)
    fn()
  }
}

const debounce = function(fn, delay) {
  let timer
  return function() {
    if (timer) {
      clearTimeout(timer)
    } 
    timer = setTimeout(fn, delay)
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const imageList = document.querySelectorAll('.lazy')

  const ImageObserver = new IntersectionObserver(function(entries) {   
    console.log('imageobserver callback')
    entries.forEach(element => {
      if (element.isIntersecting) {
        const image = element.target
        image.src = image.dataset.src
        image.classList.remove('lazy')
        ImageObserver.unobserve(image)
      } 
    }) 
  })

  imageList.forEach(image => ImageObserver.observe(image))
})

window.addEventListener('resize', debounce(() => console.log('here'), 1000))