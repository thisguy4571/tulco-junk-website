const menu=document.querySelector('.menu');
const nav=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open));});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const tiers=[
  {n:'Minimum pickup',p:149},
  {n:'Quarter trailer',p:199},
  {n:'Half trailer',p:299},
  {n:'Three-quarter trailer',p:399},
  {n:'Full 20-yard trailer',p:499}
];
let selectedTier=2;
const loadLabel=document.querySelector('#load-label');
const loadPrice=document.querySelector('#load-price');
const crew=document.querySelector('#crew');
const hours=document.querySelector('#hours');
const laborPrice=document.querySelector('#labor-price');
const total=document.querySelector('#estimate-total');
function calc(){
  if(!loadPrice)return;
  const t=tiers[selectedTier];
  const c=Math.max(1,Number(crew?.value||2));
  const h=Math.max(.5,Number(hours?.value||2));
  const labor=c*h*55;
  loadLabel.textContent=t.n;
  loadPrice.textContent='$'+t.p.toLocaleString();
  laborPrice.textContent='$'+labor.toLocaleString();
  total.textContent='$'+(t.p+labor).toLocaleString()+' estimated';
}
document.querySelectorAll('.volume-option').forEach(btn=>btn.addEventListener('click',()=>{
  selectedTier=Number(btn.dataset.tier);
  document.querySelectorAll('.volume-option').forEach(b=>b.classList.toggle('active',b===btn));
  calc();
}));
[crew,hours].forEach(el=>el?.addEventListener('input',calc));
calc();

const form=document.querySelector('#quote-form');
const summaryBox=document.querySelector('#quote-summary');
const summaryText=document.querySelector('#summary-text');
const sendText=document.querySelector('#send-text');
const copyRequest=document.querySelector('#copy-request');
let generatedRequest='';
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(form);
  generatedRequest=`Hi Tulco Junk, I'd like a quote.\n\nName: ${d.get('name')||''}\nPhone: ${d.get('phone')||''}\nEmail: ${d.get('email')||''}\nZIP: ${d.get('zip')||''}\nService: ${d.get('service')||''}\nDetails: ${d.get('details')||''}\n\nI can attach photos in this text thread.`;
  summaryText.textContent=generatedRequest;
  summaryBox.hidden=false;
  sendText.href='sms:+19185009069?body='+encodeURIComponent(generatedRequest);
  sendText.hidden=false;
  copyRequest.hidden=false;
  sendText.scrollIntoView({behavior:'smooth',block:'center'});
});
copyRequest?.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(generatedRequest);copyRequest.textContent='Copied';setTimeout(()=>copyRequest.textContent='Copy Request',1800);}catch{copyRequest.textContent='Select and copy the message above';}
});

const counters=document.querySelectorAll('[data-count]');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count),suffix=el.dataset.suffix||'';let start=0;const step=Math.max(1,Math.ceil(target/40));const id=setInterval(()=>{start=Math.min(target,start+step);el.textContent=start+suffix;if(start>=target)clearInterval(id)},28);io.unobserve(el)}),{threshold:.5});
  counters.forEach(c=>io.observe(c));
}
