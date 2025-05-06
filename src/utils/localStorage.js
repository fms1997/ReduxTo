export const loadTodos = () => {
    try {
      const serializedData = localStorage.getItem('todos')
      return serializedData ? JSON.parse(serializedData) : undefined
    } catch (err) {
      console.error('Error al cargar desde localStorage', err)
      return undefined
    }
  }
  
  export const saveTodos = (todos) => {
    try {
      const serializedData = JSON.stringify(todos)
      localStorage.setItem('todos', serializedData)
    } catch (err) {
      console.error('Error al guardar en localStorage', err)
    }
  }
  