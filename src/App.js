import React, { useState } from 'react';

export default function AddingGuest() {
  //defining const variables
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [guests, setGuests] = useState([]);

  //function handle event; save new user on key press enteR
  function handleKlick(event) {
    if (event.key === 'Enter') {
      const newGuestID = guest[guests.length - 1].id + 1;
      const newGuest = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false,
        id: newGuestID,
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
            placeholder="Enter First Name"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>

        <label>
          Last Name:
          <input
            placeholder="Enter Last Name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <button>Enter</button>
      </form>
    </div>
  );
}
