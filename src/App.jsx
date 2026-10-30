
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('tasks')

  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        {
          id: 1,
          title: 'Create Login Page',
          description: 'Design the login page for the application.',
          assignee: 'Priya',
          dueDate: '2026-11-02',
          status: 'todo'
        },
        {
          id: 2,
          title: 'Develop Registration API',
          description: 'Create an API for user registration.',
          assignee: 'Rahul',
          dueDate: '2026-11-01',
          status: 'progress'
        },
        {
          id: 3,
          title: 'Design Homepage',
          description: 'Complete the homepage UI design.',
          assignee: 'Meena',
          dueDate: '2026-10-28',
          status: 'done'
        }
      ]
})

  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('all')
  const [editingTaskId, setEditingTaskId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: ''
  })

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Open form for adding a task
  function handleAddTask() {
    setEditingTaskId(null)

    setFormData({
      title: '',
      description: '',
      assignee: '',
      dueDate: ''
    })

    setShowForm(true)
  }

  // Open form with existing task details
  function handleEdit(task) {
    setEditingTaskId(task.id)

    setFormData({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: task.dueDate
    })

    setShowForm(true)
  }

  // Save new task or update existing task
  function handleSubmit(event) {
    event.preventDefault()

    if (editingTaskId !== null) {
      setTasks(tasks.map(task =>
        task.id === editingTaskId
          ? { ...task, ...formData }
          : task
      ))
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        status: 'todo'
      }

      setTasks([...tasks, newTask])
    }

    closeForm()
  }

  // Close form and reset values
  function closeForm() {
    setShowForm(false)
    setEditingTaskId(null)

    setFormData({
      title: '',
      description: '',
      assignee: '',
      dueDate: ''
    })
  }

  // Delete task
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  // Move task between columns
  function handleStatusChange(id, newStatus) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: newStatus }
        : task
    ))
  }

  function isOverdue(task) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dueDate = new Date(task.dueDate + 'T00:00:00')

    return dueDate < today && task.status !== 'done'
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesAssignee =
      assigneeFilter === 'all' ||
      task.assignee === assigneeFilter

    return matchesSearch && matchesAssignee
  })

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>Task Board</h1>
          <p>Manage your team's work in one place</p>
        </div>

        <button
          className="add-button"
          onClick={handleAddTask}
        >
          + Add Task
        </button>
      </header>

      {showForm && (
        <div className="form-container">

          <h2>
            {editingTaskId !== null
              ? 'Edit Task'
              : 'Create New Task'}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="assignee"
              placeholder="Assignee Name"
              value={formData.assignee}
              onChange={handleChange}
              required
            />

            <label>Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />

            <div className="form-buttons">

              <button type="submit" className="save-button">
                {editingTaskId !== null
                  ? 'Update Task'
                  : 'Save Task'}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={closeForm}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      
  <div className="filter-container">

    <input
      type="text"
      placeholder="Search tasks by title..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="search-input"
    />

    <select
      value={assigneeFilter}
      onChange={(event) => setAssigneeFilter(event.target.value)}
      className="filter-select"
    >
      <option value="all">All Assignees</option>

      {[...new Set(tasks.map(task => task.assignee))].map(assignee => (
        <option key={assignee} value={assignee}>
          {assignee}
        </option>
      ))}

    </select>

  </div>


      <main className="board">

        {columns.map(column => (
          <section className="column" key={column.id}>

            <div className="column-header">
              <h2>{column.title}</h2>

              <span>
                {filteredTasks.filter(
                  task => task.status === column.id
                ).length}
              </span>
            </div>
         
            {filteredTasks
              .filter(task => task.status === column.id)
              .map(task => (

                <article
                  className={`task-card ${isOverdue(task) ? 'overdue' : ''}`}
                  key={task.id}
                >

                  <h3>{task.title}</h3>

                  {isOverdue(task) && (
                    <span className="overdue-label">
                      Overdue
                    </span>
                  )}

                  <p>{task.description}</p>

                  <div className="task-details">
                    <span>👤 {task.assignee}</span>
                    <span>📅 {task.dueDate}</span>
                  </div>

                  <div className="task-actions">

                    <button
                      className="edit-button"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>

                  </div>

                  <select
                    className="status-select"
                    value={task.status}
                    onChange={(event) =>
                      handleStatusChange(
                        task.id,
                        event.target.value
                      )
                    }
                  >
                    <option value="todo">To Do</option>
                    <option value="progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                </article>
              ))}

          </section>

        ))}

      </main>
    </div>
  )
}

export default App
