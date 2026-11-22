{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad2=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const pd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d||1)};
const todayISO=()=>iso(new Date());
const curMonth=()=>todayISO().slice(0,7);
const daysIn=mk=>{const [y,m]=mk.split('-').map(Number);return new Date(y,m,0).getDate()};
const shiftM=(mk,n)=>{const [y,m]=mk.split('-').map(Number);const d=new Date(y,m-1+n,1);return iso(d).slice(0,7)};
const mName=mk=>pd(mk+'-01').toLocaleDateString('en-IN',{month:'long',year:'numeric'});
const newId=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);
const sum=a=>a.reduce((s,t)=>s+t.a,0);

const IC={
food:'M4 9h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M12 3.5v2.5',
transport:'M5 17V10l2-5h10l2 5v7M3 17h18M7 17v2.5M17 17v2.5M5 11h14M8 14h.01M16 14h.01',
rent:'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
bills:'M13 2L4 14h7l-1 8 9-12h-7z',
shopping:'M5 8h14l-1.2 12H6.2zM9 8V6.5a3 3 0 0 1 6 0V8',
health:'M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z',
fun:'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z',
other:'M6 12h.01M12 12h.01M18 12h.01M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0',
groceries:'M3 4h2.5l2.2 11h10.6l2-8H6.4M9 19.5h.01M17 19.5h.01',
travel:'M2 16l20-6-3-3-6 2-5-5-2 1 3 5-4 1.5-2-1.5-1.5.8 2.5 3.2z',
edu:'M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6',
gift:'M4 11h16v9H4zM3 7.5h18V11H3zM12 7.5V20M12 7.5C10 3.5 6 4.5 7 7.5M12 7.5c2-4 6-3 5 0',
salary:'M3 7.5h16a2 2 0 0 1 2 2V19H3zM3 7.5L15 4v3.5M16.5 13.5h1.5',
refund:'M9 14l-4-4 4-4M5 10h9.5a4.5 4.5 0 0 1 0 9H11',
invest:'M4 19V9M10 19V5M16 19v-7M22 19H2',
xfer:'M4 8h14l-4-4M20 16H6l4 4',
cash:'M3 6h18v12H3zM12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6M6.5 12h.01M17.5 12h.01',
bank:'M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
upi:'M7 3h10a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 17 21H7a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 7 3zM11 17.5h2',
card:'M3 6h18v12H3zM3 10h18M7 15h3',
wallet:'M4 7h15a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H4zM4 7l11-3v3M16 13h2',
chevL:'M15 5l-7 7 7 7',chevR:'M9 5l7 7-7 7',search:'M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14M21 21l-5-5',x:'M6 6l12 12M18 6L6 18',
del:'M21 5H8l-5 7 5 7h13zM11 9l6 6M17 9l-6 6',trash:'M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3'};
const ICON_KEYS=['food','groceries','transport','rent','bills','shopping','health','fun','travel','edu','gift','other','salary','refund','invest'];
const ico=(k,s=20)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[k]||IC.other}"/></svg>`;
const ACC_TYPES={cash:'Cash',bank:'Bank',upi:'UPI',card:'Credit card',wallet:'Wallet'};
const CURS=['INR','USD','EUR','GBP','AED','SGD','CAD','AUD'];
const DEF_CATS=[['food','Food','food','#e4572e','out'],['transport','Transport','transport','#2f6fde','out'],['rent','Rent','rent','#7a4fd6','out'],['bills','Bills','bills','#d99a00','out'],['shopping','Shopping','shopping','#d23f8f','out'],['health','Health','health','#14a37f','out'],['fun','Fun','fun','#0a9bc0','out'],['other','Other','other','#8a8178','out'],['salary','Salary','salary','#1a7f4e','in'],['refund','Refund','refund','#3a9d9a','in'],['gift','Gift','gift','#c8371e','in']].map(([id,name,icon,color,kind])=>({id,name,icon,color,kind}));

/* ---------- state, sign-in & sync (Supabase) ---------- */
const CFG=window.SPENDO_CONFIG||{};
const LS_KEY='spendo-v2',LS_BASE='spendo-base-v2',LS_GUEST='spendo-guest';
const blankMeta=()=>({v:1,currency:'INR',name:'',budget:0,budgets:{},accounts:[{id:'cash',name:'Cash',type:'cash',opening:0}],categories:DEF_CATS.map(c=>({...c})),lastAcc:'cash',onboarded:false});
function fixMeta(m){const b=blankMeta();m={...b,...(m||{})};if(!Array.isArray(m.accounts)||!m.accounts.length)m.accounts=b.accounts;if(!Array.isArray(m.categories)||!m.categories.length)m.categories=b.categories;if(!m.budgets||typeof m.budgets!=='object')m.budgets={};return m}
function loadLocal(){try{const j=JSON.parse(localStorage.getItem(LS_KEY));if(j&&j.meta&&j.months)return{meta:fixMeta(j.meta),months:j.months}}catch(e){}return null}
let S=loadLocal()||{meta:blankMeta(),months:{}};
function saveLocal(){try{localStorage.setItem(LS_KEY,JSON.stringify(S))}catch(e){}}
function loadBase(){try{const b=JSON.parse(localStorage.getItem(LS_BASE));if(b&&b.uid)return b}catch(e){}return null}
let base=loadBase();
function saveBase(){try{base?localStorage.setItem(LS_BASE,JSON.stringify(base)):localStorage.removeItem(LS_BASE)}catch(e){}}
const isGuest=()=>{try{return localStorage.getItem(LS_GUEST)==='1'}catch(e){return false}};
const setGuest=v=>{try{v?localStorage.setItem(LS_GUEST,'1'):localStorage.removeItem(LS_GUEST)}catch(e){}};
let sb=null,session=null,uid=null,cloud='local',booted=false;
const TABLES=['profiles','accounts','categories','budgets','transactions'];
const PK={profiles:'id',accounts:'user_id,id',categories:'user_id,id',budgets:'user_id,category_id',transactions:'user_id,id'};
const KMAP={out:'debit',in:'credit',xfer:'transfer'},KBACK={debit:'out',credit:'in',transfer:'xfer'};
function toRows(){const r={profiles:{},accounts:{},categories:{},budgets:{},transactions:{}},m=S.meta;
  r.profiles[uid]={id:uid,name:m.name||'',base_currency:m.currency||'INR',budget_minor:Math.round(+m.budget||0),last_account_id:m.lastAcc||null,onboarded:!!m.onboarded};
  m.accounts.forEach((a,i)=>{r.accounts[a.id]={user_id:uid,id:a.id,name:a.name,type:a.type,opening_minor:Math.round(+a.opening||0),sort:i}});
  m.categories.forEach((c,i)=>{r.categories[c.id]={user_id:uid,id:c.id,name:c.name,icon:c.icon,color:c.color,kind:c.kind==='in'?'income':'expense',sort:i}});
  for(const [cid,l] of Object.entries(m.budgets))if(+l>0)r.budgets[cid]={user_id:uid,category_id:cid,limit_minor:Math.round(+l)};
  for(const t of Object.values(S.months).flat())r.transactions[t.id]={user_id:uid,id:t.id,type:KMAP[t.k]||'debit',amount_minor:t.a,currency:m.currency||'INR',category_id:t.c||null,account_id:t.acc,to_account_id:t.to||null,merchant:t.m||'',tags:t.tags||[],occurred_on:t.d,created_ms:t.t||0,is_sample:!!t.s};
  return r}
function fromRows(R){const p=Object.values(R.profiles)[0]||{};
  const meta=fixMeta({currency:p.base_currency||'INR',name:p.name||'',budget:+p.budget_minor||0,lastAcc:p.last_account_id||'',onboarded:!!p.onboarded,
    accounts:Object.values(R.accounts).sort((a,b)=>a.sort-b.sort).map(a=>({id:a.id,name:a.name,type:a.type,opening:+a.opening_minor||0})),
    categories:Object.values(R.categories).sort((a,b)=>a.sort-b.sort).map(c=>({id:c.id,name:c.name,icon:c.icon||'other',color:c.color||'#8a8178',kind:c.kind==='income'?'in':'out'})),
    budgets:Object.fromEntries(Object.values(R.budgets).map(b=>[b.category_id,+b.limit_minor]))});
  const months={};for(const t of Object.values(R.transactions)){const x={id:t.id,k:KBACK[t.type]||'out',a:+t.amount_minor,c:t.category_id,acc:t.account_id,to:t.to_account_id,d:t.occurred_on,m:t.merchant||'',tags:t.tags||[],t:+t.created_ms||0};
    if(t.is_sample)x.s=1;const mk=x.d.slice(0,7);(months[mk]=months[mk]||[]).push(x)}
  return{meta,months}}
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function pending(){if(!uid||!base)return false;const cur=toRows();return TABLES.some(t=>{const a=cur[t],b=base[t]||{};for(const k in a)if(!same(a[k],b[k]))return true;for(const k in b)if(!(k in a))return true;return false})}
let flushT=null,flushing=false,again=false;
function touch(){saveLocal();if(uid){clearTimeout(flushT);flushT=setTimeout(flush,700);if(cloud==='synced')cloud='saving'}setSync()}
async function flush(){
  if(!sb||!uid||!base)return;if(flushing){again=true;return}flushing=true;cloud='saving';setSync();
  try{const cur=toRows();
    for(const t of TABLES){const a=cur[t],b=base[t]=base[t]||{};const up=Object.keys(a).filter(k=>!same(a[k],b[k]));
      for(let i=0;i<up.length;i+=500){const ch=up.slice(i,i+500);const{error}=await sb.from(t).upsert(ch.map(k=>a[k]),{onConflict:PK[t]});if(error)throw error;ch.forEach(k=>{b[k]=a[k]});saveBase()}}
    for(const t of [...TABLES].reverse()){if(t==='profiles')continue;const a=cur[t],b=base[t];const del=Object.keys(b).filter(k=>!(k in a)),key=t==='budgets'?'category_id':'id';
      for(let i=0;i<del.length;i+=200){const ch=del.slice(i,i+200);const{error}=await sb.from(t).delete().eq('user_id',uid).in(key,ch);if(error)throw error;ch.forEach(k=>{delete b[k]});saveBase()}}
    cloud='synced';lastErr=''}
  catch(e){console.warn('Sync failed',e);noteErr(e);cloud=navigator.onLine?'error':'offline';clearTimeout(flushT);flushT=setTimeout(flush,15000)}
  finally{flushing=false;setSync();if(again){again=false;flush()}}}
