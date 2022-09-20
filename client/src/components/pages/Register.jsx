import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerImage from '../images/register.png';
import '../styles/registerlogin.css';
import { Title } from '../Title';

function Register() {
  Title('mStack - Register');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();
  let name, value;
  const changeHandler = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = user;
    if (name && email && phone && password !== '') {
      try {
        const result = await fetch(
          'https://mernprojectf.herokuapp.com/user/register',
          {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              password,
            }),
          }
        );
        if (result.status === 500 || !result) {
          window.alert('User already registerd');
        } else {
          window.alert('Registered Successfully');
          setUser({
            name: '',
            email: '',
            phone: '',
            password: '',
          });
          navigate('/login');
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
      <div className="row text-center">
        <h1>Let's create an account</h1>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <form
            action="https://mernprojectf.herokuapp.com/user/register"
            method="POST"
            className="mt-5 p-4"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                type="name"
                className="form-control"
                id="name"
                onChange={changeHandler}
                value={user.name}
                placeholder="full name"
              />
            </div>
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
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                name="phone"
                type="phone"
                className="form-control"
                id="phone"
                onChange={changeHandler}
                value={user.phone}
                placeholder="+91"
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
              Register
            </button>
          </form>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            <img src={registerImage} alt="registerImage" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
