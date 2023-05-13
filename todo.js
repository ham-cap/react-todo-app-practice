class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      todos: [],
      isChanging: false,
      selectedTodoForEdit: "",
      selectedTodoIndexForEdit: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.destroyTodo = this.destroyTodo.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    const currentTodos = this.getTodosFromLocalStrage();
    this.setState({todos: currentTodos});
  }

  handleChange(text) {
    this.setState({ newTodo: text });
  }

  handleChangeEdit(text) {
    this.setState({ selectedTodoForEdit: text });
  }

  getTodosFromLocalStrage() {
    if (localStorage.getItem("todoList") === null) {
      return [];
    } else {
      const todoListJson = localStorage.getItem("todoList");
      const todoList = JSON.parse(todoListJson);
      return todoList;
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.state.newTodo === "") return;
    const todos = this.state.todos;
    todos.push(this.state.newTodo);
    const json = JSON.stringify(todos, undefined, 0);
    localStorage.setItem("todoList", json);
    this.setState({ newTodo: "" });
  }

  updateTodo(index) {
    if (this.state.selectedTodoForEdit === "") return;
    const todos = this.state.todos;
    todos.splice(index, 1, this.state.selectedTodoForEdit);
    const json = JSON.stringify(todos, undefined, 0);
    localStorage.setItem("todoList", json);
    this.setState({ selectedTodoForEdit: "", isChanging: false });
  }

  destroyTodo(index) {
    const currentTodos = this.state.todos;
    currentTodos.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(currentTodos));
    this.setState({ todos: currentTodos });
  }

  changeForm(index) {
    this.setState({
      selectedTodoForEdit: this.state.todos[index],
      selectedTodoIndexForEdit: index,
      isChanging: true,
    });
  }

  cancelEdit() {
    this.setState({
      isChanging: false,
    });
  }

  render() {
    return (
      <div>
        <FormSwitcher
          newTodo={this.state.newTodo}
          onNewTodoChange={this.handleChange}
          addTodo={this.addTodo}
          isChanging={this.state.isChanging}
          selectedTodo={this.state.selectedTodoForEdit}
          index={this.state.selectedTodoIndexForEdit}
          handleChangeEdit={this.handleChangeEdit}
          updateTodo={this.updateTodo}
          cancelEdit={this.cancelEdit}
        />
        <TodoList
          todos={this.state.todos}
          deleteTodo={(index) => this.destroyTodo(index)}
          showEditForm={(index) => this.changeForm(index)}
        />
      </div>
    );
  }
}

class FormSwitcher extends React.Component {
  render() {
    let form;
    if (this.props.isChanging) {
      form = (
        <EditForm
          selectedTodo={this.props.selectedTodo}
          index={this.props.index}
          onTodoChange={this.props.handleChangeEdit}
          updateTodo={this.props.updateTodo}
          cancelEdit={this.props.cancelEdit}
        />
      );
    } else {
      form = (
        <CreateForm
          newTodo={this.props.newTodo}
          onNewTodoChange={this.props.onNewTodoChange}
          addTodo={this.props.addTodo}
        />
      );
    }
    return <div>{form}</div>;
  }
}

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onNewTodoChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label>新規登録:</label>
        <input
          type="text"
          value={this.props.newTodo}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.props.addTodo}>
          Add
        </button>
      </div>
    );
  }
}

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTodoChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label>編集:</label>
        <input
          type="text"
          value={this.props.selectedTodo}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={() => this.props.updateTodo(this.props.index)}
        >
          Update
        </button>
        <button type="button" onClick={this.props.cancelEdit}>
          Cancel
        </button>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    const todos = this.props.todos;
    const todoList = todos.map((todo, index) => (
      <li key={index}>
        {todo}
        <button onClick={() => this.props.deleteTodo(index)}>Delete</button>
        <button onClick={() => this.props.showEditForm(index)}>Edit</button>
      </li>
    ));
    return <ul>{todoList}</ul>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <TodoApp />;
root.render(element);
