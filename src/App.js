import './App.css'
import InputElement from './components/InputElement'
import TodoList from './components/TodoList'

function App () {
  return (
    <div className='container'>
      <h1>
        <span className='titlefirst'>Todo</span>{' '}
        <span className='titlesecond'>Playground</span>
      </h1>
      <InputElement />
      <TodoList />
    </div>
  )
}

export default App
