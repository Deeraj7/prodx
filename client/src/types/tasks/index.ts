// src/types/tasks/index.ts
export interface Task {
  id: string;
  title: string;
  deadline: Date | string; // Allow both Date and string formats
  status: 'pending' | 'in-progress' | 'completed';
}