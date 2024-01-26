import React, { useState } from 'react';

import

export default function AddingGuest() {
  //defining const variables
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  //function handle event; save new user on key press enter
  function handleSubmit(event) {
    if (event.key === 'Enter') {
      const newGuest = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false,
        userID: userID,
      };
    }
  }

  return (
    <div>
      <header>
        <h1>Guest List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            placeholder="Michael"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>

        <label>
          Last Name:
          <input
            placeholder="Scott"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <button>Attend</button>
      </form>
      <div>{/* {firstName} {lastName} */}</div>
    </div>
  );
}