async function fetchAll(t){let out=[],from=0;for(;;){let q=sb.from(t).select('*').range(from,from+999);q=t==='profiles'?q.eq('id',uid):q.eq('user_id',uid);
  const{data,error}=await q;if(error)throw error;out=out.concat(data);if(data.length<1000)return out;from+=1000}}
async function pull(adopt){
  if(!sb||!uid)return;
  if(pending()){await flush();if(pending())return}
  try{const R={};for(const t of TABLES){R[t]={};for(const r of await fetchAll(t))R[t][t==='budgets'?r.category_id:r.id]=r}
    if(!Object.keys(R.profiles).length){ // brand-new account: upload what is on this device
      if(!adopt&&!isGuest()&&base&&base.uid!==uid)S={meta:blankMeta(),months:{}};
      base={uid,profiles:{},accounts:{},categories:{},budgets:{},transactions:{}};saveBase();saveLocal();await flush();if(booted)render();return}
    const local=S;S=fromRows(R);const srv=toRows();
    if(adopt){ // keep entries made before signing in
      for(const a of local.meta.accounts)if(!acc(a.id))S.meta.accounts.push(a);
      for(const c of local.meta.categories)if(!cat(c.id))S.meta.categories.push(c);
      const have=new Set(Object.keys(srv.transactions));
      for(const [mk,list] of Object.entries(local.months))for(const t of list)if(!have.has(t.id))(S.months[mk]=S.months[mk]||[]).push(t)}
    const changed=!base||base.uid!==uid||TABLES.some(t=>!same(srv[t],base[t]||{}))||adopt;
    base={uid,...srv};saveBase();saveLocal();
    if(adopt&&pending())await flush();else cloud='synced';setSync();
    if(changed&&booted)render()}
  catch(e){console.warn('Load failed',e);noteErr(e);cloud=navigator.onLine?'error':'offline';setSync();if(booted)render()}}
let lastErr='';
function noteErr(e){lastErr=[e?.code,e?.message||String(e),e?.hint].filter(Boolean).join(' · ').slice(0,300);if(cloud!=='error')snack('Sync problem: '+(e?.message||'unknown error'),'bad')}
function setSync(){
  const M={local:['off','This device only'],signin:['off','Not signed in'],saving:['busy','Saving…'],synced:['ok','Synced'],offline:['off','Offline · saved here'],error:['busy','Sync problem · retrying'],connecting:['busy','Connecting…']};
  const [cls,txt]=M[cloud]||M.local;
  for(const el of [$('#sync1'),$('#sync2')]){if(!el)continue;el.firstElementChild.className='dot '+cls;el.lastElementChild.textContent=txt}}
function boot(){if(booted)return;booted=true;setSync();if(cloud==='signin')showSignin();else if(!S.meta.onboarded)showWelcome();render()}
let handling=Promise.resolve();
function handleSession(s){handling=handling.then(async()=>{
  const nid=s?.user?.id||null;session=s;
  if(!nid){uid=null;cloud=isGuest()?'local':'signin';boot();setSync();return}
  if(nid===uid)return;
  const adopt=isGuest()&&Object.values(S.months).some(a=>a.length);
  if(base&&base.uid!==nid&&!adopt){S={meta:blankMeta(),months:{}};base=null;saveBase();saveLocal()}
  uid=nid;cloud='connecting';setSync();$('#wov').classList.remove('show');
  await pull(adopt);setGuest(false);
  if(!S.meta.name){const md=s.user.user_metadata||{};const n=(md.full_name||md.name||'').split(' ')[0];if(n){S.meta.name=n;touch()}}
  if(!booted)boot();else{if(!S.meta.onboarded)showWelcome();render()}})}
async function initAuth(){
  if(!CFG.supabaseUrl||!CFG.supabaseAnonKey||!window.supabase){cloud='local';boot();return}
  try{
    sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    cloud='connecting';setSync();
    const{data}=await sb.auth.getSession();
    if(/[?&](code|error)=/.test(location.search)){const err=new URLSearchParams(location.search).get('error_description');history.replaceState(null,'',location.pathname+location.hash);if(err)setTimeout(()=>snack('Sign-in failed: '+err,'bad'),400)}
    handleSession(data.session);
    sb.auth.onAuthStateChange((ev,s)=>{if(ev==='SIGNED_OUT')return;if((s?.user?.id||null)!==uid)handleSession(s);else session=s});
  }catch(e){console.warn(e);cloud='local';boot()}}
async function signIn(provider){if(!sb){snack('Sign-in is not set up yet. Add your Supabase keys to config.js.','warn');return}
  const{error}=await sb.auth.signInWithOAuth({provider,options:{redirectTo:location.origin+location.pathname,queryParams:{prompt:'select_account'}}});if(error)snack(error.message,'bad')}
let soArm=false;
async function signOut(){if(pending())await flush();
  if(pending()&&!soArm){soArm=true;setTimeout(()=>soArm=false,6000);snack("Some entries haven't synced yet. Signing out now would delete them from this device. Tap Sign out again to do it anyway.",'bad');return}
  try{await sb.auth.signOut()}catch(e){}
  try{localStorage.removeItem(LS_KEY);localStorage.removeItem(LS_BASE);setGuest(false)}catch(e){}location.replace(location.pathname)}
addEventListener('online',()=>{if(uid){cloud='saving';flush()}});
addEventListener('offline',()=>{if(uid){cloud='offline';setSync()}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&uid&&!flushing)pull()});
setInterval(()=>{if(document.visibilityState==='visible'&&uid&&!flushing&&navigator.onLine)pull()},60000);

/* ---------- helpers on data ---------- */
const accs=()=>S.meta.accounts;
const cats=k=>S.meta.categories.filter(c=>!k||c.kind===k);
const cat=id=>S.meta.categories.find(c=>c.id===id);
const acc=id=>accs().find(a=>a.id===id);
const accName=id=>acc(id)?.name||'Deleted account';
const monthTx=mk=>S.months[mk]||[];
const allTx=()=>Object.values(S.months).flat();
const findTx=id=>allTx().find(t=>t.id===id);
const sortTx=a=>a.slice().sort((x,y)=>x.d<y.d?1:x.d>y.d?-1:(y.t||0)-(x.t||0));
const totalBudget=()=>S.meta.budget||Object.values(S.meta.budgets).reduce((s,v)=>s+(+v||0),0);
function balance(id){const a=acc(id);let b=a?Math.round(+a.opening||0):0;for(const t of allTx()){if(t.k==='out'&&t.acc===id)b-=t.a;else if(t.k==='in'&&t.acc===id)b+=t.a;else if(t.k==='xfer'){if(t.acc===id)b-=t.a;if(t.to===id)b+=t.a}}return b}
let nfc={};
function money(minor,o={}){const cur=S.meta.currency||'INR';const v=Math.abs(minor)/100;const whole=o.round||Number.isInteger(v);const key=cur+(whole?'w':'d');
  nfc[key]=nfc[key]||new Intl.NumberFormat(cur==='INR'?'en-IN':'en-US',{style:'currency',currency:cur,minimumFractionDigits:whole?0:2,maximumFractionDigits:whole?0:2});
  return (minor<0?'−':'')+nfc[key].format(o.round?Math.round(v):v)}
function sym(){try{return new Intl.NumberFormat('en-IN',{style:'currency',currency:S.meta.currency||'INR'}).formatToParts(0).find(p=>p.type==='currency').value}catch(e){return '₹'}}
function cmp(minor){const v=minor/100,s=sym();const inr=(S.meta.currency||'INR')==='INR';
  if(inr&&v>=1e7)return s+(v/1e7).toFixed(1).replace(/\.0$/,'')+'Cr';if(inr&&v>=1e5)return s+(v/1e5).toFixed(1).replace(/\.0$/,'')+'L';
  if(!inr&&v>=1e6)return s+(v/1e6).toFixed(1).replace(/\.0$/,'')+'M';if(v>=1e3)return s+(v/1e3).toFixed(1).replace(/\.0$/,'')+'k';return s+Math.round(v)}
