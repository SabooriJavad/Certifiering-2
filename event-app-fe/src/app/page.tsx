

'use client';


import { useEffect, useState } from "react";
import { IEvent } from "./utils/types";
import { getEvent, joinEvent, leaveEvent } from "./utils/api";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import styles from '../Event.module.css';



export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  const fetchEvents = async (token: string) => {
    
      const data = await getEvent();
      
        setEvents(data);
   
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(!!storedToken);
    setToken(storedToken);
  
    if (storedToken ) {
      try {
        const decoded: any = jwtDecode(storedToken);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Token felaktig:", error);
      }
    }
  
    fetchEvents(storedToken || ''); 
  }, []);
  

  const handleJoin = async (eventId: string) => {
    if (!token || !userId) return;
    await joinEvent(eventId, userId, token);
    fetchEvents(token);
  };

  const handleLeave = async (eventId: string) => {
    if (!token || !userId) return;
    await leaveEvent(eventId, userId, token);
    fetchEvents(token);
  };
  
  return (
  
    <main>
      <h1>Evenemang</h1>
      <p>
      Välkommen till Event App!
        Din plattform för att upptäcka, delta och engagera dig i de bästa evenemangen<br/>
        enkelt och smidigt. Skapa konto, anmäl dig till dina favoritaktiviteter och bygg ditt nätverk på ett ställe.<br/>

           Ta kontroll över din kalender och gör varje dag minnesvärd. Ditt nästa stora äventyr börjar här!<br/>
 
      </p>
     
      <img src="https://evenemangsbiljetter.se/assets/home_banner.jpg" alt="" />

      
      <div className={styles.scroll}>
      <form className={styles.eventContainer}>
    {events.map((event) => (
  <div key={event._id} className={styles.event}>

  <h6>
    <p>{event.description}</p>
    <img src={`https://placehold.jp/250x250.png?text=${event.title}`} alt={event.title} />
          <p>{new Date(event.date).toLocaleDateString()}</p>
     
  </h6>


        {isLoggedIn && (
          
          <>
            <ul>
              
        {event.participants.map((p) => (
          <li key={p._id}>{p.username}</li>
          
        ))}
      </ul>
                   

      {token && (
        <>
          <button type="button" onClick={() => handleJoin(event._id)}>Anmäl</button>
                <button type="button" onClick={() => handleLeave(event._id)}>Avanmäl</button>
 
       
                
        </>
      )}
    </>
  )}
</div>
))}

          
        </form>
        </div>
      </main>
     
  );
}
