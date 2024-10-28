import{i as l,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const g="46747450-fc08b8bc876855aa84ec0c871",y="https://pixabay.com/api/?";function b(s){const o=new URLSearchParams({key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${y}${o}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}function L(s){return s.map(r=>{const{webformatURL:i,largeImageURL:e,tags:t,likes:a,views:d,comments:f,downloads:h}=r;return`
        <li class="gallery-card">
          <a class="img-link" href="${e}">
            <div class="image-thumb">
              <img class = "gallery-image" src="${i}" data-source=${e} alt="${t}" loading="lazy" />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${a}
              </p>
              <p class="info-item">
                <b>Views</b> ${d}
              </p>
              <p class="info-item">
                <b>Comments</b> ${f}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${h}
              </p>
          </div>
          </a>
        </li>
      `}).join("")}const n=document.querySelector(".search-form"),m=document.querySelector(".gallery"),u=document.querySelector(".js-loader");let c;const w=()=>{c=new p(".gallery a",{captionsData:"alt",captionDelay:250})},v=()=>{c&&c.refresh()},S=s=>{s.preventDefault();const o=s.target.elements.searchQuery.value.toLowerCase().trim();if(o===""){l.error({message:"The search field should not be empty!",position:"topRight"}),n.reset(),m.innerHTML="";return}u.classList.remove("is-hidden"),b(o).finally(()=>{u.classList.add("is-hidden")}).then(({hits:r})=>{if(r.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.reset();return}const i=L(r);m.innerHTML=i,n.reset(),c?v():w()}).catch(r=>console.log(r))};n.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
