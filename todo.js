function CreateForm(props) {
  return (
    <div>
      <label htmlFor="">
        TODO:
      </label>
      <input type="text" />
      <button>Add</button>
    </div>
  )
}

function EditForm(props) {
  return (
    <div>
      <label htmlFor="">
        TODO:
      </label>
      <input type="text" />
      <button>Edit</button>
    </div>
  )
}

function TodoList(props) {
  const todos = props.todos;
  const todoList = todos.map((todo, index) =>
    <li key={index}>{todo}</li>
  );
  return(
    <ul>{todoList}</ul>
  )
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: ["hoge", "fuga", "puni", "mohe"]};
  }
  render(){
    return (
      <div>
        <CreateForm />
        <EditForm />
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <TodoApp />;
root.render(element);
