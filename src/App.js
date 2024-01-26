import React, { useState } from 'react';

export default function AddingGuest() {
  //defining const variables
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [guests, setGuests] = useState([]);

  //function handle event; save new user on key press enter
  function handleKlick(event) {
    if (event.key === 'Enter') {
      const newGuest = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false,
      };
      setGuests([...guests, newGuest]);

      //clear input fields again
      setFirstName('');
      setLastName('');
    }
  }

  return (
    <div data-test-id="guest">
      <header>
        <h1>Guest List</h1>
      </header>

      <form onKlick={handleKlick}>
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
