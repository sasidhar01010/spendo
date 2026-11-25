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
const blankMeta=()=>({v:1,currency:'INR',name:'',budget:0,budgets:{},accounts:[{id:'cash',name:'Cash',type:'cash',opening:0}],categories:DEF_CATS.map(c=>({...c})),lastAcc:'cash',onboarded:false,goals:[]});
function fixMeta(m){const b=blankMeta();m={...b,...(m||{})};if(!Array.isArray(m.accounts)||!m.accounts.length)m.accounts=b.accounts;if(!Array.isArray(m.categories)||!m.categories.length)m.categories=b.categories;if(!m.budgets||typeof m.budgets!=='object')m.budgets={};if(!Array.isArray(m.goals))m.goals=[];return m}
function loadLocal(){try{const j=JSON.parse(localStorage.getItem(LS_KEY));if(j&&j.meta&&j.months)return{meta:fixMeta(j.meta),months:j.months}}catch(e){}return null}
let S=loadLocal()||{meta:blankMeta(),months:{}};
function saveLocal(){try{localStorage.setItem(LS_KEY,JSON.stringify(S))}catch(e){}}
function loadBase(){try{const b=JSON.parse(localStorage.getItem(LS_BASE));if(b&&b.uid)return b}catch(e){}return null}
let base=loadBase();
function saveBase(){try{base?localStorage.setItem(LS_BASE,JSON.stringify(base)):localStorage.removeItem(LS_BASE)}catch(e){}}
const isGuest=()=>{try{return localStorage.getItem(LS_GUEST)==='1'}catch(e){return false}};
const setGuest=v=>{try{v?localStorage.setItem(LS_GUEST,'1'):localStorage.removeItem(LS_GUEST)}catch(e){}};
let sb=null,session=null,uid=null,cloud='local',booted=false,capExtra=false,capRating=false,capProf=false;
const GX=['created','start','log','off','adj'];
const TABLES=['profiles','accounts','categories','budgets','transactions','goals'];
const PK={profiles:'id',accounts:'user_id,id',categories:'user_id,id',budgets:'user_id,category_id',transactions:'user_id,id',goals:'user_id,id'};
const KMAP={out:'debit',in:'credit',xfer:'transfer'},KBACK={debit:'out',credit:'in',transfer:'xfer'};
function toRows(){const r={profiles:{},accounts:{},categories:{},budgets:{},transactions:{},goals:{}},m=S.meta;
  r.profiles[uid]={id:uid,name:m.name||'',base_currency:m.currency||'INR',budget_minor:Math.round(+m.budget||0),last_account_id:m.lastAcc||null,onboarded:!!m.onboarded};
  if(capProf)r.profiles[uid].extra={workDays:+m.workDays||22};
  m.accounts.forEach((a,i)=>{r.accounts[a.id]={user_id:uid,id:a.id,name:a.name,type:a.type,opening_minor:Math.round(+a.opening||0),sort:i}});
  m.categories.forEach((c,i)=>{r.categories[c.id]={user_id:uid,id:c.id,name:c.name,icon:c.icon,color:c.color,kind:c.kind==='in'?'income':'expense',sort:i}});
  for(const [cid,l] of Object.entries(m.budgets))if(+l>0)r.budgets[cid]={user_id:uid,category_id:cid,limit_minor:Math.round(+l)};
  for(const t of Object.values(S.months).flat())r.transactions[t.id]={user_id:uid,id:t.id,type:KMAP[t.k]||'debit',amount_minor:t.a,currency:m.currency||'INR',category_id:t.c||null,account_id:t.acc,to_account_id:t.to||null,merchant:t.m||'',tags:t.tags||[],occurred_on:t.d,created_ms:t.t||0,is_sample:!!t.s,...(capRating?{rating:t.w??null}:{})};
  for(const g of m.goals||[]){r.goals[g.id]={user_id:uid,id:g.id,name:g.name,target_minor:Math.round(g.target),target_date:g.date,saved_minor:Math.round(g.saved||0)};
    if(capExtra)r.goals[g.id].extra={created:g.created||null,start:g.start||0,log:g.log||[],off:g.off||{},adj:g.adj||{}}}
  return r}
function fromRows(R){const p=Object.values(R.profiles)[0]||{};
  const meta=fixMeta({currency:p.base_currency||'INR',name:p.name||'',budget:+p.budget_minor||0,lastAcc:p.last_account_id||'',onboarded:!!p.onboarded,...(p.extra&&p.extra.workDays?{workDays:+p.extra.workDays}:{}),
    accounts:Object.values(R.accounts).sort((a,b)=>a.sort-b.sort).map(a=>({id:a.id,name:a.name,type:a.type,opening:+a.opening_minor||0})),
    categories:Object.values(R.categories).sort((a,b)=>a.sort-b.sort).map(c=>({id:c.id,name:c.name,icon:c.icon||'other',color:c.color||'#8a8178',kind:c.kind==='income'?'in':'out'})),
    budgets:Object.fromEntries(Object.values(R.budgets).map(b=>[b.category_id,+b.limit_minor])),
    goals:Object.values(R.goals||{}).map(g=>{const o={id:g.id,name:g.name,target:+g.target_minor,date:g.target_date,saved:+g.saved_minor||0},x=g.extra||{};for(const k of GX)if(x[k]!=null)o[k]=x[k];return o})});
  const months={};for(const t of Object.values(R.transactions)){const x={id:t.id,k:KBACK[t.type]||'out',a:+t.amount_minor,c:t.category_id,acc:t.account_id,to:t.to_account_id,d:t.occurred_on,m:t.merchant||'',tags:t.tags||[],t:+t.created_ms||0};
    if(t.is_sample)x.s=1;if(t.rating!=null)x.w=+t.rating;const mk=x.d.slice(0,7);(months[mk]=months[mk]||[]).push(x)}
  return{meta,months}}
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function pending(){if(!uid||!base)return false;const cur=toRows();return TABLES.some(t=>{const a=cur[t],b=base[t]||{};for(const k in a)if(!same(a[k],b[k]))return true;for(const k in b)if(!(k in a))return true;return false})}
let flushT=null,flushing=false,again=false,gen=0,pullT=null;
function touch(){gen++;saveLocal();if(uid){clearTimeout(flushT);flushT=setTimeout(flush,700);if(cloud==='synced')cloud='saving'}setSync()}
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
  try{const g0=gen,R={};for(const t of TABLES){R[t]={};for(const r of await fetchAll(t))R[t][t==='budgets'?r.category_id:r.id]=r}
    // something was added or changed on this device while loading: keep it, and load again in a moment
    if(gen!==g0){clearTimeout(pullT);pullT=setTimeout(()=>pull(adopt),1500);return}
    if(!Object.keys(R.profiles).length){ // brand-new account: upload what is on this device
      if(!adopt&&!isGuest()&&base&&base.uid!==uid)S={meta:blankMeta(),months:{}};
      base={uid,profiles:{},accounts:{},categories:{},budgets:{},transactions:{},goals:{}};saveBase();saveLocal();await flush();if(booted)render();return}
    const local=S;S=fromRows(R);const srv=toRows();
    // plan details the server doesn't hold (older rows, or no extra column yet) stay from this device
    for(const g of S.meta.goals){const l=(local.meta.goals||[]).find(x=>x.id===g.id);if(l)for(const k of GX)if(g[k]==null&&l[k]!=null)g[k]=l[k]}
    if(S.meta.workDays==null&&local.meta.workDays)S.meta.workDays=local.meta.workDays;
    {const lw={};for(const t of Object.values(local.months).flat())if(t.w!=null)lw[t.id]=t.w;if(Object.keys(lw).length)for(const t of Object.values(S.months).flat())if(t.w==null&&lw[t.id]!=null)t.w=lw[t.id]}
    if(adopt){ // keep entries made before signing in
      for(const a of local.meta.accounts)if(!acc(a.id))S.meta.accounts.push(a);
      for(const c of local.meta.categories)if(!cat(c.id))S.meta.categories.push(c);
      const have=new Set(Object.keys(srv.transactions));
      for(const [mk,list] of Object.entries(local.months))for(const t of list)if(!have.has(t.id))(S.months[mk]=S.months[mk]||[]).push(t)}
    const changed=!base||base.uid!==uid||TABLES.some(t=>!same(srv[t],base[t]||{}))||adopt;
    base={uid,...srv};saveBase();saveLocal();
    if(pending())await flush();else cloud='synced';setSync();
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
  {const probe=async(t,c)=>{try{const{error}=await sb.from(t).select(c).limit(1);return !error}catch(e){return false}};
   [capExtra,capRating,capProf]=await Promise.all([probe('goals','extra'),probe('transactions','rating'),probe('profiles','extra')])}
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
function route(){const h=location.hash.slice(1);view=['home','timeline','budgets','goals','review','more'].includes(h)?h:'home';render();window.scrollTo(0,0)}
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
    else{const F=safe(forecast),pj=F&&F.ready?F.total:proj;msg=`<span class="okc">${money(allow-spentT,{round:1})} left</span> of today's ${money(allow,{round:1})} allowance. ${pj>bud?`You're on course to end the month <em>${money(pj-bud,{round:1})} over</em> budget.`:`You're on course to end the month ${money(bud-pj,{round:1})} under budget.`}`}
    heroL=`<div class="lab">Spent today</div><div class="big">${money(spentT)}</div><p class="msg">${msg}</p>`;
    const Z=safe(safeSpend);
    if(Z){const F=safe(forecast),pj=F&&F.ready?F.total:proj,ln=(l,v)=>`<div><span>${l}</span><b>${v}</b></div>`;
      heroL=`<div class="lab">Safe to spend today</div><div class="big">${money(Math.max(0,Z.safe),{round:1})}</div>
      <p class="msg">${Z.safe<0?`You're <em>${money(-Z.safe,{round:1})} over</em> today's ${money(Z.perDay,{round:1})}.`:Z.today?`You've spent ${money(Z.today,{round:1})} of today's ${money(Z.perDay,{round:1})}.`:`Nothing spent yet today.`} ${bud?(pj>bud?`On course to end the month <em>${money(pj-bud,{round:1})} over</em> budget.`:`On course to end the month <span class="okc">${money(bud-pj,{round:1})} under</span> budget.`):''}</p>
      <details class="how"><summary>How this is worked out</summary><div class="howb">${Z.basis==='budget'?ln('Your monthly budget',money(Z.cap,{round:1})):ln('Your average income',money(Z.I,{round:1}))+(Z.need?ln('Set aside for your goals','− '+money(Z.need,{round:1})):'')}${ln('Spent before today','− '+money(Z.before,{round:1}))}${Z.bills?ln(`Bills still to come (${esc(Z.unpaid.map(u=>u.n).join(', '))})`,'− '+money(Z.bills,{round:1})):''}${ln(`Spread over the ${Z.left} day${Z.left>1?'s':''} left`,money(Z.perDay,{round:1})+' a day')}${ln('Spent today','− '+money(Z.today,{round:1}))}</div></details>`}
  }else heroL=`<div class="lab">Spent in ${esc(mName(vm))}</div><div class="big">${money(spent,{round:1})}</div><p class="msg">About ${money(spent/dim,{round:1})} a day${bud?`, ${p>1?`<em>${money(spent-bud,{round:1})} over</em>`:`<span class="okc">${money(bud-spent,{round:1})} under</span>`} budget`:''}.</p>`;
  const r=62,C=2*Math.PI*r,pc=Math.min(p,1),col=p>=1?'#ff4d3a':p>=.8?'#f0a92a':'var(--ringc)';
  const ang=(dayN/dim)*2*Math.PI-Math.PI/2,x1=80+(r-12)*Math.cos(ang),y1=80+(r-12)*Math.sin(ang),x2=80+(r+12)*Math.cos(ang),y2=80+(r+12)*Math.sin(ang);
  const ring=`<div class="ringw"><svg class="ring" viewBox="0 0 160 160" role="img" aria-label="${bud?Math.round(p*100)+'% of monthly budget used':'No budget set'}"><circle class="rt" cx="80" cy="80" r="${r}"/>${bud?`<circle class="rb" cx="80" cy="80" r="${r}" stroke="${col}" stroke-dasharray="${(C*pc).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 80 80)"/>`:''}<line class="rd" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/></svg><div class="ringc">${bud?`<b>${Math.round(p*100)}%</b><span>of ${money(bud,{round:1})}</span>`:`<b>${cmp(spent)}</b><span>this month</span>`}</div><div class="legendr">White tick: day ${dayN} of ${dim}</div></div>`;
  const trio=`<div class="trio"><div>Spent this month<b>${money(spent,{round:1})}</b></div><div>Received<b>${money(recv,{round:1})}</b></div><div>${bud?'Budget left':'Net this month'}<b>${bud?money(bud-spent,{round:1}):money(recv-spent,{round:1})}</b></div></div>`;
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
    ${safe(homeWorth)}
    ${safe(homeReview)}
    ${safe(homeGoals)}
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
  <select id="fk" aria-label="Type">${opt([['out','Spent'],['in','Received'],...(allTx().some(t=>t.k==='xfer')?[['xfer','Transfers']]:[])],tl.k,'Any type')}</select>
  <select id="fc" aria-label="Category">${opt(S.meta.categories.map(c=>[c.id,c.name]),tl.c,'Category')}</select>
  <select id="fa" aria-label="Account">${opt(accs().map(a=>[a.id,a.name]),tl.acc,'Account')}</select></div>
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

