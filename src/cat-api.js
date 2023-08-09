const api_key =
  'live_GOFdgZB1U3JaUt0QpXDdap3KE83KKlNjTSJr7mVB5lNxfONfeVEGI5Jzbqte4Tjx';
const selectField = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const url = 'https://api.thecatapi.com/v1/breeds';

/**
  |============================
  | ч. 1 - наповнення селекту
  |============================
*/
fetchBreeds()
  .then(render)
  .catch(error => {
    console.log(error);
  });

export function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    return response.json();
  });
}

function render(data) {
  data = data.filter(img => img.image?.url != null);
  const storedBreeds = data;

  for (let i = 0; i < storedBreeds.length; i += 1) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');

    if (!breed.image) continue;

    option.value = breed.id;
    option.textContent = breed.name;
    option.classList.add('option-breed');
    selectField.append(option);
  }
}

/**
  |============================
  | ч.2 - fetch на change по конкретній породі
  |============================
*/
selectField.addEventListener('change', onChange);

function onChange(e) {
  const option = e.currentTarget;
  const selectedOption = option.value;

  fetchCatByBreed(selectedOption)
    .then(renderBreed)
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': api_key,
      },
    }
  ).then(response => {
    return response.json();
  });
}

function renderBreed(data) {
  console.log(data);
  data = data.map(e => {
    const catImage = e;
    const image = document.createElement('img');
    image.src = `${catImage.url}`;
    image.classList.add('cat-image');
    catInfo.append(image);

    const breeds = catImage.breeds;
    for (const breed of breeds) {
      const name = document.createElement('h1');
      name.textContent = `${breed.name}`;
      name.classList.add('cat-name');
      catInfo.append(name);

      const descr = document.createElement('p');
      descr.textContent = `${breed.description}`;
      descr.classList.add('cat-descr');
      catInfo.append(descr);

      const temper = document.createElement('p');
      temper.textContent = `${breed.temperament}`;
      temper.classList.add('cat-temper');
      catInfo.append(temper);
    }
  });
}

