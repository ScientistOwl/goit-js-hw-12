import{a as L,S as b,i as v}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const E="48807369-8911b207443a7f439467dae3a",w="https://pixabay.com/api/";let u=1;const f=async(t,r=!1)=>{r&&(u=1);try{const o=await L.get(`${w}`,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:u,per_page:40}});return u+=1,o.data.hits}catch(o){return console.error("Error fetching images:",o),[]}},S=new b(".gallery a"),h=(t,r,o=!1)=>{if(t.length===0){v.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const i=t.map(({webformatURL:e,largeImageURL:s,tags:a,likes:m,views:g,comments:p,downloads:y})=>`
        <a href="${s}" class="gallery__item">
          <img src="${e}" alt="${a}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${m}</p>
            <p class="info-item"><b>Views:</b> ${g}</p>
            <p class="info-item"><b>Comments:</b> ${p}</p>
            <p class="info-item"><b>Downloads:</b> ${y}</p>
          </div>
        </a>
      `).join("");o?r.insertAdjacentHTML("beforeend",i):r.innerHTML=i,S.refresh()},q=document.querySelector("#search-form"),n=document.querySelector(".gallery"),l=document.querySelector(".loader"),d=document.querySelector(".load-more");let c="";const $=async t=>{if(t.preventDefault(),c=t.target.elements.searchQuery.value.trim(),!c){iziToast.warning({title:"Warning",message:"Please enter a search query!"});return}d.classList.add("is-hidden"),l.classList.remove("is-hidden"),n.innerHTML="";try{const r=await f(c,!0);h(r,n),r.length>0&&d.classList.remove("is-hidden")}catch(r){console.error("Error handling search:",r)}finally{l.classList.add("is-hidden")}},P=async()=>{l.classList.remove("is-hidden"),n.firstElementChild.getBoundingClientRect().height;try{const t=await f(c);h(t,n,!0);const r=n.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),t.length===0&&(d.classList.add("is-hidden"),iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch(t){console.error("Error loading more images:",t)}finally{l.classList.add("is-hidden")}};q.addEventListener("submit",$);d.addEventListener("click",P);
//# sourceMappingURL=index.js.map
