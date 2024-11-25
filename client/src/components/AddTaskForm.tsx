// src/components/AddTaskForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, X } from 'lucide-react';
import { Task } from '../types/tasks';

interface AddTaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    deadline: new Date().toISOString().split('T')[0],
    status: 'pending' as Task['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      deadline: new Date(formData.deadline),
      status: formData.status,
    } as Omit<Task, 'id'>);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button onClick={onClose} className="hover:bg-blue-600 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title with icon */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag size={18} />
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Deadline with calendar icon */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar size={18} />
              Deadline
            </label>
            <input
              type="datetime-local" // Changed from type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag size={18} />
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🚧 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};