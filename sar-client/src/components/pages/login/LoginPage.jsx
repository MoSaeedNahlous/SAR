import React from 'react';
import LoginForm from '../../ui/forms/login/LoginForm';

const LoginPage = (props) => {
  return <div>{props.manager ? <LoginForm manager /> : <LoginForm emp />}</div>;
};

export default LoginPage;
