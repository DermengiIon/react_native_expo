import { createContext } from "react";
async function nope(notif: any) {};
async function nope2() {};
export const NotifContext = createContext({
    hasNotification: false,
    setNotif: nope,
    getNotif: nope2,
    cancelNotif: nope2,
    data: {
        ConsId: '',
        Name: '',
        Disease: '',
        Address: '',
        Description: '',
        DocId: '',
        IsConfirmed: false
    }
})