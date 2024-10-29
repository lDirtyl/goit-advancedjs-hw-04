import{a as T,i as m,S as C}from"./assets/vendor-D73Uttp0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const H="46747450-fc08b8bc876855aa84ec0c871",M="https://pixabay.com/api/?";function f(s,e){const o={params:{key:H,q:s,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return T.get(`${M}`,o)}function p(s){return s.map(o=>{const{webformatURL:i,largeImageURL:t,tags:r,likes:c,views:v,comments:w,downloads:S}=o;return`
        <li class="gallery-card">
          <a class="img-link" href="${t}">
            <div class="image-thumb">
              <img class = "gallery-image" src="${i}" data-source=${t} alt="${r}" loading="lazy" />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${c}
              </p>
              <p class="info-item">
                <b>Views</b> ${v}
              </p>
              <p class="info-item">
                <b>Comments</b> ${w}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${S}
              </p>
          </div>
          </a>
        </li>
      `}).join("")}const u=document.querySelector(".search-form"),a=document.querySelector(".gallery"),g=document.querySelector(".js-loader"),n=document.querySelector(".js-load-more");let d,l=1,h="";const y=15,$=()=>{const s=a.querySelector(".gallery-card");if(s){const{height:e}=s.getBoundingClientRect();return e}return 0},q=()=>{const s=$();s>0&&window.scrollBy({top:s*2,behavior:"smooth"})},L=()=>{d=new C(".gallery a",{captionsData:"alt",captionDelay:250})},b=()=>{d&&d.refresh()},x=async s=>{try{if(s.preventDefault(),h=s.target.elements.searchQuery.value.toLowerCase().trim(),l=1,h===""){a.innerHTML="",m.error({message:"The search field should not be empty!",position:"topRight"}),u.reset(),n.classList.add("is-hidden");return}g.classList.remove("is-hidden");const{data:e}=await f(h,l);if(g.classList.add("is-hidden"),e.hits.length===0){a.innerHTML="",m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u.reset(),n.classList.add("is-hidden");return}const o=p(e.hits);a.innerHTML=o,u.reset(),e.totalHits<=y?m.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):n.classList.remove("is-hidden"),d?b():L()}catch(e){console.log(e)}},E=async s=>{try{l+=1,n.classList.add("is-hidden"),g.classList.remove("is-hidden");const{data:e}=await f(h,l);g.classList.add("is-hidden");const o=Math.ceil(e.totalHits/y);l>=o?(a.innerHTML="",m.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):n.classList.remove("is-hidden");const i=p(e.hits);a.insertAdjacentHTML("beforeend",i),d?b():L(),q()}catch(e){console.log(e)}};u.addEventListener("submit",x);n.addEventListener("click",E);
//# sourceMappingURL=index.js.map
