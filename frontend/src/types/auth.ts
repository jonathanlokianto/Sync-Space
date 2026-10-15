export interface RegisterRequest {
    fullname : string;
    email : string;
    username : string;
    password : string;
}

export interface LoginRequest {
    identity    : string;
    password    : string;
}

export interface AuthResponse {
    id  : number;
    fullname    : string;
    email   : string;
    username    : string;
    role    : string;
    max_room_limit  : number;
    is_premium  : boolean;
    access_token    : string;
}