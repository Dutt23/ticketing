import { useState } from 'react';
import  useRequest from '../../hooks/use-request'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    body: {
      email, password
    },
    method: 'post'
  });

  const onSubmit = async (event) =>{
    event.preventDefault();
    doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          className="form-control"/>
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default SignUp