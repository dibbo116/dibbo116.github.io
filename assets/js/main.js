/* starfield */
const cv=document.getElementById('stars'),x=cv.getContext('2d');
let W,H,stars=[],shoot=[];
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;
  stars=Array.from({length:Math.min(220,Math.floor(innerWidth/6))},()=>({
    x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.2,
    a:Math.random()*6,tw:Math.random()*.02+.005,vy:Math.random()*.06+.02}));}
resize();addEventListener('resize',resize);
function draw(){
  x.clearRect(0,0,W,H);
  for(const s of stars){s.a+=s.tw;const o=(Math.sin(s.a)*.5+.5)*.85+.15;
    x.beginPath();x.fillStyle='rgba(200,220,255,'+o+')';x.arc(s.x,s.y,s.r,0,7);x.fill();
    s.y+=s.vy;if(s.y>H){s.y=0;s.x=Math.random()*W}}
  if(Math.random()<.004&&shoot.length<2)shoot.push({x:Math.random()*W,y:Math.random()*H*.4,l:0});
  for(let i=shoot.length-1;i>=0;i--){const m=shoot[i];m.l+=10;
    const g=x.createLinearGradient(m.x,m.y,m.x-m.l,m.y+m.l*.5);
    g.addColorStop(0,'rgba(200,220,255,.9)');g.addColorStop(1,'rgba(200,220,255,0)');
    x.strokeStyle=g;x.lineWidth=1.6;x.beginPath();x.moveTo(m.x,m.y);x.lineTo(m.x-m.l,m.y+m.l*.5);x.stroke();
    if(m.l>200)shoot.splice(i,1);}
  requestAnimationFrame(draw);}
draw();

/* bidirectional reveal — panels assemble in / disperse out */
const io=new IntersectionObserver(es=>{es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting));},
  {threshold:.12,rootMargin:'-6% 0px -6% 0px'});
document.querySelectorAll('.panel').forEach(el=>io.observe(el));

/* nav shrink */
addEventListener('scroll',()=>{document.getElementById('nav').style.padding=
  scrollY>40?'12px clamp(24px,5vw,64px)':'20px clamp(24px,5vw,64px)';},{passive:true});
