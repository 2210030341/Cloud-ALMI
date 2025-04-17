import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (title.trim()) {
      const newTask = {
        title,
        description,
        dueDate,
        submitDate: new Date().toLocaleDateString(),
        status: 'In Progress',
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...tasks];
    updated[index].status =
      updated[index].status === 'In Progress' ? 'Completed' : 'In Progress';
    setTasks(updated);
  };

  // Count tasks
  const completedCount = tasks.filter((task) => task.status === 'Completed').length;
  const inProgressCount = tasks.filter((task) => task.status === 'In Progress').length;

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>📝 Smart To-Do List</h1>

      <div style={{ marginBottom: 20 }}>
        <strong>✅ Completed:</strong> {completedCount} &nbsp;&nbsp;
        <strong>🕒 In Progress:</strong> {inProgressCount}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        style={{ padding: 8, marginRight: 8 }}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        style={{ padding: 8, marginRight: 8 }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={addTask} style={{ padding: 8 }}>Add</button>

      <ul style={{ marginTop: 20 }}>
        {tasks.map((task, idx) => (
          <li key={idx} style={{ marginBottom: 15 }}>
            <strong>{task.title}</strong><br />
            {task.description && <small>{task.description}</small>}<br />
            {task.dueDate && <em>Due: {task.dueDate}</em>}<br />
            {task.submitDate && <em>Submitted: {task.submitDate}</em>}<br />
            <em>Status: {task.status}</em><br />
            <button onClick={() => toggleStatus(idx)} style={{ marginRight: 8 }}>
              {task.status === 'In Progress' ? '✅ Mark Completed' : '⏳ Mark In Progress'}
            </button>
            <button onClick={() => removeTask(idx)}>❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
