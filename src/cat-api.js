const api_key =
  'live_GOFdgZB1U3JaUt0QpXDdap3KE83KKlNjTSJr7mVB5lNxfONfeVEGI5Jzbqte4Tjx';

const selectField = document.querySelector('.breed-select');
const loader = document.querySelector('.loader')
const errorMessage = document.querySelector('.error')
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
    loader.classList.remove('is-visible')
    errorMessage.classList.add('is-visible')
    
  });

export function fetchBreeds() {
  loader.classList.add('is-visible')
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    return response.json();
  })
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
    loader.classList.remove('is-visible')
    selectField.classList.add('is-visible')
  }
}

/**
  |============================
  | ч.2 - fetch на change по конкретній породі
  |============================
*/ 
let page = 1
selectField.addEventListener('change', onChange);

function onChange(e) {
  loader.classList.add('is-visible')
   
  const option = e.currentTarget;
  const selectedOption = option.value;
  
  page +=1

  fetchCatByBreed(selectedOption)
    .then(renderBreed)
    .catch(error => {
      loader.classList.remove('is-visible')
      selectField.classList.remove('is-visible')
    errorMessage.classList.add('is-visible')
    });
   
  if (page > 2) {
    image.remove()
    catText.remove()
  }
  
}

export function fetchCatByBreed(breedId) {
  
  return fetch(
    `https://api.thecatapi.com/v1/images/search?page=${page}&breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': api_key,
      },
    }
  ).then(response => {
    return response.json();
  });
}

let image
let catText



function renderBreed(data) {

  data = data.map(e => {

    const catImage = e;
    image = document.createElement('img');
    image.src = `${catImage.url}`;
    image.classList.add('cat-image');
    catInfo.append(image);

    const breeds = catImage.breeds;
    for (const breed of breeds) {
      catText = document.createElement('div')
      catText.classList.add('cat-text')
      catInfo.append(catText)

      const name = document.createElement('h1');
      name.textContent = `${breed.name}`;
      name.classList.add('cat-name');
      catText.append(name);

      const descr = document.createElement('p');
      descr.textContent = `${breed.description}`;
      descr.classList.add('cat-descr');
      catText.append(descr);

      const temper = document.createElement('p');
      temper.textContent = `${breed.temperament}`;
      temper.classList.add('cat-temper');
      catText.append(temper);
      
     const temperHeader = document.createElement('span')
      temperHeader.textContent = 'Temperament: '
      temperHeader.classList.add('temper-header')
      temper.prepend(temperHeader)
      loader.classList.remove('is-visible')
    }
  
  });
 
}


