export interface UsernameI {
    id: number;
    username: string;
    email: string;
    password: string;
    id_colaborator: number;
    id_organization: number;
    cellphone: string;
    accessToken?: string;
    expiresIn?: number;
}