function dayLabel(d){const t=todayISO();if(d===t)return 'Today';const y=new Date();y.setDate(y.getDate()-1);if(d===iso(y))return 'Yesterday';
  return pd(d).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'}).replace(',','')}
const shortD=d=>pd(d).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
function usage(kind){const n={};for(const t of allTx())if(t.k===kind&&t.c)n[t.c]=(n[t.c]||0)+1;const order=cats(kind);return order.slice().sort((a,b)=>(n[b.id]||0)-(n[a.id]||0)||order.indexOf(a)-order.indexOf(b))}

/* ---------- view state ---------- */
let view='home',vm=curMonth();
const tl={q:'',k:'',c:'',acc:'',day:''};
function route(){const h=location.hash.slice(1);view=['home','timeline','budgets','more'].includes(h)?h:'home';render();window.scrollTo(0,0)}
window.addEventListener('hashchange',route);

function monthNav(){const nx=vm>=curMonth();return `<div class="mnav"><button class="ib" data-act="prevM" aria-label="Previous month">${ico('chevL')}</button><b>${mName(vm)}</b><button class="ib" data-act="nextM" aria-label="Next month" ${nx?'disabled':''}>${ico('chevR')}</button></div>`}
function txRow(t){const c=cat(t.c),x=t.k==='xfer';const title=t.m||(x?'Transfer':c?.name||'Other');
  const sub=x?`${accName(t.acc)} → ${accName(t.to)}`:`${c?.name||'Other'} · ${accName(t.acc)}`;
  const amt=t.k==='out'?'−'+money(t.a):t.k==='in'?'+'+money(t.a):money(t.a);
  const tags=(t.tags||[]).length?' · '+t.tags.map(g=>'#'+esc(g)).join(' '):'';
  return `<li class="tx" data-id="${esc(t.id)}"><div class="txin" role="button" tabindex="0" aria-label="${esc(title)} ${esc(amt)}"><span class="ic" style="--c:${x?'var(--muted)':esc(c?.color||'#8a8178')}">${ico(x?'xfer':c?.icon)}</span><span class="tt"><b>${esc(title)}</b><small>${esc(sub)}${tags}</small></span><span class="amt ${t.k}">${amt}</span></div></li>`}
function barRow(name,sp,lim){const p=lim?sp/lim:0;const cls=p>=1?'bad':p>=.8?'warn':'';const txt=p>=1?`${Math.round(p*100)}% used · ${money(sp-lim,{round:1})} over`:`${Math.round(p*100)}% used · ${money(lim-sp,{round:1})} left`;
  return `<div class="bar"><div class="bt"><b>${esc(name)}</b><span>${txt}</span></div><div class="track" role="progressbar" aria-valuenow="${Math.round(p*100)}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(name)} budget"><div class="fill ${cls}" style="width:${Math.min(100,p*100).toFixed(1)}%"></div></div></div>`}

/* ---------- home ---------- */
let roT=null;
function renderHome(){
  const tx=monthTx(vm),isCur=vm===curMonth(),out=tx.filter(t=>t.k==='out'),inn=tx.filter(t=>t.k==='in');
  const spent=sum(out),recv=sum(inn),bud=totalBudget(),dim=daysIn(vm),dayN=isCur?new Date().getDate():dim;
  const td=todayISO(),spentT=sum(out.filter(t=>t.d===td)),left=dim-dayN+1;
  const allow=bud?Math.max(0,(bud-(spent-spentT))/left):0;
  const p=bud?spent/bud:0,proj=dayN?spent/dayN*dim:0;
  const hi=S.meta.name?`, ${esc(S.meta.name)}`:'';
  const hr=new Date().getHours(),greet=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
  let heroL;
  if(isCur){
    let msg;
    if(!bud)msg=`Set a monthly budget and you'll get a daily allowance here. <button class="lnk" data-go="budgets" style="color:#ffb3a3">Set budget</button>`;
    else if(spentT>allow)msg=`You're <em>${money(spentT-allow,{round:1})} over</em> today's ${money(allow,{round:1})} allowance.`;
    else msg=`<span class="okc">${money(allow-spentT,{round:1})} left</span> of today's ${money(allow,{round:1})} allowance. ${proj>bud?`At this pace you'll end <em>${money(proj-bud,{round:1})} over</em> budget.`:`At this pace you'll finish under budget.`}`;
    heroL=`<div class="lab">Spent today</div><div class="big">${money(spentT)}</div><p class="msg">${msg}</p>`;
  }else heroL=`<div class="lab">Spent in ${esc(mName(vm))}</div><div class="big">${money(spent,{round:1})}</div><p class="msg">About ${money(spent/dim,{round:1})} a day${bud?`, ${p>1?`<em>${money(spent-bud,{round:1})} over</em>`:`<span class="okc">${money(bud-spent,{round:1})} under</span>`} budget`:''}.</p>`;
  const r=62,C=2*Math.PI*r,pc=Math.min(p,1),col=p>=1?'#ff4d3a':p>=.8?'#f0a92a':'var(--ringc)';
  const ang=(dayN/dim)*2*Math.PI-Math.PI/2,x1=80+(r-12)*Math.cos(ang),y1=80+(r-12)*Math.sin(ang),x2=80+(r+12)*Math.cos(ang),y2=80+(r+12)*Math.sin(ang);
  const ring=`<div class="ringw"><svg class="ring" viewBox="0 0 160 160" role="img" aria-label="${bud?Math.round(p*100)+'% of monthly budget used':'No budget set'}"><circle class="rt" cx="80" cy="80" r="${r}"/>${bud?`<circle class="rb" cx="80" cy="80" r="${r}" stroke="${col}" stroke-dasharray="${(C*pc).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 80 80)"/>`:''}<line class="rd" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/></svg><div class="ringc">${bud?`<b>${Math.round(p*100)}%</b><span>of ${money(bud,{round:1})}</span>`:`<b>${cmp(spent)}</b><span>this month</span>`}</div><div class="legendr">White tick: day ${dayN} of ${dim}</div></div>`;
  const trio=`<div class="trio"><div>Spent this month<b>${money(spent,{round:1})}</b></div><div>Received<b>${money(recv,{round:1})}</b></div><div>${bud?'Left this month':'Net this month'}<b>${bud?money(bud-spent,{round:1}):money(recv-spent,{round:1})}</b></div></div>`;
  const strip=accs().map(a=>{const b=balance(a.id);return `<div class="acc"><span class="an">${ico(a.type==='upi'?'upi':a.type,18)}${esc(a.name)}</span><b class="${b<0?'neg':''}">${money(b,{round:1})}</b><small>${ACC_TYPES[a.type]||''}</small></div>`}).join('');
  // donut
  const bycat={};for(const t of out)bycat[t.c]=(bycat[t.c]||0)+t.a;
  const segs=Object.entries(bycat).sort((a,b)=>b[1]-a[1]);const dr=46,DC=2*Math.PI*dr;let off=0;
  const arcs=segs.map(([id,v])=>{const len=v/spent*DC;const s=`<circle cx="60" cy="60" r="${dr}" fill="none" stroke="${esc(cat(id)?.color||'#8a8178')}" stroke-width="18" stroke-dasharray="${Math.max(0,len-1.2).toFixed(2)} ${DC.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 60 60)"/>`;off+=len;return s}).join('');
  const leg=segs.slice(0,7).map(([id,v])=>`<li><button data-fcat="${esc(id)}"><i style="background:${esc(cat(id)?.color||'#8a8178')}"></i><span>${esc(cat(id)?.name||'Other')}</span><span class="v">${money(v,{round:1})}</span><span class="p">${Math.round(v/spent*100)}%</span></button></li>`).join('');
  // heatmap
  const daily={};for(const t of out)daily[t.d]=(daily[t.d]||0)+t.a;
  const mx=Math.max(1,...Object.values(daily));const first=(pd(vm+'-01').getDay()+6)%7;
  let hm=['M','T','W','T','F','S','S'].map(w=>`<div class="wd" aria-hidden="true">${w}</div>`).join('')+'<div></div>'.repeat(first);
  for(let d=1;d<=dim;d++){const ds=`${vm}-${pad2(d)}`,v=daily[ds]||0,fut=ds>td,q=v?Math.round(10+75*Math.sqrt(v/mx)):0;
    hm+=fut?`<button class="fut" disabled aria-label="${d}">${d}</button>`:`<button data-day="${ds}" class="${q>50?'hot':''} ${ds===td?'tod':''}" style="--p:${q}%" aria-label="${esc(dayLabel(ds))}: ${esc(money(v))} spent">${d}<small>${v?cmp(v):''}</small></button>`}
  // budgets
  const bl=Object.entries(S.meta.budgets).filter(([id,l])=>+l>0&&cat(id)).map(([id,l])=>[id,bycat[id]||0,+l]).sort((a,b)=>b[1]/b[2]-a[1]/a[2]).slice(0,6);
  // merchants
  const mm={};for(const t of out){const k=(t.m||cat(t.c)?.name||'Other').trim();const key=k.toLowerCase();mm[key]=mm[key]||{n:k,a:0,c:0};mm[key].a+=t.a;mm[key].c++}
  const top=Object.values(mm).sort((a,b)=>b.a-a.a).slice(0,5);const tmx=top[0]?.a||1;
  const recent=sortTx(allTx()).slice(0,10);
  const has=allTx().length>0;
  $('#view').innerHTML=`
  <div class="head"><div><h1>${greet}${hi}</h1><p class="sub">${isCur?'Here is where your money stands today.':'Looking back at '+esc(mName(vm))+'.'}</p></div>${monthNav()}</div>
  <div class="grid">
    <section class="hero s12" aria-label="Today"><div style="position:relative;z-index:1">${heroL}${trio}</div>${ring}</section>
    <section class="s12" aria-label="Accounts"><div class="strip">${strip}</div></section>
    <section class="card s8"><div class="ch"><h3>Daily spend, last 30 days</h3><div class="keys"><span><i style="background:var(--brick)"></i>Each day</span><span><i style="background:var(--ink)"></i>7-day average</span><span><i style="background:var(--line)"></i>30 days before</span></div></div><div class="fig" id="trend"><svg aria-label="Daily spend chart"></svg><div class="tip" id="tip"></div></div></section>
    <section class="card s4"><div class="ch"><h3>Where it went</h3></div>${spent?`<div class="donut"><svg viewBox="0 0 120 120" role="img" aria-label="Spending by category"><circle cx="60" cy="60" r="${dr}" fill="none" stroke="var(--soft)" stroke-width="18"/>${arcs}<text x="60" y="58" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">${cmp(spent)}</text><text x="60" y="74" text-anchor="middle" font-size="9" fill="var(--muted)">spent</text></svg><ul class="leg">${leg}</ul></div>`:`<div class="empty"><b>Nothing spent yet</b>Your categories will appear here.</div>`}</section>
    <section class="card s6"><div class="ch"><h3>Spending calendar</h3><small>Darker means more spent · tap a day</small></div><div class="hm">${hm}</div></section>
    <section class="card s6"><div class="ch"><h3>Budgets</h3><a href="#budgets">All budgets</a></div>${bl.length?`<div class="bars">${bl.map(([id,s,l])=>barRow(cat(id).name,s,l)).join('')}</div>`:`<div class="empty"><b>No budgets yet</b>Give each category a monthly limit.<br><br><a class="btn" href="#budgets">Set budgets</a></div>`}</section>
    <section class="card s5"><div class="ch"><h3>Top payees</h3><small>${esc(mName(vm))}</small></div>${top.length?`<ul class="merch">${top.map(m=>`<li><span>${esc(m.n)} <small>× ${m.c}</small></span><b>${money(m.a,{round:1})}</b><div class="track"><div class="fill" style="width:${(m.a/tmx*100).toFixed(1)}%"></div></div></li>`).join('')}</ul>`:`<div class="empty">No payees yet.</div>`}</section>
    <section class="card s7"><div class="ch"><h3>Recent</h3><a href="#timeline">See all</a></div>${has?`<ul class="txs">${recent.map(txRow).join('')}</ul>`:`<div class="empty"><b>Tap + to add your first expense</b>Like Chai ₹20. It takes three taps.</div>`}</section>
  </div>`;
  // trend data
  const end=isCur?new Date():pd(`${vm}-${pad2(dim)}`);const allD={};for(const t of allTx())if(t.k==='out')allD[t.d]=(allD[t.d]||0)+t.a;
  const days=[],vals=[],prev=[];for(let i=29;i>=0;i--){const d=new Date(end);d.setDate(d.getDate()-i);const s=iso(d);days.push(s);vals.push(allD[s]||0);const q=new Date(d);q.setDate(q.getDate()-30);prev.push(allD[iso(q)]||0)}
  const avg=vals.map((v,i)=>{const w=vals.slice(Math.max(0,i-6),i+1);return w.reduce((a,b)=>a+b,0)/w.length});
  const fig=$('#trend'),svg=fig.firstElementChild;
  if(roT)roT.disconnect();roT=new ResizeObserver(()=>drawTrend(svg,{days,vals,prev,avg}));roT.observe(svg);
  svg.onpointermove=e=>{const W=svg.clientWidth,rect=svg.getBoundingClientRect();const i=Math.max(0,Math.min(29,Math.round((e.clientX-rect.left-40)/((W-52)/29))));const tip=$('#tip');tip.textContent=`${dayLabel(days[i])} · ${money(vals[i])}`;tip.style.left=Math.min(W-70,Math.max(70,e.clientX-rect.left))+'px';tip.style.top=(e.clientY-rect.top)+'px';tip.style.opacity=1};
  svg.onpointerleave=()=>{$('#tip').style.opacity=0};
}
function drawTrend(svg,D){const W=svg.clientWidth,H=svg.clientHeight;if(!W||!H)return;const pl=40,pr=12,pt=12,pb=26,n=D.vals.length;
  const mx=Math.max(100,...D.vals,...D.prev)*1.08,cw=(W-pl-pr)/(n-1),x=i=>pl+i*cw,y=v=>pt+(H-pt-pb)*(1-v/mx);
  const ln=a=>a.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)).join('');
  const bw=Math.max(2,Math.min(14,cw*.6));let g='';
  for(const f of [0,.5,1]){const v=mx/1.08*f;g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="var(--line)" stroke-dasharray="${f?'3 4':''}"/><text x="${pl-6}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--muted)">${f?cmp(v):'0'}</text>`}
  const bars=D.vals.map((v,i)=>v?`<rect x="${(x(i)-bw/2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0)-y(v)).toFixed(1)}" rx="${Math.min(4,bw/2).toFixed(1)}" fill="var(--brick)" opacity=".85"/>`:'').join('');
  const xl=(W<520?[0,29]:[0,7,14,21,29]).map(i=>`<text x="${x(i).toFixed(1)}" y="${H-6}" text-anchor="${i===0?'start':i===29?'end':'middle'}" font-size="11" fill="var(--muted)">${i===29&&D.days[i]===todayISO()?'Today':shortD(D.days[i])}</text>`).join('');
  svg.innerHTML=g+`<path d="${ln(D.prev)}" fill="none" stroke="var(--line)" stroke-width="2"/>`+bars+`<path d="${ln(D.avg)}" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>`+xl}

