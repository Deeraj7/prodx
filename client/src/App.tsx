// src/App.tsx
import { TaskList } from './pages/dashboard/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">ProdX</h1>
          <p className="text-center text-gray-600">Your Personal Productivity Tracker</p>
        </header>
        <main>
          <TaskList />
        </main>
      </div>
    </div>
  )
}

export default App