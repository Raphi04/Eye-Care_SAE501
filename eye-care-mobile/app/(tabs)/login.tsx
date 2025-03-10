import React from "react";
import { Alert, Button, SafeAreaView, Text, TextInput } from "react-native";
import UserSession from "../services/UserSession";

export default function login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = async () => {
        const url = "http://10.0.2.2:8000/login";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            UserSession.setSession(result.username, result.api_token);
            Alert.alert("Connexion réussie", `Username: ${result.username}\nToken: ${result.api_token}`);
            //const user = await UserSession.getSession();
        } catch (error) {
            Alert.alert("Erreur", `${error}`);
        }
    };


    return (
        <SafeAreaView>
            <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                onChangeText={setPassword}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry={true}
            />
            <Button title="Se connecter" onPress={login} />
        </SafeAreaView>
    );
}
