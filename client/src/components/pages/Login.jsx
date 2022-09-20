import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/loginImage.png';
import '../styles/registerlogin.css';
import { Title } from '../Title';

function Login({ setAuth }) {
  Title('mStack - Login');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  // console.log(setAuth);
  const navigate = useNavigate();
  let name, value;
  const changeHandler = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password !== '') {
      try {
        const result = await fetch(
          'https://mernprojectf.herokuapp.com/user/login',
          {
            // mode: 'no-cors',
            method: 'POST',
            // redirect: 'follow',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            // credentials: 'same-origin',
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        if (result.status === 400 || result.status === 401 || !result) {
          window.alert('Invalid user details');
        } else {
          window.alert('Logged in successfully');
          setTimeout(() => {
            window.location.reload();
          }, 500);
          navigate('/home');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      window.alert('Every blank field must be required');
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="row mt-5">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <form
            action="https://mernprojectf.herokuapp.com/user/login"
            method="post"
            className="mt-5 p-4 "
          >
            <h1>Don't share your login details</h1>
            <br />
            <br />
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                onChange={changeHandler}
                value={user.email}
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={changeHandler}
                value={user.password}
                placeholder="password"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              id="button"
            >
              Login
            </button>
          </form>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="2000"
          >
            <img src={loginImage} alt="loginImage" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
