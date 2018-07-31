import axios from 'axios';
import {IDOLOGY_API_ENDPOINT, WEB_SERVER_API_ENDPOINT, USERNAME, PASSWORD} from './settings';

export function _postIdology(payload) {
  console.log("************THIS IS POST IDOLOGY")
  payload.username = USERNAME
  payload.password = PASSWORD
  console.log(payload)
  // return axios({
  //   method: "POST",
  //   url: IDOLOGY_API_ENDPOINT,
  //   data: payload
  // })
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return axios.post(IDOLOGY_API_ENDPOINT, payload, config)
}

export function _postWebServer(payload) {
  console.log("************THIS IS POST TO WEB SERVER", payload)
  // return axios({
  //   method: "POST",
  //   url: WEB_SERVER_API_ENDPOINT,
  //   data: payload
  // })
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return axios.post(WEB_SERVER_API_ENDPOINT, payload, config)
}

export function _fetchAllPromos() {
 return axios({
   method: 'GET',
   url: IDOLOGY_API_ENDPOINT + "promos/_list/",
   headers: []
 })
}

export function _fetchOnePromo(id) {
  console.log('PROMO', IDOLOGY_API_ENDPOINT + "api/promos/" + id + "/details/");
  return axios({
    method: "GET",
    url: IDOLOGY_API_ENDPOINT + "api/promos/" + id + "/details/"
  })
}

export function _uploadPhoto(payload) {
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return axios.post(IDOLOGY_API_ENDPOINT + "scores/", payload, config)
}

export function _submitPromo(payload) {
  console.log("THIS: ", payload)
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  return axios.post(IDOLOGY_API_ENDPOINT + "junk/", payload, config)
}

export function _fetchOneUser(payload) {
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  return axios.post(IDOLOGY_API_ENDPOINT + "user-auth/", payload, config)
}


export function _loginRequest(username, password) {
  return axios({
    method: "POST",
    url: IDOLOGY_API_ENDPOINT + "api/auth/token/obtain/",
    data: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' }
  })
}

export function _refreshAccessToken(token) {
  return axios({
    method: "POST",
    url: IDOLOGY_API_ENDPOINT + "api/auth/token/refresh/",
    data: JSON.stringify({token}),
    headers: { 'Content-Type': 'application/json' }
  })
}
