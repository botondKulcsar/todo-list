import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initTodo } from '../features/todoSlice'
import TodoItem from './TodoItem'
import './styles.css'

const TodoList = () => {
  const todos = useSelector(state => state.todos.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const retrievedTodos = localStorage.getItem('todos')
    if (retrievedTodos) {
      dispatch(initTodo(JSON.parse(retrievedTodos)))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const realTodos = todos.filter(t => !t.completed)
  const completedTodos = todos.filter(t => t.completed)

  return (
    <div className='todolist__container'>
      {realTodos.length ? (
        <div className='todolist__uncompleted'>
          <h2>Yet to Do{realTodos.length > 1 ? 's' : ''}</h2>
          {realTodos.map(t => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </div>
      ) : (
        <h2>Hooray, no more todos!</h2>
      )}

      {completedTodos.length ? (
        <div className='todolist__completed'>
          <h2>Completed One{completedTodos.length > 1 ? 's' : ''}</h2>
          {completedTodos.map(t => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default TodoList
