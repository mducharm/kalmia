if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,s,c)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const a={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return r;case"module":return a;default:return e(i)}}))).then((e=>{const i=c(...e);return r.default||(r.default=i),r}))})))}}define("./sw.js",["./workbox-f7715658"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_dist_/main.css",revision:"7421cc5a181a7739d0488b52e270d408"},{url:"_dist_/main.js",revision:"28fe626525124bff80a6364d54ce747c"},{url:"android-chrome-192x192.png",revision:"83051ff3e75bd4a8ac21c40f3defdfee"},{url:"android-chrome-512x512.png",revision:"9a47e11c2a1483a8b91ba120744cc982"},{url:"apple-touch-icon.png",revision:"a8bf679fc36742c4c8a897a25b97a0aa"},{url:"build-manifest.json",revision:"47657316b9dd3e60c38568ddf4271979"},{url:"favicon-16x16.png",revision:"be4019a73f71c307d638fbd19e0708cf"},{url:"favicon-32x32.png",revision:"32f8d78535224546156fa431e036764e"},{url:"favicon.ico",revision:"c7612d96cd3ca5036193f3516ef2f6a5"},{url:"images/flower.svg",revision:"de435c76bad4d485b4819b0aa84b0e0f"},{url:"images/medical-pill.svg",revision:"9ea5cf08995dd78a322063608b0a8601"},{url:"images/tulip.svg",revision:"c3c2b403bc7c1c9b05f976848852ee33"},{url:"index.html",revision:"34418412e0f646b6ef5e70002902126f"},{url:"js/main.8884100bb2ccaf9eaf02.js",revision:"7ec3d848acf2f35ba0cfcefce75c6382"},{url:"js/main.8884100bb2ccaf9eaf02.js.LICENSE.txt",revision:"215f0aee2821f873b11c348be0ccf5d7"},{url:"js/webpack-runtime.5072755c7971ba0e8aa3.js",revision:"3c768977c2574a34506ebd0fed7ae101"},{url:"site.webmanifest",revision:"ee3c0aa752c720f942699b1a4e7d2031"},{url:"sw.js",revision:"0b7baa5b83e99ca83571160508b7d905"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
