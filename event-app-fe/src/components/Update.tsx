'use client';
import {useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IEvent } from '@/app/utils/types';
import { useForm } from 'react-hook-form';
import styles from '@/Event.module.css';




const API_URL = process.env.NEXT_PUBLIC_API_URL


export default function EventUpdateCard( ) {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const { register, handleSubmit, setValue } = useForm();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEventUpdate = async () => {
  
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    console.log(token);
    
    try {
      const response = await axios.get<IEvent[]>(`${API_URL}/events`);
      setEvents(response.data);
      setLoading(false);

      const foundEvent = response.data.find(ev => ev._id === eventId);
      if (foundEvent) {
        setValue('title', foundEvent.title);
        setValue('description', foundEvent.description);
        setValue('date', new Date(foundEvent.date).toISOString().slice(0, 16));
      } else {
     
        router.push('/events');

     }
    } catch (err) {
      
        console.error('Kunde inte hämta events', err);
      alert('Något gick fel vid hämtning av events');
      router.push('/events');
  
    }
  };
  useEffect(() => {
    if(eventId)fetchEventUpdate();
  },[eventId])

  const onSubmit = async (data: any) => {
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('du är inte inloggad');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/events/${eventId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      alert('Updaterat');
      router.push('/events');
    } catch (error) {
      console.error('Kunde inte updatera');
      alert('Något gick fel vid Uppdaering');
    }
    
  };



return (
    <main>
   
    {loading ? (
      <p>Laddar Events...</p>
    ) : (
        <>
          <div >
            {events.map(ev => (
              <div key={ev._id}className={styles.title}>
                <p><strong>{ev.title}</strong>{ ev.description}</p>
              </div>
            ))}
            {isLoggedIn && (
  <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
  <p>
    <label >

  <input {...register('title')} placeholder='Titel'/>
      
    </label>
  </p>
  <p>
    <label >

      <input {...register('description')}placeholder='Description'/>
      
    </label>
  </p>
  <p>
    <label >

  <input {...register('date')} type='datetime-local'  />
      
    </label>
  </p>

  
    <button type='submit'>
     Spara
    </button>
    </form>
            )}
        </div>
        </>
    )}
            
    

      

        
      
    </main>
  );
}

// 'use client';
// import { useParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IEvent } from '@/app/utils/types';
// import { useForm } from 'react-hook-form';
// import styles from '@/Event.module.css';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function EventUpdateCard() {
//   const router = useRouter();
//   const params = useParams();
//   const eventId = params.id as string;

//   const { register, handleSubmit, setValue } = useForm();
//   const [events, setEvents] = useState<IEvent[]>([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Hämta alla events
//   const fetchEvents = async () => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);

//     try {
//       const response = await axios.get<IEvent[]>(`${API_URL}/events`);
//       setEvents(response.data);
//       setLoading(false);

//       // Hitta rätt event och sätt formvärden
//       const foundEvent = response.data.find(ev => ev._id === eventId);
//       if (foundEvent) {
//         setValue('title', foundEvent.title);
//         setValue('description', foundEvent.description);
//         setValue('date', new Date(foundEvent.date).toISOString().slice(0, 16));
//       } else {
//         alert('Eventet hittades inte');
//         router.push('/events');
//       }
//     } catch (err) {
//       console.error('Kunde inte hämta events:', err);
//       alert('Något gick fel vid hämtning av events');
//       router.push('/events');
//     }
//   };

//   useEffect(() => {
//     if (eventId) fetchEvents();
//   }, [eventId]);

//   const onSubmit = async (data: any) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Du är inte inloggad');
//       return;
//     }

//     try {
//       await axios.put(`${API_URL}/events/${eventId}`, data, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert('Event uppdaterat!');
//       router.push('/events');
//     } catch (error) {
//       console.error('Kunde inte uppdatera event', error);
//       alert('Något gick fel vid uppdatering');
//     }
//   };

//   return (
//     <main>
//       <h2>Uppdatera Event</h2>
//       {loading ? (
//         <p>Laddar events...</p>
//       ) : (
//         <>
//           <div>
//             <h3>Alla events</h3>
//             {events.map(ev => (
//               <div key={ev._id}>
//                 <p><strong>{ev.title}</strong>: {ev.description}</p>
//               </div>
//             ))}
//           </div>

//           {isLoggedIn && (
//             <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//               <p>
//                 <input {...register('title')} placeholder="Titel" />
//               </p>
//               <p>
//                 <input {...register('description')} placeholder="Beskrivning" />
//               </p>
//               <p>
//                 <input {...register('date')} type="datetime-local" />
//               </p>
//               <button type="submit">Spara</button>
//             </form>
//           )}
//         </>
//       )}
//     </main>
//   );
// }
