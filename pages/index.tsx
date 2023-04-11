import Head from 'next/head'

import LoginSignup from '../components/LoginSignup'
import Header from '../components/Header'

import Initialtable from '../components/Initialtable'
import Realtable from '../components/realtable';
import { useState, useEffect } from 'react';
//ver video completo https://react-hook-form.com/get-started

// the 3 railway

export default function Home() {
  const [view, setView] = useState("landing")
  const [user, setUser] = useState("")
  useEffect(() => {
    const item = sessionStorage.getItem("userTestEnglish")

    console.log("item", user == "");

    if (item != null) {
      setUser(item)
    }
  }, [])
  return (
    <>
      <Head>
        <title>TestEnglish</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {view == "login" || view == "signup" ? <LoginSignup view={view} setView={setView} /> : <></>}
        <Header setView={setView} user={user} ></Header>
        
        {user == "" ? <Initialtable /> : <Realtable  user={user} setUser={setUser}/>}
      
    </>
  )
}


