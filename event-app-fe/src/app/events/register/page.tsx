'use client';
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/utils/api';
import styles from '@/Event.module.css';



export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  type RegisterFormData = {
    username: string;
    email: string;
    password: string;
  };
  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser( {username: data.username,
        email: data.email,
        password: data.password});
      alert('Registrering lyckades!');
      reset();
     
    } catch (error) {
      alert('Registreringen misslyckades');
    }
  };

    return (
      
        <main>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                
                <p>
                    <label >
                    <input type="text" {...register('username')} placeholder="Användarnamn" required />
                  </label>
                </p> 

                <p>
                <label>
                    <input type="email" {...register('email')} placeholder="E-post" required />
                    </label>
                    
                </p>
                
                <p>
                <label >
                    <input type="password" {...register('password')} placeholder="Lösenord" required />
                    
                    </label>
                    </p>
                        <button type="submit">Registrera</button>
            </form >
            </main>
  );
}
