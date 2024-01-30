import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  // defining const variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    'http://fcc50277-3661-41cb-b855-b38bc9c965cf-00-3qvtsy9yi6qpg.janeway.replit.dev/guests/';

  // fetch guest list from API
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      // guests state linked with fetched data
      setGuests(allGuests);
      setIsLoading(false);
    }
    fetchGuests().catch((error) => {
      console.log(error);
    });
  });

  // create new guest
  async function createGuest() {
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
    // add new guest to the list
    setGuests(newGuests);
  }

  // update a guest
  async function isAttending(id, guestAttending) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !guestAttending }),
    });
    const updatedGuest = await response.json();
    const newGuests = guests.map((guest) =>
      guest.id === updatedGuest.id ? updatedGuest : guest,
    );
    setGuests(newGuests);
  }

  // delete guest
  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuests = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuests);
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="guestlist">
        <h1> Guest List</h1>
        <form>
          <div>
            <label htmlFor="firstName">
              First name:
              <br />
              <input
                name="firstname"
                placeholder="Enter first name"
                className="inputfield"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>
          </div>
        </form>

        <div>
          <label htmlFor="lastName">
            Last name:
            <br />
            <input
              name="lastname"
              placeholder="Enter last name"
              className="inputfield"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setFirstName('');
                  setLastName('');
                  createGuest().catch((error) => {
                    console.log(error);
                  });
                }
              }}
            />
          </label>
        </div>

        <div className="guestlist">
          <h2>See who is coming:</h2>
          {guests.map((guest) => (
            <div key={`user-${guest.id}`} data-test-id="guest">
              className="list"
              <div>
                First Name: {guest.firstName}
                <br />
                Last Name: {guest.lastName}
                <br />
                Attendance: {JSON.stringify(guest.attending)}
                <br />
                <label htmlFor="Attending" key={`guest-${guest.id}`}>
                  Attending:
                  <input
                    type="checkbox"
                    checked={guest.attending}
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    onChange={() => isAttending(guest.id, guest.attending)}
                  />
                </label>
                <br />
              </div>
              <button
                type="button"
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={() => {
                  removeGuest(guest.id).catch((error) => {
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
}
