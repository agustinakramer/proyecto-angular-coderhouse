export interface User { 
    id: number | string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User'
}
