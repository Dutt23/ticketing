import { useState } from 'react';
import  useRequest from '../../hooks/use-request'
import { useRouter } from 'next/router'
const SignUp = () => {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, renderErrors } = useRequest({
    url: '/api/users/signin',
    body: {
      email, password
    },
    method: 'post',
    onSuccess: () => router.push('/')
  });

  const onSubmit = async (event) =>{
    event.preventDefault();
    doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
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
      {renderErrors()}
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
}

export default SignUp