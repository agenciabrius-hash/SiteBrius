/* Tarefas da Brius · checklists do Matheus e da Sabrina
   Usado no painel da agência (cliente/) e no link da equipe (tarefas/). */
(function(){
const CSS=`
.tf button,.tf input,.tf select,.tf summary,.tf-mod button{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.tf button:not(:disabled):active{transform:scale(.96)}
.tf{--m:#f0b26b;--s:#c48af0;--d:#7fb6e6;--ok:#7fc49a;--late:#f0a28f}
.tf-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin:0 0 16px}
.tf-pes{display:inline-flex;background:var(--graphite);border:1px solid #3a352f;border-radius:999px;padding:4px;gap:2px;position:relative}
.tf-pes button{position:relative;z-index:1;border:0;background:none;color:var(--muted-d);font:700 14px var(--body);padding:9px 16px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:color .25s}
.tf-pes button[aria-pressed="true"]{color:#141210}
.tf-pes .pill{position:absolute;z-index:0;top:4px;bottom:4px;border-radius:999px;background:var(--gold-soft);transition:left .35s cubic-bezier(.3,1.3,.5,1),width .35s cubic-bezier(.3,1.3,.5,1)}
.tf-dot{width:9px;height:9px;border-radius:50%;display:inline-block;flex:none}.tf-dot.m{background:var(--m)}.tf-dot.s{background:var(--s)}.tf-dot.d{background:var(--d)}
.tf-bts{display:flex;gap:8px}
.tf-btn{border:1px solid #3a352f;background:transparent;color:var(--bone);border-radius:999px;padding:10px 16px;font:700 14px var(--body);cursor:pointer;transition:transform .15s,background .2s}
.tf-btn:hover{background:var(--graphite-2)}.tf-btn:active{transform:scale(.96)}
.tf-btn.pri{background:var(--gold-soft);border-color:var(--gold-soft);color:#141210}.tf-btn.pri:hover{background:#f1e2c4}
.tf-menu{position:relative}.tf-menu ul{position:absolute;right:0;top:calc(100% + 6px);z-index:20;list-style:none;margin:0;padding:6px;background:var(--graphite-2);border:1px solid #3a352f;border-radius:14px;min-width:230px;box-shadow:0 18px 40px rgba(0,0,0,.45);animation:tfPop .18s ease-out}
.tf-menu li button{width:100%;text-align:left;border:0;background:none;color:var(--bone);font:600 14px var(--body);padding:11px 12px;border-radius:10px;cursor:pointer}.tf-menu li button:hover{background:#2f2b26}
.tf-res{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:0 0 18px}
.tf-res div{background:var(--graphite);border:1px solid #3a352f;border-radius:16px;padding:14px 16px;animation:tfIn .5s both}
.tf-res b{display:block;font:500 30px/1 var(--serif)}.tf-res small{color:var(--muted-d);font-size:13px}.tf-res .late b{color:var(--late)}.tf-res .ok b{color:var(--ok)}
.tf-hoje{background:linear-gradient(135deg,rgba(184,149,90,.14),rgba(184,149,90,.03));border:1px solid rgba(184,149,90,.4);border-radius:18px;padding:14px 16px;margin:0 0 18px;animation:tfIn .5s both}
.tf-hoje h4{margin:0 0 6px;font:500 20px var(--serif)}.tf-hoje .tf-i{background:rgba(20,18,16,.35)}
.tf-p{background:var(--graphite);border:1px solid #3a352f;border-radius:20px;margin:0 0 14px;overflow:hidden;animation:tfIn .5s both;transition:border-color .3s}
.tf-p.aberto{border-color:#4a443d}.tf-p.cem{border-color:rgba(127,196,154,.6)}
.tf-ph{width:100%;display:flex;align-items:center;gap:14px;padding:14px 16px;background:none;border:0;color:var(--bone);text-align:left;cursor:pointer;font:inherit}
.tf-ring{--p:0;width:52px;height:52px;border-radius:50%;flex:none;display:grid;place-items:center;background:conic-gradient(var(--c,var(--gold-soft)) calc(var(--p)*1%),#2f2b26 0);transition:--p .8s;position:relative}
.tf-ring::before{content:"";position:absolute;inset:5px;border-radius:50%;background:var(--graphite)}.tf-ring span{position:relative;font:800 13px var(--body)}
.tf-ph .tx{min-width:0;flex:1}.tf-ph b{display:block;font:500 19px/1.2 var(--serif)}.tf-ph small{display:block;color:var(--muted-d);font-size:13px;margin-top:3px}
.tf-ph .chev{transition:transform .3s;color:var(--muted-d);font-size:18px}.tf-p.aberto .tf-ph .chev{transform:rotate(180deg)}
.tf-tag{display:inline-block;font:800 10.5px var(--body);letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:#2f2b26;color:var(--gold-soft);margin-left:6px;vertical-align:2px}
.tf-pb{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s ease}.tf-p.aberto .tf-pb{grid-template-rows:1fr}.tf-pb>div{overflow:hidden}
.tf-pi{padding:0 16px 14px}
.tf-f{margin-top:10px;padding-top:12px;border-top:1px solid #2f2b26}
.tf-fh{display:flex;align-items:center;gap:10px;margin:0 0 8px}.tf-fh h5{margin:0;font:800 12px var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}.tf-fh span{margin-left:auto;color:var(--muted-d);font:700 13px var(--body)}
.tf-bar{height:7px;border-radius:9px;background:#2f2b26;overflow:hidden;margin:0 0 10px}.tf-bar i{display:block;height:100%;width:calc(var(--p)*1%);background:linear-gradient(90deg,var(--gold),var(--gold-soft));border-radius:9px;transition:width .7s cubic-bezier(.3,1.2,.5,1)}
.tf-bar.cem i{background:linear-gradient(90deg,#5aa977,var(--ok))}
.tf-dica{margin:-2px 0 10px;font-size:13px;color:var(--muted-d)}.tf-dica.ok{color:var(--ok);font-weight:700}
.tf-l{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.tf-i{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;background:var(--graphite-2);transition:opacity .3s,background .3s;animation:tfIn .35s both}
.tf-ck{width:26px;height:26px;flex:none;border-radius:8px;border:2px solid #5a534b;background:none;cursor:pointer;display:grid;place-items:center;color:#141210;transition:background .2s,border-color .2s,transform .15s}
.tf-ck:hover{border-color:var(--gold-soft)}.tf-ck:active{transform:scale(.85)}
.tf-ck svg{width:15px;height:15px;stroke:currentColor;stroke-width:3.2;fill:none;stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .3s ease .05s}
.tf-i.feito .tf-ck{background:var(--ok);border-color:var(--ok);animation:tfCk .35s}.tf-i.feito .tf-ck svg{stroke-dashoffset:0}
.tf-t{min-width:0;flex:1;font-size:14.5px;line-height:1.35}.tf-t>span{transition:color .3s}
.tf-i.feito .tf-t>span{color:var(--muted-d);text-decoration:line-through;text-decoration-color:rgba(180,171,157,.6)}
.tf-t small{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;font-size:12px;color:var(--muted-d);align-items:center}
.tf-r{display:inline-flex;align-items:center;gap:5px;font-weight:700}.tf-pz.late{color:var(--late);font-weight:800}.tf-pz.hj{color:var(--gold-soft);font-weight:800}
.tf-ed{border:0;background:none;color:var(--muted-d);cursor:pointer;font-size:15px;padding:6px;border-radius:8px;opacity:.7}.tf-ed:hover{opacity:1;background:#2f2b26}
.tf-add{display:flex;gap:6px;margin-top:8px}.tf-add input{flex:1;min-width:0;background:transparent;border:1px dashed #4a443d;border-radius:12px;padding:10px 12px;color:var(--bone);font:500 14px var(--body)}
.tf-add input:focus{outline:none;border-style:solid;border-color:var(--gold)}.tf-add select{background:var(--graphite-2);border:1px solid #3a352f;border-radius:12px;color:var(--bone);font:600 13px var(--body);padding:0 8px}
.tf-add button{border:0;border-radius:12px;background:var(--gold-soft);color:#141210;font:800 18px var(--body);width:42px;cursor:pointer}
.tf-pf{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid #2f2b26}.tf-pf .tf-btn{padding:8px 14px;font-size:13px}
.tf-vz{color:var(--muted-d);text-align:center;padding:30px 10px;border:1px dashed #3a352f;border-radius:18px}
.tf-conc>summary{cursor:pointer;color:var(--muted-d);font-weight:700;padding:8px 2px;list-style:none}.tf-conc>summary::before{content:"▸ "}.tf-conc[open]>summary::before{content:"▾ "}
.tf-mod{position:fixed;inset:0;z-index:200;background:rgba(10,9,8,.72);backdrop-filter:blur(4px);display:grid;place-items:center;padding:16px;animation:tfFade .2s}
.tf-mod form{width:100%;max-width:520px;max-height:calc(100vh - 32px);overflow:auto;background:var(--graphite);border:1px solid #3a352f;border-radius:22px;padding:20px;animation:tfPop .25s cubic-bezier(.3,1.3,.5,1)}
.tf-mod h3{margin:0 0 14px;font:500 24px var(--serif)}.tf-mod label{display:grid;gap:6px;font-size:13px;font-weight:700;color:var(--muted-d);margin-bottom:12px}
.tf-mod input,.tf-mod select,.tf-mod textarea{width:100%;background:var(--ink);border:1px solid #3a352f;border-radius:12px;padding:11px 12px;color:var(--bone);font:500 15px var(--body);color-scheme:dark}
.tf-mod .dois{display:grid;grid-template-columns:1fr 1fr;gap:10px}.tf-mod .rod{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:6px}.tf-mod .rod .esq{margin-right:auto}
.tf-mod .msg{color:var(--late);font-size:13px;min-height:1em;margin:0 0 6px}.tf-mod p.d{color:var(--muted-d);font-size:13.5px;margin:-6px 0 14px;line-height:1.45}
.tf-mt{display:grid;gap:8px;margin-bottom:10px}.tf-mt div{display:grid;grid-template-columns:110px 92px 1fr 64px 32px;gap:6px}.tf-mt input,.tf-mt select{padding:8px;font-size:13px;border-radius:9px}
.tf-mt button{border:0;background:none;color:var(--muted-d);cursor:pointer;font-size:15px}
.tf-link{display:flex;gap:6px}.tf-link input{font-size:13px}
.tf-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:300;background:var(--bone);color:#141210;font:700 14px var(--body);padding:12px 18px;border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.4);animation:tfToast 2.6s both}
.tf-fest{position:fixed;pointer-events:none;z-index:250;font-size:22px;animation:tfVoa 1.1s ease-out forwards}
@keyframes tfIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes tfPop{from{opacity:0;transform:scale(.94) translateY(6px)}to{opacity:1;transform:none}}
@keyframes tfFade{from{opacity:0}}
@keyframes tfCk{0%{transform:scale(.7)}60%{transform:scale(1.18)}100%{transform:scale(1)}}
@keyframes tfToast{0%{opacity:0;transform:translate(-50%,14px)}10%,85%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,8px)}}
@keyframes tfVoa{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}
@media (max-width:560px){.tf-mt div{grid-template-columns:1fr 1fr;}.tf-mt div input[name=texto]{grid-column:1/-1}.tf-pes button{padding:9px 12px}}
@media (prefers-reduced-motion:reduce){.tf *{animation:none!important;transition:none!important}}
`;
const FASES_GRAV=['Preparação','Gravação','Pós-produção'];
const NUM={'Preparação':'1','Gravação':'2','Pós-produção':'3','Tarefas':''};
const DICA={'Preparação':'Tudo pronto antes de sair de casa. O roteiro fica pronto 5 dias antes.','Gravação':'Uma linha por cena do roteiro. Vai marcando enquanto grava.','Pós-produção':'Depois da gravação: editar, montar e subir tudo no site.'};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hoje=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const dif=(a,b)=>Math.round((new Date(a+'T12:00:00')-new Date(b+'T12:00:00'))/864e5);
const DS=['dom','seg','ter','qua','qui','sex','sáb'];
const dBr=iso=>iso?DS[new Date(iso+'T12:00:00').getDay()]+', '+iso.split('-').reverse().slice(0,2).join('/'):'';
const cls=r=>r==='Matheus'?'m':r==='Sabrina'?'s':'d';
const pct=l=>l.length?Math.round(l.filter(x=>x.feito).length/l.length*100):0;
const CK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

window.Tarefas=function(opts){
  if(!document.getElementById('tfCss')){const st=document.createElement('style');st.id='tfCss';st.textContent=CSS;document.head.appendChild(st)}
  const el=opts.el;let D=null;let quem=(()=>{try{return localStorage.getItem('tf_quem')||opts.quem||''}catch(e){return opts.quem||''}})();
  const abertos=new Set();let primeira=true;let menuAberto=false;
  const toast=t=>{const e=document.createElement('div');e.className='tf-toast';e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),2700)};
  const festa=(x,y)=>{['🎉','✨','🎬','💛','⭐'].forEach((c,i)=>{for(let k=0;k<2;k++){const s=document.createElement('span');s.className='tf-fest';s.textContent=c;s.style.left=x+'px';s.style.top=y+'px';
    s.style.setProperty('--x',(Math.random()*240-120)+'px');s.style.setProperty('--y',(-80-Math.random()*160)+'px');s.style.setProperty('--r',(Math.random()*400-200)+'deg');document.body.appendChild(s);setTimeout(()=>s.remove(),1200)}})};
  async function call(op,d){const j=await opts.call(op,d||{});if(!j||!j.ok)throw new Error((j&&j.erro)||'Não foi possível agora.');if(j.projetos){D=j}return j}
  function visivel(it){return !quem||it.resp===quem||it.resp==='Os dois'}
  function modal(titulo,html,enviar,rot,extra){const m=document.createElement('div');m.className='tf-mod';
    m.innerHTML='<form><h3>'+titulo+'</h3>'+html+'<p class="msg"></p><div class="rod">'+(extra||'')+'<button type="button" class="tf-btn cc">Cancelar</button>'+(enviar?'<button class="tf-btn pri">'+(rot||'Salvar')+'</button>':'')+'</div></form>';
    document.body.appendChild(m);const f=m.querySelector('form');const fechar=()=>m.remove();m.querySelector('.cc').onclick=fechar;m.onclick=e=>{if(e.target===m)fechar()};
    document.addEventListener('keydown',function k(e){if(e.key==='Escape'){fechar();document.removeEventListener('keydown',k)}});
    f.onsubmit=async e=>{e.preventDefault();if(!enviar)return;const b=f.querySelector('.pri');b.disabled=true;f.querySelector('.msg').textContent='';
      try{await enviar(f);fechar();pintar()}catch(x){f.querySelector('.msg').textContent=x.message}b.disabled=false};
    setTimeout(()=>{const i=f.querySelector('input:not([type=hidden]),textarea');if(i)i.focus()},60);return f}
  const opR=(sel)=>(D.resp||['Matheus','Sabrina','Os dois']).map(r=>'<option'+(r===sel?' selected':'')+'>'+r+'</option>').join('');
  const opF=(sel)=>(D.fases||FASES_GRAV.concat('Tarefas')).map(r=>'<option'+(r===sel?' selected':'')+'>'+r+'</option>').join('');

  function itemHtml(it,comProj){const hj=hoje();const late=!it.feito&&it.prazo&&it.prazo<hj;const ehHj=!it.feito&&it.prazo===hj;
    return '<li class="tf-i'+(it.feito?' feito':'')+'" data-id="'+esc(it.id)+'"><button type="button" class="tf-ck" aria-pressed="'+it.feito+'" aria-label="Marcar como feito">'+CK+'</button>'+
      '<span class="tf-t"><span>'+esc(it.texto)+'</span><small><span class="tf-r"><i class="tf-dot '+cls(it.resp)+'"></i>'+esc(it.resp)+'</span>'+
      (it.prazo?'<span class="tf-pz'+(late?' late':ehHj?' hj':'')+'">'+(late?'⚠ atrasada · ':ehHj?'hoje · ':'até ')+esc(dBr(it.prazo))+'</span>':'')+
      (comProj?'<span>· '+esc(comProj)+'</span>':'')+(it.feito&&it.feitoEm?'<span>✓ '+esc(it.feitoEm)+'</span>':'')+'</small></span>'+
      '<button type="button" class="tf-ed" aria-label="Editar tarefa">✏️</button></li>'}

  function projHtml(p){const its=p.itens;const pp=pct(its);const hj=hoje();
    const fases=(p.tipo==='gravacao'?FASES_GRAV:[]).concat([...new Set(its.map(x=>x.fase))].filter(f=>p.tipo!=='gravacao'||FASES_GRAV.indexOf(f)<0));
    const fs=fases.length?fases:['Tarefas'];
    let quando='';if(p.data){const d=dif(p.data,hj);quando=dBr(p.data)+' · '+(d===0?'<b style="color:var(--gold-soft)">é hoje!</b>':d>0?'faltam '+d+' dia'+(d>1?'s':''):'foi há '+(-d)+' dia'+(d<-1?'s':''))}
    const prep=its.filter(x=>x.fase==='Preparação');const pPrep=pct(prep);
    return '<article class="tf-p'+(abertos.has(p.id)?' aberto':'')+(pp===100?' cem':'')+'" data-pid="'+esc(p.id)+'"><button type="button" class="tf-ph" aria-expanded="'+abertos.has(p.id)+'">'+
      '<span class="tf-ring" style="--p:'+pp+';--c:'+(pp===100?'var(--ok)':'var(--gold-soft)')+'"><span>'+pp+'%</span></span><span class="tx"><b>'+esc(p.nome)+(p.tipo==='gravacao'?'<span class="tf-tag">gravação</span>':p.tipo==='rotina'?'<span class="tf-tag">rotina</span>':'')+'</b><small>'+(quando||'sem data')+' · '+its.filter(x=>x.feito).length+'/'+its.length+' feitas</small></span><span class="chev">▾</span></button>'+
      '<div class="tf-pb"><div><div class="tf-pi">'+fs.map(f=>{const l=its.filter(x=>x.fase===f);const lv=l.filter(visivel);const fp=pct(l);
        return '<section class="tf-f" data-fase="'+esc(f)+'"><div class="tf-fh"><h5>'+(NUM[f]?NUM[f]+' · ':'')+esc(f)+'</h5><span>'+l.filter(x=>x.feito).length+'/'+l.length+'</span></div>'+
          '<div class="tf-bar'+(fp===100&&l.length?' cem':'')+'" style="--p:'+fp+'"><i></i></div>'+
          (f==='Preparação'&&p.tipo==='gravacao'?'<p class="tf-dica'+(pPrep===100&&prep.length?' ok':'')+'">'+(pPrep===100&&prep.length?'🎬 Tudo pronto para a gravação!':'Pronto para a gravação: <b>'+pPrep+'%</b>. '+DICA[f])+'</p>':DICA[f]&&p.tipo==='gravacao'?'<p class="tf-dica">'+DICA[f]+'</p>':'')+
          '<ul class="tf-l">'+lv.map(it=>itemHtml(it)).join('')+'</ul>'+(l.length&&!lv.length?'<p class="tf-dica">Nada de '+esc(quem)+' aqui.</p>':'')+
          '<form class="tf-add"><input name="texto" placeholder="'+(f==='Gravação'?'+ Cena do roteiro (ex.: Reels do antes e depois)':'+ Adicionar tarefa')+'" maxlength="200" aria-label="Nova tarefa em '+esc(f)+'"><select name="resp" aria-label="Responsável">'+opR(quem||(f==='Gravação'?'Os dois':''))+'</select><button aria-label="Adicionar">+</button></form></section>'}).join('')+
        (opts.admin?'<div class="tf-pf"><button type="button" class="tf-btn" data-pe>✏️ Editar projeto</button><button type="button" class="tf-btn" data-pd>🗑 Excluir</button></div>':'')+'</div></div></div></article>'}

  function pintar(){if(!D){el.innerHTML='<div class="tf"><p class="tf-vz">Carregando tarefas…</p></div>';return}
    const hj=hoje();const ps=D.projetos.slice().sort((a,b)=>(a.data||'9999').localeCompare(b.data||'9999'));
    const ativos=ps.filter(p=>!p.itens.length||pct(p.itens)<100),feitos=ps.filter(p=>p.itens.length&&pct(p.itens)===100);
    if(primeira){primeira=false;const prox=ativos.find(p=>p.data&&p.data>=hj)||ativos[0];if(prox)abertos.add(prox.id)}
    const todas=[].concat(...ps.map(p=>p.itens.map(i=>Object.assign({proj:p.nome},i)))).filter(visivel);
    const pend=todas.filter(x=>!x.feito),late=pend.filter(x=>x.prazo&&x.prazo<hj),hjL=pend.filter(x=>x.prazo===hj),sem=pend.filter(x=>x.prazo&&x.prazo>hj&&dif(x.prazo,hj)<=7);
    const urg=late.concat(hjL);
    const pes=[['','Todos',''],['Matheus','Matheus','m'],['Sabrina','Sabrina','s']];
    el.innerHTML='<div class="tf"><div class="tf-top"><div class="tf-pes" role="group" aria-label="Ver tarefas de">'+pes.map(([v,t,c])=>'<button type="button" data-q="'+v+'" aria-pressed="'+(quem===v)+'">'+(c?'<i class="tf-dot '+c+'"></i>':'')+t+'</button>').join('')+'<span class="pill"></span></div>'+
      (opts.admin?'<div class="tf-bts"><button type="button" class="tf-btn pri" data-np>＋ Projeto</button><div class="tf-menu"><button type="button" class="tf-btn" data-mn aria-label="Mais opções">⋯</button>'+(menuAberto?'<ul><li><button type="button" data-ml>🔗 Link para a Sabrina</button></li><li><button type="button" data-mm>📋 Editar o checklist padrão da gravação</button></li></ul>':'')+'</div></div>':'')+'</div>'+
      '<div class="tf-res"><div class="'+(late.length?'late':'')+'" style="animation-delay:.02s"><b>'+late.length+'</b><small>atrasada'+(late.length===1?'':'s')+'</small></div><div style="animation-delay:.06s"><b>'+hjL.length+'</b><small>para hoje</small></div><div style="animation-delay:.1s"><b>'+sem.length+'</b><small>nos próximos 7 dias</small></div><div class="ok" style="animation-delay:.14s"><b>'+todas.filter(x=>x.feito).length+'/'+todas.length+'</b><small>feitas'+(quem?' por '+esc(quem):'')+'</small></div></div>'+
      (urg.length?'<div class="tf-hoje"><h4>'+(late.length?'⚠ Fazer primeiro':'☀️ Para hoje')+'</h4><ul class="tf-l">'+urg.slice(0,8).map(it=>itemHtml(it,it.proj)).join('')+'</ul></div>':'')+
      (ativos.length?ativos.map((p,i)=>projHtml(p).replace('<article ','<article style="animation-delay:'+(i*.05)+'s" ')).join(''):'<p class="tf-vz">Nenhum projeto em andamento. '+(opts.admin?'Toque em <b>＋ Projeto</b> para criar, ou confirme uma gravação na agenda que o checklist aparece aqui sozinho.':'')+'</p>')+
      (feitos.length?'<details class="tf-conc"><summary>Concluídos ('+feitos.length+')</summary>'+feitos.map(projHtml).join('')+'</details>':'')+'</div>';
    ligar()}
  function moverPill(){const g=el.querySelector('.tf-pes');if(!g)return;const b=g.querySelector('[aria-pressed="true"]'),p=g.querySelector('.pill');if(b&&p){p.style.left=b.offsetLeft+'px';p.style.width=b.offsetWidth+'px'}}
  function acharItem(id){for(const p of D.projetos){const it=p.itens.find(x=>x.id===id);if(it)return [p,it]}return []}
  function ligar(){
    moverPill();
    el.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{quem=b.dataset.q;try{localStorage.setItem('tf_quem',quem)}catch(e){}pintar()});
    el.querySelectorAll('.tf-ph').forEach(b=>b.onclick=()=>{const a=b.closest('.tf-p');const id=a.dataset.pid;if(abertos.has(id))abertos.delete(id);else abertos.add(id);a.classList.toggle('aberto');b.setAttribute('aria-expanded',a.classList.contains('aberto'))});
    el.querySelectorAll('.tf-ck').forEach(b=>b.onclick=async e=>{const li=b.closest('.tf-i');const [p,it]=acharItem(li.dataset.id);if(!it)return;
      const antes=pct(p.itens);const prepAntes=pct(p.itens.filter(x=>x.fase==='Preparação'));it.feito=!it.feito;li.classList.toggle('feito',it.feito);b.setAttribute('aria-pressed',it.feito);
      const r=b.getBoundingClientRect();
      setTimeout(()=>{pintar();const dep=pct(p.itens),prep=pct(p.itens.filter(x=>x.fase==='Preparação'));
        if(it.feito&&((dep===100&&antes<100)||(p.tipo==='gravacao'&&prep===100&&prepAntes<100))){festa(r.left,r.top);toast(dep===100?'🎉 Projeto concluído!':'🎬 Tudo pronto para a gravação!')}},380);
      try{await call('item_feito',{id:it.id,feito:it.feito,quem:quem||opts.quem||''});pintar()}catch(x){it.feito=!it.feito;pintar();toast(x.message)}});
    el.querySelectorAll('.tf-add').forEach(f=>f.onsubmit=async e=>{e.preventDefault();const t=f.texto.value.trim();if(!t)return;const pid=f.closest('.tf-p').dataset.pid;const fase=f.closest('.tf-f').dataset.fase;
      const bt=f.querySelector('button');bt.disabled=true;try{await call('item_add',{pid:pid,fase:fase,resp:f.resp.value,texto:t});abertos.add(pid);pintar();
        const nf=el.querySelector('.tf-p[data-pid="'+CSS.escape(pid)+'"] .tf-f[data-fase="'+CSS.escape(fase)+'"] .tf-add input');if(nf)nf.focus()}catch(x){toast(x.message)}bt.disabled=false});
    el.querySelectorAll('.tf-ed').forEach(b=>b.onclick=()=>{const [p,it]=acharItem(b.closest('.tf-i').dataset.id);if(!it)return;
      const f=modal('Editar tarefa','<label>Tarefa<input name="texto" maxlength="200" required value="'+esc(it.texto)+'"></label><div class="dois"><label>Quem faz<select name="resp">'+opR(it.resp)+'</select></label><label>Prazo<input type="date" name="prazo" value="'+esc(it.prazo)+'"></label></div><label>Etapa<select name="fase">'+opF(it.fase)+'</select></label>',
        async f=>{await call('item_edit',{id:it.id,texto:f.texto.value,resp:f.resp.value,prazo:f.prazo.value,fase:f.fase.value});toast('✓ Tarefa salva')},'Salvar',
        '<span class="esq" style="display:flex;gap:6px"><button type="button" class="tf-btn" data-del>🗑</button><button type="button" class="tf-btn" data-up aria-label="Subir">↑</button><button type="button" class="tf-btn" data-dn aria-label="Descer">↓</button></span>');
      f.querySelector('[data-del]').onclick=async e=>{const bt=e.currentTarget;if(!bt.dataset.c){bt.dataset.c=1;bt.textContent='Apagar?';return}try{await call('item_del',{id:it.id});f.parentNode.remove();pintar();toast('Tarefa apagada')}catch(x){f.querySelector('.msg').textContent=x.message}};
      f.querySelector('[data-up]').onclick=async()=>{try{await call('item_mover',{id:it.id,dir:-1});pintar()}catch(x){f.querySelector('.msg').textContent=x.message}};
      f.querySelector('[data-dn]').onclick=async()=>{try{await call('item_mover',{id:it.id,dir:1});pintar()}catch(x){f.querySelector('.msg').textContent=x.message}}});
    if(!opts.admin)return;
    const mn=el.querySelector('[data-mn]');if(mn)mn.onclick=e=>{e.stopPropagation();menuAberto=!menuAberto;pintar()};
    if(menuAberto)setTimeout(()=>document.addEventListener('click',function f(){menuAberto=false;document.removeEventListener('click',f);pintar()},{once:true}),0);
    const np=el.querySelector('[data-np]');if(np)np.onclick=()=>novoProjeto();
    const ml=el.querySelector('[data-ml]');if(ml)ml.onclick=()=>{menuAberto=false;linkEquipe()};
    const mm=el.querySelector('[data-mm]');if(mm)mm.onclick=()=>{menuAberto=false;editarModelo()};
    el.querySelectorAll('[data-pe]').forEach(b=>b.onclick=()=>{const p=D.projetos.find(x=>x.id===b.closest('.tf-p').dataset.pid);
      modal('Editar projeto','<label>Nome<input name="nome" maxlength="80" required value="'+esc(p.nome)+'"></label><label>Data'+(p.tipo==='gravacao'?' da gravação':'')+'<input type="date" name="data" value="'+esc(p.data)+'"></label><label style="display:flex;gap:10px;align-items:center;font-weight:600"><input type="checkbox" name="mover" checked style="width:20px;height:20px"> Mudar também os prazos das tarefas</label>',
        async f=>{await call('projeto_edit',{pid:p.id,nome:f.nome.value,data:f.data.value,mover:f.mover.checked});toast('✓ Projeto salvo')})});
    el.querySelectorAll('[data-pd]').forEach(b=>b.onclick=()=>{const p=D.projetos.find(x=>x.id===b.closest('.tf-p').dataset.pid);
      modal('Excluir projeto?','<p class="d"><b>'+esc(p.nome)+'</b> e as '+p.itens.length+' tarefas dele vão sair da lista e da planilha.</p>',async()=>{await call('projeto_del',{pid:p.id});toast('Projeto excluído')},'🗑 Excluir')})}
  function novoProjeto(){const hj=hoje();const cl=opts.clientes||[];
    const f=modal('Novo projeto','<label>Tipo<select name="modelo"><option value="gravacao">🎥 Gravação (checklist completo: preparação, cenas e pós)</option><option value="rotina">🗓️ Rotina do mês (vídeos e carrosséis de cada cliente)</option><option value="livre">📝 Em branco</option></select></label>'+
      (cl.length?'<label>Cliente<select name="ent"><option value="">—</option>'+cl.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.nome)+'</option>').join('')+'</select></label>':'')+
      '<label>Nome<input name="nome" maxlength="80" required placeholder="Ex.: Gravação Greice"></label><label><span id="tfDl">Data da gravação</span><input type="date" name="data" value="'+hj+'"></label><p class="d" id="tfDd">Os prazos são calculados a partir dessa data: roteiro 5 dias antes, equipamento na véspera, edição até 5 dias depois.</p>',
      async f=>{await call('projeto_add',{modelo:f.modelo.value,nome:f.nome.value,data:f.data.value,ent:f.ent?f.ent.value:''});toast('✓ Projeto criado');primeira=true},'Criar');
    const sync=()=>{const m=f.modelo.value;f.querySelector('#tfDl').textContent=m==='gravacao'?'Data da gravação':m==='rotina'?'Mês da rotina':'Data (opcional)';
      f.querySelector('#tfDd').textContent=m==='gravacao'?'Os prazos são calculados a partir dessa data: roteiro 5 dias antes, equipamento na véspera, edição até 5 dias depois.':m==='rotina'?'Cria, para cada cliente, "editar os vídeos e subir no site" (Matheus) e "montar os carrosséis e subir no site" (Sabrina), com prazo até o dia 25.':'Começa vazio. Você adiciona as tarefas depois.';
      if(!f.nome.value||f.nome.dataset.auto){const c=f.ent&&f.ent.selectedOptions[0]&&f.ent.value?f.ent.selectedOptions[0].textContent:'';const [y,mm]=f.data.value.split('-');const MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
        f.nome.value=m==='gravacao'?'Gravação'+(c?' · '+c:''):m==='rotina'?'Rotina de '+(MES[+mm-1]||''):(c||'');f.nome.dataset.auto=1}};
    f.modelo.onchange=sync;if(f.ent)f.ent.onchange=sync;f.data.onchange=sync;f.nome.oninput=()=>delete f.nome.dataset.auto;sync()}
  async function linkEquipe(){let j;try{j=await opts.callLink(false)}catch(x){toast(x.message);return}
    const txt='Oi, Sá! Aqui ficam as nossas tarefas da Brius (gravações, roteiros, edição). Dá para marcar o que já fez e adicionar coisas: ';
    const f=modal('Link para a Sabrina','<p class="d">Quem tiver este link vê e marca as tarefas, sem precisar da senha do painel. Mande só para a Sabrina. Se vazar, gere um link novo (o antigo para de funcionar).</p><div class="tf-link"><input name="l" readonly value="'+esc(j.link)+'"><button type="button" class="tf-btn pri" data-cp>Copiar</button></div>',
      null,'','<span class="esq" style="display:flex;gap:6px;flex-wrap:wrap"><a class="tf-btn" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(txt+j.link)+'">WhatsApp</a><button type="button" class="tf-btn" data-nv>Gerar link novo</button></span>');
    f.querySelector('[data-cp]').onclick=async()=>{try{await navigator.clipboard.writeText(f.l.value);toast('✓ Link copiado')}catch(e){f.l.select()}};
    f.querySelector('[data-nv]').onclick=async e=>{const b=e.currentTarget;if(!b.dataset.c){b.dataset.c=1;b.textContent='O antigo para de funcionar. Gerar?';return}try{const k=await opts.callLink(true);f.l.value=k.link;toast('✓ Link novo gerado')}catch(x){toast(x.message)}}}
  function editarModelo(){const linha=m=>'<div><select name="fase">'+FASES_GRAV.map(x=>'<option'+(x===m.fase?' selected':'')+'>'+x+'</option>').join('')+'</select><select name="resp">'+opR(m.resp)+'</select><input name="texto" maxlength="200" value="'+esc(m.texto)+'" placeholder="Tarefa"><input name="dias" type="number" min="-60" max="60" value="'+(Number(m.dias)||0)+'" title="Dias em relação à gravação (-5 = 5 dias antes)"><button type="button" aria-label="Remover linha">✕</button></div>';
    const f=modal('Checklist padrão da gravação','<p class="d">Toda gravação confirmada nasce com estas tarefas. <b>Dias</b> = quando vence, contando da gravação (−5 = 5 dias antes, 0 = no dia, 5 = 5 dias depois). Não muda os projetos que já existem.</p><div class="tf-mt">'+D.modelo.map(linha).join('')+'</div><button type="button" class="tf-btn" data-ad>＋ Linha</button>',
      async f=>{const itens=[...f.querySelectorAll('.tf-mt>div')].map(d=>({fase:d.querySelector('[name=fase]').value,resp:d.querySelector('[name=resp]').value,texto:d.querySelector('[name=texto]').value,dias:d.querySelector('[name=dias]').value}));await opts.callModelo(itens);await carregar(true);toast('✓ Checklist padrão salvo')},'Salvar');
    const box=f.querySelector('.tf-mt');const lg=()=>box.querySelectorAll('div>button').forEach(b=>b.onclick=()=>b.parentNode.remove());lg();
    f.querySelector('[data-ad]').onclick=()=>{box.insertAdjacentHTML('beforeend',linha({fase:'Preparação',resp:'Os dois',texto:'',dias:-1}));lg();box.lastElementChild.querySelector('[name=texto]').focus()}}
  async function carregar(silencioso){try{await call('listar');pintar()}catch(x){if(!silencioso)el.innerHTML='<div class="tf"><p class="tf-vz">'+esc(x.message)+'</p></div>'}}
  pintar();carregar();
  return {recarregar:()=>carregar(true),ativo:()=>document.body.contains(el)};
};
})();
