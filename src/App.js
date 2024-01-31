import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  // defining const variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    'http://10dfb066-dfcd-4925-acc0-bfba56460290-00-3uq1oilid29fc.kirk.replit.dev/guests/';

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
  }, []);

  // create new guest
  async function createGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const addedGuest = await response.json();
    setGuests([...guests, addedGuest]);

    console.log(guests);
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
    return 'Loading...';
  }
  return (
      <div className="guestlist">
        <h1>Guest List</h1>
        <form
        onSubmit={(event) => {
          event.preventDefault();
          createGuest().catch((error) => console.log(error));
          setFirstName('');
          setLastName('');
        }}>
          <div>
            First name
            <input
              name="firstname"
              placeholder="type first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
        </form>

        <div>
          Last name
          <input
            name="lastname"
            placeholder="type last name"
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
        </div>

        <div className="guests">
          <h2>See who is coming:</h2>
          {guests.map((guest) => (
            <div key={`user-${guest.id}`} data-test-id="guest">
              <div>
                First Name: {guest.firstName}
                <br />
                Last Name: {guest.lastName}
                <br />
                Coming: {JSON.stringify(guest.attending)}
                <br />
                <label key={`guest-${guest.id}`}>
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
                Delete
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
