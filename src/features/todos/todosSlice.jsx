import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loadTodos, saveTodos } from '../../utils/localStorage'

// Simula llamada a API
const fakeApi = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { id: 1, text: 'Aprender Redux Toolkit' },
      { id: 2, text: 'Crear ToDo List' },
    ])
  }, 1000)
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const data = await response.json()
    // Simplificar formato
    return data.map(todo => ({ id: todo.id, text: todo.title }))
  })
  

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: loadTodos() || [],
    status: 'idle',
  },
  reducers: {
    addTodo: (state, action) => {
        const newTodo = {
          id: Date.now(),
          text: action.payload,
        }
        state.items.push(newTodo)
        saveTodos(state.items)
      },
      removeTodo: (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload)
        saveTodos(state.items)
      },
   
    editTodo: (state, action) => {
        const { id, newText } = action.payload
        const todo = state.items.find(t => t.id === id)
        if (todo) {
          todo.text = newText
        }
      }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed'
      })
  },
  
  
})

export const { addTodo, removeTodo, editTodo } = todosSlice.actions
export default todosSlice.reducer
