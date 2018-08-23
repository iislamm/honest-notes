export class User {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatarPath: string;
    birthDate: Date;
    gender: string;
    bio: string;
    country: string;
    timezone: string;
    activationStatus: boolean;
    loginHistory: object[];
}

export class OldUser {
    username: string;
    password: string;
}

export class newUser {
    fullname: string;
    email: string;
    password: string;
    username: string;
    birthDate: Date;
    gender: string;
}