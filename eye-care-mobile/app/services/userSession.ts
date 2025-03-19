import * as SecureStore from "expo-secure-store";

let authStateSetter: ((isAuth: boolean) => void) | null = null;

const UserSession = {
    isAuthenticated: false,

    setAuthStateSetter(setter: (isAuth: boolean) => void) {
        authStateSetter = setter;
    },

    async getSession() {
        const username = await SecureStore.getItemAsync("username");
        const token = await SecureStore.getItemAsync("api_token");
        this.isAuthenticated = token ? true : false;
        authStateSetter?.(this.isAuthenticated);
        return { username, token };
    },

    async setSession(username: string, token: string) {
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("api_token", token);
        this.isAuthenticated = true;
        authStateSetter?.(true);
    },

    async clearSession() {
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("api_token");
        this.isAuthenticated = false;
        authStateSetter?.(false);
    }
};

export default UserSession;