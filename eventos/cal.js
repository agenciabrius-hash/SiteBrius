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
.bcal-g span,.bcal-g a{aspect-ratio:1;display:grid;place-items:center;border-radius:50%;font:500 13px var(--body,system-ui);color:#b4ab9d}
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
.bcal-v{color:#b4ab9d;font:400 15px/1.6 var(--body,system-ui);margin:0}
@media (max-width:760px){.bcal{grid-template-columns:1fr}}`;
  window.BriusCalendario=function(el,base){
    if(!el)return;base=base||'';
    if(!document.getElementById('bcal-css')){const st=document.createElement('style');st.id='bcal-css';st.textContent=css;document.head.appendChild(st)}
    el.innerHTML='<div class="bcal"><div class="bcal-m"><div class="bcal-h"><button type="button" data-d="-1" aria-label="Mês anterior">‹</button><b aria-live="polite"></b><button type="button" data-d="1" aria-label="Próximo mês">›</button></div><div class="bcal-g"></div></div><div class="bcal-l"><p class="bcal-v">Carregando eventos…</p></div></div>';
    const tit=el.querySelector('.bcal-h b'),grade=el.querySelector('.bcal-g'),lista=el.querySelector('.bcal-l');
    let evs=[],ano,mes;const hoje=new Date();ano=hoje.getFullYear();mes=hoje.getMonth();
    const link=e=>base+'eventos/?e='+encodeURIComponent(e.e);
    const dataBR=d=>{const [a,m,dd]=d.split('-');return dd+' de '+MESES[+m-1]+' de '+a};
    function pintar(){
      tit.textContent=MESES[mes]+' '+ano;
      const doMes=evs.filter(e=>e.data&&+e.data.slice(0,4)===ano&&+e.data.slice(5,7)===mes+1);
      const porDia={};doMes.forEach(e=>{const d=+e.data.slice(8,10);(porDia[d]=porDia[d]||[]).push(e)});
      let h=['D','S','T','Q','Q','S','S'].map(x=>'<i>'+x+'</i>').join('');
      const ini=new Date(ano,mes,1).getDay(),dias=new Date(ano,mes+1,0).getDate();
      for(let i=0;i<ini;i++)h+='<span></span>';
      for(let d=1;d<=dias;d++){const hj=(d===hoje.getDate()&&mes===hoje.getMonth()&&ano===hoje.getFullYear())?' class="hj"':'';
        h+=porDia[d]?'<a href="'+link(porDia[d][0])+'" title="'+esc(porDia[d].map(e=>e.nome).join(', '))+'">'+d+'</a>':'<span'+hj+'>'+d+'</span>'}
      grade.innerHTML=h;
      lista.innerHTML=doMes.length?doMes.map(e=>'<a class="bcal-c" href="'+link(e)+'"><img src="'+esc(e.capa)+'" alt="" loading="lazy"><span><small>'+esc(dataBR(e.data))+'</small><b>'+esc(e.nome)+'</b><em>'+(e.pronto?'Encontrar minhas fotos →':'Fotos em preparação')+'</em></span></a>').join('')
        :'<p class="bcal-v">'+(evs.length?'Nenhum evento com fotos em '+MESES[mes]+'. Use as setas para ver outros meses.':'Em breve as fotos dos nossos próximos eventos aparecem aqui. Esteve em um evento da Brius? Volte depois e encontre suas fotos com uma selfie.')+'</p>';
      const prim=evs.length?evs[evs.length-1].data:null,ult=evs.length?evs[0].data:null,cur=ano*12+mes;
      el.querySelector('[data-d="-1"]').disabled=!prim||cur<=(+prim.slice(0,4))*12+(+prim.slice(5,7)-1);
      el.querySelector('[data-d="1"]').disabled=!ult||cur>=Math.max((+ult.slice(0,4))*12+(+ult.slice(5,7)-1),hoje.getFullYear()*12+hoje.getMonth());
    }
    el.querySelectorAll('.bcal-h button').forEach(b=>b.onclick=()=>{mes+=+b.dataset.d;if(mes<0){mes=11;ano--}if(mes>11){mes=0;ano++}pintar()});
    pintar();
    fetch(API+'?acao=eventos').then(r=>r.json()).then(j=>{
      evs=(j&&j.eventos||[]).filter(e=>e.data).sort((a,b)=>b.data.localeCompare(a.data));
      if(evs.length){const cur=hoje.getFullYear()*12+hoje.getMonth(),temNoMes=evs.some(e=>(+e.data.slice(0,4))*12+(+e.data.slice(5,7)-1)===cur);
        if(!temNoMes){ano=+evs[0].data.slice(0,4);mes=+evs[0].data.slice(5,7)-1}}
      pintar();
    }).catch(()=>{lista.innerHTML='<p class="bcal-v">Não foi possível carregar os eventos agora.</p>'});
  };
})();
