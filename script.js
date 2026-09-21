const DATA = {
  github: "priyanshu18611",
  featured: [
    {title:"CareerPilot AI", desc:"AI-powered career intelligence platform for resume analysis, ATS optimization, job matching, career coaching, interview preparation and roadmaps.", tags:["Python","FastAPI","AI","REST APIs","Full Stack"], url:"https://github.com/priyanshu18611/careerpilot-ai"},
    {title:"EcoSentinel", desc:"IoT wildlife monitoring concept with real-time monitoring, maps, alerts, geofencing and authenticated communication.", tags:["MERN","Socket.io","JWT","IoT","Leaflet"], url:"https://github.com/priyanshu18611/EcoSentinel"},
    {title:"Enterprise Sales Analytics", desc:"Business intelligence workflow using Python ETL, SQL analytics, RFM segmentation, cohort analysis, Power BI and DAX KPIs.", tags:["Python","SQL","Power BI","DAX"], url:"https://github.com/priyanshu18611"},
    {title:"Brain Tumor Detection", desc:"Computer vision / deep learning project using MRI image processing and CNN-based classification.", tags:["Python","TensorFlow","Keras","OpenCV"], url:"https://github.com/priyanshu18611/brain-tumor-detection"},
    {title:"Cricket Score Predictor", desc:"Machine learning prediction application using match-state features and a prediction interface.", tags:["Python","Pandas","NumPy","XGBoost"], url:"https://github.com/priyanshu18611/Cricket-Score-Predictor"},
    {title:"Spam Mail Detection", desc:"NLP classification pipeline using TF-IDF and Logistic Regression for spam classification.", tags:["Python","NLP","TF-IDF","Logistic Regression"], url:"https://github.com/priyanshu18611/Spam-Mail-Detection"}
  ],
  skills:["Python","Java","C","C++","JavaScript","SQL","HTML5","CSS3","React","Node.js","Express","Flask","FastAPI","REST APIs","MySQL","MongoDB","JDBC","Pandas","NumPy","Scikit-learn","TensorFlow","Keras","OpenCV","XGBoost","Power BI","DAX","Excel","Git","GitHub","Postman","JIRA","DSA","OOP","DBMS","Data Cleaning","EDA","Authentication","JWT","Socket.io"],
  experience:[
    {date:"DEC 2025", role:"Cloud Computing Intern", company:"Aagaaz Training Centre Pvt. Ltd. • Remote", desc:"Completed a structured 4-week program on cloud computing fundamentals and service models; final evaluation score listed in the resume: 88%."},
    {date:"JUN — JUL 2025", role:"Signal & Telecommunication Intern", company:"East Central Railway • Danapur Division", desc:"Studied and documented network operations and maintenance procedures for mission-critical communication systems. Exposure included optical fibre, telephone exchange, quad cable, PA systems, PRS/UTS and mobile train radio communication."},
    {date:"JAN — FEB 2024", role:"Robotics Intern", company:"InfinityCore Technologies (BlinkSkills) • Remote", desc:"Applied structured problem-solving to practical robotics assignments; final assessment score listed in the resume: 92%."}
  ],
  certs:[
    ["01","AWS Data Engineering on AWS: Foundations","AWS"],
    ["02","Cisco Data Analytics Essentials","Cisco"],
    ["03","Cisco Data Science Essentials with Python","Cisco"],
    ["04","Software Engineering Job Simulation","JPMorgan Chase • Forage"],
    ["05","Data Analytics Job Simulation","Deloitte • Forage"],
    ["06","Cybersecurity Job Simulation","Mastercard • Forage"],
    ["07","Introduction to IoT","NPTEL • IIT Kharagpur"],
    ["08","SAP Analytics Cloud for Planning (Advanced)","SAP"]
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function renderFeatured(){
  $("#featuredProjects").innerHTML = DATA.featured.map((p,i)=>`
    <article class="featured reveal" style="--mx:70%;--my:20%">
      <div class="project-number">0${i+1} / FEATURED BUILD</div>
      <div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="chips">${p.tags.map(t=>`<span class="chip">${t}</span>`).join("")}</div>
        <a class="project-link" href="${p.url}" target="_blank" rel="noopener"><span>View on GitHub</span><span>↗</span></a>
      </div>
    </article>`).join("");
  $$(".featured").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty("--mx",`${((e.clientX-r.left)/r.width)*100}%`);
      card.style.setProperty("--my",`${((e.clientY-r.top)/r.height)*100}%`);
    });
  });
}

