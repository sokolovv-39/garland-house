if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>a(e,n),d={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>d[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"a7299228abb2b992c16816e66e770b7b"},{url:"/_next/static/MZsRq5gFaQPg2G15rJ3dL/_buildManifest.js",revision:"172e769da91baa11de9b258fb2d92f86"},{url:"/_next/static/MZsRq5gFaQPg2G15rJ3dL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-f08b8de92a1a87a9.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/162.a4ef30219d28860f.js",revision:"a4ef30219d28860f"},{url:"/_next/static/chunks/342.4b1466487e0c6c35.js",revision:"4b1466487e0c6c35"},{url:"/_next/static/chunks/53-04afee4d3b2aa152.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/645-67238ca92bd30257.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/6468630d-b35b002637a5e595.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/794-b5ada397405ec5da.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/821.f6de38f1da5bd7f5.js",revision:"f6de38f1da5bd7f5"},{url:"/_next/static/chunks/845-047dbb5efb07ae57.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/9cb54ea0-e757e54af2341ae7.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/gallery/page-09a473a8305f58fd.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/layout-6da367b03f883333.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/%5Bmeasure%5D/basic/page-66af713c4aec61a9.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/%5Bmeasure%5D/layout-4e477b5c186a2b34.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/%5Bmeasure%5D/objects/page-7bc1a1547f355dfb.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/%5Bmeasure%5D/page-d4049f5e1eba77a0.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/%5Bmeasure%5D/report/page-371ad6a3dfd320a3.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/layout-048c9f73707167c2.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/(protected)/orders/page-e14db73855fe28b7.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/_not-found/page-3f93312a0f7d1a58.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/layout-27691c2d76203d53.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/app/page-729c48c236cb0ad0.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/eeb5c378-c40f536c96048461.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/fd9d1056-119d76a528d20a80.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/main-2d0470d4eb064b23.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/main-app-682a57e3f1ac4834.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/pages/_app-15e2daefa259f0b5.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/pages/_error-28b803cb2479b966.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-1f3b95d4bbaabc79.js",revision:"MZsRq5gFaQPg2G15rJ3dL"},{url:"/_next/static/css/1f5855de1499bf73.css",revision:"1f5855de1499bf73"},{url:"/_next/static/css/4df9d8205d7451e6.css",revision:"4df9d8205d7451e6"},{url:"/_next/static/css/76d3f15017dc9544.css",revision:"76d3f15017dc9544"},{url:"/_next/static/css/b1823f056b23151f.css",revision:"b1823f056b23151f"},{url:"/_next/static/css/e4aa3fa543374d51.css",revision:"e4aa3fa543374d51"},{url:"/_next/static/css/fcfd3f1ecbff85d6.css",revision:"fcfd3f1ecbff85d6"},{url:"/_next/static/fonts/Roboto-Regular.ttf",revision:"327362a7c8d487ad3f7970cc8e2aba8d"},{url:"/_next/static/media/008f2e8b4aae291f-s.woff2",revision:"54718ab24898dc8cd382ef3f285cfd0d"},{url:"/_next/static/media/3534416bbfdcc9be-s.woff2",revision:"8951283ba1faa0d2c460f42df9366ca1"},{url:"/_next/static/media/3c46462b57ac880e-s.woff2",revision:"3942629d96d5cee049ce769cefb891e1"},{url:"/_next/static/media/4529092560591ab4-s.p.woff2",revision:"4f8626e31885b0732c32a2358239d9cf"},{url:"/_next/static/media/6e3cbd83ab7c4e47-s.p.ttf",revision:"1e99b0442583593743adb5d91d7c0669"},{url:"/_next/static/media/78187650dd6b50b3-s.woff2",revision:"d84d7157146a9c9347d9c07d172dc651"},{url:"/_next/static/media/Excel_Icon.4cf3ab66.webp",revision:"434a06588726a22da087f4234fc9e0b7"},{url:"/_next/static/media/GH_logo.895916bc.png",revision:"06670ee440b72237fd3df922bf352365"},{url:"/_next/static/media/PDF_Icon.a3ea32c1.webp",revision:"71230cf41a7b1ca255f2ed07c5ce3549"},{url:"/_next/static/media/Unknown_Icon.7ccce8cd.avif",revision:"4020a928fb74b20e11bf8162c025d577"},{url:"/_next/static/media/Word_Icon.65431f9a.webp",revision:"317ffd51b200e9a5c9630410a7f9bdc2"},{url:"/_next/static/media/arrow-left.e5728e6b.svg",revision:"e827d51e2e38f59c9d7b4fe8fc788446"},{url:"/_next/static/media/arrow.e3633183.svg",revision:"16707a00f20672df71ba92f0e2885549"},{url:"/_next/static/media/b8222d26e20b2e06-s.woff2",revision:"6c7142c441804cd078afe45be959fa78"},{url:"/_next/static/media/copy.9f36a671.svg",revision:"2921edafa0f12fd4af20d242c64eaf11"},{url:"/_next/static/media/demo.860d8724.pdf",revision:"860d8724"},{url:"/_next/static/media/filter.6020027a.svg",revision:"bbf0c6819bb750df1363021bb6dfa1c2"},{url:"/_next/static/media/pdf_intro.344be66e.png",revision:"dc023076de76ca96f91113246e4705a5"},{url:"/_next/static/media/red cross.1da977bd.png",revision:"5467c459b73be0aa0ba797c852904a80"},{url:"/_next/static/media/refresh.29ab1554.svg",revision:"2a6eee45cdb90752f9d8fed85cce7695"},{url:"/_next/static/media/search.95ffd395.svg",revision:"411c7c61dc473bb694234fe9623cb5b6"},{url:"/_next/static/media/visBackground.26fa616c.png",revision:"17ecedf1af7aa04be3d5393bd528e186"},{url:"/icon192.png",revision:"2aeac9e4398dbfe7ec709a0789b3f025"},{url:"/icon512.png",revision:"f339a04b0690281cc9802b8582cb30d1"},{url:"/manifest.json",revision:"ee52d7e7e00eaa353394ac462f04e40d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
