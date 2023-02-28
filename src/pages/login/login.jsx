import Subnavbar from '../../components/subnavbar/subnavbar';
import './login.css';
import logo from '../../images/Logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';
import { SiFacebook } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Animation from '../../components/cssAnimation/animation';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { useState } from 'react';
// import { GoogleLoginButton } from 'react-social-login-buttons';
// import Txt from '../../components/txtAnimation/txtAnimation';
// import Search from '../../components/searchBar/search';
const Login = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('userDetails'))
      : null
  );
  return (
    <>
      <Subnavbar />
      {loginData ? (
        <div>
          <h3>You logged in as {loginData.email}</h3>
          <button>Logout</button>
        </div>
      ) : (
        <div className='loginBox'>
          <div className='signInTop signIn'>
            <div className='logoBox'>
              <Link to='/'>
                <img className='signInLogo logo' src={logo} alt='logo' />
              </Link>
            </div>
            <div className='line lineLogin'></div>
          </div>
          <div className='wlcmTxt'>
            <h3> Choose any Login method</h3>
          </div>
          <Animation />
          <div className='signIn'>
            <LoginSocialGoogle
              client_id={
                '980638331446-9io0sa1et63bgfsqu2n0282dbag0062g.apps.googleusercontent.com'
              }
              scope='openid profile email'
              discoveryDocs='claims_supported'
              access_type='offline'
              onResolve={({ provider, data }) => {
                console.log(provider, data);
                sessionStorage.setItem('userDetails', JSON.stringify(data));
                setLoginData(data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <button className='loginBtn'>
                <FcGoogle className='g signInIcons' size={25} />
                Login with Google
              </button>
            </LoginSocialGoogle>

            <button className='loginBtn'>
              <GoMarkGithub className='gh signInIcons' size={25} />
              Login with GitHub
            </button>
            <button className='loginBtn'>
              <SiFacebook className='fb signInIcons' size={25} />
              Login with Facebook
            </button>
          </div>
          <div className='signInTxt signIn'>
            All you personl detials are safe with us.
          </div>
          <div>
            <LoginSocialGoogle
              client_id={'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'}
              scope='openid profile email'
              discoveryDocs='claims_supported'
              access_type='offline'
              onResolve={({ provider, data }) => {
                console.log(provider, data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            ></LoginSocialGoogle>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
