
// import { fetchBreeds } from "./cat-api";

// import { fetchCatByBreed } from "./cat-api";



import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';




const refs = {
    selectField: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    errorMessage: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

refs.loader.classList.add('loader-is-visible')
/**
  |============================
  | ч. 1 - наповнення селекту
  |============================
*/

fetchBreeds()
  .then(render)
  .catch(error => {
    refs.loader.classList.remove('loader-is-visible')
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    
  });



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
    option.setAttribute('id', 'option-breed')
    refs.selectField.append(option);
    refs.loader.classList.remove('loader-is-visible')
    refs.selectField.classList.add('is-visible')
    
 
  }
  selectStyled()
  
}

function selectStyled() {
 new SlimSelect({
     select: refs.selectField,
 })
  
}


/**
  |============================
  | ч.2 - fetch на change по конкретній породі
  |============================
*/ 
let page = 1
refs.selectField.addEventListener('change', onChange);

function onChange(e) {
  refs.loader.classList.add('loader-is-visible')
  const option = e.currentTarget;
  const selectedOption = option.value;
  
  page +=1

  fetchCatByBreed(selectedOption)
    .then(renderBreed)
    .catch(error => {
      refs.loader.classList.remove('loader-is-visible')
     Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
   
  if (page > 2) {
    image.remove()
    catText.remove()
  }
  
}

let image
let catText



function renderBreed(data) {
refs.loader.classList.remove('loader-is-visible')
  data = data.map(e => {

    const catImage = e;
    image = document.createElement('img');
    image.src = `${catImage.url}`;
    image.classList.add('cat-image');
    refs.catInfo.append(image);

    const breeds = catImage.breeds;
    for (const breed of breeds) {
      catText = document.createElement('div')
      catText.classList.add('cat-text')
      refs.catInfo.append(catText)

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
      refs.loader.classList.remove('is-visible')
    }
  
  });
 
}





// fetchCatByBreed()
