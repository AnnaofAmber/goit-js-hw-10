const e="live_GOFdgZB1U3JaUt0QpXDdap3KE83KKlNjTSJr7mVB5lNxfONfeVEGI5Jzbqte4Tjx",t=document.querySelector(".breed-select"),n=document.querySelector(".cat-info");function a(){return fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":"live_GOFdgZB1U3JaUt0QpXDdap3KE83KKlNjTSJr7mVB5lNxfONfeVEGI5Jzbqte4Tjx"}}).then((e=>e.json()))}function c(e){console.log(e),e=e.map((e=>{const t=e,a=document.createElement("img");a.src=`${t.url}`,a.classList.add("cat-image"),n.append(a);const c=t.breeds;for(const e of c){const t=document.createElement("h1");t.textContent=`${e.name}`,t.classList.add("cat-name"),n.append(t);const a=document.createElement("p");a.textContent=`${e.description}`,a.classList.add("cat-descr"),n.append(a);const c=document.createElement("p");c.textContent=`${e.temperament}`,c.classList.add("cat-temper"),n.append(c)}}))}a().then((function(e){const n=e=e.filter((e=>{var t;return null!=(null===(t=e.image)||void 0===t?void 0:t.url)}));for(let e=0;e<n.length;e+=1){const a=n[e];let c=document.createElement("option");a.image&&(c.value=a.id,c.textContent=a.name,c.classList.add("option-breed"),t.append(c))}})).catch((e=>{console.log(e)})),t.addEventListener("change",(function(t){const n=t.currentTarget;(a=n.value,fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${a}`,{headers:{"x-api-key":e}}).then((e=>e.json()))).then(c).catch((e=>{console.log(e)}));var a})),a();
//# sourceMappingURL=index.608caa51.js.map