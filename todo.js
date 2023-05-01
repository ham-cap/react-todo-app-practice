class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    const currentTodos = this.getTodosFromLocalStrage()
    this.state = { newTodo: '', todos: currentTodos }
    this.handleChange = this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  handleChange (text) {
    this.setState({ newTodo: text })
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
    if (this.state.newTodo === '') return
    const todos = this.state.todos
    todos.push(this.state.newTodo)
    const json = JSON.stringify(todos, undefined, 0)
    localStorage.setItem('todoList', json)
    this.setState({ newTodo: '' })
  }

  render () {
    return (
      <div>
        <CreateForm newTodo={this.state.newTodo} onNewTodoChange={this.handleChange} addTodo={this.addTodo}/>
        <p>TodoAppの中からのnewTodo: {this.state.newTodo}</p>
        <EditForm />
        <TodoList todos={this.state.todos}/>
      </div>
    )
  }
}

class CreateForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onNewTodoChange(e.target.value)
  }

  render () {
    return (
    <div>
      <label htmlFor="">
        新規登録:
      </label>
      <form>
        <input type="text" value={this.props.newTodo} onChange={this.handleChange}/>
        <button type="submit" onClick={this.props.addTodo}>Add</button>
      </form>
    </div>
    )
  }
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

function TodoList (props) {
  const todos = props.todos
  const todoList = todos.map((todo, index) =>
    <li key={index}>{todo}</li>
  )
  return (
    <ul>{todoList}</ul>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const element = <TodoApp />
root.render(element)
