'use client';

import { IEvent } from "@/app/utils/types";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from '@/Event.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EventDelete() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;
  
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchEventDelete = async () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        
        try {
            const response = await axios.get<IEvent[]>(`${API_URL}/events`);
            setEvents(response.data);
           
        } catch (err) {

            console.error('kunde inte hitta event', err);
            alert('kunde inte hitta event');
            router.push('/events');
        }
    };
       
    useEffect(() => {
        
            fetchEventDelete();
        
    }, [eventId]);
    
   
    const handleDelete = async (id:string) => {
      
            const confirmData = window.confirm('ÄR du säker att du vill radera event?');
            if (!confirmData) {
                return;
            }
            setLoading(true);
 console.log(`Deleting event with ID: ${eventId}`);
            try {
                
                await axios.delete<IEvent>(`${API_URL}/events/${id}`);
                router.push('/events')

            } catch (error) {

                console.error('fel vid radering', error);
                alert('Nogåt gick fel vid radering, fösök senare!');

            } finally {
                setLoading(false)
            }
        };

    return (
      
        <div className={styles.form}>
          
          <h2>Radera Event</h2>
               
            {events.map((event) => (
                <div key={event._id}>
                    <h3> {event.title} </h3>
                    <p>{event.description}</p>
                    <p>{new Date(event.date).toISOString()}</p>
                    {isLoggedIn && (
                      
                      <button type="submit" onClick={()=>handleDelete(event._id)}
                      disabled={loading}>{loading ? 'Raderar...' : 'Radera'}</button> 
                    
                    )}
            </div>
            ))}
       
    
            
         
            </div>
        )
  
};