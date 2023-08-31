import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './LoginPage.css';


function LoginPage() {
   const [phoneNumber, setPhoneNumber] = useState();
   const navigate = useNavigate()
   useEffect(() =>{
    console.log('Phone number changed:', phoneNumber);
   }, [phoneNumber]);
   
   const [phoneNumberError, setPhoneNumberError] = useState();

   const handlePhoneNumberChange = (event) => {
     const inputPhoneNumber = event.target.value;
     setPhoneNumber(event.target.value);
    //  console.log(event.target.value)
    if (inputPhoneNumber.length !== 10){
      setPhoneNumberError('Please enter a 10 digit phone number.')
      }
      else {
        setPhoneNumberError('');
      }
   };
   const [userName, setUserName] = useState();
   useEffect(() =>{
    console.log('User name changed:', userName);
   }, [userName]);
   const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    // console.log(event.target.value)
   }
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To Penzi</h1>
      </header>
      <main>
        <form>
          <label>
            User Name:
            <input
            type="text"
            value= {userName}
            onChange={handleUserNameChange}
            placeholder="User name"
            required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              //  value={phoneNumber}
               onChange={handlePhoneNumberChange}
              placeholder="Enter your phone number"
              required
            />
          </label>
          {phoneNumberError && <p className="error-message">{phoneNumberError} </p>}
         <button type="button"  onClick={()=>{
            navigate("/ChatBoxPage")
            localStorage.setItem('phonenumber', `${phoneNumber}`)
            localStorage.setItem('username', `${userName}`)
         }  } >Login</button> 
        </form>
      </main>
    </div>
  );
}

export default LoginPage;