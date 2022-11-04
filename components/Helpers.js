import * as SecureStore from 'expo-secure-store';

export async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getTokenValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return 'No values stored under that key.';
    }
}