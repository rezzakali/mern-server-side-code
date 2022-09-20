import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import messageImage from '../images/message.png';
import '../styles/registerlogin.css';

function Contact() {
  const [userMessage, setUserMessage] = useState({
    name: '',
    email: '',
    message: '',
  });

  let name, value;
  const changeHandler = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserMessage({ ...userMessage, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = userMessage;
    if (email && name && message !== '') {
      try {
        const result = await fetch('http://127.0.0.1:3001/user/message', {
          method: 'POST',
          // redirect: 'follow',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // credentials: 'same-origin',
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });

        if (result) {
          setTimeout(() => {
            setUserMessage({
              name: '',
              email: '',
              message: '',
            });
          }, 500);
          window.alert('Message send successfully!');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      window.alert('Blank field require!');
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div id="contact">
      <br />
      <br />
      <br />
      <br />
      <div className="row text-center">
        <h1>Have some questions?</h1>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <form
            action="http://127.0.0.1:3001/user/message"
            method="post"
            className="mt-5 p-4 "
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
                value={userMessage.name}
                placeholder="name"
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
                value={userMessage.email}
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <input
                type="text"
                name="message"
                onChange={changeHandler}
                value={userMessage.message}
                className="form-control"
                placeholder="Leave a message here"
                id="email"
                style={{ height: '100px' }}
              />
            </div>
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              id="button"
            >
              Send
            </button>
          </form>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 p-4">
          <div data-aos="fade-up">
            <img src={messageImage} alt="messageImage" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
