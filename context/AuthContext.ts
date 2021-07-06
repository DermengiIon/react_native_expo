import { createContext } from "react";

async function nope(token: string) {}
async function nope2() {}

export const AuthContext = createContext({
    token: '',
    login: nope,
    logout: nope2,
    isAuthenticated: false
})