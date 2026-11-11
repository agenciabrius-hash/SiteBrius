/* Área do Cliente como app: guarda só a "casca" da página para abrir rápido.
   Nada dos dados (posts, valores, contratos) fica guardado: tudo vem sempre da internet. */
const V='brius-cli-v1';
const CASCA=['/cliente/','/cliente/tarefas.js','/img/icone-192.png','/img/logo-brius.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CASCA)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin!==location.origin)return; // API, Drive e fontes: sempre direto da internet
  if(!CASCA.includes(u.pathname)&&r.mode!=='navigate')return;
  // internet primeiro; se estiver sem sinal, abre a última versão guardada
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r.mode==='navigate'?'/cliente/':r,cp))}return res}).catch(()=>caches.match(r.mode==='navigate'?'/cliente/':r)))});