/* ---------- timeline ---------- */
function renderTimeline(){
  const all=monthTx(vm);const q=tl.q.trim().toLowerCase();
  let list=all.filter(t=>(!tl.k||t.k===tl.k)&&(!tl.c||t.c===tl.c)&&(!tl.acc||t.acc===tl.acc||t.to===tl.acc)&&(!tl.day||t.d===tl.day)&&
    (!q||[t.m,cat(t.c)?.name,accName(t.acc),(t.tags||[]).join(' '),String(t.a/100)].join(' ').toLowerCase().includes(q)));
  list=sortTx(list);
  const run={};let c=0;const outByDay={};for(const t of all)if(t.k==='out')outByDay[t.d]=(outByDay[t.d]||0)+t.a;
  Object.keys(outByDay).sort().forEach(d=>{c+=outByDay[d];run[d]=c});
  const groups=[];for(const t of list){const g=groups[groups.length-1];if(g&&g.d===t.d)g.t.push(t);else groups.push({d:t.d,t:[t]})}
  const fs=sum(list.filter(t=>t.k==='out')),fr=sum(list.filter(t=>t.k==='in'));
  const opt=(arr,sel,ph)=>`<option value="">${ph}</option>`+arr.map(([v,l])=>`<option value="${esc(v)}" ${v===sel?'selected':''}>${esc(l)}</option>`).join('');
  $('#view').innerHTML=`
  <div class="head"><div><h1>Timeline</h1><p class="sub">Every entry, day by day. Swipe left on a phone to delete.</p></div>${monthNav()}</div>
  <div class="filters"><label class="search">${ico('search')}<input id="q" type="search" placeholder="Search payee, note, tag or amount" value="${esc(tl.q)}" aria-label="Search"></label>
  <select id="fk" aria-label="Type">${opt([['out','Spent'],['in','Received'],['xfer','Transfers']],tl.k,'All types')}</select>
  <select id="fc" aria-label="Category">${opt(S.meta.categories.map(c=>[c.id,c.name]),tl.c,'All categories')}</select>
  <select id="fa" aria-label="Account">${opt(accs().map(a=>[a.id,a.name]),tl.acc,'All accounts')}</select></div>
  ${tl.day?`<button class="chip" data-act="clrDay">${esc(dayLabel(tl.day))} ${ico('x',14)}</button>`:''}
  <div class="sumrow"><div>Spent<b>${money(fs)}</b></div><div>Received<b>${money(fr)}</b></div><div>Entries<b>${list.length}</b></div></div>
  ${groups.length?groups.map(g=>{const ds=sum(g.t.filter(t=>t.k==='out'));return `<section class="day"><div class="dayh"><b>${esc(dayLabel(g.d))}</b><span>${ds?`<strong>${money(ds)}</strong> spent · `:''}${money(run[g.d]||0,{round:1})} month so far</span></div><ul class="txs">${g.t.map(txRow).join('')}</ul></section>`}).join(''):`<div class="empty"><b>${all.length?'Nothing matches':'No entries this month'}</b>${all.length?'Try a different search or filter.':'Tap + to add one.'}</div>`}`;
}

