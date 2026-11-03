/* Calendário de eventos da Brius: mostra os eventos por mês e leva para a busca por reconhecimento facial */
(function(){
  const API='https://script.google.com/macros/s/AKfycbxv6WLxKRDICMjAqAGWB8Uu5oZnL-zMWQWgFxdwFTwFRyiFFvH6YV5cxWbDOoV7hOQm/exec';
  const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const esc=t=>String(t||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const css=`.bcal{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}
.bcal-m{background:rgba(255,255,255,.035);border:1px solid rgba(230,211,174,.16);border-radius:18px;padding:18px}
.bcal-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.bcal-h b{font:500 21px/1 var(--serif,Georgia,serif);text-transform:capitalize;color:#fbf8f3}
.bcal-h button{width:36px;height:36px;border-radius:50%;border:1px solid rgba(230,211,174,.25);background:none;color:#e6d3ae;font-size:18px;cursor:pointer}
.bcal-h button:disabled{opacity:.3;cursor:default}
.bcal-g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center}
.bcal-g i{font:600 10px/2.2 var(--body,system-ui);color:#8d8478;font-style:normal;text-transform:uppercase}
.bcal-g span,.bcal-g a,.bcal-g button{aspect-ratio:1;display:grid;place-items:center;border-radius:50%;font:500 13px var(--body,system-ui);color:#b4ab9d}
.bcal-g button{all:unset;aspect-ratio:1;display:grid;place-items:center;border-radius:50%;font:500 13px var(--body,system-ui);color:#b4ab9d;cursor:pointer;transition:background .2s,transform .2s}
.bcal-g button:hover{background:rgba(230,211,174,.12)}
.bcal-g button:focus-visible{outline:2px solid #e6d3ae;outline-offset:1px}
.bcal-g button.ev{background:#e6d3ae;color:#141210;font-weight:700}
.bcal-g button.ev:hover{transform:scale(1.12)}
.bcal-g button.sel{box-shadow:0 0 0 2px #141210,0 0 0 4px #e6d3ae}
.bcal-g button.sel:not(.ev){background:rgba(230,211,174,.2);color:#fbf8f3}
.bcal-t{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 2px;font:600 12px var(--body,system-ui);letter-spacing:.14em;text-transform:uppercase;color:#b8955a}
.bcal-t button{all:unset;cursor:pointer;color:#b4ab9d;font:600 12px var(--body,system-ui);letter-spacing:0;text-transform:none;text-decoration:underline}
.bcal-vazio{padding:22px;border:1px dashed rgba(230,211,174,.22);border-radius:14px;color:#b4ab9d;font:400 15px/1.6 var(--body,system-ui)}
.bcal-g a{position:relative;background:#e6d3ae;color:#141210;font-weight:700;text-decoration:none;transition:transform .2s}
.bcal-g a:hover,.bcal-g a:focus-visible{transform:scale(1.12)}
.bcal-g .hj{box-shadow:inset 0 0 0 1px rgba(230,211,174,.5)}
.bcal-l{display:grid;gap:12px}
.bcal-c{display:grid;grid-template-columns:96px 1fr;gap:14px;align-items:center;padding:10px;border-radius:14px;border:1px solid rgba(230,211,174,.14);background:rgba(255,255,255,.03);color:#fbf8f3;text-decoration:none;transition:background .2s,border-color .2s}
.bcal-c:hover{background:rgba(255,255,255,.07);border-color:rgba(230,211,174,.35)}
.bcal-c img{width:96px;height:72px;object-fit:cover;border-radius:9px;background:#24211d}
.bcal-c small{display:block;color:#b8955a;font:600 11px var(--body,system-ui);letter-spacing:.14em;text-transform:uppercase}
.bcal-c b{display:block;font:500 19px/1.2 var(--serif,Georgia,serif);margin:4px 0}
.bcal-c em{font:600 13px var(--body,system-ui);color:#e6d3ae;font-style:normal}
.bcal-g button.px{box-shadow:inset 0 0 0 2px #e6d3ae;color:#e6d3ae;font-weight:700}
.bcal-g button.px.ev{box-shadow:none}
.bcal-leg{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:14px;font:500 12px var(--body,system-ui);color:#8d8478}
.bcal-leg span{display:inline-flex;align-items:center;gap:7px}
.bcal-leg i{width:12px;height:12px;border-radius:50%;background:#e6d3ae}.bcal-leg i.o{background:none;box-shadow:inset 0 0 0 2px #e6d3ae}
.bcal-s{font:600 12px var(--body,system-ui);letter-spacing:.16em;text-transform:uppercase;color:#b8955a;margin:6px 0 2px}
.bcal-p{display:grid;grid-template-columns:64px 1fr;gap:16px;align-items:center;padding:14px;border-radius:14px;border:1px solid rgba(230,211,174,.28);background:linear-gradient(135deg,rgba(230,211,174,.09),rgba(255,255,255,.02));color:#fbf8f3}
.bcal-p .dt{display:grid;place-items:center;align-content:center;width:64px;height:68px;border-radius:12px;background:#e6d3ae;color:#141210;line-height:1}
.bcal-p .dt b{font:600 26px var(--serif,Georgia,serif)}.bcal-p .dt small{font:700 10.5px var(--body,system-ui);letter-spacing:.12em;text-transform:uppercase;margin-top:3px}
.bcal-p h4{margin:0 0 5px;font:500 20px/1.2 var(--serif,Georgia,serif)}
.bcal-p p{margin:0;font:500 14px/1.55 var(--body,system-ui);color:#d9cfbf}
.bcal-p a{color:#e6d3ae;font-weight:700;text-decoration:none;white-space:nowrap}.bcal-p a:hover{text-decoration:underline}
.bcal-p.im{grid-template-columns:180px 1fr;align-items:stretch;padding:12px}
.bcal-p .cap{position:relative;border-radius:10px;overflow:hidden;background:#141210;min-height:180px}
.bcal-p .cap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bcal-p .cap .dt{position:absolute;left:8px;top:8px;width:50px;height:54px;box-shadow:0 6px 16px rgba(0,0,0,.4)}
.bcal-p .cap .dt b{font-size:21px}
.bcal-p.im>div:last-child{align-self:center}
.bcal-p .lk{display:flex;gap:16px;flex-wrap:wrap;margin-top:6px}
.bcal-p{position:relative;isolation:isolate}
.bcal-p::before{content:"";position:absolute;inset:-1px;border-radius:15px;padding:1px;z-index:-1;background:linear-gradient(110deg,rgba(230,211,174,.15) 20%,#e6d3ae 40%,rgba(230,211,174,.15) 60%);background-size:250% 100%;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:bcBrilho 4.5s linear infinite}
@keyframes bcBrilho{from{background-position:120% 0}to{background-position:-120% 0}}
.bcal-p .cap img{animation:bcZoom 14s ease-in-out infinite alternate}
@keyframes bcZoom{from{transform:scale(1)}to{transform:scale(1.12)}}
.bcal-p .dt{animation:bcPulso 2.6s ease-in-out infinite}
@keyframes bcPulso{0%,100%{box-shadow:0 0 0 0 rgba(230,211,174,.55)}60%{box-shadow:0 0 0 9px rgba(230,211,174,0)}}
.bcal-g button.px{animation:bcAnel 2.2s ease-out infinite}
@keyframes bcAnel{0%{box-shadow:inset 0 0 0 2px #e6d3ae,0 0 0 0 rgba(230,211,174,.6)}70%,100%{box-shadow:inset 0 0 0 2px #e6d3ae,0 0 0 8px rgba(230,211,174,0)}}
.bcal-cd{display:flex;gap:6px;margin:9px 0 2px}
.bcal-cd span{display:grid;place-items:center;min-width:48px;padding:6px 6px 5px;border-radius:9px;background:rgba(20,18,16,.6);border:1px solid rgba(230,211,174,.2);font:600 9.5px var(--body,system-ui);letter-spacing:.08em;text-transform:uppercase;color:#8d8478}
.bcal-cd b{font:600 19px/1.1 var(--serif,Georgia,serif);color:#e6d3ae;letter-spacing:0}
.bcal-cd b.vira{animation:bcVira .5s ease}
@keyframes bcVira{from{transform:translateY(-6px);opacity:0}to{transform:none;opacity:1}}
.bcal-l>*{animation:bcEntra .6s cubic-bezier(.2,.7,.2,1) both}
.bcal-l>*:nth-child(2){animation-delay:.08s}.bcal-l>*:nth-child(3){animation-delay:.16s}.bcal-l>*:nth-child(4){animation-delay:.24s}.bcal-l>*:nth-child(5){animation-delay:.32s}.bcal-l>*:nth-child(n+6){animation-delay:.4s}
@keyframes bcEntra{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.bcal-g button{animation:bcDia .45s ease both}
@keyframes bcDia{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.bcal-p::before,.bcal-p .cap img,.bcal-p .dt,.bcal-g button,.bcal-g button.px,.bcal-l>*,.bcal-cd b.vira{animation:none!important}}
@media (max-width:480px){.bcal-p.im{grid-template-columns:1fr}.bcal-p .cap{min-height:0;aspect-ratio:1/1}}
.bcal-p .nota{display:block;font-size:12.5px;color:#8d8478;margin-top:4px}
.bcal-v{color:#b4ab9d;font:400 15px/1.6 var(--body,system-ui);margin:0}
@media (max-width:760px){.bcal{grid-template-columns:1fr}}`;
  window.BriusCalendario=function(el,base){
    if(!el)return;base=base||'';
    if(!document.getElementById('bcal-css')){const st=document.createElement('style');st.id='bcal-css';st.textContent=css;document.head.appendChild(st)}
    el.innerHTML='<div class="bcal"><div class="bcal-m"><div class="bcal-h"><button type="button" data-d="-1" aria-label="Mês anterior">‹</button><b aria-live="polite"></b><button type="button" data-d="1" aria-label="Próximo mês">›</button></div><div class="bcal-g"></div><div class="bcal-leg"><span><i class="o"></i>Próximos eventos</span><span><i></i>Fotos disponíveis</span></div></div><div class="bcal-l" aria-live="polite"><p class="bcal-v">Carregando eventos…</p></div></div>';
    const tit=el.querySelector('.bcal-h b'),grade=el.querySelector('.bcal-g'),lista=el.querySelector('.bcal-l');
    let evs=[],prox=[],ano,mes,dia=null;const hoje=new Date();ano=hoje.getFullYear();mes=hoje.getMonth();
    const link=e=>base+'eventos/?e='+encodeURIComponent(e.e);
    const dataBR=d=>{const [a,m,dd]=d.split('-');return dd+' de '+MESES[+m-1]+' de '+a};
    const SEM=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    const horaBR=h=>{if(!h)return'';const [hh,mm]=h.split(':');return (+hh)+'h'+(mm&&mm!=='00'?mm:'')};
    const pcard=p=>{const [a,m,d]=p.data.split('-');const sem=SEM[new Date(+a,+m-1,+d).getDay()];
      const mapa='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.endereco||p.local);
      const dt='<div class="dt"><b>'+(+d)+'</b><small>'+MESES[+m-1].slice(0,3)+'</small></div>';
      const src=p.img?(/^img\//.test(p.img)?base+p.img:p.img):'';
      const links=(p.local?'<a href="'+mapa+'" target="_blank" rel="noopener">Ver no mapa</a>':'')+(p.link?'<a href="'+esc(p.link)+'" target="_blank" rel="noopener">'+(/instagram\.com/.test(p.link)?'Instagram do evento':'Site do evento')+'</a>':'');
      return '<div class="bcal-p'+(src?' im':'')+'">'+(src?'<div class="cap"><img src="'+esc(src)+'" alt="'+esc(p.nome)+'" loading="lazy">'+dt+'</div>':dt)+'<div><h4>'+esc(p.nome)+'</h4><p>'+esc(sem.charAt(0).toUpperCase()+sem.slice(1))+', '+(+d)+' de '+MESES[+m-1]+(p.hora?' · '+esc(horaBR(p.hora)):'')+(p.local?'<br>'+esc(p.local):'')+'<span class="bcal-cd" data-quando="'+esc(p.data+'T'+(p.hora||'00:00')+':00-03:00')+'"></span>'+(links?'<span class="lk">'+links+'</span>':'')+'<span class="nota">Depois do evento, as fotos aparecem aqui para você se encontrar com uma selfie.</span></p></div></div>'};
    let primeira=true;
    function contar(){lista.querySelectorAll('.bcal-cd').forEach(c=>{const t=new Date(c.dataset.quando)-Date.now();
      if(isNaN(t))return;if(t<=0){c.innerHTML='<span><b>Hoje</b>é o dia</span>';return}
      const v=[Math.floor(t/864e5),Math.floor(t/36e5)%24,Math.floor(t/6e4)%60,Math.floor(t/1e3)%60],nomes=['dias','horas','min','seg'];
      if(!c.children.length)c.innerHTML=nomes.map(n=>'<span><b>0</b>'+n+'</span>').join('');
      [...c.querySelectorAll('b')].forEach((b,i)=>{const s=String(v[i]).padStart(i?2:1,'0');if(b.textContent!==s){b.textContent=s;if(i<3){b.classList.remove('vira');void b.offsetWidth;b.classList.add('vira')}}})})}
    setInterval(()=>{if(!document.hidden)contar()},1000);
    function pintar(){
      tit.textContent=MESES[mes]+' '+ano;
      const doMes=evs.filter(e=>e.data&&+e.data.slice(0,4)===ano&&+e.data.slice(5,7)===mes+1);
      const porDia={};doMes.forEach(e=>{const d=+e.data.slice(8,10);(porDia[d]=porDia[d]||[]).push(e)});
      const pxMes=prox.filter(p=>+p.data.slice(0,4)===ano&&+p.data.slice(5,7)===mes+1);
      const pxDia={};pxMes.forEach(p=>{const d=+p.data.slice(8,10);(pxDia[d]=pxDia[d]||[]).push(p)});
      let h=['D','S','T','Q','Q','S','S'].map(x=>'<i>'+x+'</i>').join('');
      const ini=new Date(ano,mes,1).getDay(),dias=new Date(ano,mes+1,0).getDate();
      for(let i=0;i<ini;i++)h+='<span></span>';
      for(let d=1;d<=dias;d++){const cl=[porDia[d]?'ev':'',pxDia[d]?'px':'',(d===hoje.getDate()&&mes===hoje.getMonth()&&ano===hoje.getFullYear())?'hj':'',d===dia?'sel':''].filter(Boolean).join(' ');
        const nomes=(pxDia[d]||[]).concat(porDia[d]||[]).map(e=>e.nome);
        const rot=d+' de '+MESES[mes]+(nomes.length?': '+nomes.join(', '):': sem eventos');
        h+='<button type="button" data-dia="'+d+'"'+(cl?' class="'+cl+'"':'')+' aria-label="'+esc(rot)+'"'+(d===dia?' aria-pressed="true"':'')+'>'+d+'</button>'}
      grade.innerHTML=h;
      if(primeira){[...grade.querySelectorAll('button')].forEach((b,i)=>b.style.animationDelay=(i*12)+'ms');}else grade.querySelectorAll('button').forEach(b=>b.style.animation='none');
      const card=e=>'<a class="bcal-c" href="'+link(e)+'"><img src="'+esc(e.capa)+'" alt="" loading="lazy"><span><small>'+esc(dataBR(e.data))+'</small><b>'+esc(e.nome)+'</b><em>'+(e.pronto?'Encontrar minhas fotos →':'Fotos em preparação')+'</em></span></a>';
      if(dia){const doDia=porDia[dia]||[],pxD=pxDia[dia]||[];
        lista.innerHTML='<p class="bcal-t"><span>'+dia+' de '+MESES[mes]+' de '+ano+'</span><button type="button" data-todos>Ver todos</button></p>'+
          ((doDia.length||pxD.length)?pxD.map(pcard).join('')+doDia.map(card).join(''):'<p class="bcal-vazio">Não temos eventos neste dia.</p>');
        const t=lista.querySelector('[data-todos]');if(t)t.onclick=()=>{dia=null;pintar()};
      } else {
        let h2='';
        if(prox.length)h2+='<p class="bcal-s">Próximos eventos</p>'+prox.slice(0,4).map(pcard).join('');
        if(doMes.length)h2+='<p class="bcal-s">Fotos de '+MESES[mes]+'</p>'+doMes.map(card).join('');
        lista.innerHTML=h2||'<p class="bcal-v">'+(evs.length?'Nenhum evento com fotos em '+MESES[mes]+'. Use as setas para ver outros meses.':'Em breve nossos próximos eventos aparecem aqui. Esteve em um evento da Brius? Volte depois e encontre suas fotos com uma selfie.')+'</p>';
      }
      contar();
      const mi=d=>(+d.slice(0,4))*12+(+d.slice(5,7)-1),agora=hoje.getFullYear()*12+hoje.getMonth(),cur=ano*12+mes;
      const todas=evs.map(e=>mi(e.data)).concat(prox.map(p=>mi(p.data)),[agora]);
      el.querySelector('[data-d="-1"]').disabled=cur<=Math.min(...todas);
      el.querySelector('[data-d="1"]').disabled=cur>=Math.max(...todas);
    }
    grade.addEventListener('click',e=>{const b=e.target.closest('button[data-dia]');if(!b)return;const d=+b.dataset.dia;dia=(dia===d)?null:d;pintar();const f=grade.querySelector('[data-dia="'+d+'"]');if(f)f.focus({preventScroll:true});if(dia&&innerWidth<760)lista.scrollIntoView({block:'nearest',behavior:'smooth'})});
    el.querySelectorAll('.bcal-h button').forEach(b=>b.onclick=()=>{dia=null;mes+=+b.dataset.d;if(mes<0){mes=11;ano--}if(mes>11){mes=0;ano++}pintar()});
    pintar();
    fetch(API+'?acao=eventos').then(r=>r.json()).then(j=>{
      evs=(j&&j.eventos||[]).filter(e=>e.data).sort((a,b)=>b.data.localeCompare(a.data));
      prox=(j&&j.proximos||[]).filter(p=>p.data);
      const mi=d=>(+d.slice(0,4))*12+(+d.slice(5,7)-1),cur=hoje.getFullYear()*12+hoje.getMonth();
      const temNoMes=evs.some(e=>mi(e.data)===cur)||prox.some(p=>mi(p.data)===cur);
      setTimeout(()=>{primeira=false},50);
      if(!temNoMes){const alvo=prox.length?prox[0].data:(evs.length?evs[0].data:null);if(alvo){ano=+alvo.slice(0,4);mes=+alvo.slice(5,7)-1}}
      pintar();
    }).catch(()=>{lista.innerHTML='<p class="bcal-v">Não foi possível carregar os eventos agora.</p>'});
  };
})();