/* ---------- goals: analysis & planning ---------- */
// Everything here is plain arithmetic on the user's own entries: no AI, works offline.
const FIXED_CATS=new Set(['rent','bills','health']);
const RX_DELIVERY=/swiggy|zomato|eatsure|domino|pizza|kfc|mcdonald|burger king|box8|faasos|behrouz|magicpin/i;
const RX_CAB=/uber|\bola\b|rapido|blu ?smart|namma yatri|meru|indrive/i;
const SAFETY=0.9; // keep 10% of free cash as a cushion for irregular costs
const AVG_MONTH=30.44;
const ceilTo=(v,s)=>Math.ceil(v/s)*s, floorTo=(v,s)=>Math.floor(v/s)*s;
const listNames=a=>a.length<2?(a[0]||''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const goals=()=>{const l=S.meta.goals||(S.meta.goals=[]);for(const g of l){if(!g.created){g.created=todayISO();g.start=g.saved||0}if(g.start==null)g.start=0;if(!Array.isArray(g.log))g.log=[];if(!g.off)g.off={};if(!g.adj)g.adj={}}return l};
const goalById=id=>goals().find(g=>g.id===id);
const monthsLabel=b=>{const s=b.slice().sort(),f=m=>pd(m+'-01').toLocaleDateString('en-IN',{month:'short'});return s.length>1?`${f(s[0])}–${f(s[s.length-1])} ${s[s.length-1].slice(0,4)}`:mName(s[0])};

function analyze(){
  const cm=curMonth(),dayN=new Date().getDate(),all=allTx();
  const first=all.reduce((m,t)=>!m||t.d<m?t.d:m,'');
  if(!first)return{empty:true};
  const cov=m=>{const start=first.slice(0,7)===m?+first.slice(8):1,end=m===cm?dayN:daysIn(m);return Math.max(1,end-start+1)};
  let basis=[1,2,3].map(i=>shiftM(cm,-i)).filter(m=>m>=first.slice(0,7)&&monthTx(m).some(t=>t.k!=='xfer'));
  if(basis.length>1)basis=basis.filter(m=>cov(m)>=20).length?basis.filter(m=>cov(m)>=20):basis;
  const usingCurrent=!basis.length;if(usingCurrent)basis=[cm];
  const n=basis.length,days=basis.reduce((s,m)=>s+cov(m),0);
  let inc=0,refund=0;const catAmt={},merch={};
  for(const m of basis){const f=daysIn(m)/cov(m); // stretch a short month to a full one, for flexible spending only
    for(const t of monthTx(m)){
      if(t.k==='in'){if(t.c==='refund')refund+=t.a;else inc+=t.a;continue}
      if(t.k!=='out')continue;
      const k=FIXED_CATS.has(t.c)?1:f;catAmt[t.c]=(catAmt[t.c]||0)+t.a*k;
      const key=(t.m||'').trim().toLowerCase()||'—',M=(merch[t.c]=merch[t.c]||{});
      const e=(M[key]=M[key]||{name:(t.m||'').trim(),cnt:0,amt:0,raw:[],byMonth:{}});
      e.cnt+=k;e.amt+=t.a*k;e.raw.push(t.a);(e.byMonth[m]=e.byMonth[m]||[]).push(t.a)}}
  const r100=v=>Math.round(v/100)*100,I=r100(inc/n),cats={};let E=-refund/n;
  for(const [c,v] of Object.entries(catAmt)){cats[c]=v/n;E+=v/n}
  E=r100(E);const S0=I-E,A=Math.max(0,floorTo(S0*SAFETY,100));
  // merchant view per category, per average month
  const ms=c=>Object.values(merch[c]||{}).map(e=>({name:e.name,perMonth:e.cnt/n,monthly:e.amt/n,ticket:e.raw.reduce((a,b)=>a+b,0)/e.raw.length,byMonth:e.byMonth})).sort((a,b)=>b.monthly-a.monthly);
  // subscriptions: same payee, once a month, near-identical amount, in 2+ months
  const subs=[];
  if(n>=2)for(const c of Object.keys(merch)){if(FIXED_CATS.has(c))continue;for(const e of ms(c)){const mm=Object.values(e.byMonth);
    if(e.name&&mm.length>=2&&mm.every(x=>x.length===1)){const v=mm.map(x=>x[0]),avg=v.reduce((a,b)=>a+b,0)/v.length;if(v.every(x=>Math.abs(x-avg)<=avg*.05))subs.push({c,name:e.name,amt:avg})}}}
  const subKeys=new Set(subs.map(s=>s.c+'|'+s.name.toLowerCase()));
  const items=[];const add=o=>{if(o.cap>=10000)items.push({...o,left:o.cap,key:`${o.c}|${o.kind}|${(o.name||'').toLowerCase()}`})};
  const cn=id=>cat(id)?.name||'Other';
  for(const c of Object.keys(cats)){if(FIXED_CATS.has(c)||!cat(c))continue;
    const list=ms(c).filter(e=>!subKeys.has(c+'|'+e.name.toLowerCase()));
    const tot=list.reduce((s,e)=>s+e.monthly,0);if(tot<=0)continue;
    if(c==='food'){
      const d=list.filter(e=>RX_DELIVERY.test(e.name)),D=d.reduce((s,e)=>s+e.monthly,0),dn=d.reduce((s,e)=>s+e.perMonth,0);
      if(D>0)add({ease:2,c,kind:'count',cap:D*.5,full:D,ticket:D/dn,base:dn,unit:'order',
        verb:k=>`Order food delivery ${k} fewer time${k>1?'s':''} a month`,
        why:`You order about ${Math.round(dn)} times a month on ${listNames(d.slice(0,2).map(e=>e.name))}, averaging ${money(D/dn,{round:1})}.`});
      const O=tot-D;if(O>0)add({ease:7,c,kind:'amt',cap:O*.1,full:O,verb:x=>`Trim groceries and eating out by ${money(x,{round:1})}`,why:`That's about ${Math.round(.1*100)}% or less of the ${money(O,{round:1})} you spend there each month.`});
    }else if(c==='transport'){
      const d=list.filter(e=>RX_CAB.test(e.name)),C=d.reduce((s,e)=>s+e.monthly,0),dn=d.reduce((s,e)=>s+e.perMonth,0);
      if(C>0)add({ease:4,c,kind:'count',cap:C*.4,full:C,ticket:C/dn,base:dn,unit:'ride',
        verb:k=>`Swap ${k} cab ride${k>1?'s':''} a month for metro, bus or auto`,
        why:`You take about ${Math.round(dn)} rides a month on ${listNames(d.slice(0,2).map(e=>e.name))}, averaging ${money(C/dn,{round:1})}.`});
    }else{
      const r=c==='fun'?.4:c==='shopping'?.35:.25,top=list.slice(0,2).map(e=>e.name).filter(Boolean),cnt=list.reduce((s,e)=>s+e.perMonth,0);
      add({ease:c==='fun'?1:c==='shopping'?3:6,c,kind:'cap',cap:tot*r,full:tot,avg:tot,
        verb:x=>list.length<ms(c).length?`Spend ${money(x,{round:1})} less a month on ${cn(c).toLowerCase()}, not counting subscriptions`:`Keep ${cn(c).toLowerCase()} under ${money(floorTo(tot-x,10000),{round:1})} a month`,
        why:`You average ${money(tot,{round:1})} a month${Math.round(cnt)>1?` across about ${Math.round(cnt)} payments`:''}${top.length?`, mostly ${listNames(top)}`:''}.`});
    }}
  for(const s of subs)add({ease:5,c:s.c,kind:'all',cap:s.amt,full:s.amt,name:s.name,verb:()=>`Pause ${s.name} until you reach this goal`,why:`It charges ${money(s.amt)} every month.`});
  {const td=todayISO(),rg={};for(const t of all)if(t.k==='out'&&t.d>=addD(td,-89)&&(t.w===1||t.w===-1)){const o=(rg[t.c]=rg[t.c]||{r:0,n:0,c:0});o.r+=t.a;if(t.w===-1){o.n+=t.a;o.c++}}
   for(const it of items){const o=rg[it.c];if(o&&o.c>=2&&o.n/o.r>=.3){it.ease-=3;it.why+=` In the last 90 days you rated ${money(o.n,{round:1})} of this not worth it.`}}}
  items.sort((a,b)=>a.ease-b.ease||b.cap-a.cap);
  const lowConf=days<28;
  return{I,E,S:S0,A,cats,items,basis,n,days,usingCurrent,lowConf,label:usingCurrent?`${days} day${days>1?'s':''} of entries so far`:`${monthsLabel(basis)} · ${days} days of entries`};
}

// take savings from the cut items (shared across goals), easiest first
function takeCuts(items,gap){const out=[];let left=gap;
  for(const it of items){if(left<=0)break;if(it.left<5000)continue;let take;
    if(it.kind==='all'){take=it.cap}
    else if(it.kind==='count'){const k=Math.min(Math.floor(it.left/it.ticket+1e-6),Math.max(1,Math.ceil(left/it.ticket)));if(k<1)continue;take=k*it.ticket;out.push({...it,take,text:it.verb(k)});it.left-=take;left-=take;continue}
    else take=Math.min(it.left,ceilTo(left,5000));
    take=Math.min(take,it.left);out.push({...it,take,text:it.verb(take)});it.left-=take;left-=take}
  return{cuts:out,closed:left<=0,short:Math.max(0,left)}}
// what is still available from one spending item, up to all of it when the user chooses the amount
const itemAvail=it=>Math.max(0,it.full-(it.cap-it.left));
const cutText=(it,take)=>it.kind==='count'?it.verb(Math.max(1,Math.round(take/it.ticket))):it.verb(take);
// build one goal's list of changes, honouring what the user switched off or resized
function chooseCuts(g,items,gap){const off=g.off||{},adj=g.adj||{},rows=[],fixed={};let left=gap;
  for(const it of items)if(!off[it.key]&&adj[it.key]!=null){const t=Math.min(Math.max(+adj[it.key]||0,0),itemAvail(it));if(t>0){fixed[it.key]={t,max:itemAvail(it)};left-=t}}
  for(const it of items){
    if(fixed[it.key]){const{t,max}=fixed[it.key];rows.push({...it,on:true,take:t,max,text:cutText(it,t)});it.left=Math.max(0,it.left-t);continue}
    if(it.left<5000)continue;
    const want=Math.max(left,5000),max=itemAvail(it);let t;
    if(it.kind==='all')t=it.cap;
    else if(it.kind==='count'){const k=Math.min(Math.floor(it.left/it.ticket+1e-6),Math.max(1,Math.ceil(want/it.ticket)));if(k<1)continue;t=k*it.ticket}
    else t=Math.min(it.left,ceilTo(want,5000));
    if(off[it.key]){if(left>0)rows.push({...it,on:false,take:t,max,text:cutText(it,t)});continue}
    if(left<=0)continue;
    rows.push({...it,on:true,take:t,max,text:cutText(it,t)});it.left-=t;left-=t}
  return{rows,short:Math.max(0,left)}}

function planGoals(){
  let a=analyze();if(a.empty)a={empty:true,I:0,E:0,S:0,A:0,cats:{},items:[]};
  const items=a.items.map(x=>({...x}));let free=a.A;const plans={};const now=new Date();now.setHours(0,0,0,0);
  const blocked=[];const sorted=goals().slice().sort((x,y)=>x.date<y.date?-1:x.date>y.date?1:0);
  for(const g of sorted){const rem=Math.max(0,g.target-(g.saved||0)),p={g,rem};plans[g.id]=p;
    if(rem<=0){p.status='done';continue}
    const dd=(pd(g.date)-now)/864e5;if(dd<=0){p.status='overdue';continue}
    p.months=dd/AVG_MONTH;p.R=ceilTo(rem/Math.max(p.months,.5),10000);
    if(a.I<=0){p.status='noincome';continue}
    p.avail=free;p.after=blocked.slice();
    const capBefore=items.reduce((s,i)=>s+Math.max(0,i.left),0);p.capMax=floorTo(free+capBefore,10000);
    if(free>=p.R){p.status='ok';p.spare=free-p.R;free-=p.R;continue}
    const gap=p.R-free;p.gap=gap;
    if(!takeCuts(items.map(i=>({...i})),gap).closed){ // can't be met as set: don't let it hold money or cuts that later goals could use
      blocked.push(g.name);p.after=[];p.status='hard';p.max=p.capMax;
      if(p.max>0){const mo=rem/p.max,d=new Date(now);d.setDate(d.getDate()+Math.ceil(mo*AVG_MONTH));d.setDate(1);d.setMonth(d.getMonth()+1);d.setDate(0);p.newDate=iso(d);
        p.afford=floorTo((g.saved||0)+p.max*p.months,100000)}
      continue}
    const ch=chooseCuts(g,items,gap);p.rows=ch.rows;p.cuts=ch.rows.filter(r=>r.on);p.saving=p.cuts.reduce((s,c)=>s+c.take,0);p.short=ch.short;
    p.custom=Object.keys(g.off||{}).length+Object.keys(g.adj||{}).length>0;p.status='stretch';free=0}
  return{a,plans,order:sorted.map(g=>g.id)}}
// is the saving itself on schedule? A straight line from the day the goal was made to its date.
function schedule(g){const td=todayISO(),tot=dayGap(g.date,g.created),el=dayGap(td,g.created),sv=g.saved||0;if(tot<=0||sv>=g.target)return null;
  const exp=g.start+(g.target-g.start)*Math.min(1,Math.max(0,el/tot)),o={exp,el,diff:sv-exp,ready:el>=7};
  if(el>=30&&sv>g.start){const rate=(sv-g.start)/el;o.finish=addD(td,Math.ceil((g.target-sv)/rate))}
  return o}
function addSaving(g,v){const e={d:todayISO(),a:v};g.saved=(g.saved||0)+v;g.log.push(e);touch();render();
  return()=>{const i=g.log.indexOf(e);if(i>=0)g.log.splice(i,1);g.saved=Math.max(0,g.saved-v);touch();render()}}

/* ---------- goals view ---------- */
const GOAL_IDEAS=[['New phone',8000000,6],['Goa trip',3000000,4],['Emergency fund',10000000,12],['Laptop',6000000,8]];
function gRing(p,sz=64){const r=sz/2-6,C=2*Math.PI*r,v=Math.max(0,Math.min(1,p));return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" aria-hidden="true"><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="var(--soft)" stroke-width="7"/>${v>0?`<circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="var(--brick)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C*v).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${sz/2} ${sz/2})"/>`:''}<text x="50%" y="54%" text-anchor="middle" font-size="${sz/4.4}" font-weight="800" fill="currentColor">${Math.round(v*100)}%</text></svg>`}
const CHIP={ok:['good','Fits your budget'],stretch:['warn','Needs changes'],hard:['bad','Not realistic yet'],done:['good','Reached'],overdue:['bad','Date passed'],noincome:['muted','Needs your income']};
const monthYear=d=>pd(d).toLocaleDateString('en-IN',{month:'short',year:'numeric'});
const fullD=d=>pd(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
function planPace(p){ // how this month is going against the suggested caps
  const cm=curMonth(),f=new Date().getDate()/daysIn(cm),by={};
  for(const c of p.cuts||[])by[c.c]=(by[c.c]||0)+c.take;
  let plan=0,act=0;const a=lastPlan.a;
  for(const [c,cut] of Object.entries(by)){plan+=(a.cats[c]-cut)*f;act+=sum(monthTx(cm).filter(t=>t.k==='out'&&t.c===c))}
  if(!plan||f<.1)return'';const d=act-plan;
  return `<p class="note gpace">${d<=0?`This month so far you're <b style="color:var(--good)">${money(-d,{round:1})} under</b> the plan's pace in these categories.`:`This month so far you're <b style="color:var(--brick)">${money(d,{round:1})} over</b> the plan's pace in these categories.`}</p>`}
// collapsible sections that remember whether they were open
const gOpen=new Set();
const det=(id,name,title,inner,def)=>{const k=id+':'+name,open=gOpen.has(k)||(def&&!gOpen.has(k+':x'));return `<details class="gd" data-gd="${esc(k)}"${open?' open':''}><summary>${title}</summary><div class="gdb">${inner}</div></details>`};
function cutRow(g,r){const id=esc(g.id),k=esc(r.key),step=r.kind!=='all';
  return `<li class="${r.on?'':'off'}"><label class="sw" title="${r.on?'Turn off':'Turn on'}"><input type="checkbox" data-cut="${k}" data-id="${id}"${r.on?' checked':''} aria-label="${esc(r.text)}"><i></i></label>
    <div class="ct"><b>${esc(r.text)}</b><small>${esc(r.why)}</small></div>
    <div class="stp">${r.on&&step?`<button class="ib" data-act="cutm" data-id="${id}" data-key="${k}" aria-label="Smaller change">−</button>`:''}<span class="sv">${r.on?'+'+money(r.take,{round:1}):'off'}</span>${r.on&&step?`<button class="ib" data-act="cutp" data-id="${id}" data-key="${k}" aria-label="Bigger change">+</button>`:''}</div></li>`}
function whatIfBox(p){const g=p.g,now=new Date(),e=pd(g.date),cur=Math.max(1,(e.getFullYear()-now.getFullYear())*12+e.getMonth()-now.getMonth());
  let fact='';if(p.R){const days=Math.round((p.rem/p.R-p.rem/(p.R+100000))*AVG_MONTH);if(days>=1)fact=`<p class="note">Each extra ${money(100000,{round:1})} a month gets you there about ${days} day${days>1?'s':''} sooner.</p>`}
  return `<div class="wi" data-id="${esc(g.id)}" data-rem="${p.rem}" data-avail="${p.avail??''}" data-max="${p.capMax??''}" data-date="${esc(g.date)}">
    <div class="wih"><span>Finish by</span><b class="wim"></b></div>
    <input type="range" min="1" max="${Math.max(36,cur+12)}" value="${cur}" data-wi aria-label="Months until the goal">
    <p class="wir"></p><div class="btns"><button class="btn" data-act="gdate" data-id="${esc(g.id)}" data-v="${esc(g.date)}">Use this date</button></div>${fact}</div>`}
function whatIf(box){const m=+box.querySelector('[data-wi]').value,now=new Date(),d=iso(new Date(now.getFullYear(),now.getMonth()+m+1,0)),rem=+box.dataset.rem;
  const months=Math.max(.5,dayGap(d,todayISO())/AVG_MONTH),R=ceilTo(rem/months,10000),av=box.dataset.avail===''?null:+box.dataset.avail,mx=+box.dataset.max||0;
  box.querySelector('.wim').textContent=monthYear(d);
  let v='',cls='';if(av!=null){if(R<=av){v='Your free money covers it, no changes needed.';cls='good'}else if(R<=mx){v=`Needs ${money(R-av,{round:1})} a month of changes.`;cls='warn'}else{v=`${money(R-mx,{round:1})} a month more than you can realistically free up.`;cls='bad'}}
  box.querySelector('.wir').innerHTML=`<b>${money(R,{round:1})} a month</b>${v?` <span class="${cls}">${v}</span>`:''}`;
  const b=box.querySelector('[data-act=gdate]');b.dataset.v=d;b.disabled=d===box.dataset.date}
function histBox(g){const rows=g.log.map((e,i)=>({e,i})).reverse().map(({e,i})=>`<li><span>${esc(fullD(e.d))}</span><b class="${e.a<0?'neg':''}">${e.a<0?'−':'+'}${money(Math.abs(e.a),{round:1})}</b><button class="ib" data-act="glogdel" data-id="${esc(g.id)}" data-i="${i}" aria-label="Remove this entry">${ico('x',16)}</button></li>`).join('');
  return `<ul class="hist">${rows}<li class="st"><span>${esc(fullD(g.created))}</span><b>${g.start?money(g.start,{round:1}):money(0)}</b><small>Starting amount</small></li></ul>${g.log.length?'':`<p class="note">Nothing added yet. When you set money aside, add it below.</p>`}`}
function goalCard(p){
  const g=p.g,[cc,cl]=CHIP[p.status],pct=(g.saved||0)/g.target,A=lastPlan.a.A,later=p.avail<A-1?' after earlier goals':'';let body='',plan='';
  const need=p.R?`Save <b>${money(p.R,{round:1})} a month</b> for ${p.months<1.5?Math.max(1,Math.round(p.months*4.35))+' weeks':Math.round(p.months)+' months'}.`:'';
  if(p.status==='ok')body=`<p class="gl">${need} You have about ${money(p.avail,{round:1})} a month free${later}, so it's covered with <b>${money(p.spare,{round:1})}</b> to spare.</p>`;
  else if(p.status==='stretch'){
    body=`<p class="gl">${need} ${p.avail>0?`You have about ${money(p.avail,{round:1})} free${later}, so <b>${money(p.gap,{round:1})}</b> has to come from changes.`:`Nothing is left over at the end of your month right now, so all of it has to come from changes.`}</p>`;
    const cov=Math.min(1,p.saving/p.gap);
    plan=`<ol class="cuts">${p.rows.map(r=>cutRow(g,r)).join('')}</ol>
      <div class="cmeter"><div class="bt"><b>${money(p.saving,{round:1})} of ${money(p.gap,{round:1})} found</b><span>${p.short>0?`${money(p.short,{round:1})} still to find`:'Covered'}</span></div><div class="track"><div class="fill ${p.short>0?'warn':'ok'}" style="width:${(cov*100).toFixed(1)}%"></div></div></div>
      ${p.short>0?`<p class="note">Turn a change back on, make one bigger with +, or move the date under What if.</p>`:''}
      <div class="btns">${p.cuts.length?`<button class="btn dark" data-act="gapply" data-id="${esc(g.id)}">Set these as my budgets</button>`:''}${p.custom?`<button class="btn" data-act="greset" data-id="${esc(g.id)}">Back to suggested</button>`:''}</div>${planPace(p)}`}
  else if(p.status==='hard')body=p.max<=0?`<p class="gl">${need} Your free money is already planned for earlier goals, so nothing is left for this one yet. Move its date later, or reach an earlier goal first.</p>`:`<p class="gl">${need} Even with realistic changes you can free up about ${money(p.max,{round:1})} a month${later}, so you'd be ${money(p.R-p.max,{round:1})} short each month.</p>
    <div class="btns">${p.newDate?`<button class="btn" data-act="gdate" data-id="${esc(g.id)}" data-v="${p.newDate}">Move the date to ${monthYear(p.newDate)}</button>`:''}${p.afford>((g.saved||0))?`<button class="btn" data-act="gtarget" data-id="${esc(g.id)}" data-v="${p.afford}">Aim for ${money(p.afford,{round:1})} instead</button>`:''}</div>`;
  else if(p.status==='done')body=`<p class="gl">You've saved the full amount. Enjoy it, or raise the target to keep going.</p>`;
  else if(p.status==='overdue')body=`<p class="gl">The date has passed with ${money(p.rem,{round:1})} still to go. Pick a new date to get a fresh plan.</p>`;
  else body=`<p class="gl">${need} To check whether that's realistic, Spendo needs your income. Log your salary as <b>Received</b>.</p><div class="btns"><button class="btn dark" data-act="addIncome">Add income</button></div>`;
  if(p.after&&p.after.length&&p.status!=='hard')body+=`<p class="note">This assumes you rethink ${esc(listNames(p.after))} first, since that goal isn't reachable as set.</p>`;
  const sc=schedule(g);let sch='';
  if(sc&&sc.ready){const ah=sc.diff>=0;sch=`<div class="sch"><div class="track"><div class="fill" style="width:${(pct*100).toFixed(1)}%"></div><u style="left:${(sc.exp/g.target*100).toFixed(1)}%" title="Where the schedule expects you today"></u></div><small><b class="${ah?'good':'bad'}">${money(Math.abs(sc.diff),{round:1})} ${ah?'ahead of':'behind'} schedule</b>${sc.finish?` · at your real pace you finish ${esc(monthYear(sc.finish))}`:''}</small></div>`}
  const live=p.status!=='done'&&p.status!=='overdue';
  return `<section class="card s12 goal"><div class="gh">${gRing(pct)}<div class="gt"><h2>${esc(g.name)}</h2><small>${money(g.saved||0,{round:1})} of ${money(g.target,{round:1})} · by ${esc(monthYear(g.date))}${lastPlan.rate&&workTime(g.target,lastPlan.rate)?` · ${workTime(g.target,lastPlan.rate)} of pay`:''}</small></div><span class="gchip ${cc}">${cl}</span></div>${sch}${body}
  ${plan?det(g.id,'plan','Your plan: choose the changes',plan,true):''}${live?det(g.id,'whatif','What if I change the date?',whatIfBox(p),false):''}${det(g.id,'hist',`Savings history${g.log.length?` (${g.log.length})`:''}`,histBox(g),false)}
  <div class="gf"><div class="money"><span>${esc(sym())}</span><input class="inp" data-gsave="${esc(g.id)}" inputmode="decimal" placeholder="Amount" aria-label="Add savings to ${esc(g.name)}"></div><button class="btn" data-act="gadd" data-id="${esc(g.id)}">Add savings</button><button class="btn" data-act="gedit" data-id="${esc(g.id)}">Edit</button><button class="ib" data-act="gdel" data-id="${esc(g.id)}" aria-label="Delete goal">${ico('trash',18)}</button></div></section>`}
const DB_SQL=["alter table public.goals add column if not exists extra jsonb not null default '{}'::jsonb;","alter table public.transactions add column if not exists rating smallint;","alter table public.profiles add column if not exists extra jsonb not null default '{}'::jsonb;"];
function dbBanner(){if(!uid||(capExtra&&capRating&&capProf))return'';const q=DB_SQL.filter((_,i)=>![capExtra,capRating,capProf][i]).join('\n');
  return `<section class="card s12 gwarn"><b>One step to sync the newer features between your devices</b><p class="note" style="margin:6px 0 10px">Until then, goal history, worth-it ratings and your working days are saved on this device only. In Supabase, open SQL Editor, run this, then reload:</p><code class="sql">${esc(q).replace(/\n/g,'<br>')}</code><div class="btns" style="margin-top:10px"><button class="btn" data-act="copysql" data-v="${esc(q)}">Copy</button></div></section>`}
let lastPlan={a:{},plans:{}};
function renderGoals(){
  const P=planGoals();lastPlan=P;const a=P.a,gs=goals();P.rate=a.empty||a.I<=0?0:a.I/workDays();
  let band;
  if(a.empty)band=`<section class="card s12"><div class="empty"><b>Add a few entries first</b>Spendo plans goals from what you really earn and spend. A week of entries gives a first estimate; a full month makes it precise.</div></section>`;
  else{const warn=a.I<=0?`<div class="gwarn">No income logged in this period, so Spendo can't tell what's left over. <button class="lnk" data-act="addIncome">Add your salary</button></div>`
      :a.S<0?`<div class="gwarn bad">You spend about ${money(-a.S,{round:1})} more than you earn each month. Goals can only come from spending changes until that's fixed.</div>`
      :a.lowConf?`<div class="gwarn">Based on only ${a.days} days, so treat this as a first estimate. It gets precise after a full month.</div>`:'';
    band=`<section class="card s12 gband"><div class="ch"><h3>Your average month</h3><small>${esc(a.label)}</small></div>
    <div class="sumrow g4"><div>Income<b>${money(a.I,{round:1})}</b></div><div>Spending<b>${money(a.E,{round:1})}</b></div><div>Left over<b class="${a.S<0?'neg':''}">${money(a.S,{round:1})}</b></div><div>Safe to save<b>${money(a.A,{round:1})}</b></div></div>
    <p class="note">"Safe to save" keeps 10% of what's left over as a cushion for surprise costs. Refunds count against spending.</p>${warn}</section>`}
  // last month's leftover
  let sur='';const lm=shiftM(curMonth(),-1),lt=monthTx(lm);
  if(gs.length&&lt.length){const left=sum(lt.filter(t=>t.k==='in'&&t.c!=='refund'))-sum(lt.filter(t=>t.k==='out'))+sum(lt.filter(t=>t.k==='in'&&t.c==='refund'));
    let seen=false;try{seen=localStorage.getItem('spendo-sur-'+lm)==='1'}catch(e){}
    const tgt=P.order.map(id=>P.plans[id]).find(p=>p.status!=='done');
    if(left>=50000&&!seen&&tgt){const amt=Math.min(floorTo(left*SAFETY,10000),tgt.rem);sur=`<section class="card s12 gsur"><div><b>You had ${money(left,{round:1})} left over in ${esc(mName(lm))}.</b><small>${amt>=tgt.rem?`That's enough to finish ${esc(tgt.g.name)} (${money(amt,{round:1})} to go).`:`Moving ${money(amt,{round:1})} into ${esc(tgt.g.name)} keeps you ahead.`} Only do this once the money is actually set aside.</small></div><div class="btns"><button class="btn dark" data-act="gsur" data-id="${esc(tgt.g.id)}" data-v="${amt}" data-m="${lm}">Add ${money(amt,{round:1})}</button><button class="btn" data-act="gsurno" data-m="${lm}">Not now</button></div></section>`}}
  const cards=P.order?P.order.map(id=>goalCard(P.plans[id])).join(''):'';
  const cap=gs.length?dbBanner():'';
  $('#view').innerHTML=`<div class="head"><div><h1>Goals</h1><p class="sub">What you're saving for, what it takes each month, and where that can come from.</p></div><button class="btn pri" data-act="gnew">+ New goal</button></div>
  <div class="grid">${band}${cap}${sur}${cards||(a.empty?'':`<section class="card s12"><div class="empty"><b>What are you saving for?</b>Pick one to start, or make your own.<div class="btns" style="justify-content:center;margin-top:14px">${GOAL_IDEAS.map(([n,t,mo])=>`<button class="btn" data-act="gidea" data-n="${esc(n)}" data-t="${t}" data-mo="${mo}">${esc(n)} · ${money(t,{round:1})}</button>`).join('')}</div></div></section>`)}
  ${gs.length>1?`<p class="note s12">Goals are funded in date order: the earliest goal gets first claim on your free money.</p>`:''}</div>`}
function homeGoals(){const gs=goals();if(!gs.length)return `<section class="card s12 ghome"><div><b>Saving for something?</b><small>Set a goal and Spendo plans how to get there from your real spending.</small></div><a class="btn" href="#goals">Set a goal</a></section>`;
  const P=planGoals();return `<section class="card s12"><div class="ch"><h3>Goals</h3><a href="#goals">Open plan</a></div><div class="gmini">${P.order.slice(0,3).map(id=>{const p=P.plans[id],[cc,cl]=CHIP[p.status];return `<a href="#goals" class="gm">${gRing((p.g.saved||0)/p.g.target,52)}<span><b>${esc(p.g.name)}</b><small>${(()=>{const sc=schedule(p.g);return sc&&sc.ready?`${money(Math.abs(sc.diff),{round:1})} ${sc.diff>=0?'ahead':'behind'} · `:p.R?money(p.R,{round:1})+' a month · ':''})()}by ${esc(monthYear(p.g.date))}</small><span class="gchip ${cc}">${cl}</span></span></a>`}).join('')}</div></section>`}

/* ---------- goal editor ---------- */
let ge=null;
function openGoal(g,preset){const d=new Date();d.setMonth(d.getMonth()+(preset?.mo||6));d.setDate(1);d.setMonth(d.getMonth()+1);d.setDate(0);
  ge=g?{...g}:{id:null,name:preset?.n||'',target:preset?.t||0,date:iso(d),saved:0};
  const minD=new Date();minD.setDate(minD.getDate()+7);const s=esc(sym());
  $('#gsheet').innerHTML=`<div class="grab"></div><h2>${g?'Edit goal':'New goal'}</h2>
  <div class="wform"><label class="f">What are you saving for?<input class="inp" id="gn" value="${esc(ge.name)}" placeholder="e.g. iPhone 16, Goa trip" maxlength="40"></label>
  <div class="two"><label class="f">Total cost<div class="money"><span>${s}</span><input class="inp" id="gtg" inputmode="decimal" value="${ge.target?ge.target/100:''}" placeholder="80000"></div></label>
  <label class="f">By when?<input class="inp" id="gd" type="date" min="${iso(minD)}" value="${esc(ge.date)}"></label></div>
  <label class="f">Already saved for it<div class="money"><span>${s}</span><input class="inp" id="gsv" inputmode="decimal" value="${ge.saved?ge.saved/100:''}" placeholder="0"></div></label></div>
  <div class="sact"><button class="btn" data-act="gclose">Cancel</button><button class="btn pri" data-act="gsave">${g?'Save':'Create plan'}</button></div>`;
  $('#gov').classList.add('show');setTimeout(()=>{const i=$('#gn');if(i&&!ge.name)i.focus()},50)}
function saveGoal(){const num=v=>{const n=parseFloat(String(v).replace(/[^\d.]/g,''));return n>0?Math.round(n*100):0};
  const name=$('#gn').value.trim().slice(0,40),target=num($('#gtg').value),date=$('#gd').value,saved=num($('#gsv').value);
  if(!name){snack('Give the goal a name');return}if(!target){snack('Enter the total cost');return}if(!date||date<=todayISO()){snack('Pick a date in the future');return}
  if(ge.id){const g=goalById(ge.id),dl=saved-(g.saved||0);if(dl)g.log.push({d:todayISO(),a:dl});Object.assign(g,{name,target,date,saved})}else goals().push({id:newId(),name,target,date,saved,created:todayISO(),start:saved,log:[],off:{},adj:{}});
  $('#gov').classList.remove('show');ge=null;touch();if(view!=='goals')location.hash='goals';else render();snack('Plan ready')}
function applyGoal(id){const p=lastPlan.plans[id];if(!p||!p.cuts)return;const by={};for(const c of p.cuts)by[c.c]=(by[c.c]||0)+c.take;
  const prev={...S.meta.budgets},prevAll=S.meta.budget,names=[];
  for(const [c,cut] of Object.entries(by)){const v=floorTo(lastPlan.a.cats[c]-cut,10000);if(v>0){S.meta.budgets[c]=v;names.push(`${cat(c)?.name} ${money(v,{round:1})}`)}}
  touch();render();snack('Budgets set: '+names.join(', '),'',()=>{S.meta.budgets=prev;S.meta.budget=prevAll;touch();render()})}

/* ---------- weekly review ---------- */
// Compares "everyday spending" (everything except rent, bills, health and monthly subscriptions) week by week.
// In-progress weeks are compared with the same weekdays of earlier weeks, so the pace is fair.
const addD=(s,n)=>{const d=pd(s);d.setDate(d.getDate()+n);return iso(d)};
const dayGap=(a,b)=>Math.round((pd(a)-pd(b))/864e5);
const monOf=s=>addD(s,-((pd(s).getDay()+6)%7));
const DOW=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const isDel=t=>t.c==='food'&&RX_DELIVERY.test(t.m||''),isCab=t=>t.c==='transport'&&RX_CAB.test(t.m||'');
const weekLabel=ws=>{const e=addD(ws,6);return ws.slice(0,7)===e.slice(0,7)?`${+ws.slice(8)}–${shortD(e)}`:`${shortD(ws)} – ${shortD(e)}`};
const firstDate=()=>allTx().reduce((m,t)=>!m||t.d<m?t.d:m,'');
let rvWeek=null,rvSubs=null;
// payees charged once a month for a near-identical amount in 2+ months: treated like bills
function findSubs(){const by={};for(const t of allTx()){if(t.k!=='out'||!t.m||FIXED_CATS.has(t.c))continue;const k=t.m.toLowerCase();((by[k]=by[k]||{})[t.d.slice(0,7)]=by[k][t.d.slice(0,7)]||[]).push(t.a)}
  const out={};for(const [k,m] of Object.entries(by)){const v=Object.values(m);if(v.length>=2&&v.every(x=>x.length===1)){const a=v.map(x=>x[0]),avg=a.reduce((x,y)=>x+y,0)/a.length;if(a.every(x=>Math.abs(x-avg)<=avg*.05))out[k]=avg}}return out}
const isFixedTx=t=>FIXED_CATS.has(t.c)||(rvSubs&&t.m&&rvSubs[t.m.toLowerCase()]!=null);
function weekStats(ws,n){const end=addD(ws,n-1),tx=[];
  for(const mk of new Set([ws.slice(0,7),end.slice(0,7)]))for(const t of monthTx(mk))if(t.d>=ws&&t.d<=end)tx.push(t);
  const ev=tx.filter(t=>t.k==='out'&&!isFixedTx(t)),cats={},cnt={},days=Array(7).fill(0);
  for(const t of ev){const c=t.c||'other';cats[c]=(cats[c]||0)+t.a;cnt[c]=(cnt[c]||0)+1;days[dayGap(t.d,ws)]+=t.a}
  return{ws,ev,total:sum(ev),fixed:sum(tx.filter(t=>t.k==='out'&&isFixedTx(t))),recv:sum(tx.filter(t=>t.k==='in')),cats,cnt,days,del:ev.filter(isDel),cab:ev.filter(isCab)}}
function review(ws,deep=true){
  const td=todayISO(),cur=monOf(td),isCur=ws===cur,n=isCur?dayGap(td,ws)+1:7,left=7-n,first=firstDate(),prog=isCur&&n<7;rvSubs=findSubs();
  const W=weekStats(ws,n),base=[],full=[];
  for(let i=1;i<=8;i++){const b=addD(ws,-7*i);if(b<first)break;base.push(weekStats(b,n));full.push(isCur?weekStats(b,7):base[base.length-1])}
  const nb=base.length,avg=f=>nb?base.reduce((s,b)=>s+f(b),0)/nb:0,ok=nb>=2;
  const U=avg(b=>b.total),U7=nb?full.reduce((s,b)=>s+b.total,0)/nb:0,pct=U?(W.total-U)/U:0,cn=c=>cat(c)?.name||'Other';
  const R={ws,n,left,isCur,prog,W,nb,ok,U,U7,pct,cn,moves:[],unusual:[],newP:[]};
  if(ok){
    for(const c of new Set([...Object.keys(W.cats),...base.flatMap(b=>Object.keys(b.cats))])){
      const a=W.cats[c]||0,u=avg(b=>b.cats[c]||0),d=a-u;if(Math.abs(d)<Math.max(15000,u*.2))continue;
      const k=W.cnt[c]||0,uk=avg(b=>b.cnt[c]||0),by={};for(const t of W.ev)if((t.c||'other')===c&&t.m)by[t.m]=(by[t.m]||0)+t.a;
      const top=Object.entries(by).sort((x,y)=>y[1]-x[1])[0];let why;
      const grp=c==='food'?['del','delivery order']:c==='transport'?['cab','cab ride']:null,gk=grp?W[grp[0]].length:0,gu=grp?avg(b=>b[grp[0]].length):0;
      if(d>0){
        if(uk<.5)why=`You don't usually spend here.`;
        else if(grp&&gk>=gu+1)why=`${gk} ${grp[1]}${gk>1?'s':''} against your usual ${Math.round(gu)}.`;
        else if(k>=uk+1)why=`${k} payment${k>1?'s':''} against your usual ${Math.round(uk)}.`;
        else if(k&&uk>=.5)why=`Bigger payments than usual: ${money(a/k,{round:1})} each against ${money(u/uk,{round:1})}.`;
        else why=`You don't usually spend here.`;
        if(top)why+=` ${top[1]>=a*.6?'Mostly':'Biggest:'} ${top[0]} (${money(top[1],{round:1})}).`}
      else why=a===0?`Nothing spent here ${prog?'so far':'this week'}. You usually spend ${money(u,{round:1})}.`
        :grp&&gk<=gu-1?`${gk||'No'} ${grp[1]}${gk===1?'':'s'} against your usual ${Math.round(gu)}.`
        :k<=uk-1?`${k} payment${k>1?'s':''} against your usual ${Math.round(uk)}.`:`Smaller payments than usual.`;
      R.moves.push({c,a,u,d,why})}
    R.moves.sort((x,y)=>Math.abs(y.d)-Math.abs(x.d));
    // unusual single payments: 3x the usual size for that category
    const prior=allTx().filter(t=>t.d<ws&&t.k==='out'&&!isFixedTx(t));
    for(const t of W.ev){const h=prior.filter(p=>p.c===t.c&&p.d>=addD(ws,-90)).map(p=>p.a).sort((x,y)=>x-y);
      if(h.length>=8){const med=h[Math.floor(h.length*.75)];if(t.a>=med*2.5&&t.a>=50000)R.unusual.push({t,med})}}
    R.unusual.sort((x,y)=>y.t.a-x.t.a);R.unusual=R.unusual.slice(0,2);
    if(prior.length>=15){const seen=new Set(prior.map(p=>(p.m||'').toLowerCase())),np={};
      for(const t of W.ev){const k=(t.m||'').trim();if(k&&!seen.has(k.toLowerCase()))np[k]=(np[k]||0)+t.a}
      R.newP=Object.entries(np).sort((x,y)=>y[1]-x[1]).slice(0,3)}
    R.limit=U7/7;R.under=W.days.slice(0,n).filter(v=>v<=R.limit).length}
  R.noSpend=W.days.slice(0,n).filter(v=>!v).length;
  const mx=Math.max(...W.days);R.topDay=mx>0?{i:W.days.indexOf(mx),a:mx}:null;
  R.big=W.ev.slice().sort((x,y)=>y.a-x.a)[0]||null;
  // one suggestion
  if(ok){const ups=R.moves.filter(m=>m.d>0),dk=W.del.length,du=Math.round(avg(b=>b.del.length)),dt=dk?sum(W.del)/dk:0;
    const goal=goals().filter(g=>(g.saved||0)<g.target).sort((x,y)=>x.date<y.date?-1:1)[0];
    if(prog){const room=U7-W.total;
      R.tip=room>0?{kind:'pace',t:`Stay near ${money(floorTo(room/left,1000),{round:1})} a day for the next ${left} day${left>1?'s':''}`,w:`That lands this week on your usual ${money(U7,{round:1})}. You've spent ${money(W.total,{round:1})} in ${n} day${n>1?'s':''}.`}
        :{kind:'pace',t:`Keep the next ${left} day${left>1?'s':''} to essentials`,w:`You're at ${money(W.total,{round:1})}, already past your usual full week of ${money(U7,{round:1})}.`}}
    else if(pct<=-.1&&U-W.total>=20000)R.tip=goal?{kind:'keep',t:`Move ${money(floorTo(U-W.total,10000),{round:1})} into ${goal.name}`,w:`That's what you spent below your usual week. Setting it aside now makes the saving real.`,goal:goal.id,amt:floorTo(U-W.total,10000)}
        :{kind:'keep',t:`Do the same again next week`,w:`A month of weeks like this leaves you about ${money((U-W.total)*4.35,{round:1})} better off.`};
    else if(dk>=du+2)R.tip={kind:'del',target:Math.max(1,du),was:dk,ticket:dt,t:`Keep food delivery to ${Math.max(1,du)} order${du>1?'s':''} next week`,w:`You ordered ${dk} times against your usual ${du}. At ${money(dt,{round:1})} an order, that saves about ${money((dk-Math.max(1,du))*dt,{round:1})}.`};
    else if(ups[0]&&pct>.1)R.tip={kind:'cat',c:ups[0].c,target:ups[0].u,was:ups[0].a,t:`Bring ${cn(ups[0].c).toLowerCase()} back to ${money(ups[0].u,{round:1})} next week`,w:`It was ${money(ups[0].a,{round:1})} this week, ${money(ups[0].d,{round:1})} above usual. It's the biggest single reason this week ran high.`};
    else R.tip={kind:'steady',t:`Steady week, nothing to fix`,w:`Everyday spending was within 10% of your usual ${money(U,{round:1})}.`}}
  // did last week's suggestion work?
  if(deep&&ok&&addD(ws,-7)>=monOf(first)){const pt=review(addD(ws,-7),false).tip,T=pt&&pt.t.replace(/ next week$/,'');
    if(pt&&pt.kind==='del'){const now=W.del.length,hit=now<=pt.target;R.follow={t:T,done:!prog&&hit,prog,text:prog?`So far: ${now} order${now===1?'':'s'}, with ${left} day${left>1?'s':''} to go.`:hit?`You made ${now}, down from ${pt.was}. That kept about ${money((pt.was-now)*pt.ticket,{round:1})} in your pocket.`:`You made ${now}, ${now-pt.target} more than planned.`}}
    else if(pt&&pt.kind==='cat'){const now=W.cats[pt.c]||0,hit=now<=pt.target*1.05;R.follow={t:T,done:!prog&&hit,prog,text:prog?`So far: ${money(now,{round:1})}, with ${left} day${left>1?'s':''} to go.`:hit?`Done: ${money(now,{round:1})}, down from ${money(pt.was,{round:1})}.`:`It came to ${money(now,{round:1})}, still ${money(now-pt.target,{round:1})} above your usual.`}}
    else if(pt&&pt.kind==='keep'&&!prog){const hit=W.total<=U;R.follow={t:T,done:hit,prog:false,text:hit?`Another good one: ${money(W.total,{round:1})} against your usual ${money(U,{round:1})}.`:`This week came to ${money(W.total,{round:1})}, above your usual ${money(U,{round:1})}.`}}}
  // what the difference means for the nearest goal
  if(deep&&ok&&Math.abs(W.total-U)>=10000){const P=planGoals(),gp=P.order.map(id=>P.plans[id]).find(p=>p.R&&p.status!=='done'&&p.status!=='overdue');
    if(gp){const days=Math.round(Math.abs(W.total-U)/(gp.R/AVG_MONTH));if(days>=1)R.impact={days,over:W.total>U,name:gp.g.name,amt:Math.abs(W.total-U)}}}
  return R}
function rvVerdict(R){const W=R.W,P=R.prog;
  if(!R.ok)return{tone:'',h:P?'This week so far':'Your week',s:`Comparisons start once Spendo has 2 earlier full weeks of your entries. It has ${R.nb} so far.`};
  const d=Math.abs(W.total-R.U),p=Math.round(Math.abs(R.pct)*100),vs=P?`what you usually spend by ${DOW[R.n-1]}`:'your usual week';
  if(R.pct<=-.1)return{tone:'good',h:P?'Lighter than usual so far':'A lighter week',s:`${money(d,{round:1})} (${p}%) below ${vs}, ${money(R.U,{round:1})}.`};
  if(R.pct>=.1)return{tone:'bad',h:P?'Running higher than usual':'A heavier week',s:`${money(d,{round:1})} (${p}%) above ${vs}, ${money(R.U,{round:1})}.`};
  return{tone:'',h:P?'On your usual pace':'A typical week',s:`Within ${Math.max(1,p)}% of ${vs}, ${money(R.U,{round:1})}.`}}
function defaultWeek(){const td=todayISO(),cur=monOf(td),first=firstDate();return dayGap(td,cur)>=2||addD(cur,-1)<first?cur:addD(cur,-7)}
let rvMode='week';
const rvSeg=()=>`<div class="seg rvseg">${[['week','Week'],['month','Month']].map(([v,l])=>`<button data-rvm="${v}" class="${rvMode===v?'on':''}" aria-pressed="${rvMode===v}">${l}</button>`).join('')}</div>`;
function renderReview(){
  if(allTx().length&&rvMode==='month'){$('#view').innerHTML=`<div class="head"><div><h1>Review</h1><p class="sub">Where this month is heading, and the habits behind it.</p></div>${rvSeg()}</div><div class="grid">${renderMonth()}</div>`;return}
  if(!allTx().length){$('#view').innerHTML=`<div class="head"><div><h1>Review</h1></div></div><div class="card"><div class="empty"><b>Nothing to review yet</b>Add your spending for a few days and your first review appears here.</div></div>`;return}
  const cur=monOf(todayISO()),minW=monOf(firstDate());if(!rvWeek||rvWeek>cur||rvWeek<minW)rvWeek=defaultWeek();
  const R=review(rvWeek),W=R.W,V=rvVerdict(R),ups=R.moves.filter(m=>m.d>0).slice(0,3),downs=R.moves.filter(m=>m.d<0).slice(0,3);
  const mv=(m,up)=>`<li><span class="ic" style="--c:${esc(cat(m.c)?.color||'#8a8178')}">${ico(cat(m.c)?.icon)}</span><div><b>${esc(R.cn(m.c))}: ${money(m.a,{round:1})} <span class="${up?'up':'dn'}">${up?'▲':'▼'} ${money(Math.abs(m.d),{round:1})}</span></b><small>${esc(m.why)}</small></div></li>`;
  const look=[];
  for(const u of R.unusual)look.push(`<li><b>${esc(u.t.m||R.cn(u.t.c))} · ${money(u.t.a,{round:1})}</b><small>${esc(dayLabel(u.t.d))}. Much larger than your usual ${esc(R.cn(u.t.c).toLowerCase())} payments: three in four are under ${money(u.med,{round:1})}.</small></li>`);
  if(R.newP.length)look.push(`<li><b>New payee${R.newP.length>1?'s':''}: ${R.newP.map(([n,a])=>`${esc(n)} (${money(a,{round:1})})`).join(', ')}</b><small>You hadn't paid ${R.newP.length>1?'these':'this one'} before. Worth a glance if any is a new subscription.</small></li>`);
  if(W.fixed)look.push(`<li><b>Rent, bills, health and subscriptions: ${money(W.fixed,{round:1})}</b><small>Kept out of the comparison, because they land in one week and would distort it.</small></li>`);
  const dmax=Math.max(1,...W.days,R.limit||0);
  const days=W.days.map((v,i)=>{const d=addD(R.ws,i),fut=i>=R.n;return `<div class="dr${fut?' fut':''}"><span>${DOW[i].slice(0,3)} ${+d.slice(8)}</span><div class="dtk">${fut?'':`<i class="${R.limit&&v>R.limit?'hi':''}" style="width:${(v/dmax*100).toFixed(1)}%"></i>`}${R.limit?`<u style="left:${(R.limit/dmax*100).toFixed(1)}%"></u>`:''}</div><b>${fut?'':v?money(v,{round:1}):'—'}</b></div>`}).join('');
  const tr=[];for(let i=7;i>=0;i--){const s=addD(cur,-7*i);if(s>=minW)tr.push({s,v:weekStats(s,s===cur?dayGap(todayISO(),cur)+1:7).total})}
  const tmax=Math.max(1,...tr.map(x=>x.v));
  const cats=Object.entries(W.cats).sort((a,b)=>b[1]-a[1]);
  const tiles=[`<div>Everyday spending<b>${money(W.total,{round:1})}</b></div>`,R.ok?`<div>${R.prog?'Usual by now':'Usual week'}<b>${money(R.U,{round:1})}</b></div>`:'',R.ok?`<div>Days at or under ${money(R.limit,{round:1})}<b>${R.under} of ${R.n}</b></div>`:'',`<div>No-spend days<b>${R.noSpend}</b></div>`,W.recv?`<div>Received<b>${money(W.recv,{round:1})}</b></div>`:''].join('');
  $('#view').innerHTML=`
  <div class="head"><div><h1>Review</h1><p class="sub">Your everyday spending against your own usual week. Rent, bills and subscriptions are left out.</p></div>
    <div class="rvctl">${rvSeg()}<div class="mnav"><button class="ib" data-act="rvPrev" aria-label="Previous week" ${R.ws<=minW?'disabled':''}>${ico('chevL')}</button><b>${esc(weekLabel(R.ws))}</b><button class="ib" data-act="rvNext" aria-label="Next week" ${R.ws>=cur?'disabled':''}>${ico('chevR')}</button></div></div></div>
  <div class="grid">
    <section class="rvh s12 ${V.tone}"><div class="lab">${R.prog?`Monday to today · day ${R.n} of 7`:R.isCur?'This week':'Week of '+esc(weekLabel(R.ws))}</div><h2>${V.h}</h2><div class="big">${money(W.total,{round:1})}</div><p>${V.s}</p>${R.impact?`<p class="imp">${R.impact.over?`The extra ${money(R.impact.amt,{round:1})} equals about <b>${R.impact.days} day${R.impact.days>1?'s':''}</b> of saving for ${esc(R.impact.name)}.`:`The ${money(R.impact.amt,{round:1})} you didn't spend equals about <b>${R.impact.days} day${R.impact.days>1?'s':''}</b> of saving for ${esc(R.impact.name)}.`}</p>`:''}</section>
    ${R.follow?`<section class="card s12 fol ${R.follow.done?'done':R.follow.prog?'':'miss'}"><span class="fi">${R.follow.done?'✓':R.follow.prog?'…':'○'}</span><div><small>Last week's tip: ${esc(R.follow.t)}</small><b>${esc(R.follow.text)}</b></div></section>`:''}
    <section class="card s12"><div class="sumrow rvt">${tiles}</div></section>
    ${R.tip?`<section class="card s12 rtip"><small>${R.prog?'For the rest of this week':'For next week'}</small><h2>${esc(R.tip.t)}</h2><p class="gl">${esc(R.tip.w)}</p>${R.tip.goal?`<div class="btns"><button class="btn dark" data-act="rvSave" data-id="${esc(R.tip.goal)}" data-v="${R.tip.amt}">I've set it aside</button></div>`:''}</section>`:''}
    ${R.ok?`<section class="card s6"><div class="ch"><h3>What went up</h3></div>${ups.length?`<ul class="rvl">${ups.map(m=>mv(m,1)).join('')}</ul>`:`<p class="note">Nothing ran noticeably above your usual. </p>`}</section>
    <section class="card s6"><div class="ch"><h3>What went well</h3></div>${downs.length?`<ul class="rvl">${downs.map(m=>mv(m,0)).join('')}</ul>`:`<p class="note">No category came in noticeably below your usual.</p>`}</section>`
    :`<section class="card s12"><div class="ch"><h3>Where it went</h3></div>${cats.length?`<ul class="merch">${cats.map(([c,v])=>`<li><span>${esc(R.cn(c))} <small>× ${W.cnt[c]}</small></span><b>${money(v,{round:1})}</b><div class="track"><div class="fill" style="width:${(v/cats[0][1]*100).toFixed(1)}%"></div></div></li>`).join('')}</ul>`:`<p class="note">No everyday spending logged this week.</p>`}</section>`}
    <section class="card s6"><div class="ch"><h3>Day by day</h3>${R.limit?`<small>Line: your usual ${money(R.limit,{round:1})} a day</small>`:''}</div><div class="days">${days}</div>${R.topDay?`<p class="note" style="margin-top:12px">${DOW[R.topDay.i]} was the biggest day at ${money(R.topDay.a,{round:1})}, ${Math.round(R.topDay.a/W.total*100)}% of the week.${R.big?` Largest payment: ${esc(R.big.m||R.cn(R.big.c))}, ${money(R.big.a,{round:1})}.`:''}</p>`:''}</section>
    <section class="card s6"><div class="ch"><h3>Worth a look</h3></div>${look.length?`<ul class="rvl plain">${look.join('')}</ul>`:`<p class="note">Nothing unusual: no outsized payments and no new payees.</p>`}</section>
    <section class="card s12"><div class="ch"><h3>Last ${tr.length} week${tr.length>1?'s':''}</h3><small>Everyday spending · tap a week to open it</small></div><div class="wk">${tr.map(x=>`<button data-rvw="${x.s}" class="${x.s===R.ws?'on':''}" aria-label="Week of ${esc(weekLabel(x.s))}: ${esc(money(x.v,{round:1}))}"><b>${cmp(x.v)}</b><i style="height:${Math.max(3,x.v/tmax*100).toFixed(1)}%"></i><span>${+x.s.slice(8)} ${pd(x.s).toLocaleDateString('en-IN',{month:'short'})}</span></button>`).join('')}</div></section>
  </div>`}
function homeReview(){if(!allTx().length)return'';const R=review(defaultWeek()),V=rvVerdict(R);
  return `<section class="card s12 rvhome"><div class="ch"><h3>${R.prog?'This week so far':R.isCur?'This week':'Last week'}</h3><a href="#review">Open review</a></div><div class="rvhb"><div><b class="rvn ${V.tone}">${money(R.W.total,{round:1})}</b><small>${V.h}. ${V.s}</small></div>${R.tip?`<div class="rvtip"><small>${R.prog?'For the rest of this week':'For next week'}</small><b>${esc(R.tip.t)}</b></div>`:''}</div></section>`}
const safe=f=>{try{return f()}catch(e){console.error(e);return''}};

/* ---------- month view: forecast, patterns, small leaks ---------- */
const dowOf=s=>(pd(s).getDay()+6)%7;
const everyday=(from,to)=>allTx().filter(t=>t.k==='out'&&!isFixedTx(t)&&t.d>=from&&t.d<=to);
// Month-end forecast = spent so far + expected everyday spending for the days left
// (by weekday, from the last 8 weeks) + regular bills that haven't been paid yet this month.
function forecast(){const first=firstDate();if(!first)return null;rvSubs=findSubs();
  const td=todayISO(),cm=curMonth(),dn=+td.slice(8),dim=daysIn(cm),rem=dim-dn,out=monthTx(cm).filter(t=>t.k==='out'),spent=sum(out);
  const hs=addD(td,-56)<first?first:addD(td,-56),hd=dayGap(td,hs),by=Array(7).fill(0),cn=Array(7).fill(0);
  for(let i=0;i<hd;i++)cn[dowOf(addD(hs,i))]++;
  if(hd>0)for(const t of everyday(hs,addD(td,-1)))by[dowOf(t.d)]+=t.a;
  const tot=by.reduce((a,b)=>a+b,0),flat=hd?tot/hd:0,byDay=hd>=14;
  let rest=0;for(let i=1;i<=rem;i++){const w=dowOf(addD(td,i));rest+=byDay&&cn[w]?by[w]/cn[w]:flat}
  // regular fixed payments seen in each of the last two months but not yet this month
  const unpaid=[],pms=[shiftM(cm,-1),shiftM(cm,-2)].filter(m=>m>=first.slice(0,7)&&(m>first.slice(0,7)||+first.slice(8)<=5));
  if(pms.length){const key=t=>(t.m||cat(t.c)?.name||'Other').trim(),grp=m=>{const o={};for(const t of monthTx(m))if(t.k==='out'&&isFixedTx(t))o[key(t).toLowerCase()]={n:key(t),a:(o[key(t).toLowerCase()]?.a||0)+t.a};return o};
    const prev=pms.map(grp),now=grp(cm);
    for(const k of Object.keys(prev[0]))if(prev.every(p=>p[k])){const exp=prev.reduce((s,p)=>s+p[k].a,0)/prev.length,paid=now[k]?.a||0;if(paid<exp*.5)unpaid.push({n:prev[0][k].n,a:exp-paid})}}
  const bills=unpaid.reduce((s,u)=>s+u.a,0),total=spent+rest+bills,F={spent,dn,dim,rem,rest,bills,unpaid,total,bud:totalBudget(),ready:hd>=7,byDay};
  // likely range from how much your weeks vary
  const wk=[];for(let i=1;i<=8;i++){const s=addD(monOf(td),-7*i);if(s<first)break;wk.push(sum(everyday(s,addD(s,6))))}
  if(wk.length>=4&&rem>0){const mean=wk.reduce((a,b)=>a+b,0)/wk.length,sd=Math.sqrt(wk.reduce((s,v)=>s+(v-mean)**2,0)/(wk.length-1)),band=sd*Math.sqrt(rem/7);F.low=Math.max(spent+bills,total-band);F.high=total+band}
  return F}
function patterns(){const first=firstDate(),td=todayISO();if(!first)return{ready:false,days:0};rvSubs=findSubs();
  const hs=addD(td,-56)<first?first:addD(td,-56),hd=dayGap(td,hs);if(hd<28)return{ready:false,days:hd};
  const by=Array(7).fill(0),cn=Array(7).fill(0);for(let i=0;i<hd;i++)cn[dowOf(addD(hs,i))]++;
  for(const t of everyday(hs,addD(td,-1)))by[dowOf(t.d)]+=t.a;
  const avg=by.map((v,i)=>cn[i]?v/cn[i]:0),wd=(by[0]+by[1]+by[2]+by[3]+by[4])/Math.max(1,cn[0]+cn[1]+cn[2]+cn[3]+cn[4]),we=(by[5]+by[6])/Math.max(1,cn[5]+cn[6]);
  const hi=avg.indexOf(Math.max(...avg)),lo=avg.indexOf(Math.min(...avg)),P={ready:true,days:hd,wd,we,avg,hi,lo};
  // payday effect: the 10 days from each salary date against the 20 days after that
  const pays=[];for(let i=0;i<4;i++){const inc=monthTx(shiftM(curMonth(),-i)).filter(t=>t.k==='in'&&t.c!=='refund');if(!inc.length)continue;
    const s=inc.filter(t=>t.c==='salary').sort((a,b)=>b.a-a.a)[0]||inc.slice().sort((a,b)=>b.a-a.a)[0];if(s.d>=first&&dayGap(td,s.d)>=20)pays.push(s.d)}
  if(pays.length){let a=0,ad=0,b=0,bd=0;for(const p of pays){const e=addD(td,-1)<addD(p,29)?addD(td,-1):addD(p,29);a+=sum(everyday(p,addD(p,9)));ad+=10;b+=sum(everyday(addD(p,10),e));bd+=dayGap(e,addD(p,10))+1}
    if(bd>=10)P.pay={early:a/ad,late:b/bd,n:pays.length}}
  return P}
// small, frequent payments to the same payee, over the last 30 days
function leaks(){const first=firstDate(),td=todayISO();if(!first)return{ready:false};rvSubs=findSubs();
  const hs=addD(td,-29)<first?first:addD(td,-29),hd=dayGap(td,hs)+1;if(hd<14)return{ready:false,days:hd};
  const tx=everyday(hs,td),scale=30/hd,daily=sum(tx)/hd,thr=daily*.3,by={};
  for(const t of tx){const n=(t.m||'').trim();if(!n)continue;const k=n.toLowerCase();by[k]=by[k]||{n,c:0,a:0};by[k].c++;by[k].a+=t.a}
  const list=Object.values(by).filter(e=>e.c*scale>=6&&e.a/e.c<=thr).map(e=>({n:e.n,times:Math.round(e.c*scale),each:e.a/e.c,month:e.a*scale,year:e.a*scale*12})).sort((x,y)=>y.month-x.month).slice(0,4);
  return{ready:true,days:hd,list,total:list.reduce((s,e)=>s+e.month,0)}}
function pair(a,b){const mx=Math.max(a.v,b.v,1),hl=mx/Math.max(1,Math.min(a.v,b.v))>=1.15;return [a,b].map((x,i)=>`<div class="pr"><span>${x.l}</span><div class="track"><div class="fill${hl&&x.v===mx?' mx':''}" style="width:${(x.v/mx*100).toFixed(1)}%"></div></div><b>${money(x.v,{round:1})}</b></div>`).join('')}
function renderMonth(){
  const F=forecast(),P=patterns(),L=leaks(),cm=curMonth(),mn=pd(cm+'-01').toLocaleDateString('en-IN',{month:'long'});let hero;
  if(!F.ready)hero=`<section class="rvh s12"><div class="lab">${esc(mn)} forecast</div><h2>Still learning your pace</h2><p>The forecast starts after a week of entries. So far this month: ${money(F.spent,{round:1})}.</p></section>`;
  else{const over=F.bud?F.total-F.bud:0,tone=!F.bud?'':over>0?'bad':'good',mx=Math.max(F.high||F.total,F.bud||0)*1.04||1;
    const parts=[`${money(F.spent,{round:1})} spent`];if(F.rem>0)parts.push(`about ${money(F.rest,{round:1})} of everyday spending in the ${F.rem} day${F.rem>1?'s':''} left`);if(F.bills>0)parts.push(`${money(F.bills,{round:1})} of regular bills still to come (${F.unpaid.map(u=>esc(u.n)).join(', ')})`);
    hero=`<section class="rvh s12 ${tone}"><div class="lab">${esc(mn)} forecast · day ${F.dn} of ${F.dim}</div><h2>${F.rem>0?'On course to spend':'This month you spent'}</h2><div class="big">${money(F.total,{round:1})}</div>
      <p>${F.bud?`${money(Math.abs(over),{round:1})} ${over>0?'over':'under'} your ${money(F.bud,{round:1})} budget.`:'Set a monthly budget to see how this compares.'}${F.high?` Likely between ${money(floorTo(F.low,10000),{round:1})} and ${money(ceilTo(F.high,10000),{round:1})}.`:''}</p>
      <div class="fbar" role="img" aria-label="Spent so far and forecast against budget"><i class="s" style="width:${(F.spent/mx*100).toFixed(1)}%"></i><i class="f" style="width:${((F.total-F.spent)/mx*100).toFixed(1)}%"></i>${F.bud?`<u style="left:${(F.bud/mx*100).toFixed(1)}%"><span>Budget</span></u>`:''}</div>
      <p class="fnote">${parts.join(' + ')}.</p></section>`}
  let pat;
  if(!P.ready)pat=`<section class="card s12"><div class="ch"><h3>Your patterns</h3></div><div class="empty"><b>Still learning</b>Patterns need 4 weeks of entries so they aren't guesses. You have ${P.days||0} day${P.days===1?'':'s'} so far.</div></section>`;
  else{const r=P.we/Math.max(1,P.wd),wkT=r>=1.15?`A weekend day costs you <b>${r.toFixed(1)}×</b> a weekday. That's about ${money((P.we-P.wd)*8.7,{round:1})} extra a month.`:r<=.87?`Weekdays cost you more than weekends.`:`Weekends and weekdays cost you about the same.`;
    let pay;if(P.pay){const d=P.pay.early/Math.max(1,P.pay.late);pay=`<div class="pc">${pair({l:'First 10 days',v:P.pay.early},{l:'After that',v:P.pay.late})}</div><p>${d>=1.15?`You spend <b>${Math.round((d-1)*100)}% more</b> a day right after salary. Evening it out frees about ${money((P.pay.early-P.pay.late)*10,{round:1})} a month.`:d<=.87?`You spend more late in the month than right after salary.`:`Your spending stays even through the month.`}</p>`}
    else pay=`<p class="note">Needs a salary logged as Received at least 20 days ago.</p>`;
    const mx=Math.max(...P.avg,1);
    pat=`<section class="card s4 pcard"><h3>Weekday or weekend</h3><small>Average per day</small><div class="pc">${pair({l:'Weekday',v:P.wd},{l:'Weekend',v:P.we})}</div><p>${wkT}</p></section>
    <section class="card s4 pcard"><h3>After payday</h3><small>Average per day</small>${pay}</section>
    <section class="card s4 pcard"><h3>Your priciest day</h3><small>Average by day of the week</small><div class="dowb">${P.avg.map((v,i)=>`<div class="${i===P.hi?'mx':''}"><i style="height:${Math.max(4,v/mx*100).toFixed(1)}%"></i><span>${DOW[i][0]}</span></div>`).join('')}</div><p><b>${DOW[P.hi]}s</b> average ${money(P.avg[P.hi],{round:1})}. ${DOW[P.lo]}s are lightest at ${money(P.avg[P.lo],{round:1})}.</p></section>`}
  let lk;
  const rate=payRate(),wt=v=>{const w=workTime(v,rate);return w?`<small>${w}</small>`:''};
  if(!L.ready)lk=`<div class="empty"><b>Still learning</b>Small leaks show up after 2 weeks of entries.</div>`;
  else if(!L.list.length)lk=`<p class="note">No small, frequent payments stand out in the last ${L.days} days.</p>`;
  else lk=`<ul class="leak">${L.list.map(e=>`<li><div><b>${esc(e.n)}</b><small>${e.times} times a month · ${money(e.each,{round:1})} each</small></div><div class="lm"><small>a month</small><b>${money(e.month,{round:1})}</b></div><div class="ly"><small>a year</small><b>${money(e.year,{round:1})}</b>${wt(e.year)}</div></li>`).join('')}</ul><p class="note">Together that's ${money(L.total,{round:1})} a month. None of these is wrong to buy; it's just easy to miss what they add up to.</p>`;
  return `${hero}${safe(wrapTeaser)}${pat}<section class="card s12"><div class="ch"><h3>Small leaks</h3><small>Small payments you make often</small></div>${lk}</section>${safe(regretCard)}`}


/* ---------- round 2: worth-it ratings, safe to spend, work time, Wrapped ---------- */
const workDays=()=>Math.min(31,Math.max(1,+S.meta.workDays||22));
// what a day of work earns, from average monthly income
function payRate(){const a=analyze();return a.empty||a.I<=0?0:a.I/workDays()}
function workTime(a,rate){if(!rate||a<=0)return'';const d=a/rate;if(d<.02)return'';
  if(d<1){const h=d*8;return h<1?`${Math.max(5,Math.round(h*60/5)*5)} minutes of work`:`${h<10?h.toFixed(1).replace(/\.0$/,''):Math.round(h)} hours of work`}
  return `${d<10?d.toFixed(1).replace(/\.0$/,''):Math.round(d)} working day${d.toFixed(1)==='1.0'?'':'s'}`}
function nearGoal(){const P=planGoals(),p=P.order.map(id=>P.plans[id]).find(p=>p.R&&p.status!=='done'&&p.status!=='overdue');return p?{name:p.g.name,perDay:p.R/AVG_MONTH}:null}
function goalTime(a,g){if(!g||!g.perDay)return'';const d=a/g.perDay;if(d<.5)return'';return `${d<10?Math.round(d*2)/2:Math.round(d)} day${d<1.25?'':'s'} of saving for ${g.name}`}

// ---- was it worth it?
const THUMB={up:'M7 11v9H4v-9zM7 11l4-8a2.2 2.2 0 0 1 2 3l-1 4h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7',down:'M7 13V4H4v9zM7 13l4 8a2.2 2.2 0 0 0 2-3l-1-4h6a2 2 0 0 0 2-2.3l-1.2-6A2 2 0 0 0 16.8 4H7'};
const thumb=(k,s=18)=>`<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="${THUMB[k]}"/></svg>`;
// bigger everyday purchases from 2 to 21 days ago that haven't been rated yet
function worthAsk(){if(!firstDate())return[];rvSubs=findSubs();const td=todayISO(),am=everyday(addD(td,-60),td).map(t=>t.a).sort((a,b)=>a-b);if(am.length<8)return[];
  const thr=am[Math.floor(am.length*.7)],pick=()=>everyday(addD(td,-21),addD(td,-2)).filter(t=>t.w==null&&t.a>=thr).sort((a,b)=>b.a-a.a).slice(0,3);
  // at most three questions a day: the day's picks are remembered, so answering doesn't bring up more
  let q=null;try{q=JSON.parse(localStorage.getItem('spendo-wq'))}catch(e){}
  if(!q||q.d!==td){q={d:td,ids:pick().map(t=>t.id)};try{localStorage.setItem('spendo-wq',JSON.stringify(q))}catch(e){}}
  return q.ids.map(findTx).filter(t=>t&&t.w==null)}
function regret(from,to){rvSubs=findSubs();const r=everyday(from,to).filter(t=>t.w===1||t.w===-1),no=r.filter(t=>t.w===-1),by={};
  for(const t of no){const n=t.m||cat(t.c)?.name||'Other';by[n]=by[n]||{n,a:0,c:0};by[n].a+=t.a;by[n].c++}
  return{n:r.length,rated:sum(r),no:sum(no),nn:no.length,top:Object.values(by).sort((a,b)=>b.a-a.a).slice(0,3)}}
function rate(id,v){const t=findTx(id);if(!t)return;const was=t.w;t.w=v;touch();render();
  snack(v===1?'Marked worth it':v===-1?'Marked not worth it':'Skipped','',()=>{if(was==null)delete t.w;else t.w=was;touch();render()})}
function homeWorth(){const list=worthAsk();if(!list.length)return'';
  return `<section class="card s12 wq"><div class="ch"><h3>Was it worth it?</h3><small>Your answers show where your money buys the least</small></div><ul>${list.map(t=>`<li><div><b>${esc(t.m||cat(t.c)?.name||'Other')} · ${money(t.a,{round:1})}</b><small>${esc(dayLabel(t.d))} · ${esc(cat(t.c)?.name||'Other')}</small></div><div class="wqb"><button class="btn yes" data-act="rate" data-id="${esc(t.id)}" data-v="1">${thumb('up')}Worth it</button><button class="btn no" data-act="rate" data-id="${esc(t.id)}" data-v="-1">${thumb('down')}Not really</button><button class="lnk" data-act="rate" data-id="${esc(t.id)}" data-v="0">Skip</button></div></li>`).join('')}</ul></section>`}
function regretCard(){const td=todayISO(),G=regret(addD(td,-89),td);let b;
  if(G.n<3)b=`<p class="note">Rate a few purchases as worth it or not, and this shows where your money buys the least. Spendo asks on Home a few days after bigger purchases, or open any entry to rate it.</p>`;
  else if(!G.nn)b=`<p class="gl">You rated ${G.n} purchases and called every one worth it. Nothing to cut here.</p>`;
  else b=`<div class="rg"><div class="rgn"><b>${money(G.no,{round:1})}</b><small>${Math.round(G.no/G.rated*100)}% of the ${money(G.rated,{round:1})} you rated went on things you called not worth it</small></div><ul class="merch">${G.top.map(e=>`<li><span>${esc(e.n)} <small>× ${e.c}</small></span><b>${money(e.a,{round:1})}</b><div class="track"><div class="fill" style="width:${(e.a/G.top[0].a*100).toFixed(1)}%"></div></div></li>`).join('')}</ul></div><p class="note">Cutting these costs you the least, because you already said they weren't worth it. Goals suggests them first.</p>`;
  return `<section class="card s12"><div class="ch"><h3>Was it worth it?</h3><small>Last 90 days</small></div>${b}</section>`}

// ---- safe to spend today
// (what the month can carry - spent before today - regular bills still to come) / days left, minus today's spending.
// "What the month can carry" is your average income minus what your goals need, or your budget if that is lower.
function safeSpend(){const td=todayISO(),cm=curMonth(),dn=+td.slice(8),dim=daysIn(cm),left=dim-dn+1,A=analyze(),I=A.empty?0:A.I,bud=totalBudget();
  const P=planGoals(),need=P.order.map(id=>P.plans[id]).filter(p=>p.status==='ok'||p.status==='stretch').reduce((s,p)=>s+p.R,0);
  let cap,basis;if(I>0){cap=I-need;basis='income';if(bud&&bud<cap){cap=bud;basis='budget'}}else if(bud){cap=bud;basis='budget'}else return null;
  const out=monthTx(cm).filter(t=>t.k==='out'),today=sum(out.filter(t=>t.d===td)),before=sum(out)-today,F=forecast(),bills=F?F.bills:0;
  const perDay=Math.max(0,(cap-before-bills)/left);return{cap,basis,I,need,bud,bills,before,today,left,perDay,safe:perDay-today,unpaid:F?F.unpaid:[]}}

// ---- Wrapped
const WR_BG=[['#161412','#f5f1eb','#ff6a4d'],['#c8371e','#fff','#ffd9d0'],['#e7e4df','#161412','#c8371e'],['#1a7f4e','#fff','#c9f2dc'],['#2f3a8f','#fff','#cfd6ff']];
let wr=null;
function wrapCards(from,to,label,isYear,hide){rvSubs=findSubs();
  const M=v=>hide?sym()+' •••':money(v,{round:1}),all=allTx().filter(t=>t.d>=from&&t.d<=to),out=all.filter(t=>t.k==='out'),ev=out.filter(t=>!isFixedTx(t)),inc=sum(all.filter(t=>t.k==='in'&&t.c!=='refund'));
  if(out.length<5)return[{k:label,big:'Not enough yet',sub:'Add a few more entries and your Wrapped appears here.'}];
  const spent=sum(out),C=[{k:`Your ${label}`,big:M(spent),sub:`spent across ${out.length} payments${to>=todayISO()?' so far':''}`}];
  const pay={};for(const t of out){const n=(t.m||'').trim();if(!n)continue;pay[n]=pay[n]||{n,a:0,c:0};pay[n].a+=t.a;pay[n].c++}
  const reg=Object.values(pay).filter(p=>p.c>=2).sort((a,b)=>b.c-a.c||b.a-a.a)[0];
  if(reg)C.push({k:'Your regular',big:reg.n,sub:`${reg.c} visits · ${M(reg.a)} in total`,text:1});
  const dy={};for(const t of ev)dy[t.d]=(dy[t.d]||0)+t.a;const bd=Object.entries(dy).sort((a,b)=>b[1]-a[1])[0];
  if(bd)C.push({k:'Your biggest day',big:pd(bd[0]).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'}),sub:`${M(bd[1])} of everyday spending in one day`,text:1});
  const ct={};for(const t of ev){const c=t.c||'other';ct[c]=(ct[c]||0)+t.a}const tc=Object.entries(ct).sort((a,b)=>b[1]-a[1])[0];
  if(tc)C.push({k:'Your everyday money went on',big:cat(tc[0])?.name||'Other',sub:`${Math.round(tc[1]/(sum(ev)||1)*100)}% of it, not counting rent and bills`,text:1});
  if(isYear){const ms={};for(const t of out)ms[t.d.slice(0,7)]=(ms[t.d.slice(0,7)]||0)+t.a;const full=Object.entries(ms).filter(([m])=>m<curMonth()&&m>firstDate().slice(0,7)||+firstDate().slice(8)<=5&&m<curMonth()).sort((a,b)=>a[1]-b[1])[0];
    if(full)C.push({k:'Your lightest month',big:pd(full[0]+'-01').toLocaleDateString('en-IN',{month:'long'}),sub:`${M(full[1])} spent`,text:1})}
  else{const wk=[];for(let s=monOf(from)<from?addD(monOf(from),7):monOf(from);addD(s,6)<=to&&addD(s,6)<todayISO();s=addD(s,7))wk.push([s,sum(ev.filter(t=>t.d>=s&&t.d<=addD(s,6)))]);
    const bw=wk.sort((a,b)=>a[1]-b[1])[0];if(bw&&wk.length>=2)C.push({k:'Your lightest week',big:weekLabel(bw[0]),sub:`${M(bw[1])} of everyday spending`,text:1})}
  const evT=sum(ev)||1,share=id=>sum(ev.filter(t=>t.c===id))/evT,days=new Set(ev.map(t=>t.d)),wd=[0,0],wn=[0,0];
  for(let d=from;d<=to&&d<=todayISO();d=addD(d,1)){const w=dowOf(d)>=5?1:0;wn[w]++;wd[w]+=dy[d]||0}
  const wkr=wn[0]&&wn[1]&&wd[0]?(wd[1]/wn[1])/(wd[0]/wn[0]):1,am=ev.map(t=>t.a).sort((a,b)=>b-a),top3=(am[0]||0)+(am[1]||0)+(am[2]||0),sr=inc>0?(inc-spent)/inc:null;
  const small=ev.filter(t=>t.a<=evT/Math.max(1,days.size)*.3).length/Math.max(1,ev.length);let per;
  if(sr!=null&&sr>=.3)per=['The Saver',`You kept ${Math.round(sr*100)}% of what you earned.`];
  else if(share('food')>=.4)per=['The Foodie',`${Math.round(share('food')*100)}% of your everyday spending was food.`];
  else if(wkr>=1.5)per=['The Weekender',`A weekend day cost you ${wkr.toFixed(1)}× a weekday.`];
  else if(share('shopping')>=.35)per=['The Collector',`${Math.round(share('shopping')*100)}% of your everyday spending was shopping.`];
  else if(top3/evT>=.45)per=['The Big-Ticket Buyer',`Your three largest payments were ${Math.round(top3/evT*100)}% of your everyday spending.`];
  else if(small>=.6)per=['The Little-and-Often Spender',`${Math.round(small*100)}% of your payments were small ones.`];
  else per=['The Steady One','No single habit dominated. Your spending was spread evenly.'];
  C.push({k:'Your spending personality',big:per[0],sub:per[1],text:1});
  if(sr!=null)C.push(sr>=0?{k:'What you kept',big:`${Math.round(sr*100)}%`,sub:`of your income stayed with you: ${M(inc-spent)}`}:{k:'The gap',big:M(spent-inc),sub:'more went out than came in'});
  return C}
function wrapRange(){if(wr.year){const y=wr.mk.slice(0,4);return[`${y}-01-01`,`${y}-12-31`,y,true]}return[wr.mk+'-01',`${wr.mk}-${pad2(daysIn(wr.mk))}`,pd(wr.mk+'-01').toLocaleDateString('en-IN',{month:'long'}),false]}
function openWrap(mk){wr={mk:mk||curMonth(),year:false,i:0,hide:false};drawWrap();$('#wrapov').classList.add('show');document.body.style.overflow='hidden'}
function closeWrap(){$('#wrapov').classList.remove('show');document.body.style.overflow='';wr=null}
function drawWrap(){const [from,to,label,isYear]=wrapRange(),C=wrapCards(from,to,label,isYear,wr.hide);wr.n=C.length;wr.i=Math.min(wr.i,C.length-1);
  const c=C[wr.i],[bg,fg,ac]=WR_BG[wr.i%WR_BG.length],first=firstDate().slice(0,7),canPrev=!wr.year&&wr.mk>first,canNext=!wr.year&&wr.mk<curMonth();wr.cur=c;wr.label=isYear?label:`${label} ${wr.mk.slice(0,4)}`;
  $('#wrapov').innerHTML=`<div class="wrw"><div class="wrtop"><div class="mnav"><button class="ib" data-act="wrPrevM" aria-label="Previous month" ${canPrev?'':'disabled'}>${ico('chevL')}</button><b>${esc(isYear?label:pd(wr.mk+'-01').toLocaleDateString('en-IN',{month:'short',year:'numeric'}))}</b><button class="ib" data-act="wrNextM" aria-label="Next month" ${canNext?'':'disabled'}>${ico('chevR')}</button></div><button class="btn" data-act="wrYear">${wr.year?'By month':'Whole year'}</button><button class="ib wrx" data-act="wrClose" aria-label="Close">${ico('x')}</button></div>
    <div class="wrc" style="background:${bg};color:${fg};--ac:${ac}"><div class="wrdots">${C.map((_,i)=>`<i class="${i<=wr.i?'on':''}"></i>`).join('')}</div><div class="wrb"><span class="wrk">${esc(c.k)}</span><div class="wrbig${c.text?' txt':''}">${esc(c.big)}</div><p>${esc(c.sub)}</p></div><div class="wrf">Spendo · ${esc(wr.label)}</div>
      <button class="wrn l" data-act="wrPrev" aria-label="Previous card"></button><button class="wrn r" data-act="wrNext" aria-label="Next card"></button></div>
    <div class="wrbot"><span>${wr.i+1} of ${C.length} · tap the card to move</span><div class="btns"><button class="btn" data-act="wrHide" aria-pressed="${wr.hide}">${wr.hide?'Show amounts':'Hide amounts'}</button><button class="btn dark" data-act="wrSave">Save image</button></div></div></div>`}
function wrapImage(){const c=wr.cur,[bg,fg,ac]=WR_BG[wr.i%WR_BG.length],W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d'),F='"Schibsted Grotesk",system-ui,sans-serif';
  x.fillStyle=bg;x.fillRect(0,0,W,H);x.fillStyle=ac;x.globalAlpha=.16;x.beginPath();x.arc(W-120,160,360,0,7);x.fill();x.globalAlpha=1;
  const wrap=(t,font,max)=>{x.font=font;const out=[];let l='';for(const w of String(t).split(' ')){const n=l?l+' '+w:w;if(x.measureText(n).width>max&&l){out.push(l);l=w}else l=n}if(l)out.push(l);return out};
  x.fillStyle=ac;x.font=`700 44px ${F}`;x.fillText(c.k,90,470);
  let size=c.text?128:190,lines;do{lines=wrap(c.big,`800 ${size}px ${F}`,W-180);size-=8}while((lines.length>3||lines.some(l=>x.measureText(l).width>W-180))&&size>56);size+=8;
  x.fillStyle=fg;x.font=`800 ${size}px ${F}`;let y=470+size*1.05;for(const l of lines){x.fillText(l,90,y);y+=size*1.08}
  x.font=`500 46px ${F}`;x.globalAlpha=.88;y+=20;for(const l of wrap(c.sub,`500 46px ${F}`,W-180)){x.fillText(l,90,y);y+=62}x.globalAlpha=1;
  x.font=`700 40px ${F}`;x.fillText('Spendo',90,H-90);x.globalAlpha=.7;x.font=`500 36px ${F}`;x.textAlign='right';x.fillText(wr.label,W-90,H-90);x.textAlign='left';x.globalAlpha=1;
  cv.toBlob(b=>{if(!b){snack('Could not make the image','warn');return}const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=`spendo-wrapped-${wr.label.toLowerCase().replace(/\s+/g,'-')}-${wr.i+1}.png`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3000);snack('Image saved')},'image/png')}
function wrapTeaser(){if(!allTx().length)return'';const dn=new Date().getDate(),lm=shiftM(curMonth(),-1),mk=dn<=5&&monthTx(lm).length>=5?lm:curMonth();if(monthTx(mk).filter(t=>t.k==='out').length<5)return'';
  const n=pd(mk+'-01').toLocaleDateString('en-IN',{month:'long'});return `<section class="card s12 wrt"><div><b>Your ${esc(n)} Wrapped</b><small>Your month in a few cards: your regular, your biggest day, your spending personality.</small></div><button class="btn dark" data-act="wrOpen" data-m="${mk}">Open</button></section>`}

/* ---------- more ---------- */
let wipeArm=false,dl=null;
function renderMore(){
  const used=id=>allTx().some(t=>t.acc===id||t.to===id),cused=id=>allTx().some(t=>t.c===id);
  const hasSample=allTx().some(t=>t.s);
  $('#view').innerHTML=`
  <div class="head"><div><h1>More</h1><p class="sub">Accounts, categories, your data and setup.</p></div></div>
  <div class="grid">
  ${dbBanner()}${safe(wrapTeaser)}
  <section class="card s5 sect"><h2>You</h2>
    <label class="f">Your name<input class="inp" id="nm" value="${esc(S.meta.name)}" placeholder="Optional" autocomplete="given-name"></label>
    <label class="f">Working days a month<input class="inp" id="wdays" inputmode="numeric" value="${workDays()}" aria-describedby="wdn"></label><p class="note" id="wdn" style="margin-top:-6px">Used to show what a purchase costs in work time.</p>
    <label class="f">Currency<select id="cur">${CURS.map(c=>`<option ${c===S.meta.currency?'selected':''}>${c}</option>`).join('')}</select></label>
    ${uid?`<p class="note">Signed in as <b>${esc(session?.user?.email||'you')}</b>. Your entries are private to you and sync to every device where you sign in.</p>${lastErr?`<p class="note" style="color:var(--brick)"><b>Sync problem:</b> ${esc(lastErr)}</p>`:''}<div class="btns"><button class="btn" data-act="signout">Sign out</button></div>`
      :sb?`<p class="note">You're using Spendo on this device only. Sign in to back up your entries and use them on your phone and laptop. Entries already here come with you.</p><div class="btns"><button class="btn dark" data-act="google">Continue with Google</button>${CFG.githubLogin?'<button class="btn" data-act="github">Continue with GitHub</button>':''}</div>`
      :`<p class="note">Sync isn't set up yet, so entries are saved in this browser only. Add your Supabase keys to <code>app/config.js</code> to turn on sign-in.</p>`}</section>
  <section class="card s7 sect"><h2>Use it on your phone and laptop</h2>
    <ol class="steps"><li>Open <b>${esc(location.host+location.pathname)}</b> on your phone and sign in with the same Google account.</li><li>On iPhone, tap Share then <b>Add to Home Screen</b>. On Android Chrome, tap ⋮ then <b>Install app</b>. It opens full screen and works offline.</li><li>On your laptop, Chrome and Edge show an install icon in the address bar.</li></ol>
    <p class="note">Entries you add offline save on the device and sync when you're back online.</p><p class="note">Version ${esc((document.querySelector('meta[name=build]')?.content||'').replace('__BUILD__','local'))}</p></section>
  <section class="card s12 sect"><div class="ch" style="margin:0"><h2>Accounts</h2><button class="btn" data-act="addAcc">+ Add account</button></div>
    <div>${accs().map(a=>{const b=balance(a.id);return `<div class="row"><span class="ic" style="--c:var(--ink)">${ico(a.type==='upi'?'upi':a.type)}</span><input class="inp" data-accf="name" data-id="${esc(a.id)}" value="${esc(a.name)}" aria-label="Account name"><select data-accf="type" data-id="${esc(a.id)}" aria-label="Account type">${Object.entries(ACC_TYPES).map(([k,l])=>`<option value="${k}" ${k===a.type?'selected':''}>${l}</option>`).join('')}</select><div class="money"><span>${esc(sym())}</span><input class="inp" data-accf="opening" data-id="${esc(a.id)}" inputmode="decimal" value="${(+a.opening||0)/100}" aria-label="Starting balance"></div><span class="bal" title="Current balance">${money(b,{round:1})} ${used(a.id)||accs().length<2?'':`<button class="ib" data-act="delAcc" data-id="${esc(a.id)}" aria-label="Delete ${esc(a.name)}">${ico('trash',18)}</button>`}</span></div>`}).join('')}</div>
    <p class="note">The money field is the starting balance. The bold figure is the balance now.</p></section>
  <section class="card s12 sect"><div class="ch" style="margin:0"><h2>Categories</h2><span class="btns"><button class="btn" data-act="addCat" data-kind="out">+ Spending</button><button class="btn" data-act="addCat" data-kind="in">+ Income</button></span></div>
    <div>${S.meta.categories.map(c=>`<div class="row crow"><span class="ic" style="--c:${esc(c.color)}">${ico(c.icon)}</span><input class="inp" data-catf="name" data-id="${esc(c.id)}" value="${esc(c.name)}" aria-label="Category name"><select data-catf="icon" data-id="${esc(c.id)}" aria-label="Icon">${ICON_KEYS.map(k=>`<option value="${k}" ${k===c.icon?'selected':''}>${k==='edu'?'education':k} icon</option>`).join('')}</select><input type="color" data-catf="color" data-id="${esc(c.id)}" value="${esc(c.color)}" aria-label="Colour"><span class="bal"><small>${c.kind==='in'?'Income':'Spending'}</small> ${cused(c.id)?'':`<button class="ib" data-act="delCat" data-id="${esc(c.id)}" aria-label="Delete ${esc(c.name)}">${ico('trash',18)}</button>`}</span></div>`).join('')}</div></section>
  <section class="card s12 sect"><h2>Your data</h2>
    <div class="btns"><button class="btn" data-act="csv">Export CSV</button><button class="btn" data-act="json">Full backup (JSON)</button><button class="btn" data-act="import">Import CSV or backup</button>
    ${hasSample?`<button class="btn" data-act="unsample">Remove sample data</button>`:`<button class="btn" data-act="sample">Add sample data</button>`}
    <button class="btn danger" data-act="wipe">${wipeArm?'Tap again to delete everything':'Delete all my data'}</button></div>
    <p class="note">CSV columns: date, type (spent / received), amount, category, account, note, tags. Imports skip rows you already have.</p>
    <textarea id="dlbox" class="inp" style="display:none;min-height:140px;padding:10px;font:13px/1.4 ui-monospace,monospace" readonly aria-label="Exported data"></textarea></section>
  </div>`;
}

function render(){
  const a=document.activeElement,aid=a&&a.id&&$('#view').contains(a)?a.id:null,sel=aid&&a.selectionStart;
  $$('[data-v]').forEach(el=>el.classList.toggle('on',el.dataset.v===view));
  try{if(view==='home')renderHome();else if(view==='timeline')renderTimeline();else if(view==='budgets')renderBudgets();else if(view==='goals')renderGoals();else if(view==='review')renderReview();else renderMore()}
  catch(e){console.error(e);$('#view').innerHTML=`<div class="card"><h2>Something went wrong on this screen</h2><p class="note">Your entries are safe. Try another tab, or reload. If it keeps happening, share this message: <code>${esc(String(e&&e.message||e))}</code></p></div>`}
  $$('.wi').forEach(b=>{try{whatIf(b)}catch(e){console.error(e)}});
  if(aid){const n=document.getElementById(aid);if(n){n.focus();try{if(sel!=null)n.setSelectionRange(sel,sel)}catch(e){}}}
}

/* ---------- add / edit sheet ---------- */
let sh=null;
const fromMinor=a=>String(a/100);
function openSheet(t,kind){
  const k=kind||'out';
  sh=t?{id:t.id,k:t.k,amt:fromMinor(t.a),c:t.c,acc:t.acc,to:t.to||'',d:t.d,m:t.m||'',tags:(t.tags||[]).join(' '),orig:t,picked:true,all:false,w:t.w}
      :{k,amt:'',c:usage(k)[0]?.id,acc:acc(S.meta.lastAcc)?S.meta.lastAcc:accs()[0].id,to:'',d:todayISO(),m:'',tags:'',picked:false,all:false};
  sh.rate=safe(payRate)||0;sh.goal=safe(nearGoal)||null;
  drawSheet();$('#ov').classList.add('show');document.body.style.overflow='hidden';
}
function closeSheet(){$('#ov').classList.remove('show');document.body.style.overflow='';sh=null}
function drawSheet(){
  const k=sh.k,list=k==='xfer'?[]:usage(k),shown=sh.all?list:list.slice(0,8);
  if(k!=='xfer'&&!list.some(c=>c.id===sh.c))sh.c=list[0]?.id;
  const chip=(a,attr,sel)=>`<button data-${attr}="${esc(a.id)}" class="${a.id===sel?'on':''}">${ico(a.type==='upi'?'upi':a.type,16)}${esc(a.name)}</button>`;
  $('#sheet').innerHTML=`<div class="grab"></div>
  <div class="seg" role="tablist" style="grid-template-columns:repeat(${sh.orig?.k==='xfer'?3:2},minmax(0,1fr))">${[['out','Spent'],['in','Received'],...(sh.orig?.k==='xfer'?[['xfer','Transfer']]:[])].map(([v,l])=>`<button role="tab" aria-selected="${v===k}" data-k="${v}" class="${v===k?'on':''}">${l}</button>`).join('')}</div>
  <div class="amtd" id="amtd" aria-live="polite"></div><div class="wtl" id="wtl"></div>
  ${k==='xfer'?`<div class="lbl">From</div><div class="chips">${accs().map(a=>chip(a,'acc',sh.acc)).join('')}</div><div class="lbl">To</div><div class="chips">${accs().map(a=>chip(a,'to',sh.to)).join('')}</div>`
  :`<div class="cats">${shown.map(c=>`<button data-cat="${esc(c.id)}" class="${c.id===sh.c?'on':''}" style="--c:${esc(c.color)}"><span class="ic" style="--c:${esc(c.color)}">${ico(c.icon,20)}</span>${esc(c.name)}</button>`).join('')}${list.length>8?`<button data-act="allCats" style="--c:var(--muted)"><span class="ic" style="--c:var(--muted)">${ico('other',20)}</span>${sh.all?'Less':'More'}</button>`:''}</div>
  <div class="chips">${accs().map(a=>chip(a,'acc',sh.acc)).join('')}</div>`}
  <input class="inp" id="sm" style="width:100%;margin-top:8px" placeholder="${k==='in'?'From, e.g. Salary':'Payee or note, e.g. Swiggy'}" value="${esc(sh.m)}" aria-label="Payee or note" autocomplete="off">
  <div class="two" style="margin-top:8px"><input class="inp" id="sd" type="date" value="${esc(sh.d)}" max="${todayISO()}" aria-label="Date"><input class="inp" id="st" placeholder="Tags, e.g. goa" value="${esc(sh.tags)}" aria-label="Tags"></div>
  ${sh.orig&&k==='out'?`<div class="wrow"><span>Was it worth it?</span><button class="btn yes${sh.w===1?' on':''}" data-w="1">${thumb('up',16)}Worth it</button><button class="btn no${sh.w===-1?' on':''}" data-w="-1">${thumb('down',16)}Not really</button></div>`:''}
  <div class="pad">${['1','2','3','4','5','6','7','8','9','.','0','del'].map(x=>`<button data-key="${x}" aria-label="${x==='del'?'Backspace':x}">${x==='del'?ico('del',24):x}</button>`).join('')}</div>
  <div class="sact">${sh.orig?`<button class="btn danger" data-act="sdel" aria-label="Delete entry">${ico('trash')}</button>`:`<button class="btn" data-act="close">Cancel</button>`}<button class="btn pri" data-act="save">${sh.orig?'Update':'Save'}</button></div>`;
  updAmt();
}
function updAmt(){const el=$('#amtd');if(!el)return;const a=sh.amt;el.textContent=sym()+' '+(a?Number(a.split('.')[0]||0).toLocaleString(S.meta.currency==='INR'?'en-IN':'en-US')+(a.includes('.')?'.'+a.split('.')[1]:''):'0');el.classList.toggle('zero',!a);
  const w=$('#wtl');if(w){const v=Math.round(parseFloat(a||'0')*100),p=sh.k==='out'&&v?[workTime(v,sh.rate),goalTime(v,sh.goal)].filter(Boolean):[];w.textContent=p.length?'≈ '+p.join(' · '):''}}
function key(k){let a=sh.amt;if(k==='del')a=a.slice(0,-1);else if(k==='.'){if(!a.includes('.'))a=(a||'0')+'.'}
  else{if(a.includes('.')&&a.split('.')[1].length>=2)return;if(a==='0')a='';if(a.replace('.','').length>=9)return;a+=k}sh.amt=a;updAmt()}
const parseTags=s=>[...new Set(String(s||'').split(/[\s,]+/).map(x=>x.replace(/^#/,'').trim().toLowerCase()).filter(Boolean))].slice(0,8);
function saveSheet(){
  const a=Math.round(parseFloat(sh.amt||'0')*100);
  if(!a){const el=$('#amtd');el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');snack('Type an amount first');return}
  if(sh.k==='xfer'&&(!sh.to||sh.to===sh.acc)){snack('Pick two different accounts');return}
  const t={id:sh.id||newId(),k:sh.k,a,c:sh.k==='xfer'?null:sh.c||null,acc:sh.acc,to:sh.k==='xfer'?sh.to:null,d:sh.d||todayISO(),m:sh.m.trim().slice(0,80),tags:parseTags(sh.tags),t:sh.orig?.t||Date.now()};
  if(sh.orig?.s)t.s=1;if(sh.w!=null&&t.k==='out')t.w=sh.w;
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
  const need=[['bank','HDFC Bank','bank',4500000],['upi','Google Pay','upi',3000000],['card','Credit card','card',0]];
  for(const [id,name,type,opening] of need)if(!acc(id))S.meta.accounts.push({id,name,type,opening});
  if(!acc('cash'))S.meta.accounts.unshift({id:'cash',name:'Cash',type:'cash',opening:200000});
  if(!Object.keys(S.meta.budgets).length&&!S.meta.budget)S.meta.budgets={food:900000,transport:350000,rent:2200000,bills:400000,shopping:500000,health:150000,fun:250000,other:100000};
  const now=new Date(),keys=new Set(['meta']);
  const add=(d,k,a,c,ac,m,to)=>{const mk=d.slice(0,7);(S.months[mk]=S.months[mk]||[]).push({id:newId(),k,a:Math.round(a)*100,c:k==='xfer'?null:c,acc:ac,to:to||null,d,m,tags:[],t:Date.now()+Math.floor(r()*1e6),s:1});keys.add('m-'+mk)};
  for(let back=2;back>=0;back--){const y=now.getFullYear(),mo=now.getMonth()-back,dim=new Date(y,mo+1,0).getDate(),last=back?dim:now.getDate();
    for(let day=1;day<=last;day++){const d=iso(new Date(y,mo,day));
      if(day===1)add(d,'in',85000,'salary','bank','Salary');
      if(day===3)add(d,'out',22000,'rent','bank','Rent');
      if(day===7)add(d,'out',799,'bills','card','Airtel postpaid');
      if(day===10)add(d,'out',1450+r()*700,'bills','upi','Electricity bill');
      if(day===12)add(d,'out',649,'fun','card','Netflix');
      if(r()<.8)add(d,'out',pick([20,20,25,30]),'food','upi','Chai');
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
  if(uid&&sb){try{clearTimeout(flushT);for(const t of ['goals','transactions','budgets','categories','accounts']){const{error}=await sb.from(t).delete().eq('user_id',uid);if(error)throw error}
      const{error}=await sb.from('profiles').delete().eq('id',uid);if(error)throw error;base={uid,profiles:{},accounts:{},categories:{},budgets:{},transactions:{},goals:{}};saveBase()}
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
  if(t===$('#gov')){$('#gov').classList.remove('show');ge=null;return}
  const go=t.closest('[data-go]');if(go){location.hash=go.dataset.go;return}
  if(sh){const k=t.closest('[data-k]'),c=t.closest('[data-cat]'),ac=t.closest('[data-acc]'),to=t.closest('[data-to]'),ky=t.closest('[data-key]');
    if(k){sh.k=k.dataset.k;sh.c=null;if(sh.k==='xfer'&&!sh.to)sh.to=(accs().find(a=>a.id!==sh.acc)||{}).id||'';drawSheet();return}
    if(c){sh.c=c.dataset.cat;sh.picked=true;$$('#sheet [data-cat]').forEach(b=>b.classList.toggle('on',b===c));return}
    if(ac){sh.acc=ac.dataset.acc;$$('#sheet [data-acc]').forEach(b=>b.classList.toggle('on',b===ac));return}
    if(to){sh.to=to.dataset.to;$$('#sheet [data-to]').forEach(b=>b.classList.toggle('on',b===to));return}
    if(ky){key(ky.dataset.key);return}
    const wb=t.closest('[data-w]');if(wb){const v=+wb.dataset.w;sh.w=sh.w===v?0:v;$$('#sheet [data-w]').forEach(b=>b.classList.toggle('on',+b.dataset.w===sh.w));return}}
  const rm=t.closest('[data-rvm]');if(rm){rvMode=rm.dataset.rvm;render();return}
  const rw=t.closest('[data-rvw]');if(rw){rvWeek=rw.dataset.rvw;render();window.scrollTo(0,0);return}
  const hd=t.closest('[data-day]');if(hd){tl.day=hd.dataset.day;tl.c='';tl.k='';location.hash='timeline';return}
  const fc=t.closest('[data-fcat]');if(fc){tl.c=fc.dataset.fcat;tl.day='';location.hash='timeline';return}
  if(!act)return;
  const id=A.dataset.id;
  switch(act){
    case 'add':openSheet();break;
    case 'gnew':openGoal();break;
    case 'rate':rate(id,+A.dataset.v);break;
    case 'wrOpen':openWrap(A.dataset.m);break;
    case 'wrClose':closeWrap();break;
    case 'wrNext':if(wr.i<wr.n-1){wr.i++;drawWrap()}break;
    case 'wrPrev':if(wr.i>0){wr.i--;drawWrap()}break;
    case 'wrNextM':wr.mk=shiftM(wr.mk,1);wr.i=0;drawWrap();break;
    case 'wrPrevM':wr.mk=shiftM(wr.mk,-1);wr.i=0;drawWrap();break;
    case 'wrYear':wr.year=!wr.year;wr.i=0;if(!wr.year&&wr.mk>curMonth())wr.mk=curMonth();drawWrap();break;
    case 'wrHide':wr.hide=!wr.hide;drawWrap();break;
    case 'wrSave':wrapImage();break;
    case 'rvPrev':rvWeek=addD(rvWeek,-7);render();break;
    case 'rvNext':rvWeek=addD(rvWeek,7);render();break;
    case 'rvSave':{const g=goalById(id),v=+A.dataset.v;if(g&&v){const un=addSaving(g,v);snack(`Added ${money(v)} to ${g.name}`,'',un)}break}
    case 'gidea':openGoal(null,{n:A.dataset.n,t:+A.dataset.t,mo:+A.dataset.mo});break;
    case 'gedit':openGoal(goalById(id));break;
    case 'gclose':$('#gov').classList.remove('show');ge=null;break;
    case 'gsave':saveGoal();break;
    case 'gdel':{const g=goalById(id);if(!g)break;const i=goals().indexOf(g);goals().splice(i,1);touch();render();snack(`Deleted ${g.name}`,'',()=>{goals().splice(i,0,g);touch();render()});break}
    case 'gadd':{const inp=$(`[data-gsave="${CSS.escape(id)}"]`),v=Math.round((parseFloat(String(inp?.value||'').replace(/[^\d.]/g,''))||0)*100);const g=goalById(id);if(!g)break;if(!v){snack('Type how much you set aside');inp&&inp.focus();break}const un=addSaving(g,v);snack(`Added ${money(v)} to ${g.name}`,'',un);break}
    case 'glogdel':{const g=goalById(id),i=+A.dataset.i,e=g&&g.log[i];if(!e)break;g.log.splice(i,1);g.saved=Math.max(0,(g.saved||0)-e.a);touch();render();snack('Removed from history','',()=>{g.log.splice(i,0,e);g.saved+=e.a;touch();render()});break}
    case 'cutm':case 'cutp':{const g=goalById(id),r=lastPlan.plans[id]?.rows?.find(x=>x.key===A.dataset.key);if(!g||!r)break;const up=act==='cutp',st=r.kind==='count'?r.ticket:10000;
      let v=r.kind==='count'?(Math.max(1,Math.round(r.take/st))+(up?1:-1))*st:(up?floorTo(r.take,st)+st:ceilTo(r.take,st)-st);
      if(v<st*.99){snack('That is the smallest step. Switch it off to drop it.');break}if(v>r.max+1){if(r.take>=r.max-1){snack('That is everything you spend there.');break}v=r.max}
      g.adj[r.key]=Math.round(v);touch();render();break}
    case 'greset':{const g=goalById(id);if(g){g.off={};g.adj={};touch();render();snack('Back to the suggested plan')}break}
    case 'copysql':navigator.clipboard.writeText(A.dataset.v).then(()=>snack('Copied'),()=>snack('Select the line and copy it'));break;
    case 'gapply':applyGoal(id);break;
    case 'gdate':{const g=goalById(id);if(g){g.date=A.dataset.v;touch();render();snack('Date moved to '+monthYear(g.date))}break}
    case 'gtarget':{const g=goalById(id);if(g){g.target=+A.dataset.v;touch();render();snack('Target set to '+money(g.target))}break}
    case 'gsur':{const g=goalById(id);if(g){const v=+A.dataset.v;try{localStorage.setItem('spendo-sur-'+A.dataset.m,'1')}catch(e){}addSaving(g,v);snack(`Added ${money(v)} to ${g.name}`)}break}
    case 'gsurno':try{localStorage.setItem('spendo-sur-'+A.dataset.m,'1')}catch(e){}render();break;
    case 'addIncome':openSheet(null,'in');break;
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
  if(wr){if(e.key==='Escape')closeWrap();else if(e.key==='ArrowRight'&&wr.i<wr.n-1){wr.i++;drawWrap()}else if(e.key==='ArrowLeft'&&wr.i>0){wr.i--;drawWrap()}return}
  if(ge&&e.key==='Escape'){$('#gov').classList.remove('show');ge=null;return}
  if(ge&&e.key==='Enter'&&e.target.tagName==='INPUT'){e.preventDefault();saveGoal();return}
  if(!sh)return;const tag=e.target.tagName;
  if(e.key==='Escape'){closeSheet();return}
  if(e.key==='Enter'&&tag!=='TEXTAREA'){e.preventDefault();saveSheet();return}
  if(tag==='INPUT'||tag==='SELECT')return;
  if(/^[0-9.]$/.test(e.key)){key(e.key);e.preventDefault()}else if(e.key==='Backspace'){key('del');e.preventDefault()}});
document.addEventListener('toggle',e=>{const d=e.target;if(!d.dataset||!d.dataset.gd)return;const k=d.dataset.gd;if(d.open){gOpen.add(k);gOpen.delete(k+':x')}else{gOpen.delete(k);gOpen.add(k+':x')}},true);
document.addEventListener('input',e=>{const t=e.target;
  if(t.matches&&t.matches('[data-wi]')){whatIf(t.closest('.wi'));return}
  if(t.id==='q'){tl.q=t.value;render();return}
  if(!sh)return;
  if(t.id==='sm'){sh.m=t.value;if(!sh.picked&&sh.k!=='xfer'){const v=t.value.trim().toLowerCase();if(v.length>1){const hit=sortTx(allTx()).find(x=>x.k===sh.k&&x.c&&(x.m||'').toLowerCase()===v);if(hit&&hit.c!==sh.c){sh.c=hit.c;$$('#sheet [data-cat]').forEach(b=>b.classList.toggle('on',b.dataset.cat===hit.c));if(!$(`#sheet [data-cat="${CSS.escape(hit.c)}"]`)){sh.all=true;const m=sh.m;drawSheet();const i=$('#sm');i.value=m;i.focus()}}}}}
  else if(t.id==='sd')sh.d=t.value;else if(t.id==='st')sh.tags=t.value});
document.addEventListener('change',async e=>{const t=e.target;
  if(t.dataset.cut){const g=goalById(t.dataset.id);if(g){if(t.checked)delete g.off[t.dataset.cut];else{g.off[t.dataset.cut]=1;delete g.adj[t.dataset.cut]}touch();render()}return}const num=v=>{const n=parseFloat(String(v).replace(/[^\d.]/g,''));return n>0?Math.round(n*100):0};
  if(t.id==='fk'){tl.k=t.value;render()}else if(t.id==='fc'){tl.c=t.value;render()}else if(t.id==='fa'){tl.acc=t.value;render()}
  else if(t.id==='budAll'){S.meta.budget=num(t.value);touch('meta');render()}
  else if(t.dataset.bud){const v=num(t.value);if(v)S.meta.budgets[t.dataset.bud]=v;else delete S.meta.budgets[t.dataset.bud];touch('meta');render()}
  else if(t.id==='wdays'){const n=Math.round(+t.value);S.meta.workDays=n>=1&&n<=31?n:22;touch();render()}
  else if(t.id==='nm'){S.meta.name=t.value.trim().slice(0,40);touch('meta')}
  else if(t.id==='cur'){S.meta.currency=t.value;nfc={};touch('meta');render()}
  else if(t.dataset.accf){const a=acc(t.dataset.id);if(!a)return;const f=t.dataset.accf;if(f==='opening'){const n=parseFloat(String(t.value).replace(/[^\d.\-]/g,''));a.opening=isNaN(n)?0:Math.round(n*100)}else a[f]=f==='name'?(t.value.trim().slice(0,40)||'Account'):t.value;touch('meta');render()}
  else if(t.dataset.catf){const c=cat(t.dataset.id);if(!c)return;const f=t.dataset.catf;c[f]=f==='name'?(t.value.trim().slice(0,30)||'Category'):t.value;touch('meta');render()}
  else if(t.id==='file'){const f=t.files[0];t.value='';if(!f)return;const text=await f.text();if(/\.json$/i.test(f.name)||text.trim().startsWith('{'))importJSON(text);else importCSV(text)}});

{const h=location.hash.slice(1);if(['timeline','budgets','goals','review','more'].includes(h))view=h}
render();setSync();initAuth();
for(const el of [$('#sync1'),$('#sync2')])if(el){el.style.cursor='pointer';el.title='Sync details';el.addEventListener('click',()=>{location.hash='more'})}
if('serviceWorker' in navigator&&location.protocol==='https:'){const had=!!navigator.serviceWorker.controller;let reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!reloaded&&!sh&&!ge){reloaded=true;location.reload()}});
  addEventListener('load',()=>navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}))}
}