/* ---------- budgets ---------- */
function renderBudgets(){
  const out=monthTx(vm).filter(t=>t.k==='out'),bycat={};for(const t of out)bycat[t.c]=(bycat[t.c]||0)+t.a;
  const spent=sum(out),bud=totalBudget(),isCur=vm===curMonth(),left=isCur?daysIn(vm)-new Date().getDate()+1:0;
  const major=m=>m?String(m/100):'';const s=esc(sym());
  $('#view').innerHTML=`
  <div class="head"><div><h1>Budgets</h1><p class="sub">Limits repeat every month. You get a nudge at 80% and when you go over.</p></div>${monthNav()}</div>
  <div class="grid">
  <section class="card s5"><h2>Monthly total</h2><p class="note">Leave empty to use the sum of your category budgets${S.meta.budget?'':` (${money(Object.values(S.meta.budgets).reduce((a,b)=>a+(+b||0),0),{round:1})})`}.</p>
    <div class="money" style="margin:14px 0"><span>${s}</span><input class="inp" id="budAll" inputmode="decimal" placeholder="e.g. 40000" value="${major(S.meta.budget)}" aria-label="Monthly total budget"></div>
    ${bud?barRow('This month',spent,bud):''}
    <div class="sumrow"><div>Spent<b>${money(spent,{round:1})}</b></div><div>Left<b>${bud?money(bud-spent,{round:1}):'—'}</b></div>${isCur&&bud?`<div>Per day now<b>${money(Math.max(0,bud-spent)/left,{round:1})}</b></div>`:''}</div></section>
  <section class="card s7"><h2>By category</h2>
    ${cats('out').map(c=>{const l=+S.meta.budgets[c.id]||0,sp=bycat[c.id]||0;return `<div class="brow"><span class="ic" style="--c:${esc(c.color)}">${ico(c.icon)}</span><div>${l?barRow(c.name,sp,l):`<div class="bt"><b>${esc(c.name)}</b></div><small>${money(sp,{round:1})} spent · no limit</small>`}</div><div class="money"><span>${s}</span><input class="inp" data-bud="${esc(c.id)}" inputmode="decimal" placeholder="No limit" value="${major(l)}" aria-label="${esc(c.name)} limit"></div></div>`}).join('')}
  </section></div>`;
}

