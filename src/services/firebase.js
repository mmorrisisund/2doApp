import axios from 'axios'

let fb

export default ({ userId, listId }) => {
  // TODO: Figure out how to not recreate each time
  // if (fb && userId === userId && listID === lis) return fb

  const baseUrl = `https://todoapp-8a03f.firebaseio.com/users/${userId}/userLists/${listId}`
  fb = axios.create({ baseURL: baseUrl })

  return {
    getTodoList,
    addTodo,
    deleteTodo,
    toggleStatus
  }
}

const getTodoList = async () => {
  const {
    data: { name, todos }
  } = await fb.get(`.json`)

  if (todos) {
    const todosArr = Object.keys(todos).map(key => {
      return {
        id: key,
        description: todos[key].description,
        finished: todos[key].finished
      }
    })
    return {
      name,
      todos: todosArr
    }
  }
  return {
    name,
    todos: []
  }
}
// createTodoList
const addTodo = async todo => {
  const newTodo = {
    description: todo,
    finished: false
  }

  const {
    data: { name }
  } = await fb.post('/todos.json', JSON.stringify(newTodo))

  newTodo.id = name
  return newTodo
}

const deleteTodo = async id => {
  await fb.delete(`/todos/${id}.json`)
}

const toggleStatus = async todo => {
  todo.finished = !todo.finished
  await fb.patch(`/todos/${todo.id}.json`, { finished: todo.finished })
  return todo
}
