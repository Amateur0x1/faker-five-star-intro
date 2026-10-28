/* Reference-specific foreground. All motion is one deterministic HyperFrames timeline.
 * Generic logo/caption catalog blocks cannot reproduce this five-star/T1 geometry,
 * reference UI tunnel, or custom extruded FAKER glyphs, so these are procedural SVG.
 */
(() => {
'use strict';
const NS='http://www.w3.org/2000/svg';
const starPath='M73 6 L90 50 L139 52 L101 82 L114 129 L73 101 L32 129 L45 82 L7 52 L56 50Z';
function starSVG(id){return `<svg viewBox="0 0 146 150"><defs><linearGradient id="star-side-${id}" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#f3305b"/><stop offset=".45" stop-color="#b60040"/><stop offset="1" stop-color="#5b001f"/></linearGradient></defs><path d="${starPath}" transform="translate(0,16)" fill="url(#star-side-${id})" stroke="#e44d68" stroke-width="1.4"/><path d="M7 52 L7 68 L45 98 L45 82Z M32 129 L32 145 L73 117 L73 101Z M114 129 L114 145 L101 98 L101 82Z M139 52 L139 68 L101 98 L101 82Z" fill="#ab003b"/><path d="${starPath}" fill="#fff"/></svg>`}
for(let i=0;i<5;i++){
 const el=document.createElement('div');el.id=`star-${i}`;el.className='champion-star';el.innerHTML=starSVG(i);document.getElementById('stars').appendChild(el);
 const ref=document.createElement('div');ref.id=`reflection-${i}`;ref.className='star-reflection';ref.innerHTML=starSVG(`r${i}`);document.getElementById('star-reflections').appendChild(ref);
}
const logoSmall=`<svg viewBox="0 0 320 150"><g fill="currentColor"><path d="M20 28H255L222 55H94Q48 55 20 28ZM70 65H215L198 83H94ZM99 94H189L171 111H123ZM226 45H264L185 142H149Z M276 28H312L232 142H204Z"/></g></svg>`;
function trophySVG(count=10){let s='<svg viewBox="0 0 500 205"><g fill="currentColor">';for(let i=0;i<count;i++){const x=18+i*47; s+=`<g transform="translate(${x},${i%2?19:0}) scale(.9)"><path d="M8 8H37L34 36Q31 48 26 49V64H36V72H9V64H19V49Q11 45 10 32Z"/><path d="M8 12H0V28Q0 44 16 45V38Q5 38 5 26V18H9ZM37 12H46V28Q46 44 30 45V38Q41 38 41 26V18H36Z"/></g>`;}for(let i=0;i<12;i++){s+=`<g transform="translate(${12+i*40},105) scale(.6)"><path d="M8 8H37L34 36Q31 48 26 49V64H36V72H9V64H19V49Q11 45 10 32Z"/><path d="M8 12H0V28Q0 44 16 45V38Q5 38 5 26V18H9ZM37 12H46V28Q46 44 30 45V38Q41 38 41 26V18H36Z"/></g>`;}return s+'</g><text x="250" y="202" text-anchor="middle" fill="currentColor" font-size="26" font-family="Faker Display, sans-serif">TROPHY COLLECTION</text></svg>'}
function gameSVG(seed){let s='<svg class="game-svg" viewBox="0 0 600 320"><rect width="600" height="320" fill="currentColor" opacity=".2"/><g fill="none" stroke="currentColor">';s+='<path d="M-30 300L130 220L180 190L265 205L300 130L380 125L490 35L630-20" stroke-width="50" opacity=".16"/><path d="M0 275L130 215L200 180L280 185L330 120L400 100L510 20" stroke-width="7" opacity=".6"/>';for(let i=0;i<36;i++){let x=(i*127+seed*31)%590,y=(i*71+seed*29)%260;s+=`<path d="M${x} ${y} l-16 24h32Z" opacity=".3" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${4+i%5}" fill="currentColor" opacity=".2"/>`;}s+='</g>';for(let i=0;i<9;i++){let x=70+(i*67)%460,y=70+(i*43)%165;s+=`<circle cx="${x}" cy="${y}" r="11" fill="currentColor"/><rect x="${x-16}" y="${y-19}" width="32" height="4" fill="white" opacity=".8"/>`;}s+='<rect x="0" y="290" width="600" height="30" fill="currentColor" opacity=".25"/>';for(let i=0;i<11;i++)s+=`<rect x="${176+i*22}" y="296" width="17" height="17" rx="2" fill="white" opacity=".3"/>`;return s+'</svg>'}
function playersSVG(){let s='<svg viewBox="0 0 600 300"><g fill="currentColor">';for(let i=0;i<5;i++){let x=60+i*115;s+=`<g transform="translate(${x},${i%2*12})"><circle cx="0" cy="78" r="30"/><path d="M-30 112Q-65 115-62 220L-39 220L-30 166L-28 284H27L31 166L39 220H62Q63 119 30 112Z"/><path d="M-39 136L-79 86L-68 41L-50 46L-48 79L-10 117ZM39 136L79 86L68 41L50 46L48 79L10 117Z" opacity=".6"/></g>`;}return s+'</g></svg>'}
function content(kind,seed){
 if(kind==='trophies')return trophySVG();
 if(kind==='game')return gameSVG(seed);
 if(kind==='players')return playersSVG();
 if(kind==='logo')return `<div style="height:57%;width:55%;margin:auto">${logoSmall}</div><div class="panel-mini-title" style="text-align:center">THE GREATEST OF ALL TIME</div><div class="micro" style="text-align:center">WORLD CHAMPIONS · T1</div>`;
 if(kind==='roster')return '<div class="roster"><span>2025 T1</span><span>DORAN</span><span>ONER</span><span>FAKER</span><span>GUMAYUSI</span><span>KERIA</span><span>KKOMA</span><span>TOM</span><span>MATA</span></div>';
 if(kind==='chat')return ['우리형　이름이뭐??','FAKER-T1　와…','4EVERGOAT　신의경지다','불굴의정신　하드캐리','페이커　미쳤다ㅋㅋ','고전파입니다　페이커시여…'].map(t=>`<div class="row">${t}</div>`).join('');
 return `<div class="wireframe"></div>${Array.from({length:7},(_,i)=>`<div class="row">${i===0?'T1 WORLD CHAMPIONS':i===2?'THE UNKILLABLE DEMON KING':'— — — — — — — —'}</div>`).join('')}`;
}
function panel(parent,id,x,y,w,h,kind,pastel=false,seed=0){let el=document.createElement('div');el.id=id;el.className=`retro-panel ${pastel?'pastel-panel':'space-panel'}`;Object.assign(el.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});el.setAttribute('data-layout-allow-overflow','true');el.innerHTML=`<div class="bar"><span>${kind==='game'?'T1 FAKER':kind==='trophies'?'TROPHY COLLECTION':'T1 WORLD · 2025'}</span><span><i></i><i></i><i></i></span></div><div class="content">${content(kind,seed)}</div>${pastel&&kind==='chat'?'<div class="panel-shadow"></div>':''}`;parent.appendChild(el);return el}
const space=document.getElementById('desktop-space');
const spaceSpecs=[[-150,-80,380,360,'wire'],[160,35,200,210,'wire'],[625,30,210,120,'wire'],[1120,170,175,120,'wire'],[1650,220,230,145,'wire'],[1780,330,290,210,'wire'],[640,415,180,110,'logo'],[1190,430,130,180,'roster'],[-90,710,500,360,'players'],[1370,600,420,260,'players'],[530,760,270,310,'wire'],[1260,770,280,250,'wire'],[1600,950,400,230,'wire'],[850,-140,180,200,'wire']];
spaceSpecs.forEach((a,i)=>panel(space,`space-panel-${i}`,...a,false,i));
const pastel=document.getElementById('desktop-pastel');
const pastelSpecs=[[-220,-100,465,370,'wire'],[158,145,600,335,'game'],[1050,-120,840,550,'game'],[-125,615,445,240,'trophies'],[1390,535,285,370,'chat'],[715,985,745,300,'chat'],[340,750,140,185,'roster'],[1810,-130,240,460,'roster'],[-120,955,435,285,'wire'],[1530,940,530,310,'wire']];
pastelSpecs.forEach((a,i)=>panel(pastel,`pastel-panel-${i}`,...a,true,i+2));
const dust=document.getElementById('pastel-dust');for(let i=0;i<62;i++){const dot=document.createElement('i');dot.className='pastel-dot';let r=2+(i*7)%8;Object.assign(dot.style,{left:((i*371+31)%1920)+'px',top:((i*173+21)%1080)+'px',width:r+'px',height:r+'px',background:i%3?'#ae80db':'#d970b5'});dust.appendChild(dot)}
[[1780,500,280,50],[-50,860,140,38],[1510,850,550,45]].forEach(([x,y,w,h])=>{const e=document.createElement('i');e.className='pastel-pill';Object.assign(e.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});dust.appendChild(e)});
// Custom chunky, rounded vector faces match the irregular FAKER wordmark more closely than a generic font.
const glyphs=[
 {d:'M20 9Q20 0 32 0H162Q176 0 176 14V45Q176 59 161 59H87V95H148Q162 95 162 110V140Q162 153 148 153H87V218Q87 232 72 232H34Q20 232 20 218Z',x:10,y:13,r:-7},
 {d:'M13 232Q0 232 4 217L43 15Q46 0 61 0H137Q151 0 155 15L193 217Q196 232 181 232H143Q131 232 128 217L121 188H75L69 217Q66 232 53 232ZM89 133H109L98 61Z',x:212,y:12,r:3},
 {d:'M15 0H60Q74 0 74 14V84L113 13Q120 0 134 0H180Q196 0 188 16L135 109L194 217Q202 232 185 232H139Q124 232 116 218L74 140V217Q74 232 60 232H16Q1 232 1 217V16Q1 0 15 0Z',x:420,y:15,r:0},
 {d:'M16 0H168Q183 0 183 15V44Q183 59 169 59H79V87H158Q173 87 173 102V128Q173 143 158 143H79V173H169Q184 173 184 188V217Q184 232 169 232H16Q1 232 1 216V16Q1 0 16 0Z',x:636,y:14,r:1},
 {d:'M15 0H100Q179 0 185 62Q189 111 157 135L188 215Q195 232 177 232H137Q122 232 117 218L94 159H77V218Q77 232 62 232H16Q1 232 1 217V16Q1 0 15 0ZM77 58V107H98Q117 107 117 83Q117 58 98 58Z',x:850,y:16,r:4}
];
const letters=document.getElementById('letters');glyphs.forEach((g,i)=>{const group=document.createElementNS(NS,'g');group.id='letter-'+i;group.classList.add('letter');group.setAttribute('transform',`translate(${g.x},${g.y}) rotate(${g.r},95,120)`);group.innerHTML=`<path class="letter-shadow" fill-rule="evenodd" d="${g.d}" transform="translate(19,43)"/>`+Array.from({length:22},(_,j)=>`<path class="letter-side" fill-rule="evenodd" d="${g.d}" transform="translate(${(22-j)*.68},${22-j})"/>`).join('')+`<path class="letter-front" fill-rule="evenodd" d="${g.d}"/>`;letters.appendChild(group)});
const tl=window.__timelines.main;
tl.eventCallback('onUpdate',()=>{if(window.renderBackdrop)window.renderBackdrop(tl.time())});
// Opening push-in makes the upper edge of the dark red emblem the stars' landing shelf.
tl.fromTo('#emblem',{scale:1,x:0,y:0},{scale:1.92,x:0,y:190,duration:.28,ease:'power2.out'},0)
 .to('#emblem',{y:250,duration:.85,ease:'sine.inOut'},.28)
 .to('#emblem',{y:1100,opacity:0,duration:.32,ease:'power2.in'},1.14);
