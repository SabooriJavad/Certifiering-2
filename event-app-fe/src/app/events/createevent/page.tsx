'use client';
import { useForm } from 'react-hook-form';

import { createEvent } from '@/app/utils/api';
import { useRouter } from 'next/navigation';
import styles from '@/Event.module.css';
import { IEvent } from '@/app/utils/types';

 

export default function CreateEventPage({event} :{event : IEvent}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Logga in först');
    await createEvent(data, token);
    router.push('/');

  };

  return (
    
       <>
      
      <main>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p>
            <input {...register('title')} placeholder="Titel" />
          </p>
  
          <p>
            <label>
              <input {...register('description')} placeholder="Beskrivning" />
            </label>
          </p>
  
          <p>
            <label>
              <input {...register('date')} type="datetime-local" />
            </label>
          </p>
       
          <button type="submit">Skapa evenemang</button>
        
       
     
        </form>
      </main>
    </>
  );
}