function renderSkills(){
  $("#skillsCloud").innerHTML = DATA.skills.map((s,i)=>`<span class="skill-pill" style="--d:${i*20}ms">${s}</span>`).join("");
}
function renderTimeline(){
  $("#timeline").innerHTML = DATA.experience.map((e,i)=>`
    <article class="time-item reveal">
      <div class="time-date">${e.date}</div>
      <div class="time-main"><h3>${e.role}</h3><p>${e.desc}</p></div>
      <div class="time-company">${e.company}</div>
    </article>`).join("");
}
function renderCerts(){
  $("#certGrid").innerHTML = DATA.certs.map(c=>`
    <article class="cert reveal"><span class="cert-no">${c[0]}</span><div><h3>${c[1]}</h3><p>${c[2]}</p></div><span>Credential listed on resume</span></article>`).join("");
}

let allRepos=[], currentFilter="all";
async function loadRepos(){
  const status=$("#repoStatus");
  try{
    const res=await fetch(`https://api.github.com/users/${DATA.github}/repos?per_page=100&sort=updated`);
    if(!res.ok) throw new Error("GitHub API unavailable");
    allRepos=await res.json();
    status.textContent=`${allRepos.length} public repositories synced`;
  }catch(e){
    allRepos=[
      {name:"CareerPilot AI",html_url:"https://github.com/priyanshu18611/careerpilot-ai",description:"AI career intelligence platform.",language:"Python",stargazers_count:0},
      {name:"EcoSentinel",html_url:"https://github.com/priyanshu18611/EcoSentinel",description:"IoT wildlife monitoring platform.",language:"JavaScript",stargazers_count:0},
      {name:"Enterprise Sales Analytics",html_url:"https://github.com/priyanshu18611",description:"Python, SQL, Power BI and DAX analytics workflow.",language:"Python",stargazers_count:0},
      {name:"Brain Tumor Detection",html_url:"https://github.com/priyanshu18611/brain-tumor-detection",description:"MRI image classification with deep learning.",language:"Python",stargazers_count:0},
      {name:"Cricket-Score-Predictor",html_url:"https://github.com/priyanshu18611/Cricket-Score-Predictor",description:"XGBoost cricket score prediction app.",language:"Python",stargazers_count:0},
      {name:"Resume-Parser",html_url:"https://github.com/priyanshu18611/Resume-Parser",description:"PDF resume parsing with Streamlit and PyPDF2.",language:"Python",stargazers_count:0},
      {name:"Spam-Mail-Detection",html_url:"https://github.com/priyanshu18611/Spam-Mail-Detection",description:"TF-IDF + Logistic Regression spam classifier.",language:"Python",stargazers_count:0},
      {name:"portfolio",html_url:"https://github.com/priyanshu18611/portfolio",description:"Personal portfolio website.",language:"HTML",stargazers_count:0},
      {name:"kisan-mitra",html_url:"https://github.com/priyanshu18611/kisan-mitra",description:"Smart farming dashboard for Indian farmers.",language:"HTML",stargazers_count:0},
      {name:"Fake-Payment-Detector",html_url:"https://github.com/priyanshu18611/Fake-Payment-Detector",description:"Machine learning project to detect fraudulent transactions.",language:"Python",stargazers_count:0}
    ];
    status.textContent="Fallback project vault loaded";
  }
  renderRepos();
}
function repoCategory(lang){
  const l=(lang||"").toLowerCase();
  if(l.includes("python")) return "python";
  if(l.includes("javascript")||l.includes("typescript")) return "javascript";
  if(l.includes("html")||l.includes("css")) return "html";
  return "other";
}
function renderRepos(){
  const list=currentFilter==="all"?allRepos:allRepos.filter(r=>repoCategory(r.language)===currentFilter);
  $("#repoGrid").innerHTML=list.map((r,i)=>`
    <article class="repo-card reveal">
      <div class="repo-top"><span class="repo-lang">${r.language||"Repository"}</span><span class="stars">★ ${r.stargazers_count||0}</span></div>
      <h4>${r.name}</h4><p>${r.description||"Public project repository from Priyanshu Kumar."}</p>
      <div class="repo-bottom"><a href="${r.html_url}" target="_blank" rel="noopener">Open Repository ↗</a></div>
    </article>`).join("") || `<div class="repo-card"><p>No repositories in this filter.</p></div>`;
  setupReveal();
}
$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  currentFilter=btn.dataset.filter;renderRepos();
}));

function setupReveal(){
  if(!("IntersectionObserver" in window)){ $$(".reveal").forEach(x=>x.classList.add("visible")); return; }
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
  $$(".reveal:not(.visible)").forEach(x=>io.observe(x));
}

