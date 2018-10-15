import store from "../store";
const AUTH_TOKEN = store.getState().AssetReducers.auth_token

export const config = {
  headers: {
      'Authorization': AUTH_TOKEN,
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': AUTH_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded'
  }
}
