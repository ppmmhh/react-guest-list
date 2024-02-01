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
      console.log('Fetching guests...');
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      console.log('Fetched guests:', allGuests);

      // guests state linked with fetched data
      setGuests(allGuests);
      setIsLoading(false);
    }

    fetchGuests().catch((error) => {
      console.error('Error fetching guests', error);
    });
  }, []);

  // create new guest
  const createGuest = async () => {
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
    const newGuests = [...guests];
    newGuests.push(addedGuest);
    setGuests(newGuests);

    createGuest().catch((error) => {
      console.error('Error creating guest:', error);
    });
  };

  // update a guest
  const isAttending = async (id, guestAttending) => {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !guestAttending }),
    });
    setGuests((prevGuests) => prevGuests.filter((user) => user.id !== id));
  };

  // delete guest
  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuests = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuests);

    removeGuest().catch((error) => {
      console.error('Error removing guest:', error);
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Guest List:</h1>
        <div>
          <label>
            First name
            <input
              name="firstname"
              placeholder="enter first name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Last name
            <input
              name="lastname"
              placeholder="enter last name"
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

        <div>
          <h2>See who's coming:</h2>
          {guests.map((guest) => (
            <div
              key={`guest-${guest.id}`}
              data-test-id="guest"
              className="coming"
            >
              <div>
                First Name: {guest.firstName}
                Last Name: {guest.lastName}
                Coming: {JSON.stringify(guest.attending)}
                <label key={`guest-${guest.id}`}>
                  Attending:
                  <input
                    type="checkbox"
                    checked={guest.attending}
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    onChange={() => isAttending(guest.id, guest.attending)}
                  />
                </label>
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}
