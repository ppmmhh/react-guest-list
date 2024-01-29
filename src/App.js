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
    console.log(addedGuest);
    // add new guest to the list
    setGuests([...guests, newGuests]);
    // clear input fields again
    setFirstName('');
    setLastName('');
  }
  // create guest when pressing enter
  const handlePressEnter = async (event) => {
    if (event.key === 'Enter') {
      await createGuest();
    }
  };

  // update a guest
  async function isAttending(id, userAttending) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !userAttending }),
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
    const newList = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newList);
  }

  return (
    <div>
      <h1> Guest List</h1>
      <form>
        <div>
          <label>
            First name:
            <br />
            <input
              placeholder="Enter first name"
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
              onPressEnter={handlePressEnter}
            />
          </label>
        </div>
      </form>

      <div>
        <h2>See who is coming:</h2>
        {guests.map((guest) => (
          <div key={`user-${guest.id}`} data-test-id="guest">
            <div>
              First Name: {guest.firstName}
              <br />
              Last Name: {guest.lastName}
              <br />
              Attendance: {JSON.stringify(guest.attending)}
              <br />
              <label key={`user-${guest.id}`}>
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
