import axios from './axios'

export const getTodoList = async () => {
  const { data } = await axios.get('/todoList.json')

  const todos = Object.keys(data).map(key => {
    return {
      id: key,
      description: data[key].description,
      finished: data[key].finished
    }
  })
  return todos
}
// createTodoList
export const addTodo = async todo => {
  const newTodo = {
    description: todo,
    finished: false
  }

  const { data: name } = await axios.post(
    '/todoList.json',
    JSON.stringify(newTodo)
  )
  newTodo.id = name
  return newTodo
}

export const deleteTodo = async id => {
  await axios.delete(`/todoList/${id}.json`)
}

export const toggleStatus = async todo => {
  todo.finished = !todo.finished
  await axios.patch(`/todoList/${todo.id}.json`, { finished: todo.finished })
  return todo
}
