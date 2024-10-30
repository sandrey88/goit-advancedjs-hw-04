import{a as m,S as L,i}from"./assets/vendor-C4-ZuMk8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const S="46726016-b290741f0a1b76ad16aa31499";m.defaults.baseURL="https://pixabay.com/api/";async function f(t,r=1){const o=new URLSearchParams({key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:r});return(await m.get(`?${o}`)).data}let u;function y(t,r=!1){const o=t.map(({tags:s,webformatURL:e,largeImageURL:a,likes:n,views:p,comments:b,downloads:w})=>`
      <li class="gallery-card">
        <a class="gallery-link" href="${a}">
            <img class="gallery-img" src="${e}" alt="${s}" />
            <div class="values-container">
                <ul class="labels">
                    <li>Likes</li>
                    <li>${n}</li>
                </ul>
                <ul class="labels">
                    <li>Views</li>
                    <li>${p}</li>
                </ul>
                <ul class="labels">
                    <li>Comments</li>
                    <li>${b}</li>
                </ul>
                <ul class="labels">
                    <li>Downloads</li>
                    <li>${w}</li>
                </ul>
            </div>
        </a>
      </li>`).join("");q(o,r)}function q(t,r){const o=document.querySelector("ul.images-div");r?o.insertAdjacentHTML("beforeend",t):o.innerHTML=t,u?u.refresh():u=new L(".images-div a",{captionsData:"alt",captionDelay:250})}const v=document.querySelector("button[type=submit]"),P=document.querySelector(".images-div"),d=document.querySelector(".loaderClass"),c=document.querySelector(".load-more");let l=1,g="";v.addEventListener("click",C);c.addEventListener("click",M);async function C(t){t.preventDefault();const r=document.querySelector('input[name="search"]'),o=document.querySelector(".not-found-img"),s=r.value.trim();if(s.length===0){i.show({title:"❌",message:"Please enter a search query!",color:"ef4040"});return}l=1,g=s,P.innerHTML="",c.style.display="none",d.style.display="flex";try{const e=await f(s,l);if(e.total===0){o.innerHTML=`Results for query <span>${s}</span> not found!`,i.show({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageColor:"white"});return}o.innerHTML="",y(e.hits),e.totalHits>l*15&&(c.style.display="block"),await h()}catch(e){console.error(e),i.show({title:"❌",message:"An error occurred while fetching images",backgroundColor:"#ef4040",messageColor:"white"})}finally{d.style.display="none",r.value=""}}async function M(){l+=1,c.style.display="none";try{const t=await f(g,l);y(t.hits,!0),t.totalHits>l*15?c.style.display="block":i.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4e75ff",messageColor:"white"}),await h()}catch(t){console.error(t),i.show({title:"❌",message:"An error occurred while loading more images",backgroundColor:"#ef4040",messageColor:"white"})}finally{d.style.display="none"}}async function h(){const t=document.querySelectorAll(".gallery-img"),r=Array.from(t).map(o=>new Promise(s=>{o.onload=s,o.onerror=s}));await Promise.all(r)}
//# sourceMappingURL=index.js.map
