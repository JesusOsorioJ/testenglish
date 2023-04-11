import Head from 'next/head'
import { useForm } from 'react-hook-form';
import { Prisma } from '@prisma/client';

import Login from '../components/Login'
import Header from '../components/Header'

import Initialtable from '../components/Initialtable'
import { useState } from 'react';
//ver video completo https://react-hook-form.com/get-started



export default function Home() {
  const [ login, setLogin ] = useState(0)
  return (
    <>
      <Head>
        <title>testEnglish</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main>
        <Header login={login} setLogin={setLogin} ></Header>
        {login>0?<Login login={login} setLogin={setLogin} />:<></>}
        <Initialtable />
      </main>
    </>
  )
}


