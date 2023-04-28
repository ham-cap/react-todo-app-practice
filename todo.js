function CreateForm (props) {
  return (
    <div>
      <label htmlFor="">
        新規登録:
      </label>
      <form onSubmit={props.addTodo}>
        <input type="text" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

function EditForm (props) {
  return (
    <div>
      <label htmlFor="">
        更新:
      </label>
      <input type="text" />
      <button>Edit</button>
    </div>
  )
}

// function TodoList (props) {
//   const todos = props.todos
//   const todoList = todos.map((todo, index) =>
//     <li key={index}>{todo}</li>
//   )
//   return (
//     <ul>{todoList}</ul>
//   )
// }

class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    console.log(this.getTodosFromLocalStrage())
    const currentTodos = this.getTodosFromLocalStrage()
    this.state = { todos: currentTodos }
    console.log(this)
  }

  getTodosFromLocalStrage () {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'todoList')) {
      const todoListJson = localStorage.getItem('todoList')
      const todoList = JSON.parse(todoListJson)
      return todoList
    } else {
      return []
    }
  }

  addTodo (e) {
    e.preventDefault()
    console.log(e)
    if (e === '') return
    const todos = this.state.todos
    todos.push(e.target[0].value)
    const json = JSON.stringify(todos, undefined, 0)
    localStorage.setItem('todoList', json)
  }

  render () {
    return (
      <div>
        <CreateForm addTodo={this.addTodo} />
        <p>{this.state.todos}</p>
        <EditForm />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const element = <TodoApp />
root.render(element)
