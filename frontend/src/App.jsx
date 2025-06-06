

import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; // Correctly import Draggable and Droppable
import { PlusCircle, XCircle, Edit2, Trash2 } from 'lucide-react'; // Icons for actions

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:3001/api';

// TaskCard component - Represents a single draggable task
const TaskCard = ({ task, index, onEdit, onDelete }) => {
  return (
    <div
      className="bg-white p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
      </div>
      <div className="flex space-x-2 mt-2 sm:mt-0">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Edit task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

// Column component - Represents a single status column (To Do, In Progress, Done)
const Column = ({ title, tasks, onAddTask, onEditTask, onDeleteTask, droppableProvided }) => {
  const columnClasses = {
    'To Do': 'bg-red-50',
    'In Progress': 'bg-yellow-50',
    'Done': 'bg-green-50',
  };

  return (
    <div
      className={`flex-1 min-w-[280px] max-w-sm border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col ${columnClasses[title] || 'bg-gray-50'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title} ({tasks.length})</h2>
        {title === 'To Do' && ( // Only allow adding tasks to 'To Do' column initially
          <button
            onClick={() => onAddTask(title)}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label={`Add new task to ${title}`}
          >
            <PlusCircle size={20} />
          </button>
        )}
      </div>
      <div
        ref={droppableProvided.innerRef}
        {...droppableProvided.droppableProps}
        className="flex-1 min-h-[100px] p-2 rounded-md bg-gray-100/50"
      >
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 italic py-4">No tasks here!</p>
        ) : (
          tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(draggableProvided) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                >
                  <TaskCard task={task} index={index} onEdit={onEditTask} onDelete={onDeleteTask} />
                </div>
              )}
            </Draggable>
          ))
        )}
        {droppableProvided.placeholder} {/* Placeholder for dragged items */}
      </div>
    </div>
  );
};

// TaskModal component - For creating or editing tasks
const TaskModal = ({ task, onClose, onSubmit }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'To Do'); // Default status for new tasks

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title cannot be empty!'); // Using alert for simplicity as per instructions, but generally a custom modal message is preferred.
      return;
    }
    onSubmit({ ...task, title, description, status }); // Pass updated/new task data
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <XCircle size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{task ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App component
export default function App() {
  const [tasks, setTasks] = useState({}); // Stores tasks grouped by status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Task being edited, null if creating new

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Group tasks by status for display
        const groupedTasks = {
          'To Do': data.filter(task => task.status === 'To Do'),
          'In Progress': data.filter(task => task.status === 'In Progress'),
          'Done': data.filter(task => task.status === 'Done'),
        };
        setTasks(groupedTasks);
      } catch (e) {
        console.error('Error fetching tasks:', e);
        setError('Failed to load tasks. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // Handles the end of a drag-and-drop operation
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // If task dropped outside a droppable area or back to original position
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    // Deep copy tasks to ensure immutability
    const newTasks = { ...tasks };

    // Find the task that was dragged
    let draggedTask = null;
    let draggedTaskIndex = -1;

    // Remove the dragged task from its original column
    newTasks[startColumnId] = newTasks[startColumnId].filter((task, index) => {
        if (task.id === draggableId) {
            draggedTask = task;
            draggedTaskIndex = index;
            return false; // Remove this task
        }
        return true; // Keep other tasks
    });

    if (!draggedTask) return; // Should not happen if draggableId is valid

    // Update the status of the dragged task
    draggedTask.status = endColumnId;

    // Add the dragged task to its new column at the specified index
    newTasks[endColumnId] = [...newTasks[endColumnId]]; // Ensure new array for modification
    newTasks[endColumnId].splice(destination.index, 0, draggedTask);

    setTasks(newTasks); // Optimistically update UI

    // Update the backend
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${draggableId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: endColumnId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update task status on backend: ${response.status}`);
      }
    } catch (e) {
      console.error('Error updating task status on backend:', e);
      // Revert UI if backend update fails
      const revertedTasks = { ...tasks }; // Original tasks state
      setTasks(revertedTasks);
      setError('Failed to update task status. Please try again.');
    }
  };

  // Handles adding or updating a task
  const handleTaskSubmit = async (taskData) => {
    try {
      let response;
      if (taskData.id) {
        // Update existing task
        response = await fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
      } else {
        // Create new task
        response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to save task: ${response.status}`);
      }

      const savedTask = await response.json();

      // Update tasks state
      setTasks(prevTasks => {
        const newGroupedTasks = { ...prevTasks };

        // Remove the task from its old status column if its status changed
        if (taskData.id && taskData.status !== savedTask.status) {
          Object.keys(newGroupedTasks).forEach(columnId => {
            newGroupedTasks[columnId] = newGroupedTasks[columnId].filter(task => task.id !== savedTask.id);
          });
        }

        // Add or update the task in its correct status column
        if (!newGroupedTasks[savedTask.status]) {
          newGroupedTasks[savedTask.status] = [];
        }
        const taskIndex = newGroupedTasks[savedTask.status].findIndex(t => t.id === savedTask.id);
        if (taskIndex > -1) {
          newGroupedTasks[savedTask.status][taskIndex] = savedTask; // Update existing
        } else {
          newGroupedTasks[savedTask.status].push(savedTask); // Add new
        }
        return newGroupedTasks;
      });

      setShowModal(false); // Close modal on success
      setEditingTask(null);
    } catch (e) {
      console.error('Error saving task:', e);
      setError('Failed to save task. Please try again.');
    }
  };

  // Opens the modal for creating a new task
  const handleAddTask = (status) => {
    setEditingTask({ id: null, title: '', description: '', status: status }); // New task
    setShowModal(true);
  };

  // Opens the modal for editing an existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Handles deleting a task
  const handleDeleteTask = async (taskId) => {
    // Show a confirmation dialog
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status}`);
      }

      // Optimistically update UI by removing the task
      setTasks(prevTasks => {
        const newGroupedTasks = { ...prevTasks };
        Object.keys(newGroupedTasks).forEach(columnId => {
          newGroupedTasks[columnId] = newGroupedTasks[columnId].filter(task => task.id !== taskId);
        });
        return newGroupedTasks;
      });
    } catch (e) {
      console.error('Error deleting task:', e);
      setError('Failed to delete task. Please try again.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-700 p-4">
        <p className="text-lg font-semibold">{error}</p>
        <p className="text-sm mt-2">Please ensure the backend server is running and accessible at {API_BASE_URL}.</p>
      </div>
    );
  }

  const columnOrder = ['To Do', 'In Progress', 'Done']; // Define the order of columns

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-sm">
        Task Board
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-start gap-6 max-w-7xl mx-auto">
          {columnOrder.map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(droppableProvided) => (
                <Column
                  key={columnId}
                  title={columnId}
                  tasks={tasks[columnId] || []} // Ensure tasks are an array
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  droppableProvided={droppableProvided}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSubmit={handleTaskSubmit}
        />
      )}
    </div>
  );
}