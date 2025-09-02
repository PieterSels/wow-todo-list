import React from "react";
import "./style.css";

function AddTaskForm({
  input,
  setInput,
  assignedTo,
  setAssignedTo,
  frequency,
  setFrequency,
  familyMembers,
  frequencies,
  addTodo,
}) {
  return (
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
  );
}

export default AddTaskForm;