function initCursor(){
  if(matchMedia("(pointer:coarse)").matches) return;
  document.body.classList.add("cursor-ready");
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;$(".spotlight").style.left=mx+"px";$(".spotlight").style.top=my+"px";$(".cursor-dot").style.left=mx+"px";$(".cursor-dot").style.top=my+"px"});
  gsap?.ticker.add(()=>{rx+=(mx-rx)*.15;ry+=(my-ry)*.15;$(".cursor-ring").style.left=rx+"px";$(".cursor-ring").style.top=ry+"px"});
  $$("a,button,.skill-pill,.repo-card,.featured").forEach(el=>el.addEventListener("mouseenter",()=>{$(".cursor-ring").style.width="58px";$(".cursor-ring").style.height="58px";$(".cursor-ring").style.borderColor="rgba(255,51,95,.8)"}));
  $$("a,button,.skill-pill,.repo-card,.featured").forEach(el=>el.addEventListener("mouseleave",()=>{$(".cursor-ring").style.width="38px";$(".cursor-ring").style.height="38px";$(".cursor-ring").style.borderColor="rgba(255,255,255,.55)"}));
}

function initThree(){
  if(!window.THREE) return;
  const wrap=$("#three-bg"), scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,100);
  camera.position.z=8;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);wrap.appendChild(renderer.domElement);
  const count=900, geo=new THREE.BufferGeometry(), pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*18;pos[i*3+1]=(Math.random()-.5)*12;pos[i*3+2]=(Math.random()-.5)*12;}
  geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const mat=new THREE.PointsMaterial({color:0xff4d6d,size:.018,transparent:true,opacity:.55});
  const points=new THREE.Points(geo,mat);scene.add(points);
  const ringGeo=new THREE.TorusGeometry(3.2,.0025,8,160), ringMat=new THREE.MeshBasicMaterial({color:0xff335f,transparent:true,opacity:.18});
  const ring=new THREE.Mesh(ringGeo,ringMat);ring.rotation.x=1.1;ring.rotation.y=.3;scene.add(ring);
  let tx=0,ty=0;addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*.5;ty=(e.clientY/innerHeight-.5)*.3});
  function animate(){requestAnimationFrame(animate);points.rotation.y+=.0005;points.rotation.x+=.0002;ring.rotation.z+=.001;camera.position.x+=(tx-camera.position.x)*.02;camera.position.y+=(-ty-camera.position.y)*.02;renderer.render(scene,camera)}animate();
  addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}

function initNav(){
  addEventListener("scroll",()=>$("#nav").classList.toggle("scrolled",scrollY>40),{passive:true});
  $("#menuBtn").addEventListener("click",()=>$("#mobileMenu").classList.toggle("open"));
  $$("#mobileMenu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));
}
function initCommand(){
  const command=$("#command"), input=$("#commandInput"), results=$("#commandResults");
  const routes=[["Home","#home"],["About","#about"],["Project Universe","#work"],["Technology Arsenal","#skills"],["Experience","#experience"],["Certificates","#certificates"],["Contact","#contact"]];
  function show(q=""){results.innerHTML=routes.filter(r=>r[0].toLowerCase().includes(q.toLowerCase())).map(r=>`<button data-go="${r[1]}">${r[0]}</button>`).join("")}
  addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();command.classList.add("open");input.focus();show()}if(e.key==="Escape")command.classList.remove("open")});
  input.addEventListener("input",()=>show(input.value));
  results.addEventListener("click",e=>{if(e.target.dataset.go){command.classList.remove("open");document.querySelector(e.target.dataset.go).scrollIntoView({behavior:"smooth"})}});
  command.addEventListener("click",e=>{if(e.target===command)command.classList.remove("open")});
}

function initAnimations(){
  if(!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero-copy>*",{y:30,opacity:0,stagger:.08,duration:1.1,ease:"power4.out",delay:.25});
  gsap.from(".portrait-frame",{scale:.9,opacity:0,duration:1.3,ease:"power4.out",delay:.35});
  gsap.utils.toArray(".section").forEach(sec=>gsap.from(sec.querySelector(".section-head"),{scrollTrigger:{trigger:sec,start:"top 78%"},x:-20,opacity:0,duration:.8,ease:"power3.out"}));
}

window.addEventListener("load",()=>{
  renderFeatured();renderSkills();renderTimeline();renderCerts();loadRepos();setupReveal();initCursor();initThree();initNav();initCommand();initAnimations();
  $("#year").textContent=new Date().getFullYear();
  const loader=$("#loader"), bar=loader.querySelector(".loader-line span");
  if(window.gsap) gsap.to(bar,{width:"100%",duration:1.15,ease:"power2.inOut",onComplete:()=>{gsap.to(loader,{opacity:0,duration:.5,onComplete:()=>{loader.remove();document.body.classList.add("loaded");setupReveal()}})}});
  else {setTimeout(()=>{loader.remove();document.body.classList.add("loaded");setupReveal()},900)}
});
