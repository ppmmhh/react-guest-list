import React, { useState } from 'react';

export default function AddingGuest() {
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  function handleSubmit(event) {
    if (event.key === 'Enter')
      const newUser = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false
      };
 }
