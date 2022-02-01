import React, { useRef, useState, useEffect } from 'react'
import { MdOutlineAddTask } from 'react-icons/md'

const InputElement = ({ addTodo }) => {
  const [todoText, setTodoText] = useState('')

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [todoText])

  const changeHandler = e => {
    setTodoText(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (todoText.length < 3) {
      alert('Todo content is way too short!')
      return
    }
    addTodo({
      type: 'add',
      payload: {
        text: todoText
      }
    })
    setTodoText('')
  }

  return (
    <form className='inputForm' onSubmit={submitHandler}>
      <input
        ref={inputRef}
        type='text'
        value={todoText}
        onChange={changeHandler}
        placeholder='Input todo here...'
      />
      <button type='submit'>
        <MdOutlineAddTask />
      </button>
    </form>
  )
}

export default InputElement
