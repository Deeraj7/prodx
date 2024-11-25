// src/components/TaskCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types/tasks';
import { 
  Clock, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  Timer,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { Countdown } from './Countdown';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  // Get status icon and color
  const getStatusInfo = () => {
    switch (task.status) {
      case 'completed':
        return { 
          icon: <CheckCircle className="w-5 h-5" />, 
          color: 'bg-green-100 text-green-800',
          bgColor: 'bg-green-50'
        };
      case 'in-progress':
        return { 
          icon: <PlayCircle className="w-5 h-5" />, 
          color: 'bg-blue-100 text-blue-800',
          bgColor: 'bg-blue-50'
        };
      default:
        return { 
          icon: <AlertCircle className="w-5 h-5" />, 
          color: 'bg-yellow-100 text-yellow-800',
          bgColor: 'bg-yellow-50'
        };
    }
  };

  const { icon, color, bgColor } = getStatusInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`border p-6 rounded-xl shadow-sm ${bgColor}`}
    >
      <div className="flex justify-between items-start mb-4">
        <motion.h3 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="font-bold text-lg text-gray-800"
        >
          {task.title}
        </motion.h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>

      <Countdown deadline={new Date(task.deadline)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex items-center justify-between"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-3 py-1 rounded-full ${color}`}
        >
          {icon}
          <span className="text-sm font-medium capitalize">{task.status.replace('-', ' ')}</span>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            const nextStatus = {
              'pending': 'in-progress',
              'in-progress': 'completed',
              'completed': 'pending'
            }[task.status] as Task['status'];
            onStatusChange(task.id, nextStatus);
          }}
          className={`p-2 rounded-full ${color} bg-opacity-20 hover:bg-opacity-30 transition-colors`}
        >
          <Clock className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};