/* ---------- more ---------- */
let wipeArm=false,dl=null;
function renderMore(){
  const used=id=>allTx().some(t=>t.acc===id||t.to===id),cused=id=>allTx().some(t=>t.c===id);
  const hasSample=allTx().some(t=>t.s);
  $('#view').innerHTML=`
  <div class="head"><div><h1>More</h1><p class="sub">Accounts, categories, your data and setup.</p></div></div>
  <div class="grid">
  <section class="card s5 sect"><h2>You</h2>
    <label class="f">Your name<input class="inp" id="nm" value="${esc(S.meta.name)}" placeholder="Optional" autocomplete="given-name"></label>
    <label class="f">Currency<select id="cur">${CURS.map(c=>`<option ${c===S.meta.currency?'selected':''}>${c}</option>`).join('')}</select></label>
    ${uid?`<p class="note">Signed in as <b>${esc(session?.user?.email||'you')}</b>. Your entries are private to you and sync to every device where you sign in.</p>${lastErr?`<p class="note" style="color:var(--brick)"><b>Sync problem:</b> ${esc(lastErr)}</p>`:''}<div class="btns"><button class="btn" data-act="signout">Sign out</button></div>`
      :sb?`<p class="note">You're using Spendo on this device only. Sign in to back up your entries and use them on your phone and laptop. Entries already here come with you.</p><div class="btns"><button class="btn dark" data-act="google">Continue with Google</button>${CFG.githubLogin?'<button class="btn" data-act="github">Continue with GitHub</button>':''}</div>`
      :`<p class="note">Sync isn't set up yet, so entries are saved in this browser only. Add your Supabase keys to <code>app/config.js</code> to turn on sign-in.</p>`}</section>
  <section class="card s7 sect"><h2>Use it on your phone and laptop</h2>
    <ol class="steps"><li>Open <b>${esc(location.host+location.pathname)}</b> on your phone and sign in with the same Google account.</li><li>On iPhone, tap Share then <b>Add to Home Screen</b>. On Android Chrome, tap ⋮ then <b>Install app</b>. It opens full screen and works offline.</li><li>On your laptop, Chrome and Edge show an install icon in the address bar.</li></ol>
    <p class="note">Entries you add offline save on the device and sync when you're back online.</p></section>
  <section class="card s12 sect"><div class="ch" style="margin:0"><h2>Accounts</h2><button class="btn" data-act="addAcc">+ Add account</button></div>
    <div>${accs().map(a=>{const b=balance(a.id);return `<div class="row"><span class="ic" style="--c:var(--ink)">${ico(a.type==='upi'?'upi':a.type)}</span><input class="inp" data-accf="name" data-id="${esc(a.id)}" value="${esc(a.name)}" aria-label="Account name"><select data-accf="type" data-id="${esc(a.id)}" aria-label="Account type">${Object.entries(ACC_TYPES).map(([k,l])=>`<option value="${k}" ${k===a.type?'selected':''}>${l}</option>`).join('')}</select><div class="money"><span>${esc(sym())}</span><input class="inp" data-accf="opening" data-id="${esc(a.id)}" inputmode="decimal" value="${(+a.opening||0)/100}" aria-label="Starting balance"></div><span class="bal" title="Current balance">${money(b,{round:1})} ${used(a.id)||accs().length<2?'':`<button class="ib" data-act="delAcc" data-id="${esc(a.id)}" aria-label="Delete ${esc(a.name)}">${ico('trash',18)}</button>`}</span></div>`}).join('')}</div>
    <p class="note">The money field is the starting balance. The bold figure is the balance now.</p></section>
  <section class="card s12 sect"><div class="ch" style="margin:0"><h2>Categories</h2><span class="btns"><button class="btn" data-act="addCat" data-kind="out">+ Spending</button><button class="btn" data-act="addCat" data-kind="in">+ Income</button></span></div>
    <div>${S.meta.categories.map(c=>`<div class="row crow"><span class="ic" style="--c:${esc(c.color)}">${ico(c.icon)}</span><input class="inp" data-catf="name" data-id="${esc(c.id)}" value="${esc(c.name)}" aria-label="Category name"><select data-catf="icon" data-id="${esc(c.id)}" aria-label="Icon">${ICON_KEYS.map(k=>`<option value="${k}" ${k===c.icon?'selected':''}>${k==='edu'?'education':k} icon</option>`).join('')}</select><input type="color" data-catf="color" data-id="${esc(c.id)}" value="${esc(c.color)}" aria-label="Colour"><span class="bal"><small>${c.kind==='in'?'Income':'Spending'}</small> ${cused(c.id)?'':`<button class="ib" data-act="delCat" data-id="${esc(c.id)}" aria-label="Delete ${esc(c.name)}">${ico('trash',18)}</button>`}</span></div>`).join('')}</div></section>
  <section class="card s12 sect"><h2>Your data</h2>
    <div class="btns"><button class="btn" data-act="csv">Export CSV</button><button class="btn" data-act="json">Full backup (JSON)</button><button class="btn" data-act="import">Import CSV or backup</button>
    ${hasSample?`<button class="btn" data-act="unsample">Remove sample data</button>`:`<button class="btn" data-act="sample">Add sample data</button>`}
    <button class="btn danger" data-act="wipe">${wipeArm?'Tap again to delete everything':'Delete all my data'}</button></div>
    <p class="note">CSV columns: date, type (spent / received / transfer), amount, category, account, to_account, note, tags. Imports skip rows you already have.</p>
    <textarea id="dlbox" class="inp" style="display:none;min-height:140px;padding:10px;font:13px/1.4 ui-monospace,monospace" readonly aria-label="Exported data"></textarea></section>
  </div>`;
}

function render(){
  const a=document.activeElement,aid=a&&a.id&&$('#view').contains(a)?a.id:null,sel=aid&&a.selectionStart;
  $$('[data-v]').forEach(el=>el.classList.toggle('on',el.dataset.v===view));
  if(view==='home')renderHome();else if(view==='timeline')renderTimeline();else if(view==='budgets')renderBudgets();else renderMore();
  if(aid){const n=document.getElementById(aid);if(n){n.focus();try{if(sel!=null)n.setSelectionRange(sel,sel)}catch(e){}}}
}

/* ---------- add / edit sheet ---------- */
let sh=null;
const fromMinor=a=>String(a/100);
function openSheet(t,kind){
  const k=kind||'out';
  sh=t?{id:t.id,k:t.k,amt:fromMinor(t.a),c:t.c,acc:t.acc,to:t.to||'',d:t.d,m:t.m||'',tags:(t.tags||[]).join(' '),orig:t,picked:true,all:false}
      :{k,amt:'',c:usage(k)[0]?.id,acc:acc(S.meta.lastAcc)?S.meta.lastAcc:accs()[0].id,to:'',d:todayISO(),m:'',tags:'',picked:false,all:false};
  drawSheet();$('#ov').classList.add('show');document.body.style.overflow='hidden';
}
function closeSheet(){$('#ov').classList.remove('show');document.body.style.overflow='';sh=null}
function drawSheet(){
  const k=sh.k,list=k==='xfer'?[]:usage(k),shown=sh.all?list:list.slice(0,8);
  if(k!=='xfer'&&!list.some(c=>c.id===sh.c))sh.c=list[0]?.id;
  const chip=(a,attr,sel)=>`<button data-${attr}="${esc(a.id)}" class="${a.id===sel?'on':''}">${ico(a.type==='upi'?'upi':a.type,16)}${esc(a.name)}</button>`;
  $('#sheet').innerHTML=`<div class="grab"></div>
  <div class="seg" role="tablist">${[['out','Spent'],['in','Received'],['xfer','Transfer']].map(([v,l])=>`<button role="tab" aria-selected="${v===k}" data-k="${v}" class="${v===k?'on':''}">${l}</button>`).join('')}</div>
  <div class="amtd" id="amtd" aria-live="polite"></div>
  ${k==='xfer'?`<div class="lbl">From</div><div class="chips">${accs().map(a=>chip(a,'acc',sh.acc)).join('')}</div><div class="lbl">To</div><div class="chips">${accs().map(a=>chip(a,'to',sh.to)).join('')}</div>`
  :`<div class="cats">${shown.map(c=>`<button data-cat="${esc(c.id)}" class="${c.id===sh.c?'on':''}" style="--c:${esc(c.color)}"><span class="ic" style="--c:${esc(c.color)}">${ico(c.icon,20)}</span>${esc(c.name)}</button>`).join('')}${list.length>8?`<button data-act="allCats" style="--c:var(--muted)"><span class="ic" style="--c:var(--muted)">${ico('other',20)}</span>${sh.all?'Less':'More'}</button>`:''}</div>
  <div class="chips">${accs().map(a=>chip(a,'acc',sh.acc)).join('')}</div>`}
  <div class="two" style="margin-top:8px"><input class="inp" id="sm" placeholder="${k==='in'?'From (e.g. Salary)':'Payee or note (e.g. Swiggy)'}" value="${esc(sh.m)}" aria-label="Payee or note" autocomplete="off"><input class="inp" id="sd" type="date" value="${esc(sh.d)}" max="${todayISO()}" aria-label="Date"></div>
  <input class="inp" id="st" style="width:100%;margin-top:8px" placeholder="Tags, e.g. trip-goa work" value="${esc(sh.tags)}" aria-label="Tags">
  <div class="pad">${['1','2','3','4','5','6','7','8','9','.','0','del'].map(x=>`<button data-key="${x}" aria-label="${x==='del'?'Backspace':x}">${x==='del'?ico('del',24):x}</button>`).join('')}</div>
  <div class="sact">${sh.orig?`<button class="btn danger" data-act="sdel" aria-label="Delete entry">${ico('trash')}</button>`:`<button class="btn" data-act="close">Cancel</button>`}<button class="btn pri" data-act="save">${sh.orig?'Update':'Save'}</button></div>`;
  updAmt();
}
function updAmt(){const el=$('#amtd');if(!el)return;const a=sh.amt;el.textContent=sym()+' '+(a?Number(a.split('.')[0]||0).toLocaleString(S.meta.currency==='INR'?'en-IN':'en-US')+(a.includes('.')?'.'+a.split('.')[1]:''):'0');el.classList.toggle('zero',!a)}
function key(k){let a=sh.amt;if(k==='del')a=a.slice(0,-1);else if(k==='.'){if(!a.includes('.'))a=(a||'0')+'.'}
  else{if(a.includes('.')&&a.split('.')[1].length>=2)return;if(a==='0')a='';if(a.replace('.','').length>=9)return;a+=k}sh.amt=a;updAmt()}
const parseTags=s=>[...new Set(String(s||'').split(/[\s,]+/).map(x=>x.replace(/^#/,'').trim().toLowerCase()).filter(Boolean))].slice(0,8);
function saveSheet(){
  const a=Math.round(parseFloat(sh.amt||'0')*100);
  if(!a){const el=$('#amtd');el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');snack('Type an amount first');return}
  if(sh.k==='xfer'&&(!sh.to||sh.to===sh.acc)){snack('Pick two different accounts');return}
  const t={id:sh.id||newId(),k:sh.k,a,c:sh.k==='xfer'?null:sh.c||null,acc:sh.acc,to:sh.k==='xfer'?sh.to:null,d:sh.d||todayISO(),m:sh.m.trim().slice(0,80),tags:parseTags(sh.tags),t:sh.orig?.t||Date.now()};
  if(sh.orig?.s)t.s=1;
  const keys=new Set();
  if(sh.orig){const om=sh.orig.d.slice(0,7);S.months[om]=(S.months[om]||[]).filter(x=>x.id!==t.id);keys.add('m-'+om)}
  const mk=t.d.slice(0,7);(S.months[mk]=S.months[mk]||[]).push(t);keys.add('m-'+mk);
  if(S.meta.lastAcc!==t.acc){S.meta.lastAcc=t.acc;keys.add('meta')}
  if(!S.meta.onboarded){S.meta.onboarded=true;keys.add('meta')}
  const edit=!!sh.orig;touch(...keys);closeSheet();render();
  if(!budgetAlert(t))snack(edit?'Updated':`Saved ${t.k==='out'?'−':t.k==='in'?'+':''}${money(t.a)}`)
}
function budgetAlert(t){if(t.k!=='out'||!t.c)return false;const l=+S.meta.budgets[t.c]||0;if(!l)return false;
  const sp=sum(monthTx(t.d.slice(0,7)).filter(x=>x.k==='out'&&x.c===t.c)),p=sp/l,pb=(sp-t.a)/l,n=cat(t.c)?.name||'This category';
  if(p>=1&&pb<1){snack(`${n} is over budget: ${Math.round(p*100)}% used`,'bad');return true}
  if(p>=.8&&pb<.8){snack(`${n}: ${Math.round(p*100)}% of budget used`,'warn');return true}return false}
function delTx(id){const t=findTx(id);if(!t)return;const mk=t.d.slice(0,7);S.months[mk]=S.months[mk].filter(x=>x.id!==id);touch('m-'+mk);render();
  snack(`Deleted ${t.m||cat(t.c)?.name||'entry'}`,'',()=>{(S.months[mk]=S.months[mk]||[]).push(t);touch('m-'+mk);render()})}

/* ---------- snackbar ---------- */
let snT=null,snU=null;
function snack(msg,tone='',undo){const s=$('#snack');$('#snackt').textContent=msg;s.className='snack show '+tone;const b=$('#snackb');b.hidden=!undo;snU=undo||null;clearTimeout(snT);snT=setTimeout(()=>{s.classList.remove('show');snU=null},undo?5000:2600)}
$('#snackb').addEventListener('click',()=>{if(snU){const f=snU;snU=null;f()}$('#snack').classList.remove('show')});

/* ---------- welcome ---------- */
function showWelcome(){
  $('#wsheet').innerHTML=`<div class="logo" style="width:48px;height:48px;border-radius:14px">${'<svg class="i" width="26" height="26" viewBox="0 0 24 24"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>'}</div>
  <div class="wtitle">Every rupee, in three taps.</div><p class="sub">Spendo tracks what you spend each day and shows whether you're on track for the month.</p>
  <div class="wform"><label class="f">What should we call you?<input class="inp" id="wn" placeholder="Optional" autocomplete="given-name"></label>
  <div class="two"><label class="f">Currency<select id="wc">${CURS.map(c=>`<option>${c}</option>`).join('')}</select></label><label class="f">Monthly budget<div class="money"><span>₹</span><input class="inp" id="wb" inputmode="decimal" placeholder="Optional"></div></label></div></div>
  <div class="btns"><button class="btn pri" style="flex:1" data-act="wstart">Start tracking</button><button class="btn" style="flex:1" data-act="wsample">Explore with sample data</button></div>
  <p class="note" style="margin-top:12px">${uid?'Private to you. Syncs across your phone and laptop.':'Saved on this device.'} You can change all of this later.</p>`;
  $('#wov').classList.add('show');
  $('#wc').onchange=e=>{$('#wsheet .money span').textContent=new Intl.NumberFormat('en',{style:'currency',currency:e.target.value}).formatToParts(0).find(p=>p.type==='currency').value};
}
function finishWelcome(sample){S.meta.name=$('#wn').value.trim().slice(0,40);S.meta.currency=$('#wc').value;nfc={};const b=parseFloat($('#wb').value);if(b>0)S.meta.budget=Math.round(b*100);S.meta.onboarded=true;
  $('#wov').classList.remove('show');if(sample)addSample();else touch('meta');render();if(!sample)setTimeout(()=>openSheet(),250)}

function showSignin(){
  $('#wsheet').innerHTML=`<div class="logo" style="width:48px;height:48px;border-radius:14px"><svg class="i" width="26" height="26" viewBox="0 0 24 24"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg></div>
  <div class="wtitle">Every rupee, in three taps.</div><p class="sub">Sign in so your entries are backed up and stay in sync between your phone and laptop. Nobody else can see them.</p>
  <div class="wform"><button class="btn dark block" data-act="google" style="min-height:52px">Continue with Google</button>${CFG.githubLogin?'<button class="btn block" data-act="github" style="min-height:52px">Continue with GitHub</button>':''}</div>
  <button class="lnk" data-act="guest" style="display:block;margin:0 auto">Use on this device only</button>
  <p class="note" style="margin-top:14px;text-align:center">No bank passwords, ever. You can sign in later from More.</p>`;
  $('#wov').classList.add('show')}

/* ---------- sample data ---------- */
function addSample(){
  let seed=20261121;const r=()=>(seed=(seed*1664525+1013904223)%4294967296)/4294967296;const pick=a=>a[Math.floor(r()*a.length)];
  const need=[['bank','HDFC Bank','bank',4500000],['upi','Google Pay','upi',600000],['card','Credit card','card',0]];
  for(const [id,name,type,opening] of need)if(!acc(id))S.meta.accounts.push({id,name,type,opening});
  if(!acc('cash'))S.meta.accounts.unshift({id:'cash',name:'Cash',type:'cash',opening:200000});
  if(!Object.keys(S.meta.budgets).length&&!S.meta.budget)S.meta.budgets={food:900000,transport:350000,rent:2200000,bills:400000,shopping:500000,health:150000,fun:250000,other:100000};
  const now=new Date(),keys=new Set(['meta']);
  const add=(d,k,a,c,ac,m,to)=>{const mk=d.slice(0,7);(S.months[mk]=S.months[mk]||[]).push({id:newId(),k,a:Math.round(a)*100,c:k==='xfer'?null:c,acc:ac,to:to||null,d,m,tags:[],t:Date.now()+Math.floor(r()*1e6),s:1});keys.add('m-'+mk)};
  for(let back=2;back>=0;back--){const y=now.getFullYear(),mo=now.getMonth()-back,dim=new Date(y,mo+1,0).getDate(),last=back?dim:now.getDate();
    for(let day=1;day<=last;day++){const d=iso(new Date(y,mo,day));
      if(day===1)add(d,'in',85000,'salary','bank','Salary');
      if(day===2){add(d,'xfer',3000,null,'bank','ATM withdrawal','cash');add(d,'xfer',8000,null,'bank','Top up','upi')}
      if(day===3)add(d,'out',22000,'rent','bank','Rent');
      if(day===7)add(d,'out',799,'bills','card','Airtel postpaid');
      if(day===10)add(d,'out',1450+r()*700,'bills','upi','Electricity bill');
      if(day===12)add(d,'out',649,'fun','card','Netflix');
      if(r()<.8)add(d,'out',pick([20,20,25,30]),'food','cash','Chai');
      if(r()<.42)add(d,'out',180+r()*420,'food','upi',pick(['Swiggy','Zomato','Udupi Grand','Chaayos']));
      if(r()<.5)add(d,'out',60+r()*240,'transport','upi',pick(['Uber','Ola','Namma Metro','Rapido']));
      if(r()<.11)add(d,'out',400+r()*2400,'shopping','card',pick(['Amazon','Myntra','DMart','Blinkit']));
      if(r()<.05)add(d,'out',150+r()*800,'health','upi',pick(['Apollo Pharmacy','Tata 1mg']));
      if(r()<.06)add(d,'out',300+r()*800,'fun','card',pick(['PVR Cinemas','BookMyShow']));
      if(r()<.03)add(d,'in',200+r()*1500,'refund','upi',pick(['Amazon refund','Swiggy refund']));
    }}
  S.meta.onboarded=true;touch(...keys);snack('Sample data added. Remove it any time under More.')
}
function removeSample(){const keys=new Set();for(const [m,a] of Object.entries(S.months)){if(a.some(t=>t.s)){S.months[m]=a.filter(t=>!t.s);keys.add('m-'+m)}}touch(...keys);render();snack('Sample data removed')}

/* ---------- import / export ---------- */
function csvCell(v){v=String(v??'');return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function toCSV(){const K={out:'spent',in:'received',xfer:'transfer'};const rows=[['date','type','amount','category','account','to_account','note','tags']];
  for(const t of sortTx(allTx()).reverse())rows.push([t.d,K[t.k],(t.a/100).toFixed(2),cat(t.c)?.name||'',accName(t.acc),t.to?accName(t.to):'',t.m||'',(t.tags||[]).join(' ')]);
  return rows.map(r=>r.map(csvCell).join(',')).join('\n')}
function parseCSV(s){const rows=[];let row=[],f='',q=false;for(let i=0;i<s.length;i++){const c=s[i];
  if(q){if(c==='"'){if(s[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
  else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&s[i+1]==='\n')i++;row.push(f);rows.push(row);row=[];f=''}else f+=c}
  if(f||row.length){row.push(f);rows.push(row)}return rows.filter(r=>r.some(x=>x.trim()))}
function normDate(s){s=String(s).trim();let m;if(m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))return `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;
  if(m=s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/)){const y=m[3].length===2?'20'+m[3]:m[3];return `${y}-${pad2(m[2])}-${pad2(m[1])}`}const d=new Date(s);return isNaN(d)?null:iso(d)}
