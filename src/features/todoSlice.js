import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initTodo: (state, action) => {
      state.value = action.payload
    },
    addTodo: (state, action) => {
      state.value.push(action.payload)
    },
    editTodo: (state, action) => {
      state.value = state.value.map(t =>
        t.id === action.payload.id
          ? {
              ...t,
              text: action.payload.text ?? t.text,
              completed: action.payload.completed ?? t.completed
            }
          : t
      )
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter(t => t.id !== action.payload)
    }
  }
})

export const { initTodo, addTodo, editTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer
