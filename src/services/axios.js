import axios from 'axios'

export default axios.create({
  baseURL: 'https://todoapp-8a03f.firebaseio.com/'
})
