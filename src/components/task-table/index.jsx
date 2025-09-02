import React from "react";
import "./style.css";

function TaskTable({ todos, thStyle, tdStyle, toggleTodo, deleteTodo }) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th style={thStyle}>Task</th>
          <th style={thStyle}>Assigned To</th>
          <th style={thStyle}>Frequency</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td style={tdStyle}>{todo.text}</td>
            <td style={tdStyle}>{todo.assignedTo}</td>
            <td style={tdStyle}>{todo.frequency}</td>
            <td style={tdStyle}>
              <span
                onClick={() => toggleTodo(index)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                  color: todo.completed ? "gray" : "black",
                }}
              >
                {todo.completed ? "✅ Done" : "🕒 Pending"}
              </span>
            </td>
            <td style={tdStyle}>
              <button onClick={() => deleteTodo(index)}>❌ Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;