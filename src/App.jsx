import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.onChange(this.props.taskId);
  }

  render() {
    return (
      <>
        <div>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={this.onChange}
          />
          <span>{this.props.task}</span>
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
    return items.map((item) => (
      <Task
        done={item.done}
        key={item.taskId}
        task={item.task}
        taskId={item.taskId}
        onChange={onToggle}
      />
    ));
  }
}

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
      this.state.value = "";
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

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], id: 1 };
    this.onToggle = this.onToggle.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onToggle(taskId) {
    this.setState((prev) => {
      return {
        items: prev.items.map((item) => {
          return taskId === item.taskId ? { ...item, done: !item.done } : item;
        }),
      };
    });
  }

  addItem(task) {
    this.setState((prev) => {
      const items = [...prev.items, { task, done: false, taskId: prev.id }];

      return { items, id: prev.id + 1 };
    });
  }

  render() {
    return (
      <>
        <h1>Todo</h1>
        <Input addItem={this.addItem} />
        <TaskList items={this.state.items} onToggle={this.onToggle} />
      </>
    );
  }
}

export default Todo;
