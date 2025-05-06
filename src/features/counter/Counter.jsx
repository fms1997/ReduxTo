import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './counterSlice'

const Counter = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Contador: {count}</h2>
      <button onClick={() => dispatch(increment())}>Incrementar</button>
      <button onClick={() => dispatch(decrement())}>Decrementar</button>
      <button onClick={() => dispatch(reset())}>Resetear</button>
    </div>
  )
}

export default Counter
