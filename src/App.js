import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  // defining const variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //const [isAttending, setIsAttending] = useState(false);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  //fetch guest list from API
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setIsLoading(false);
    }
    fetchGuests().catch((error) => {
      console.log(error);
    });
  });

  //add new guest
  async function newGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const addedGuest = await response.json();
    const newGuests = [...guests];
    newGuests.push(addedGuest);
    setGuests(newGuests);
    setFirstName('');
    setLastName('');
  }
  // function handle event; save new user on key press enteR
  //function handleClick(event) {
  //if (event.key === 'Enter') {
  //const newGuestID = guests[guests.length - 1].id + 1;
  //const newGuest = {
  //firstName: firstName,
  //lastName: lastName,
  //isAttending: false,
  //id: newGuestID,
  //};
  //setGuests([...guests, newGuest]);

  // clear input fields again
  setFirstName('');
  setLastName('');
}

return (
  <>
    <div>
      <header>
        <h1>Guest List</h1>
      </header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleClick();
          setFirstName('');
          setLastName('');
        }}
      >
        <label>
          First Name:
          <input
            placeholder="Enter First Name"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        ,
        <label>
          Last Name:
          <input
            placeholder="Enter Last Name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        ,<button>Enter</button>
      </form>
    </div>

    <ul>
      {guests.map((guests) => (
        <li key={guests.id}>
          {`Guest ${guest.id}: ${guest.firstName} ${guest.lastName}`}
        </li>
      ))}
    </ul>
  </>
);
