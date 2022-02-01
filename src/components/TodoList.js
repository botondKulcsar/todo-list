import React from 'react'
import TodoItem from './TodoItem'
import './styles.css'

const TodoList = ({ todos, deleteTodo, editTodo }) => {
  const realTodos = todos.filter(t => !t.completed)
  const completedTodos = todos.filter(t => t.completed)

  return (
    <div className='todolist__container'>
      {realTodos.length ? (
        <div className='todolist__uncompleted'>
          <h2>Yet to Do{realTodos.length > 1 ? 's' : ''}</h2>
          {realTodos.map(t => (
            <TodoItem
              key={t.id}
              todo={t}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      ) : (
        <h2>Hooray, no more todos!</h2>
      )}

      {completedTodos.length ? (
        <div className='todolist__completed'>
          <h2>Completed One{completedTodos.length > 1 ? 's' : ''}</h2>
          {completedTodos.map(t => (
            <TodoItem
              key={t.id}
              todo={t}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default TodoList
