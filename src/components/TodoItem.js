import React, { useEffect, useRef, useState } from 'react'
import {
  MdEdit,
  MdOutlineRemoveDone,
  MdOutlineDone,
  MdOutlineDelete
} from 'react-icons/md'

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [edit, setEdit] = useState(false)

  const [todoContent, setTodoContent] = useState(todo.text)

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [edit])

  const deleteHandler = () => {
    onDelete({
      type: 'delete',
      payload: {
        id: todo.id
      }
    })
  }

  const editHandler = (e = null) => {
    if (todo.completed) {
      return
    }
    if (!edit) {
      setEdit(true)
    } else {
      e.preventDefault()

      onEdit({
        type: 'edit',
        payload: {
          id: todo.id,
          text: todoContent
        }
      })
      setEdit(false)
    }
  }

  const changeCompletedHandler = () => {
    onEdit({
      type: 'edit',
      payload: {
        id: todo.id,
        completed: !todo.completed
      }
    })
  }

  return (
    <div
      className={`todoitem__container ${
        todo.completed ? 'completed' : 'notcompleted'
      }`}
    >
      <div
        onClick={editHandler}
        className='todoitem__content'
        title={!todo.completed && 'click to edit'}
      >
        {edit ? (
          <form onSubmit={editHandler} style={{ display: 'inline' }}>
            <input
              ref={inputRef}
              value={todoContent}
              onChange={({ target }) => setTodoContent(target.value)}
            />
          </form>
        ) : todo.completed ? (
          <s>{todo.text}</s>
        ) : (
          <span>{todo.text}</span>
        )}
      </div>

      <div className='todoitem__icons'>
        {!todo.completed && (
          <span onClick={editHandler}>
            {edit ? (
              <span className='icon save' title='save'>
                OK
              </span>
            ) : (
              <span className='icon edit' title='edit'>
                <MdEdit />
              </span>
            )}
          </span>
        )}
        <span onClick={deleteHandler}>
          <MdOutlineDelete className='icon' title='delete' />
        </span>
        <span>
          <label htmlFor={todo.id}>
            {todo.completed ? (
              <MdOutlineRemoveDone
                className='icon'
                title='mark not completed'
              />
            ) : (
              <MdOutlineDone className='icon' title='mark completed' />
            )}
          </label>
        </span>
        <input
          id={todo.id}
          type='checkbox'
          checked={todo.completed}
          onChange={changeCompletedHandler}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default TodoItem
