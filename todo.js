class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    const currentTodos = this.getTodosFromLocalStrage();
    this.state = {
      newTodo: "",
      changedTodo: "",
      todos: currentTodos,
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
  }

  handleChange(text) {
    this.setState({ newTodo: text });
  }

  handleChangeEdit(text) {
    this.setState({ selectedTodoForEdit: text });
  }

  getTodosFromLocalStrage() {
    if (Object.prototype.hasOwnProperty.call(localStorage, "todoList")) {
      const todoListJson = localStorage.getItem("todoList");
      const todoList = JSON.parse(todoListJson);
      return todoList;
    } else {
      return [];
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
    console.log("update!!!!");
    console.log(index);
    // e.preventDefault()
    if (this.state.selectedTodoForEdit === "") return;
    const todos = this.state.todos;
    todos.splice(index, 1, this.state.selectedTodoForEdit);
    const json = JSON.stringify(todos, undefined, 0);
    localStorage.setItem("todoList", json);
    this.setState({ selectedTodoForEdit: "" });
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

  render() {
    return (
      <div>
        <CreateForm
          newTodo={this.state.newTodo}
          onNewTodoChange={this.handleChange}
          addTodo={this.addTodo}
        />
        <p>TodoAppの中からのnewTodo: {this.state.newTodo}</p>
        <EditForm
          changedTodo={this.state.changedTodo}
          onTodoChange={this.handleChangeEdit}
          updateTodo={this.updateTodo}
        />
        <p>
          TodoAppのrender関数内でstate.selectedTodoForEditを呼んだ場合：
          {this.state.selectedTodoForEdit}
        </p>
        <FormSwitcher
          isChanging={this.state.isChanging}
          selectedTodo={this.state.selectedTodoForEdit}
          index={this.state.selectedTodoIndexForEdit}
          handleChangeEdit={this.handleChangeEdit}
          updateTodo={this.updateTodo}
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
        <label htmlFor="">新規登録:</label>
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
    console.log(this);
    console.log(e.target.value);
    this.props.onTodoChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="">更新:</label>
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
        <p>selectedTodo: {this.props.selectedTodo}</p>
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
        />
      );
      console.log(
        `FormSwitcherの中で参照したselectedTodo: ${this.props.selectedTodo}`
      );
      console.log(
        `FormSwitcherの中で参照したselectedindex: ${this.props.index}`
      );
    } else {
      form = <CreateForm />;
    }
    return <div>{form}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <TodoApp />;
root.render(element);
