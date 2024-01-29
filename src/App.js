import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  // defining const variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [isAttending, setIsAttending] = useState(false);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    'http://fcc50277-3661-41cb-b855-b38bc9c965cf-00-3qvtsy9yi6qpg.janeway.replit.dev/guests/';

  // fetch guest list from API
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

  // add new guest
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
    setGuests(newGuests);
    setFirstName('');
    setLastName('');
  }

  async function isAttending(id, userAttending) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !userAttending }),
    });
    const updatedGuest = await response.json();
    const newGuests = guests.map((user) =>
      user.id === updatedGuest.id ? updatedGuest : user,
    );
    setGuests(newGuests);
  }

  async function removeGuest(id) {
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
                    createGuest().catch((error) => {
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
                    onChange={() => isAttending(user.id, user.attending)}
                  />
                </label>
                <br />
              </div>
              <button
                type="button"
                aria-label={`Remove ${user.firstName} ${user.lastName}`}
                onClick={() => {
                  removeGuest(user.id).catch((error) => {
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
