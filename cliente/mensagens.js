// Mensagens prontas da Brius para copiar e colar no WhatsApp (acesso da agência).
// Campos do topo (nome, evento, data, local) preenchem as mensagens na hora.
(function(){
const PIX='Chave Pix (e-mail): agenciabrius@gmail.com\nBanco XP · Matheus Monteiro Ferreira';
const AVALIAR='https://g.page/r/Ca6OHRikMJo8EBM/review';
const INI='{oi} Que alegria saber do seu interesse 🤍\nPara te enviar um orçamento completo e personalizado, vou lhe fazer umas perguntas rapidinhas!\n\n';
const GRUPOS=[
 ['🙋 Primeiro contato · perguntas para o orçamento',[
  ['🎬 Vídeos avulsos (entrega de chaves, corretor…)',INI+'• Qual é o objetivo do vídeo? (venda, divulgação, posicionamento, autoridade…)\n• Onde esse vídeo será usado? (Instagram, anúncio, site, etc.)\n• Qual é o tipo de conteúdo? (imóvel, entrega de chaves, conteúdo pessoal, produto…)\n• Você já tem alguma ideia ou referência de vídeo?\n• Prefere algo mais espontâneo ou mais direcionado/roteirizado?\n• Quantos vídeos você pretende fazer?\n• O conteúdo será gravado em um único dia ou em mais de um momento?\n• Qual é o local da gravação?\n\nSe for para marca ou profissional:\n• Pode me explicar um pouco sobre seu público e seu serviço?'],
  ['💍 Casamento',INI+'• Qual é a data do casamento?\n• Onde será realizado (cerimônia e festa)?\n• Será apenas cerimônia ou cerimônia + festa?\n• Quantos convidados, em média?\n• Você deseja fotografia, vídeo ou os dois?\n• Tem interesse em making of (noiva/noivo)?'],
  ['🎉 Aniversários e eventos sociais',INI+'• Qual é a data do evento?\n• Qual o tipo de evento (aniversário, chá, comemoração…)?\n• Onde será realizado?\n• Quantas pessoas, em média?\n• Qual a duração do evento?\n• Você precisa de fotografia, vídeo ou ambos?'],
  ['🏢 Eventos (corporativos, igrejas, palestras…)',INI+'• Qual é o tipo de evento?\n• Data e horário?\n• Local?\n• Quantas pessoas, em média?\n• Qual o objetivo do conteúdo (registro, divulgação, redes sociais…)?\n• Você precisa de fotografia, vídeo ou ambos?']]],
 ['💰 Orçamento e fechamento',[
  ['📝 Cliente respondeu (antes do orçamento)','Perfeito! 🤍\nCom base no que você me passou, já consigo montar uma proposta bem alinhada para o seu evento.\n\nVou organizar tudo certinho (valores, o que está incluso e entrega) e já te envio ✨'],
  ['📄 Envio do orçamento','Prontinho, estou te encaminhando o orçamento em PDF para a cobertura de *{evento}*.\n\nPeço, por gentileza, que dê uma atenção especial não apenas ao valor da proposta, mas também às cláusulas e condições descritas no documento. Elas trazem informações importantes sobre a prestação do serviço, forma de pagamento, reserva da data, entrega do material e demais alinhamentos.\n\nDepois de dar uma olhadinha, me conta o que achou. Se tiver qualquer dúvida ou quiser ajustar algum detalhe, estou à disposição para conversarmos.\n\nVocê acredita que essa proposta atende ao que você estava procurando? 🤍'],
  ['🤝 Fechamento (cliente demonstrou interesse)','Perfeito! Fico muito feliz 🤍\n\nPara deixarmos tudo alinhado para o dia do evento, preciso de alguns detalhes:\n\n• Tem alguma referência de vídeo ou estilo que você goste?\n• Prefere um vídeo mais emocional, dinâmico ou tradicional?\n• Tem alguma música específica para o vídeo?\n• (Se for marca) pode me enviar sua logo?\n\nSe tiver um cronograma do evento, também ajuda muito ✨'],
  ['🔒 Confirmação da reserva (sinal)','Perfeito! 🤍\n\nPara garantir a sua data, trabalhamos com um valor de sinal.\n\nSegue abaixo a chave Pix para pagamento:\n'+PIX+'\n\nAssim que o pagamento for realizado, me envia o comprovante por aqui para eu já deixar tudo confirmado ✨']]],
 ['📸 Evento e entrega',[
  ['📅 Pré-evento (1–2 dias antes)','{oi} Tudo bem? 🤍\n\nPassando para confirmar se está tudo certo para o evento.\n\nEstamos alinhados para o dia *{data}*, no local *{local}*.\n\nQualquer atualização ou detalhe novo, pode me avisar por aqui ✨\nVai ser um prazer registrar esse momento!'],
  ['⚡ Pós-evento · material bruto (até 1 dia)','{oi} Tudo bem? 🤍\n\nJá organizei o material do evento e estou te enviando o link abaixo com as fotos e vídeos brutos.\n\n*Os arquivos ficarão disponíveis por até 7 dias, então recomendo que você faça o download e salve em um dispositivo ou no seu próprio Drive ✨*\n\nO vídeo final já está em edição e em breve te envio também!\n\nQualquer dúvida, fico à disposição 🤍'],
  ['🎥 Entrega do vídeo final','{oi} 🤍\n\nSeu vídeo ficou pronto!\n\nFoi editado com muito cuidado para transmitir esse momento especial da melhor forma possível ✨\n\nEspero que você goste!'],
  ['⭐ Pedido de feedback','Fico muito feliz em fazer parte desse momento 🤍\n\nSe puder, me conta o que você achou da experiência e do resultado? Seu feedback é muito importante pra gente ✨\n\nE se quiser ajudar a Brius a chegar em mais pessoas, deixa uma avaliação no Google, leva menos de 1 minuto:\n'+AVALIAR]]]];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function preencher(t,v){const nm=(v.nome||'').trim().split(/\s+/)[0];
  return t.replace(/\{oi\}/g,nm?'Oi, '+nm+'!':'Oi!').replace(/\{evento\}/g,v.evento||'[evento]').replace(/\{data\}/g,v.data||'[data]').replace(/\{local\}/g,v.local||'[local]')}
async function copiar(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch(x){}a.remove();return ok}}
window.abrirMensagens=function(){let m=document.getElementById('msgP');if(!m){m=document.createElement('div');m.id='msgP';m.className='am';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');document.body.appendChild(m)}
  const v={nome:'',evento:'',data:'',local:''};
  m.innerHTML='<div class="am-c msgp"><div class="am-h"><h2>💬 Mensagens prontas</h2><button type="button" class="am-x" aria-label="Fechar">✕</button></div><div class="am-b">'+
    '<p class="am-dica" style="margin-top:0">Preencha o que souber e as mensagens já saem com os dados. Toque em <b>Copiar</b> e cole no WhatsApp. Para a mensagem de acesso às fotos, use <b>Mais ações › Mensagem para o WhatsApp</b> dentro da galeria do cliente (ela já vai com o e-mail e o prazo certos).</p>'+
    '<div class="am-2"><label>Nome do cliente<input data-v="nome" placeholder="Ex.: Ana"></label><label>Evento<input data-v="evento" placeholder="Ex.: jantar de padrinhos"></label><label>Data<input data-v="data" placeholder="Ex.: 20/12 às 18h"></label><label>Local<input data-v="local" placeholder="Ex.: Chácara Nova Aliança"></label></div>'+
    GRUPOS.map(([g,itens])=>'<h3 class="msgp-g">'+g+'</h3>'+itens.map(([t],k)=>'<details class="msgp-i"><summary><span>'+t+'</span><button type="button" class="btn sec msgp-c" data-t="'+esc(t)+'">📋 Copiar</button></summary><pre></pre></details>').join('')).join('')+
    '</div></div>';
  const todos=GRUPOS.flatMap(([,i])=>i);const pres=[...m.querySelectorAll('.msgp-i pre')];
  const pintar=()=>pres.forEach((p,k)=>p.textContent=preencher(todos[k][1],v));pintar();
  m.querySelectorAll('[data-v]').forEach(i=>i.oninput=()=>{v[i.dataset.v]=i.value;pintar()});
  m.querySelectorAll('.msgp-c').forEach((b,k)=>b.onclick=async e=>{e.preventDefault();e.stopPropagation();const ok=await copiar(preencher(todos[k][1],v));
    b.textContent=ok?'✓ Copiada':'Selecione e copie';setTimeout(()=>b.textContent='📋 Copiar',1800);if(window.toast&&ok)toast('✓ Mensagem copiada. É só colar no WhatsApp.')});
  const fechar=()=>{m.hidden=true;document.body.style.overflow=''};m.querySelector('.am-x').onclick=fechar;m.onclick=e=>{if(e.target===m)fechar()};
  m.hidden=false;document.body.style.overflow='hidden'};
})();
