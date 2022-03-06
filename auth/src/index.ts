import express from 'express'
import { json } from 'body-parser'

const app = express();
app.use(json())

app.get('/api/users/currentUser', (req, res) =>{
res.send({
  user: 1,
  email: 'shatyaki_dutt@hotmail.com',
  message: 'success'
})
})

app.listen(3000, () =>{
  console.log('Auth service started on port 3000')
})