const starts=[[-180,-140,-80],[560,-210,40],[1100,-350,-60],[1300,900,95],[2100,20,-65]];
const rowX=[470,710,950,1190,1430];
for(let i=0;i<5;i++){
 let st=starts[i],id='#star-'+i;
 tl.fromTo(id,{x:st[0],y:st[1],rotation:st[2],scale:i===2?.3:.75,opacity:i===2?1:0},{x:rowX[i]-73,y:470,rotation:0,scale:.92,opacity:1,duration:.44,ease:'power2.out'},.04+i*.045);
 tl.to(id,{x:rowX[i]-73,y:465,duration:.55,ease:'sine.inOut'},.56);
 const ax=[590,775,960,1145,1330], ay=[700,650,600,650,700];
 tl.to(id,{x:ax[i]-73,y:ay[i]-73,scale:.96,rotation:0,duration:.55,ease:'power2.inOut'},1.2);
 tl.to(id,{y:ay[i]-73+25,scale:.9,duration:.72,ease:'sine.inOut'},1.75);
 tl.to(id,{x:960-73+(i-2)*39,y:570-73+Math.abs(i-2)*8,scale:.23,duration:.55,ease:'power2.in'},2.56);
 tl.to(id,{x:960-73,y:580-73,scale:.01,opacity:0,duration:.18,ease:'power3.in'},3.11);
 tl.fromTo('#reflection-'+i,{x:rowX[i]-73,y:590,scaleX:.9,scaleY:-.2,opacity:0},{opacity:.22,duration:.2},.36+i*.03).to('#reflection-'+i,{opacity:0,duration:.2},1.12);
}
spaceSpecs.forEach((a,i)=>{
 const cx=a[0]+a[2]/2,cy=a[1]+a[3]/2, dx=(cx-960),dy=(cy-400);
 tl.fromTo('#space-panel-'+i,{x:-dx*.25,y:-dy*.25,scale:.66,opacity:0},{x:0,y:0,scale:1,opacity:.35+(i%3)*.09,duration:.65,ease:'power2.out'},1.3+i*.025);
 tl.to('#space-panel-'+i,{x:dx*.12,y:dy*.12,scale:1.15,duration:.9,ease:'sine.in'},2.1);
 tl.to('#space-panel-'+i,{x:dx*.9,y:dy*.9,scale:1.6,opacity:0,duration:.46,ease:'power3.in'},3.01);
});
// A few closer windows amplify parallax without turning the shot into a flat slideshow.
tl.fromTo('#desktop-space',{rotation:0},{rotation:-1.2,scale:1.06,duration:1.55,ease:'sine.inOut'},1.65);
pastelSpecs.forEach((a,i)=>{const dx=(a[0]+a[2]/2-960),dy=(a[1]+a[3]/2-540);tl.fromTo('#pastel-panel-'+i,{x:dx*.18,y:dy*.18,scale:1.17,opacity:0},{x:0,y:0,scale:1,opacity:.67,duration:.45,ease:'power2.out'},3.43+i*.012);tl.to('#pastel-panel-'+i,{x:dx*.025,y:dy*.025,duration:1,ease:'sine.inOut'},4)});
tl.fromTo('#pastel-dust',{opacity:0},{opacity:.65,duration:.4},3.5).to('#pastel-dust',{y:-12,duration:1.1,ease:'none'},3.9);
tl.fromTo('#flare-wash',{opacity:0},{opacity:.96,duration:.16,ease:'power2.in'},3.24).to('#flare-wash',{opacity:0,duration:.29,ease:'power2.out'},3.4);
tl.fromTo('#title-lockup',{opacity:0,scale:.36,y:-55},{opacity:1,scale:1.035,y:0,duration:.42,ease:'back.out(1.2)'},3.5).to('#title-lockup',{scale:1,duration:.24,ease:'sine.inOut'},3.92);
glyphs.forEach((g,i)=>tl.fromTo('#letter-'+i,{y:55,scale:.8,rotation:g.r+(i%2?-12:12)},{y:0,scale:1,rotation:g.r,duration:.39,ease:'back.out(1.6)'},3.52+i*.035));
tl.fromTo('#title-awards',{opacity:0,y:-12,scale:.6},{opacity:1,y:0,scale:1,duration:.34,ease:'back.out(1.5)'},3.88);
tl.to('#title-lockup',{y:-3,duration:.7,ease:'sine.inOut'},4.3);
tl.to({}, {duration:.001},4.999);
tl.seek(0);if(window.renderBackdrop)window.renderBackdrop(0);
})();
