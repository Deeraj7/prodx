// src/pages/dashboard/TaskList.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../../types/tasks';
import { TaskCard } from '../../components/TaskCard';
import { AddTaskForm } from '../../components/AddTaskForm'; // Add this import
import { PlusCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react'; // Add icons

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false); // Add this state

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Add this function to handle new task creation
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(), // Simple ID generation
    };
    setTasks([...tasks, task]);
  };

  // Calculate task statistics
  const stats = {
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="p-4">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="text-gray-500 text-sm mb-1">Total Tasks</div>
          <div className="text-2xl font-bold">{tasks.length}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-50 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="text-yellow-500" />
            <span className="text-gray-500 text-sm">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" />
            <span className="text-gray-500 text-sm">In Progress</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <span className="text-gray-500 text-sm">Completed</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </motion.div>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={20} />
          Add New Task
        </motion.button>
      </div>

      {/* Tasks Grid */}
      <motion.div 
        layout
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddTaskForm
            onSubmit={handleAddTask}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};