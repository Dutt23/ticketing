import express from 'express'

const router = express.Router();

router.post('/api/users/signout', (req, res) =>{
  res.send({
    user: 1,
    email: 'shatyaki_dutt@hotmail.com',
    message: 'success'
  })
})

export { router as signoutRouter}