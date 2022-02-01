import { useEffect, useReducer } from 'react'
import './App.css'
import InputElement from './components/InputElement'
import TodoList from './components/TodoList'

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return action.payload.todos
    case 'add':
      return [
        ...state,
        { id: Date.now(), text: action.payload.text, completed: false }
      ]
    case 'edit':
      return state.map(t =>
        t.id === action.payload.id
          ? {
              ...t,
              text: action.payload.text ?? t.text,
              completed: action.payload.completed ?? t.completed
            }
          : t
      )
    case 'delete':
      return state.filter(t => t.id !== action.payload.id)
    default:
      throw new Error('something went wrong')
  }
}

function App () {
  const [todos, dispatch] = useReducer(todoReducer, [])

  useEffect(() => {
    const retrievedTodos = localStorage.getItem('todos')
    if (retrievedTodos) {
      dispatch({
        type: 'init',
        payload: {
          todos: JSON.parse(retrievedTodos)
        }
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='container'>
      <h1>
        <span className='titlefirst'>Todo</span>{' '}
        <span className='titlesecond'>Playground</span>
      </h1>
      <InputElement addTodo={dispatch} />
      <TodoList todos={todos} deleteTodo={dispatch} editTodo={dispatch} />
    </div>
  )
}

export default App