function importCSV(text){const rows=parseCSV(text);if(rows.length<2){snack('That file has no rows','warn');return}
  const h=rows[0].map(x=>x.trim().toLowerCase());const ix=n=>h.findIndex(x=>x===n||x.includes(n));
  const di=ix('date'),ti=ix('type'),ai=ix('amount'),ci=ix('category'),ac=ix('account'),to=h.indexOf('to_account'),ni=Math.max(ix('note'),ix('description'),ix('narration')),gi=ix('tags');
  if(di<0||ai<0){snack('Need at least date and amount columns','warn');return}
  const seen=new Set(allTx().map(t=>`${t.d}|${t.a}|${(t.m||'').toLowerCase()}|${t.k}`));const keys=new Set(['meta']);let n=0,skip=0;
  const findAcc=name=>{name=(name||'').trim();if(!name)return acc(S.meta.lastAcc)?S.meta.lastAcc:accs()[0].id;let a=accs().find(x=>x.name.toLowerCase()===name.toLowerCase());if(!a){a={id:newId(),name:name.slice(0,40),type:'bank',opening:0};S.meta.accounts.push(a)}return a.id};
  const findCat=(name,k)=>{name=(name||'').trim();if(!name)return cats(k).find(c=>c.id==='other')?.id||cats(k)[0]?.id;let c=S.meta.categories.find(x=>x.name.toLowerCase()===name.toLowerCase());if(!c){c={id:newId(),name:name.slice(0,30),icon:'other',color:'#8a8178',kind:k};S.meta.categories.push(c)}return c.id};
  for(const r of rows.slice(1)){const d=normDate(r[di]);let amt=parseFloat(String(r[ai]).replace(/[^\d.\-]/g,''));if(!d||!amt){skip++;continue}
    const ty=(ti>=0?r[ti]:'').toLowerCase();let k=/trans/.test(ty)?'xfer':/rec|cr|inc/.test(ty)?'in':/spe|dr|deb|exp/.test(ty)?'out':amt<0?'out':'out';
    const a=Math.round(Math.abs(amt)*100),m=ni>=0?(r[ni]||'').trim().slice(0,80):'';const sig=`${d}|${a}|${m.toLowerCase()}|${k}`;if(seen.has(sig)){skip++;continue}seen.add(sig);
    const t={id:newId(),k,a,c:k==='xfer'?null:findCat(ci>=0?r[ci]:'',k),acc:findAcc(ac>=0?r[ac]:''),to:k==='xfer'?findAcc(to>=0?r[to]:''):null,d,m,tags:gi>=0?parseTags(r[gi]):[],t:Date.now()};
    (S.months[d.slice(0,7)]=S.months[d.slice(0,7)]||[]).push(t);keys.add('m-'+d.slice(0,7));n++}
  S.meta.onboarded=true;touch(...keys);render();snack(`Imported ${n} entr${n===1?'y':'ies'}${skip?`, skipped ${skip}`:''}`)}
function importJSON(text){let j;try{j=JSON.parse(text)}catch(e){snack('That backup file could not be read','warn');return}
  if(!j||!j.meta||!j.months){snack('That is not a Spendo backup','warn');return}
  const prev=JSON.parse(JSON.stringify(S));const restore=(st)=>{const old=Object.keys(S.months);S={meta:fixMeta(st.meta),months:st.months};S.meta.onboarded=true;nfc={};
    const keys=new Set(['meta',...Object.keys(S.months).map(m=>'m-'+m)]);for(const m of old)if(!S.months[m]){S.months[m]=[];keys.add('m-'+m)}touch(...keys);render()};
  restore(j);snack('Backup restored','',()=>restore(prev))}
