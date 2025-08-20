
export interface IUser{
    _id?: string;
    username: string;
     email: string;
    password: string;
    
}




export interface IEvent{
    _id:string,
    title: string;
    description?: string,
    date: Date;
    participants: IUser[];
   
}
export interface IAuth{
    token: string;
}
