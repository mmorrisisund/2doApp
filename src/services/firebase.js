import axios from 'axios'

let fb
let userId
let listId
const baseUrl = `https://todoapp-8a03f.firebaseio.com`

export default config => {
  // TODO: Figure out how to not recreate each time
  // if (fb && userId === userId && listID === lis) return fb

  userId = config.userId
  listId = config.listId

  fb = axios.create({ baseURL: baseUrl })

  return {
    getTodoList,
    getTodoLists,
    addTodo,
    deleteTodo,
    toggleStatus,
    setListId
  }
}

const setListId = id => {
  listId = id
}

const getTodoLists = async () => {
  if (!userId) throw new Error('User Id must be set')

  const { data: lists } = await fb.get(`/users/${userId}/userLists.json`)

  return Object.entries(lists).map(list => {
    const todos = Object.entries(list[1].todos).map(todo => ({
      ...todo[1],
      id: todo[0]
    }))

    return {
      listId: list[0],
      name: list[1].name,
      todos
    }
  })
}

const getTodoList = async () => {
  if (!userId || !listId) {
    throw new Error('User Id and List Id must be set.')
  }

  const { data } = await fb.get(`/users/${userId}/userLists/${listId}.json`)

  if (data) {
    const { todos, name } = data
    if (todos) {
      const todosArr = Object.entries(todos).map(todo => {
        return { ...todo[1], id: todo[0] }
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
  return {
    name: '',
    todos: []
  }
}

const addTodo = async todo => {
  if (!userId || !listId) throw new Error('User Id and List Id must be set')

  const newTodo = {
    description: todo,
    finished: false
  }

  const {
    data: { name }
  } = await fb.post(
    `/users/${userId}/userLists/${listId}/todos.json`,
    JSON.stringify(newTodo)
  )

  newTodo.id = name
  return newTodo
}

const deleteTodo = async id => {
  if (!userId || !listId) throw new Error('User Id and List Id must be set')

  await fb.delete(`/users/${userId}/userLists/${listId}/todos/${id}.json`)
}

const toggleStatus = async todo => {
  if (!userId || !listId) throw new Error('User Id and List Id must be set')

  todo.finished = !todo.finished
  await fb.patch(`/users/${userId}/userLists/${listId}/todos/${todo.id}.json`, {
    finished: todo.finished
  })
  return todo
}
