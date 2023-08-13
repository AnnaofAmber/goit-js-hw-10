
const api_key =
  'live_tdsN5AmbBwkKYcE40ygpqWKl0kv76r76ReliB0DRx4R4Xoc74wa0rlMsOiihJCTG';
const url = 'https://api.thecatapi.com/v1/breeds';



/**
  |============================
  | Fetch Breeds
  |============================
*/
  export function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error (response.status)
    }
    return response.json();
  })
  }

/**
  |============================
  | Fetch by breed
  |============================
*/

  export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?page=${this.page}&breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': api_key,
      },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error (response.status)
    }
    return response.json();
  });
}