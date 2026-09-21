const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
window.addEventListener("load",()=>setTimeout(()=>{const b=$("#boot");b.style.opacity="0";setTimeout(()=>b.remove(),650)},1850));
function clock(){const d=new Date();$("#liveClock").textContent=d.toLocaleTimeString("en-IN",{hour12:false})}clock();setInterval(clock,1000);
addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;$("#progress").style.width=(h?scrollY/h*100:0)+"%"});
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("show")),{threshold:.14});$$(".reveal").forEach(e=>io.observe(e));
$("#menu").onclick=()=>$("#mobileMenu").classList.toggle("open");$$("#mobileMenu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
$$(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")});
const portrait=$("#portraitCard");portrait.addEventListener("pointermove",e=>{const r=portrait.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portrait.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(12px)`});portrait.addEventListener("pointerleave",()=>portrait.style.transform="");
$$(".magnetic-card").forEach(card=>card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-3px)`;card.style.setProperty("--mx",`${(x+.5)*100}%`);card.style.setProperty("--my",`${(y+.5)*100}%`)}));
$$(".magnetic-card").forEach(card=>card.addEventListener("pointerleave",()=>card.style.transform=""));
const cursor=$("#cursor"),dot=$("#dot");addEventListener("pointermove",e=>{cursor.style.transform=`translate(${e.clientX-12}px,${e.clientY-12}px)`;dot.style.transform=`translate(${e.clientX-2}px,${e.clientY-2}px)`});
const palette=$("#palette"),input=$("#commandInput"),list=$("#commandList"),cmds=[["Projects","#projects"],["About","#about"],["Stack","#stack"],["Experience","#experience"],["Contact","#contact"],["Resume","assets/resume/Priyanshu-Kumar-Resume.pdf"],["GitHub","https://github.com/priyanshu18611"],["LinkedIn","https://www.linkedin.com/in/priyanshuroy18"]];
function render(q=""){list.innerHTML=cmds.filter(x=>x[0].toLowerCase().includes(q.toLowerCase())).map((x,i)=>`<div class="command-item" data-i="${i}">${x[0]}</div>`).join("");$$(".command-item").forEach(e=>e.onclick=()=>{const u=cmds[e.dataset.i][1];palette.classList.remove("open");u[0]=="#"?document.querySelector(u).scrollIntoView({behavior:"smooth"}):window.open(u,"_blank")})}render();
$("#command").onclick=()=>{palette.classList.add("open");input.value="";render();setTimeout(()=>input.focus(),20)};input.oninput=e=>render(e.target.value);palette.onclick=e=>{if(e.target===palette)palette.classList.remove("open")};addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=="k"){e.preventDefault();$("#command").click()}if(e.key=="Escape")palette.classList.remove("open")});
if(window.THREE){const canvas=$("#scene"),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.1,100),renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});const mobile=innerWidth<800;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.15:1.6));renderer.setSize(innerWidth,innerHeight);camera.position.z=6;
const count=mobile?500:1100,arr=new Float32Array(count*3);for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=THREE.MathUtils.randFloat(2.5,10);arr[i*3]=Math.cos(a)*r;arr[i*3+1]=Math.sin(a)*r;arr[i*3+2]=(Math.random()-.5)*8}const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(arr,3));const mat=new THREE.PointsMaterial({color:0xffffff,size:mobile?.022:.028,transparent:true,opacity:.5});const stars=new THREE.Points(geo,mat);scene.add(stars);
const torus=new THREE.Mesh(new THREE.TorusGeometry(2.1,.006,8,160),new THREE.MeshBasicMaterial({color:0x9a9a9a,transparent:true,opacity:.2}));scene.add(torus);
let tx=0,ty=0,mx=0,my=0;addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*.7;ty=(e.clientY/innerHeight-.5)*.45});function animate(t){mx+=(tx-mx)*.02;my+=(ty-my)*.02;stars.rotation.y=t*.00002+mx;stars.rotation.x=t*.000012+my;torus.rotation.x=t*.00008+my;torus.rotation.y=t*.00012+mx;camera.position.x=mx*.35;camera.position.y=-my*.2;camera.lookAt(0,0,0);renderer.render(scene,camera);requestAnimationFrame(animate)}requestAnimationFrame(animate);addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.15:1.6));renderer.setSize(innerWidth,innerHeight)})}

// Live GitHub repository vault — all public repositories, newest first.
(async function(){
 const grid=document.getElementById("repoGrid"), status=document.getElementById("repoStatus");
 if(!grid) return;
 try{
   const r=await fetch("https://api.github.com/users/priyanshu18611/repos?per_page=100&sort=updated");
   if(!r.ok) throw new Error("GitHub API unavailable");
   const repos=await r.json();
   status.textContent=`${repos.length} PUBLIC REPOSITORIES // LIVE`;
   grid.innerHTML=repos.map(repo=>`
    <article class="repo-card">
      <div><small>${(repo.language||"CODE").toUpperCase()}</small><b>${repo.name.replaceAll("-"," ")}</b>
      <p>${(repo.description||"Public engineering repository.").slice(0,120)}</p></div>
      <footer><span>★ ${repo.stargazers_count}</span><a href="${repo.html_url}" target="_blank">OPEN ↗</a></footer>
    </article>`).join("");
 }catch(e){
   status.textContent="GITHUB LIVE FEED UNAVAILABLE";
   grid.innerHTML='<article class="repo-card"><div><small>GITHUB</small><b>OPEN REPOSITORY VAULT</b><p>Browse every public project directly on GitHub.</p></div><footer><a href="https://github.com/priyanshu18611" target="_blank">OPEN PROFILE ↗</a></footer></article>';
 }
})();
