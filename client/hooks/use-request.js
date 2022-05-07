
import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) =>{
  const [errors, setErrors] = useState(null);

  const doRequest = async () =>{
    try {
      setErrors(null);
      const response = await axios[method](url, body ?? {})
      onSuccess(response.data);
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  };


  const renderErrors = () => errors &&
    <div className='alert alert-danger'>
    <h4>Opps....</h4>
    <ul className='my-0'>
    {errors.map(error => <li key={error.message}> {error.message}</li>)}
    </ul>
    </div> 
  

  return {
    doRequest,
    renderErrors : renderErrors
  }
}