'use client';


import Link from 'next/link';
import styles from './Header.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

  
  const onClickLogout = () => {

    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
   
    router.push('/')
    
  };
  

    return (
        <header className={styles.header}>
            <h1>Event App </h1>
            <nav>
          <Link href="/">Hem</Link>
          
      {!isLoggedIn && (
        <>
          <Link href="/events/login">Logga in</Link>
              <Link href="/events/register">Registrera</Link>
            
            </>
            
          )}
         
      {isLoggedIn && (
            <>
           
              <Link href="/events/createevent">Skapa </Link>
              {/* <Link href="/events">Uppdatera</Link> */}
              <Link href="/events/id/edit">Updatera</Link>
              <Link href="/events/delete">Radera</Link>
              
          <button type='submit' onClick={onClickLogout} 
          >Logga ut</button>
        </>
      )}
            </nav>
            
        </header>
    )
}