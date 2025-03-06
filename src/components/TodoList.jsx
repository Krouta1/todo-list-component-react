import React, { useState, useCallback } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const updateTasks = useCallback((callback) => {
    setTasks((prevTasks) => callback([...prevTasks]));
  }, []);

  const handleInputChange = (event) => setNewTask(event.target.value);

  const addTask = () => {
    if (newTask.trim()) {
      updateTasks((tasks) => [...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) =>
    updateTasks((tasks) => tasks.filter((_, i) => i !== index));

  const swapTasks = (index1, index2) => {
    updateTasks((tasks) => {
      if (index1 < 0 || index2 >= tasks.length) return tasks;
      [tasks[index1], tasks[index2]] = [tasks[index2], tasks[index1]];
      return tasks;
    });
  };

  return (
    <div className='text-center mt-20 text-xl'>
      <h1 className='text-3xl font-bold mb-4'>To-Do List</h1>
      <div className='flex justify-center gap-2 mb-4'>
        <input
          type='text'
          placeholder='Enter a task...'
          value={newTask}
          onChange={handleInputChange}
          className='border-2 border-gray-300 p-2 rounded-md'
        />
        <button
          className='text-lg px-4 py-2 font-bold bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
          type='submit'
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} swapTasks={swapTasks} />
    </div>
  );
};

const TaskList = ({ tasks, deleteTask, swapTasks }) => (
  <ol className='list-decimal list-inside space-y-2'>
    {tasks.map((task, index) => (
      <TaskItem
        key={task + index}
        task={task}
        index={index}
        deleteTask={deleteTask}
        swapTasks={swapTasks}
        isFirst={index === 0}
        isLast={index === tasks.length - 1}
      />
    ))}
  </ol>
);

const TaskItem = ({ task, index, deleteTask, swapTasks, isFirst, isLast }) => (
  <li className='flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-md'>
    <span className='flex-1'>{task}</span>
    <div className='flex gap-2'>
      <button
        className='px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
        onClick={() => deleteTask(index)}
      >
        🗑️
      </button>
      <button
        className={`px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ${
          isFirst ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => swapTasks(index, index - 1)}
        disabled={isFirst}
      >
        ☝️
      </button>
      <button
        className={`px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ${
          isLast ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => swapTasks(index, index + 1)}
        disabled={isLast}
      >
        👇
      </button>
    </div>
  </li>
);

export default TodoList;
