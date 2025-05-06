import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo, editTodo } from './todosSlice'
import { useState, useEffect } from 'react'
import { fetchTodos } from './todosSlice'
 
export default function Todos() {
  const todos = useSelector(state => state.todos.items)
  const status = useSelector(state => state.todos.status)
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    if (status === 'idle' && todos.length === 0) {
      dispatch(fetchTodos())
    }
  }, [status, todos.length, dispatch])

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  const handleEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }))
      setEditId(null)
      setEditText('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-600 dark:text-green-400 tracking-tight">
        ✅ Gestor de Tareas
          </h1>

          {/* Input de nueva tarea */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="text"
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe una nueva tarea..."
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition"
              onClick={handleAdd}
            >
              Agregar
            </button>
          </div>

          {/* Lista de tareas */}
          {status === 'loading' ? (
            <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">Cargando tareas...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-gray-400">No hay tareas. Agrega una ✨</p>
          ) : (
            <ul className="space-y-4">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className="group flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
                >
                  {editId === todo.id ? (
                    <>
                      <input
                        className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="ml-3 flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm shadow"
                          onClick={() => handleSaveEdit(todo.id)}
                        >
                          💾
                        </button>
                        <button
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm shadow"
                          onClick={() => setEditId(null)}
                        >
                          ✖
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-base font-medium">{todo.text}</span>
                      <div className="ml-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm shadow"
                          onClick={() => handleEdit(todo.id, todo.text)}
                        >
                          ✏️
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow"
                          onClick={() => dispatch(removeTodo(todo.id))}
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
