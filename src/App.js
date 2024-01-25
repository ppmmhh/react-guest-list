import React, { useState } from 'react';

export default function AddingGuest() {
  //defining const variables
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  //handle event; save new user on key press enter
  function handleSubmit(event) {
    if (event.key === 'Enter')
      const newUser = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false
      }
    }

      return (
        <div>
          <header>
              <h1>Guest List</h1>
            </header>
            <form onSubmit={handleSubmit}>
              <label>
                First Name
                <input
                  placeholder="first name"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </label>
              <label>
                Last Name
                <input
                  placeholder="last name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </label>
              <button>Submit</button>
            </form>
            <div>{/* {firstName} {lastName} */}</div>
      </div>
      );
    }
