import { useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../../authContext';

const UserDetails = (props) => {
  const navigate = useNavigate();

  // const { logIn, setLogIn } = useGlobalContext();

  const handleLogOut = () => {
    sessionStorage.removeItem('userDetails');
    // setLogIn(false);
    // console.log(logIn);
    navigate('/');
  };
  const data = props.data;
  return (
    <>
      You are logged in
      <div>Hi {data.given_name}</div>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};
export default UserDetails;
