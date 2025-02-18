import{a as m,S as f,i as p}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const h="48807369-8911b207443a7f439467dae3a",y="https://pixabay.com/api/",g=async s=>{try{return(await m.get(`${y}`,{params:{key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(t){return console.error("Error fetching images:",t),[]}},b=new f(".gallery a"),L=(s,t)=>{if(t.innerHTML="",s.length===0){p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const o=s.map(({webformatURL:a,largeImageURL:e,tags:r,likes:n,views:l,comments:u,downloads:d})=>`
        <a href="${e}" class="gallery__item">
          <img src="${a}" alt="${r}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${n}</p>
            <p class="info-item"><b>Views:</b> ${l}</p>
            <p class="info-item"><b>Comments:</b> ${u}</p>
            <p class="info-item"><b>Downloads:</b> ${d}</p>
          </div>
        </a>
      `).join("");t.insertAdjacentHTML("beforeend",o),b.refresh()},S=document.querySelector("#search-form"),i=document.querySelector(".gallery"),c=document.querySelector(".loader"),$=async s=>{s.preventDefault();const t=s.target.elements.searchQuery.value.trim();if(!t){iziToast.warning({title:"Warning",message:"Please enter a search query!"});return}c.classList.remove("is-hidden"),i.innerHTML="";try{const o=await g(t);L(o,i)}catch(o){console.error("Error handling search:",o)}finally{c.classList.add("is-hidden")}};S.addEventListener("submit",$);
//# sourceMappingURL=index.js.map
