'use client';

import { useRouter } from "next/navigation";
import { login } from "@/app/utils/api";
import { useForm } from 'react-hook-form';
import styles from '@/Event.module.css';



export default function LoginPage() {

    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const { username, password } = data;
        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/';
        } catch (error) {
            alert('Login failed')
        }
    };


    return (
        <main>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                
            <h2>Login Page</h2>
            <p>
                username:
                <label >
                    <input type='text' {...register('username')}/>
                </label>
            </p>
            <p>
                password:
                <label>
                    <input type="password" {...register('password')}/>
                </label>
            </p>

            <p>
                <button type="submit">Login</button>
                
                </p>
                </form>
        </main>
    )
};