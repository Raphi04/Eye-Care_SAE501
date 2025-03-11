import * as SecureStore from "expo-secure-store";

const UserSession = {
    async getSession() {
        const username = await SecureStore.getItemAsync("username");
        const token = await SecureStore.getItemAsync("api_token");
        return { username, token };
    },

    async setSession(username: string, token: string) {
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("api_token", token);
    },

    async clearSession() {
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("api_token");
    }
};

export default UserSession;