import{a as S,S as q,i as g}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();let m=40;async function f(){new URLSearchParams({page:a,per_page:m});const e="42261083-50fe706ca9c2c1734499a9937",r=w.value.trim();return(await S.get(`https://pixabay.com/api/?key=${e}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=${m}`)).data}let s;function b(e){const r=e.hits.map(t=>`<li class="gallery-item"><a href="${t.webformatURL}">
              <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}"></a>
              <p><b>Likes: </b>${t.likes}</p>
              <p><b>Views: </b>${t.views}</p>
              <p><b>Comments: </b>${t.comments}</p>
              <p><b>Downloads: </b>${t.downloads}</p>
              </li>`).join("");s&&s.destroy(),c.insertAdjacentHTML("beforeend",r),s=new q(".gallery a",v),s.on("show.simplelightbox"),s.refresh()}const v={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250},h=document.querySelector(".form"),c=document.querySelector(".gallery"),w=document.querySelector("input"),$=document.querySelector(".container"),p=document.querySelector(".load-more");let a=1;const L=()=>{const e=document.createElement("span");e.classList.add("loader"),$.append(e)},l=()=>{const e=document.querySelector(".loader");e&&e.remove()},y=()=>{p.style.display="block"},u=()=>{p.style.display="none"};function P(e,r){return e>=r}h.addEventListener("submit",async e=>{if(L(),a=1,e.preventDefault(),c.innerHTML="",w.value.trim()===""){l();return}try{const t=await f();if(b(t),h.reset(),l(),y(),t.hits.length===0){g.error({title:"",backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!"});const{height:i}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}P(c.children.length,t.totalHits)?u():y()}catch(t){console.log(t),u()}});p.addEventListener("click",async()=>{L();try{a+=1;const e=await f();b(e),l();const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),c.children.length>=e.totalHits&&(g.warning({title:"",message:"We're sorry, but you've reached the end of search results."}),u())}catch(e){console.log(e),l(),u()}});
//# sourceMappingURL=commonHelpers.js.map