import React, { useState, useEffect } from "react";
import "./style.css";

import ClearButtons from "./components/clear-buttons";
import AddTaskForm from "./components/add-task-form";
import FilterSection from "./components/filter-section";
import TaskTable from "./components/task-table";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
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
    console.log("Resetting:", targetFrequency);
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
      <h2>📝 Wow To-Do List</h2>

      <ClearButtons resetCompleted={resetCompleted} />
      
      <AddTaskForm
        input={input}
        setInput={setInput}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        frequency={frequency}
        setFrequency={setFrequency}
        familyMembers={familyMembers}
        frequencies={frequencies}
        addTodo={addTodo}
      />

      <hr />
      <h4>🔍 Filter Tasks</h4>

      <FilterSection
        filterMember={filterMember}
        setFilterMember={setFilterMember}
        filterFrequency={filterFrequency}
        setFilterFrequency={setFilterFrequency}
        familyMembers={familyMembers}
        frequencies={frequencies}
      />

      <TaskTable
        todos={filteredTodos}
        thStyle={thStyle}
        tdStyle={tdStyle}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

    </div>
  );
}

export default App;
