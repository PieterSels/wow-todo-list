import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [frequency, setFrequency] = useState("");

  const [filterMember, setFilterMember] = useState("");
  const [filterFrequency, setFilterFrequency] = useState("");

  const familyMembers = ["Alice", "Bob", "Charlie", "Daisy"];
  const frequencies = ["Daily", "Weekly", "Monthly"];

  const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px",
};


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "" || assignedTo === "" || frequency === "") return;
    setTodos([...todos, { text: input, completed: false, assignedTo, frequency }]);
    setInput("");
    setAssignedTo("");
    setFrequency("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const resetCompleted = (targetFrequency) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.frequency === targetFrequency && todo.completed) {
        return { ...todo, completed: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      (filterMember === "" || todo.assignedTo === filterMember) &&
      (filterFrequency === "" || todo.frequency === filterFrequency)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Family To-Do List</h2>

      <div className="clear-buttons">
        <button onClick={() => resetCompleted("Daily")}>Clear Daily</button>
        <button onClick={() => resetCompleted("Weekly")}>Clear Weekly</button>
        <button onClick={() => resetCompleted("Monthly")}>Clear Monthly</button>
      </div>
      
      <div className="add-task-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />

        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Assign to...</option>
          {familyMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>

        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="">Select frequency...</option>
          {frequencies.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>

        <button onClick={addTodo}>Add</button>
      </div>

      <hr />

      <h4>🔍 Filter Tasks</h4>
      <div className="filter-section">
        <select value={filterMember} onChange={(e) => setFilterMember(e.target.value)}>
          <option value="">All members</option>
          {familyMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>

        <select value={filterFrequency} onChange={(e) => setFilterFrequency(e.target.value)}>
          <option value="">All frequencies</option>
          {frequencies.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>


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
          {filteredTodos.map((todo, index) => (
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

    </div>
  );
}

export default App;
