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

async function Guest(id) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  const deletedGuest = await response.json();
  const newList = guests.filter((user) => user.id !== deletedGuest.id);
  setGuests(newList);
}

if (isLoading) {
  return <div>Loading...</div>;
} else {
  return (
    <div>
      <h1> Guest List</h1>
      <form>
        <div>
          <label>
            First name:
            <br />
            <input
              placeholder="Enter your first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last name:
            <br />
            <input
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setFirstName('');
                  setLastName('');
                  newGuest().catch((error) => {
                    console.log(error);
                  });
                }
              }}
            />
          </label>
        </div>
      </form>
      <div>
        <h2>Registered Guests</h2>
        {guests.map((user) => (
          <div key={`user-${user.id}`} data-test-id="guest">
            <div>
              First Name: {user.firstName}
              <br />
              Last Name: {user.lastName}
              <br />
              Attendance: {JSON.stringify(user.attending)}
              <br />
              <label key={`user-${user.id}`}>
                Attending:
                <input
                  type="checkbox"
                  checked={user.attending}
                  aria-label={`${user.firstName} ${user.lastName} attending status`}
                  onChange={() => Guest(user.id, user.attending)}
                />
              </label>
              <br />
            </div>
            <button
              type="button"
              aria-label={`Remove ${user.firstName} ${user.lastName}`}
              onClick={() => {
                cancelGuest(user.id).catch((error) => {
                  console.log(error);
                });
              }}
            >
              Remove
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
