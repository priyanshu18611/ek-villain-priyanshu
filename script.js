const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const projects={
"CareerPilot AI":{text:"AI-powered career intelligence platform for resume analysis, ATS optimization and career guidance.",tech:["FastAPI","Python","AI","JavaScript"],url:"https://github.com/priyanshu18611/careerpilot-ai"},
"EcoSentinel":{text:"IoT-oriented wildlife conservation system with real-time communication and alert logic.",tech:["MERN","IoT","Socket.io","JWT"],url:"https://github.com/priyanshu18611/EcoSentinel"},
"Enterprise Sales Analytics":{text:"Sales intelligence and customer analytics workflow using SQL, Python and Power BI.",tech:["SQL","Python","Power BI","DAX"],url:"https://github.com/priyanshu18611/enterprise-sales-analytics"},
"Brain Tumor Detection":{text:"MRI image classification project using convolutional neural networks and computer vision.",tech:["CNN","TensorFlow","OpenCV","Python"],url:"https://github.com/priyanshu18611/brain-tumor-detection"},
"Cricket Score Predictor":{text:"Machine-learning project for cricket score prediction using structured match data.",tech:["Python","XGBoost","Scikit-learn"],url:"https://github.com/priyanshu18611/Cricket-Score-Predictor"}
};
window.addEventListener("load",()=>setTimeout(()=>$("#boot").style.display="none",1700));
function clock(){const d=new Date();$("#clock").textContent=d.toLocaleTimeString("en-IN",{hour12:false})} setInterval(clock,1000);clock();
addEventListener("scroll",()=>{$("#progress").style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%"});
const drawer=$("#projectDrawer");
$$(".pnode").forEach(n=>n.onclick=()=>{const p=projects[n.dataset.project];$("#drawerTitle").textContent=n.dataset.project;$("#drawerText").textContent=p.text;$("#drawerTech").innerHTML=p.tech.map(x=>`<span class="tech">${x}</span>`).join("");$("#drawerGithub").href=p.url;drawer.classList.add("open")});
$("#closeDrawer").onclick=()=>drawer.classList.remove("open");
$("#menu").onclick=()=>$("#mobileMenu").classList.toggle("open");
$("#mobileMenu").style.cssText="position:fixed;top:62px;left:0;right:0;z-index:49;background:#080808;padding:25px;display:none;flex-direction:column;gap:20px;border-bottom:1px solid #222";
new MutationObserver(()=>$("#mobileMenu").style.display=$("#mobileMenu").classList.contains("open")?"flex":"none").observe($("#mobileMenu"),{attributes:true});
$$(".mobile-menu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
const palette=$("#palette"), input=$("#command"), commands=$("#commands");
const items=[["Go to Projects","#projects"],["Go to Skills","#skills"],["Go to Experience","#experience"],["Go to Contact","#contact"],["Open Resume","assets/resume/Priyanshu-Kumar-Resume.pdf"],["Open GitHub","https://github.com/priyanshu18611"]];
function renderCommands(q=""){commands.innerHTML=items.filter(x=>x[0].toLowerCase().includes(q.toLowerCase())).map((x,i)=>`<div class="palette-item" data-i="${i}">${x[0]}</div>`).join("");$$(".palette-item").forEach(e=>e.onclick=()=>{const v=items[e.dataset.i][1];palette.classList.remove("open");if(v.startsWith("#"))document.querySelector(v).scrollIntoView({behavior:"smooth"});else window.open(v,"_blank")})} renderCommands();
function openPalette(){palette.classList.add("open");input.value="";renderCommands();setTimeout(()=>input.focus(),30)} $("#commandBtn").onclick=openPalette; input.oninput=e=>renderCommands(e.target.value); palette.onclick=e=>{if(e.target===palette)palette.classList.remove("open")}; addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openPalette()}if(e.key==="Escape")palette.classList.remove("open")});
$$(".magnetic").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.12}px)`}),); $$(".magnetic").forEach(el=>el.addEventListener("pointerleave",()=>el.style.transform=""));
const cursor=$("#cursor"),dot=$("#cursorDot"); addEventListener("pointermove",e=>{cursor.style.transform=`translate(${e.clientX-12}px,${e.clientY-12}px)`;dot.style.transform=`translate(${e.clientX-2}px,${e.clientY-2}px)`});
document.head.insertAdjacentHTML("beforeend",`<style>.cursor,.cursor-dot{position:fixed;pointer-events:none;z-index:120;border:1px solid #fff;border-radius:50%;width:24px;height:24px;mix-blend-mode:difference;transition:transform .08s linear}.cursor-dot{width:4px;height:4px;border:0;background:#fff}@media(max-width:800px){.cursor,.cursor-dot{display:none}}</style>`);
// Three.js ambient world
if(window.THREE){
 const canvas=$("#world"),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,1000);camera.position.z=5;
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.25:1.8));renderer.setSize(innerWidth,innerHeight);
 const count=innerWidth<800?900:1800, pos=new Float32Array(count*3);
 for(let i=0;i<count;i++){const r=THREE.MathUtils.randFloat(2,9),a=Math.random()*Math.PI*2,z=(Math.random()-.5)*8;pos[i*3]=Math.cos(a)*r;pos[i*3+1]=Math.sin(a)*r;pos[i*3+2]=z}
 const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
 const mat=new THREE.PointsMaterial({color:0xffffff,size:innerWidth<800?.018:.025,transparent:true,opacity:.55});
 const pts=new THREE.Points(geo,mat);scene.add(pts);
 let mx=0,my=0,tx=0,ty=0;addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*.7;ty=(e.clientY/innerHeight-.5)*.5});
 function anim(t){mx+=(tx-mx)*.025;my+=(ty-my)*.025;pts.rotation.y=t*.000025+mx;pts.rotation.x=t*.000015+my;camera.position.x=mx*.4;camera.position.y=-my*.25;camera.lookAt(0,0,0);renderer.render(scene,camera);requestAnimationFrame(anim)} requestAnimationFrame(anim);
 addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.25:1.8));renderer.setSize(innerWidth,innerHeight)});
}
// Project field drag
const field=$("#projectField");let down=false,sx=0,sy=0,rx=0,ry=0;field.addEventListener("pointerdown",e=>{down=true;sx=e.clientX;sy=e.clientY});addEventListener("pointerup",()=>down=false);addEventListener("pointermove",e=>{if(!down)return;ry+=(e.clientX-sx)*.12;rx+=(e.clientY-sy)*.08;sx=e.clientX;sy=e.clientY;field.style.transform=`perspective(900px) rotateX(${rx*.03}deg) rotateY(${ry*.03}deg)`});
