import { IEvent } from "@/app/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '@/Event.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EventList() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const fetchEventList = async () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        
        try {
            const response = await axios.get<IEvent[]>(`${API_URL}/events`);
            setEvents(response.data);
        } catch (eror) {
            console.error('Kunde inte hämta events');
        }
    };
    useEffect(() => {
        fetchEventList();
    }, []);
    

    return (
        <div className={styles.form}>
            {events.map((event) => (
                <div key={event._id}>
                    <h3> {event.title} </h3>
                    <p>{event.description}</p>
                    <p>{new Date(event.date).toISOString()}</p>
                    {isLoggedIn && (
                      <button> <Link href={`/events/${event._id}/edit`}>
                            <b>Uppdatera</b>
                        </Link><br />
                            
                        </button> 
                    )}
            </div>
            ))}
        </div>
    )
}