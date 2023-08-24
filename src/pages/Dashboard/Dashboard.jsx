import { main } from '@popperjs/core';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import PhotoForm from '../../components/PhotoForm/PhotoForm';


export default function Dashboard({ user }) {


  return (
    <>
      <main>
        {/* grab the user.name from the logged in user information */}
        <h2>Welcome {user.name} </h2>
        <p>Would you like to add photos?</p>
      </main>

    </>
  )
}