import React, { useRef, useState, useEffect } from 'react'
import { MdOutlineAddTask } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todoSlice'

const InputElement = () => {
  const [todoText, setTodoText] = useState('')
  const inputRef = useRef()

  const dispatch = useDispatch()

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
      return
    }
    dispatch(
      addTodo({
        id: Date.now(),
        text: todoText,
        complete: false
      })
    )

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
