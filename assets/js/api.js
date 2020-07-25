const league_key        = "2021";
const api_key           = "ee8dad2935bb4a83a1a637ad060e0c73";
const standing_endpoint = `https://api.football-data.org/v2/competitions/${league_key}/standings`
const teams_endpoint    = `https://api.football-data.org/v2/competitions/${league_key}/teams`

let fetch_api = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_key
    }
  });
}

let status = response => {
  if(response.status !== 200){
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  }else{
    return Promise.resolve(response);
  }
}

let json = response => {
  return response.json();
}

let error = error => {
  console.log("Error : " + error);
}

let get_standings = () => {
  return fetch_api(standing_endpoint)
  .then(status)
  .then(json)
}

let get_teams = () => {
  return fetch_api(teams_endpoint)
  .then(status)
  .then(json)
}