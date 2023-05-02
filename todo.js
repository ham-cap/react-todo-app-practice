class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    const currentTodos = this.getTodosFromLocalStrage()
    this.state = { newTodo: '', changedTodo: '', todos: currentTodos }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeEdit = this.handleChangeEdit.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.destroyTodo = this.destroyTodo.bind(this)
  }

  handleChange (text) {
    this.setState({ newTodo: text })
  }

  handleChangeEdit (text) {
    this.setState({ changedTodo: text })
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

  updateTodo (e) {
    console.log('update!!!!')
    console.log(e)
    // e.preventDefault()
    // if (this.state.changedTodo === '') return
    // const todos = this.state.todos
    // todos.push(this.state.newTodo)
    // const json = JSON.stringify(todos, undefined, 0)
    // localStorage.setItem('todoList', json)
    // this.setState({ newTodo: '' })
  }

  destroyTodo (index) {
    const currentTodos = this.state.todos
    currentTodos.splice(index, 1)
    localStorage.setItem('todoList', JSON.stringify(currentTodos))
    this.setState({ todos: currentTodos })
  }

  render () {
    return (
      <div>
        <CreateForm newTodo={this.state.newTodo} onNewTodoChange={this.handleChange} addTodo={this.addTodo}/>
        <p>TodoAppの中からのnewTodo: {this.state.newTodo}</p>
        <EditForm changedTodo={this.state.changedTodo} onTodoChange={this.handleChangeEdit} updateTodo={this.updateTodo} />
        <p>TodoAppの中からのchangedTodo: {this.state.changedTodo}</p>
        <TodoList todos={this.state.todos} deleteTodo={(index) => this.destroyTodo(index)} deletedTodoIndex={this.deletedTodoIndex} />
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
        <input type="text" value={this.props.newTodo} onChange={this.handleChange}/>
        <button type="submit" onClick={this.props.addTodo}>Add</button>
      </div>
    )
  }
}

class EditForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onTodoChange(e.target.value)
  }

  render () {
    return (
      <div>
        <label htmlFor="">
          更新:
        </label>
        <input type="text" value={this.props.changedTodo} onChange={this.handleChange}/>
        <button type="submit" onClick={this.props.updateTodo}>Edit</button>
      </div>
    )
  }
}

class TodoList extends React.Component {
  render () {
    const todos = this.props.todos
    const todoList = todos.map((todo, index) =>
      <li key={index}>
        {todo}
        <button onClick={() => this.props.deleteTodo(index)}>Delete</button>
      </li>
    )
    return (
    <ul>{todoList}</ul>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const element = <TodoApp />
root.render(element)
