const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let nodes = []
// Prompt user for Todo description
// Creates a new Todo object and appends to the list
// Updates the counters
function newTodo() {
  const result = window.prompt('Enter ToDo description')
  if (result !== null && result.length > 0) {
    const newTodo = new Todo(result)
    list.appendChild(newTodo.getListItem())
    nodes.push(newTodo)
    updateCounts()
  }
}

// Removes requested node from todo list element, updates counters
// @param node = an html element
function deleteTodo(node) {
  list.removeChild(node)
  updateCounts()
}

// Resets the counts based on item status
function updateCounts() {
  itemCountSpan.innerHTML = nodes.length
  uncheckedCount = nodes.filter(node => node.status === STATUS.ACTIVE).length
  uncheckedCountSpan.innerHTML = uncheckedCount
}

// JS Class representing a todo as an HTML list item
class Todo {
  // @param String - description entered by user
  constructor(desc) {
    this.id = Date.now()
    this.node = this.createNewNode(desc)
    this.status = STATUS.ACTIVE
  }

  // creates a new HTML element with the format:
  // <li>
  //   <span>
  //     <input type='checkbox' />
  //     <span>{description}</span>
  //     <button>Delete</button>
  //   </span>
  // </li>
  createNewNode(text) {
    const node = document.createElement('li')
    node.setAttribute('class', classNames.TODO_ITEM)
    node.setAttribute('id', this.id)
    
    const todoContent = document.createTextNode(text)
    
    const newTodoCheckbox = document.createElement('input')
    newTodoCheckbox.setAttribute('type', 'checkbox')
    newTodoCheckbox.setAttribute('class', classNames.TODO_CHECKBOX)
    newTodoCheckbox.addEventListener('change', this.handleCheck.bind(this))
    
    const newTodoTextContainer = document.createElement('span')
    newTodoTextContainer.setAttribute('class', classNames.TODO_TEXT)
    newTodoTextContainer.appendChild(todoContent)
    
    const todoButtonContainer = document.createElement('span')
    const todoButton = document.createElement('button')
    const todoButtonText = document.createTextNode('Delete')
    todoButton.setAttribute('class', 'todo-delete')
    todoButton.addEventListener('click', this.handleDelete.bind(this))
    todoButton.appendChild(todoButtonText)
    todoButtonContainer.appendChild(todoButton)

    const newTodoSpan = document.createElement('span')
    newTodoSpan.appendChild(newTodoCheckbox)
    newTodoSpan.appendChild(newTodoTextContainer)
    newTodoSpan.appendChild(todoButton)

    node.appendChild(newTodoSpan)
    return node
  }

  // @param evt - event from the checkbox
  // Updates the classlist of the node that was (un)checked
  handleCheck(evt) {
    if (evt.target.checked) {
      this.status = STATUS.COMPLETED
      this.node.classList.add('todo-completed')
    } else {
      this.status = STATUS.ACTIVE
      this.node.classList.remove('todo-completed')
    }
    updateCounts()
  }

  // Deletes the todo that was clicked by calling the page
  // function delete with the ndode
  handleDelete() {
    nodes = nodes.filter(node => node.id !== this.id)
    deleteTodo(this.node)
  }

  // Returns the <li> node for this todo
  getListItem() {
    return this.node
  }
}


