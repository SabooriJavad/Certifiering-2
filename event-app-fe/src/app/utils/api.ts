import axios from 'axios';
import { IAuth, IEvent, IUser } from './types';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeader(token: string) {
    return{headers: {Authorization: `Bearer ${token}`}}
};

export async function registerUser(data:{username:string,password:string, email:string}) {
    const response = await axios.post<IUser>(`${API_URL}/users/register`, data);
    return response.data;
}

export async function login(username: string, password: string) {
    const response = await axios.post<IAuth>(`${API_URL}/users/login`, {
        username,
        password
    });
    return response.data;
}
export async function getEvent() {
    const response = await axios.get<IEvent []>(`${API_URL}/events`);
    return response.data;
};


export async function createEvent(eventData: Partial<IEvent>, token: string) {
    return axios.post(`${API_URL}/events`, eventData, authHeader(token));
};
export async function updateEvent(eventData: Partial<IEvent>, token: string) {
    return axios.put(`${API_URL}/events/${eventData._id}`,eventData, authHeader(token))
}

export async function joinEvent(eventId: string, userId: string, token: string) {
    return axios.post(`${API_URL}/events/${eventId}/participants`, { userId }, authHeader(token));
  }
  

export async function leaveEvent(eventId: string, userId: string, token: string) {
    return axios.delete(`${API_URL}/events/${eventId}/participants/${userId}`, authHeader(token));
};

