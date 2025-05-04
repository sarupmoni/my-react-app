import { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (event.key === "Enter" && this.state.value) {
      this.props.addItem(this.state.value);
      this.setState({ value: "" });
    }
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        placeholder="add Items"
      />
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.taskId);
  }

  render() {
    return (
      <>
        <div
          className="task"
          style={{ textDecorationLine: this.props.done }}
          onClick={this.onClick}
        >
          {this.props.task}
        </div>
      </>
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, onToggle } = this.props;
    return items.map((item, index) => (
      <Task
        done={item.done}
        key={index}
        task={item.task}
        taskId={item.taskId}
        onClick={onToggle}
      />
    ));
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.todos.map((todoItem, index) => (
      <div key={index} className="todo">
        <h1>{todoItem.todo}</h1>
        <Input addItem={(task) => this.props.addItem(task, index)} />
        <TaskList
          items={todoItem.items}
          onToggle={(taskId) => this.props.onToggle(taskId, index)}
        />
      </div>
    ));
  }
}

class MultipleTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoId: 0,
    };
    this.addTask = this.addTask.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onToggle(taskId, todoId) {
    this.setState((prev) => {
      const todos = prev.todos.map((todo) => {
        if (todo.todoId !== todoId) return todo;

        const updatedItems = todo.items.map((item) =>
          item.taskId === taskId
            ? { ...item, done: item.done === "none" ? "line-through" : "none" }
            : item
        );

        return { ...todo, items: updatedItems };
      });

      return { todos };
    });
  }

  addItem(task, todoIndex) {
    this.setState((prev) => {
      const todos = prev.todos.map((todo) => {
        if (todo.todoId !== todoIndex) return todo;

        const newItem = {
          task,
          done: "none",
          taskId: todo.items.length,
        };

        return {
          ...todo,
          items: [...todo.items, newItem],
        };
      });

      return { todos };
    });
  }

  addTask(todo) {
    this.setState((prev) => {
      const todos = [...prev.todos, { todo, todoId: prev.todoId, items: [] }];

      return { todos, todoId: prev.todoId + 1 };
    });
  }

  render() {
    return (
      <>
        <div className="todo-input">
          <h1>Todo List</h1>
          <Input addItem={this.addTask} />
        </div>
        <Todo
          todos={this.state.todos}
          onToggle={this.onToggle}
          addItem={this.addItem}
        />
      </>
    );
  }
}

export default MultipleTodo;
