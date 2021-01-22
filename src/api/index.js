import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://zenn.net.au/wp-json/jwt-auth/v1';

const ACCESS_TOKEN = 'access_token';

function clearToken() {
  return AsyncStorage.removeItem(ACCESS_TOKEN);
}

function saveToken(token) {
  return AsyncStorage.setItem(ACCESS_TOKEN, token);
}

function loginWithPassword(username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await response.json();
      if (data.token) {
        await saveToken(data.token);
        resolve(data);
      } else {
        reject(new Error('Invalid Credentials'));
      }
    }
    catch (e) {
      reject(new Error('Cannot connect to server'));
    }
  });
}

function logout() {
  return clearToken();
}

function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN);
}

function makeAuthorizedCall(request) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await getAccessToken();
      if (token) {
        const response = await fetch(request.url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(request.body || {})
        });
        const data = await response.json();
        resolve(data);
      } else {
        reject(new Error('Token does not exist'));
      }
    } catch (e) {
      reject(new Error('Cannot connect to server'));
    }
  });
}

function validateToken() {
  return makeAuthorizedCall({
    url: `${API_URL}/token/validate`
  });
}

function validateTicket(url) {
  return makeAuthorizedCall({
    url
  });
}

export default {
  loginWithPassword,
  logout,
  validateToken,
  validateTicket,
};
