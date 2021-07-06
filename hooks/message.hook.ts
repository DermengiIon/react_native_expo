import { useCallback } from "react"
import { ToastAndroid } from "react-native";

export const useMessage = () => {
    return useCallback(
        (msg: string | null) => {
            if (msg) {
                ToastAndroid.show(msg, ToastAndroid.SHORT);
            }
        },
        [],
    )
}