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

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { task: "Buy Milk", done: false, taskId: 1 },
        { task: "Buy Chocolate", done: false, taskId: 2 },
      ],
    };
    this.onToggle = this.onToggle.bind(this);
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

  render() {
    return (
      <>
        <h1>Todo</h1>
        <TaskList items={this.state.items} onToggle={this.onToggle} />
      </>
    );
  }
}

export default Todo;
