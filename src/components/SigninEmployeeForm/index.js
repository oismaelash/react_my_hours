import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';
import Block from 'styled-loaders-react/lib/components/Block';
import './index.css';

const SigninEmployeeForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/home' />
    }
  }

  const onSigninClicked = (e) => {
    e.preventDefault();

    let payload = {
      database: 'oowlish_test',
      email: email,
      password: password
    };
    
    setLoading(true);
    axios.post('https://eeag4mweoe.execute-api.us-east-1.amazonaws.com/dev/signin', payload)
      .then(res => {
        if (res.data.status == 'success')
          setRedirect(true);

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className='container'>
      {renderRedirect()}
      {
        loading ? 
        <Block/>
        :
        (
        <div className="body">
          <form onSubmit={onSigninClicked} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input type="email" id="email" name="email" className="form-control m-3" placeholder="employee@company.com" required autoFocus onChange={e => {setEmail(e.target.value)}} />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="password" name="password" className="form-control m-3" placeholder="Password" required onChange={e => {setPassword(e.target.value)}} />
            <Button color='primary' className="btn btn-lg btn-primary btn-block m-3" type="submit" >Sign in</Button>
            <Link to="/signup"><Button color='success' className="btn btn-lg btn-primary btn-block m-3" >Sign up</Button></Link>
          </form>
        </div>
        )
      }
    </div>
  );
}

export default SigninEmployeeForm;