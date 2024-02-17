import{i as f,a as q,S as v}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))m(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&m(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function m(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const h=document.querySelector(".form"),i=document.querySelector(".gallery"),b=document.querySelector("input"),$=document.querySelector(".container"),p=document.querySelector(".load-more");let c=1,y=40;const w=()=>{const e=document.createElement("span");e.classList.add("loader"),$.append(e)},a=()=>{const e=document.querySelector(".loader");e&&e.remove()},g=()=>{p.style.display="block"},l=()=>{p.style.display="none"};function P(e,t){return e>=t}async function L(){new URLSearchParams({page:c,per_page:y});const e="42261083-50fe706ca9c2c1734499a9937",t=d||b.value;return(await q.get(`https://pixabay.com/api/?key=${e}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${c}&per_page=${y}`)).data}function S(e){const t=e.hits.map(r=>`<li class="gallery-item"><a href="${r.webformatURL}">
            <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}"></a>
            <p><b>Likes: </b>${r.likes}</p>
            <p><b>Views: </b>${r.views}</p>
            <p><b>Comments: </b>${r.comments}</p>
            <p><b>Downloads: </b>${r.downloads}</p>
            </li>`).join("");s&&s.destroy(),i.insertAdjacentHTML("beforeend",t),s=new v(".gallery a",B),s.on("show.simplelightbox"),s.refresh()}h.addEventListener("submit",async e=>{if(w(),c=1,e.preventDefault(),i.innerHTML="",d=b.value.trim(),d===""){a();return}try{const t=await L();if(S(t),h.reset(),a(),g(),t.hits.length===0){f.error({title:"",backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!"});const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}P(i.children.length,t.totalHits)?l():g()}catch(t){console.log(t),l()}});p.addEventListener("click",async()=>{w();try{c+=1;const e=await L();S(e),a();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),i.children.length>=e.totalHits&&(f.warning({title:"",message:"We're sorry, but you've reached the end of search results."}),l())}catch(e){console.log(e),a(),l()}});let s,d="";const B={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250};
//# sourceMappingURL=commonHelpers.js.map
