import Counter from './features/counter/Counter'
import Todos from './features/todos/Todos'
import './index.css'

function App() {
  return (
    <div>
      <h1>Mi App con Redux Toolkit</h1>
      <Counter />
      <Todos />
    </div>
  )
}

export default App