function offer(filename,data,mime){const url=URL.createObjectURL(new Blob([data],{type:mime}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);snack('Downloaded '+filename)}

async function wipeAll(){
  if(uid&&sb){try{clearTimeout(flushT);for(const t of ['transactions','budgets','categories','accounts']){const{error}=await sb.from(t).delete().eq('user_id',uid);if(error)throw error}
      const{error}=await sb.from('profiles').delete().eq('id',uid);if(error)throw error;base={uid,profiles:{},accounts:{},categories:{},budgets:{},transactions:{}};saveBase()}
    catch(e){snack('Could not delete from the cloud. Check your connection and try again.','bad');return}}
  S={meta:blankMeta(),months:{}};nfc={};saveLocal();render();showWelcome();snack('All your data was deleted')}

/* ---------- events ---------- */
let swipe=null,noClick=false;
document.addEventListener('pointerdown',e=>{const el=e.target.closest('.txin');if(!el||e.pointerType==='mouse')return;swipe={el,x:e.clientX,y:e.clientY,dx:0,on:false}});
document.addEventListener('pointermove',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;
  if(!swipe.on){if(Math.abs(dy)>12){swipe=null;return}if(dx<-12){swipe.on=true;swipe.el.parentElement.classList.add('sw')}else return}
  swipe.dx=Math.min(0,dx);swipe.el.style.transform=`translateX(${swipe.dx}px)`});
const endSwipe=()=>{if(!swipe)return;const s=swipe;swipe=null;if(!s.on)return;noClick=true;setTimeout(()=>noClick=false,300);s.el.style.transition='transform .2s';
  if(s.dx<-100){s.el.style.transform='translateX(-110%)';const id=s.el.parentElement.dataset.id;setTimeout(()=>delTx(id),200)}else{s.el.style.transform='';setTimeout(()=>s.el.parentElement.classList.remove('sw'),220)}};
document.addEventListener('pointerup',endSwipe);document.addEventListener('pointercancel',()=>{if(swipe){swipe.el.style.transform='';swipe.el.parentElement.classList.remove('sw');swipe=null}});

document.addEventListener('click',e=>{
  const t=e.target;const A=t.closest('[data-act]'),act=A&&A.dataset.act;
  if(t.closest('.txin')&&!act){if(noClick)return;const tx=findTx(t.closest('.tx').dataset.id);if(tx)openSheet(tx);return}
  if(t===$('#ov')){closeSheet();return}
  const go=t.closest('[data-go]');if(go){location.hash=go.dataset.go;return}
  if(sh){const k=t.closest('[data-k]'),c=t.closest('[data-cat]'),ac=t.closest('[data-acc]'),to=t.closest('[data-to]'),ky=t.closest('[data-key]');
    if(k){sh.k=k.dataset.k;sh.c=null;if(sh.k==='xfer'&&!sh.to)sh.to=(accs().find(a=>a.id!==sh.acc)||{}).id||'';drawSheet();return}
    if(c){sh.c=c.dataset.cat;sh.picked=true;$$('#sheet [data-cat]').forEach(b=>b.classList.toggle('on',b===c));return}
    if(ac){sh.acc=ac.dataset.acc;$$('#sheet [data-acc]').forEach(b=>b.classList.toggle('on',b===ac));return}
    if(to){sh.to=to.dataset.to;$$('#sheet [data-to]').forEach(b=>b.classList.toggle('on',b===to));return}
    if(ky){key(ky.dataset.key);return}}
  const hd=t.closest('[data-day]');if(hd){tl.day=hd.dataset.day;tl.c='';tl.k='';location.hash='timeline';return}
  const fc=t.closest('[data-fcat]');if(fc){tl.c=fc.dataset.fcat;tl.day='';location.hash='timeline';return}
  if(!act)return;
  const id=A.dataset.id;
  switch(act){
    case 'add':openSheet();break;
    case 'close':closeSheet();break;
    case 'save':saveSheet();break;
    case 'sdel':{const i=sh.id;closeSheet();delTx(i);break}
    case 'allCats':sh.all=!sh.all;drawSheet();break;
    case 'prevM':vm=shiftM(vm,-1);tl.day='';render();break;
    case 'nextM':if(vm<curMonth()){vm=shiftM(vm,1);tl.day='';render()}break;
    case 'clrDay':tl.day='';render();break;
    case 'wstart':finishWelcome(false);break;
    case 'wsample':finishWelcome(true);break;
    case 'addAcc':S.meta.accounts.push({id:newId(),name:'New account',type:'bank',opening:0});touch('meta');render();break;
    case 'delAcc':if(allTx().some(x=>x.acc===id||x.to===id)){snack('This account has entries. Delete or move them first.','warn');break}S.meta.accounts=accs().filter(a=>a.id!==id);if(S.meta.lastAcc===id)S.meta.lastAcc=accs()[0].id;touch('meta');render();break;
    case 'addCat':S.meta.categories.push({id:newId(),name:A.dataset.kind==='in'?'New income':'New category',icon:'other',color:'#5b6cff',kind:A.dataset.kind});touch('meta');render();break;
    case 'delCat':if(allTx().some(x=>x.c===id)){snack('This category has entries, so it stays.','warn');break}S.meta.categories=S.meta.categories.filter(c=>c.id!==id);delete S.meta.budgets[id];touch('meta');render();break;
    case 'csv':offer(`spendo-${todayISO()}.csv`,toCSV(),'text/csv');break;
    case 'json':offer(`spendo-backup-${todayISO()}.json`,JSON.stringify(S,null,1),'application/json');break;
    case 'import':$('#file').click();break;
    case 'sample':addSample();render();break;
    case 'unsample':removeSample();break;
    case 'wipe':if(!wipeArm){wipeArm=true;render();setTimeout(()=>{wipeArm=false;if(view==='more')render()},5000);break}
      wipeArm=false;wipeAll();break;
    case 'google':signIn('google');break;
    case 'github':signIn('github');break;
    case 'guest':setGuest(true);cloud='local';setSync();$('#wov').classList.remove('show');if(!S.meta.onboarded)showWelcome();break;
    case 'signout':signOut();break;
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('txin')){e.target.click();return}
  if(!sh)return;const tag=e.target.tagName;
  if(e.key==='Escape'){closeSheet();return}
  if(e.key==='Enter'&&tag!=='TEXTAREA'){e.preventDefault();saveSheet();return}
  if(tag==='INPUT'||tag==='SELECT')return;
  if(/^[0-9.]$/.test(e.key)){key(e.key);e.preventDefault()}else if(e.key==='Backspace'){key('del');e.preventDefault()}});
document.addEventListener('input',e=>{const t=e.target;
  if(t.id==='q'){tl.q=t.value;render();return}
  if(!sh)return;
  if(t.id==='sm'){sh.m=t.value;if(!sh.picked&&sh.k!=='xfer'){const v=t.value.trim().toLowerCase();if(v.length>1){const hit=sortTx(allTx()).find(x=>x.k===sh.k&&x.c&&(x.m||'').toLowerCase()===v);if(hit&&hit.c!==sh.c){sh.c=hit.c;$$('#sheet [data-cat]').forEach(b=>b.classList.toggle('on',b.dataset.cat===hit.c));if(!$(`#sheet [data-cat="${CSS.escape(hit.c)}"]`)){sh.all=true;const m=sh.m;drawSheet();const i=$('#sm');i.value=m;i.focus()}}}}}
  else if(t.id==='sd')sh.d=t.value;else if(t.id==='st')sh.tags=t.value});
document.addEventListener('change',async e=>{const t=e.target;const num=v=>{const n=parseFloat(String(v).replace(/[^\d.]/g,''));return n>0?Math.round(n*100):0};
  if(t.id==='fk'){tl.k=t.value;render()}else if(t.id==='fc'){tl.c=t.value;render()}else if(t.id==='fa'){tl.acc=t.value;render()}
  else if(t.id==='budAll'){S.meta.budget=num(t.value);touch('meta');render()}
  else if(t.dataset.bud){const v=num(t.value);if(v)S.meta.budgets[t.dataset.bud]=v;else delete S.meta.budgets[t.dataset.bud];touch('meta');render()}
  else if(t.id==='nm'){S.meta.name=t.value.trim().slice(0,40);touch('meta')}
  else if(t.id==='cur'){S.meta.currency=t.value;nfc={};touch('meta');render()}
  else if(t.dataset.accf){const a=acc(t.dataset.id);if(!a)return;const f=t.dataset.accf;if(f==='opening'){const n=parseFloat(String(t.value).replace(/[^\d.\-]/g,''));a.opening=isNaN(n)?0:Math.round(n*100)}else a[f]=f==='name'?(t.value.trim().slice(0,40)||'Account'):t.value;touch('meta');render()}
  else if(t.dataset.catf){const c=cat(t.dataset.id);if(!c)return;const f=t.dataset.catf;c[f]=f==='name'?(t.value.trim().slice(0,30)||'Category'):t.value;touch('meta');render()}
  else if(t.id==='file'){const f=t.files[0];t.value='';if(!f)return;const text=await f.text();if(/\.json$/i.test(f.name)||text.trim().startsWith('{'))importJSON(text);else importCSV(text)}});

render();setSync();initAuth();
for(const el of [$('#sync1'),$('#sync2')])if(el){el.style.cursor='pointer';el.title='Sync details';el.addEventListener('click',()=>{location.hash='more'})}
if('serviceWorker' in navigator&&location.protocol==='https:')addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
