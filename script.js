/* ============================================================
   EK VILLAIN — PRIYANSHU · premium interactions
   Features:
   1. Cinematic preloader with animated progress
   2. GSAP ScrollTrigger scene reveals + live chapter indicator
   3. Custom magnetic cursor
   4. 3D tilt hero device on mouse move
   5. Animated count-up stats
   6. Kinetic split-text reveal on headline
   7. Interactive project archive filter + case-study modal
   8. Seamless infinite stack marquee (pauses on hover)
   9. Scroll progress bar + back-to-top button
   10. Villain Mode easter egg (Konami code / 5x logo click / "V" key)
   11. Contact form validation + mailto handoff + copy-email toast
   12. Keyboard scene navigation (↑ ↓ / J K)
   13. Live GitHub stats fetch (public API, graceful fallback)
   ============================================================ */
(function(){
"use strict";

var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }

/* ---------- 1. PRELOADER ---------- */
function runPreloader(){
  var fill = document.getElementById("preloaderFill");
  var count = document.getElementById("preloaderCount");
  var pre = document.getElementById("preloader");
  var pct = 0;
  var timer = setInterval(function(){
    pct += Math.random()*18;
    if (pct >= 100){ pct = 100; clearInterval(timer); finish(); }
    if (fill) fill.style.width = pct + "%";
    if (count) count.textContent = String(Math.floor(pct)).padStart(2,"0");
  }, 140);
  function finish(){
    setTimeout(function(){
      pre.classList.add("done");
      document.body.style.overflow = "";
      playHeroIntro();
    }, 250);
  }
  document.body.style.overflow = "hidden";
}

/* ---------- hero intro sequence (one orchestrated moment) ---------- */
function playHeroIntro(){
  if (!window.gsap) return;
  var tl = gsap.timeline({defaults:{ease:"power3.out"}});
  tl.from(".hero-top span", {opacity:0, y:-10, stagger:.1, duration:.6})
    .from(".overline", {opacity:0, y:20, duration:.7}, "-=.3")
    .from(".split-title .line", {opacity:0, y:60, stagger:.12, duration:.9}, "-=.4")
    .from(".hero-sub", {opacity:0, y:20, duration:.7}, "-=.5")
    .from(".hero-buttons a", {opacity:0, y:16, stagger:.1, duration:.6}, "-=.4")
    .from(".hero-device-wrap", {opacity:0, y:40, scale:.94, duration:1}, "-=.9")
    .from(".hero-foot span", {opacity:0, duration:.6, stagger:.1}, "-=.3");
}

/* ---------- 2. SCROLL REVEALS + CHAPTER INDICATOR ---------- */
function setupScrollReveals(){
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.utils.toArray(".reveal-up, .about-intro h2, .archive-head h2, .case-title h2, .tools-head h2, .journey-head h2, .experience-head h2, .contact-frame h2")
    .forEach(function(el){
      gsap.from(el, {
        opacity:0, y:46, duration:1, ease:"power3.out",
        scrollTrigger:{trigger:el, start:"top 85%"}
      });
    });

  gsap.utils.toArray(".work-card").forEach(function(el, i){
    gsap.from(el, {
      opacity:0, y:36, duration:.7, delay:(i%3)*0.06, ease:"power2.out",
      scrollTrigger:{trigger:el, start:"top 92%"}
    });
  });

  gsap.utils.toArray(".timeline article, .exp-grid article, .cert-grid div").forEach(function(el, i){
    gsap.from(el, {
      opacity:0, y:24, duration:.6, delay:(i%4)*0.05,
      scrollTrigger:{trigger:el, start:"top 94%"}
    });
  });

  gsap.utils.toArray(".case-node").forEach(function(el, i){
    gsap.from(el, {opacity:0, scale:.85, duration:.6, delay:i*0.1, scrollTrigger:{trigger:el, start:"top 90%"}});
  });

  // chapter indicator + progress bar
  var scenes = gsap.utils.toArray(".scene");
  var names = ["OPENING","POINT OF VIEW","ARCHIVE","CASE STUDY","STACK","DATA LAB","JOURNEY","FIELD NOTES","FINAL FRAME"];
  scenes.forEach(function(sc, i){
    ScrollTrigger.create({
      trigger:sc, start:"top 50%", end:"bottom 50%",
      onEnter:function(){ setChapter(i, names[i]); },
      onEnterBack:function(){ setChapter(i, names[i]); }
    });
  });

  ScrollTrigger.create({
    trigger:document.body, start:"top top", end:"bottom bottom",
    onUpdate:function(self){
      var bar = document.getElementById("progressFill");
      if (bar) bar.style.width = (self.progress*100) + "%";
    }
  });
}
function setChapter(i, name){
  var no = document.getElementById("chapterNo");
  var nm = document.getElementById("chapterName");
  if (no) no.textContent = String(i).padStart(2,"0");
  if (nm) nm.textContent = name;
}

/* ---------- 3. CUSTOM MAGNETIC CURSOR ---------- */
function setupCursor(){
  if (window.matchMedia("(hover:none), (pointer:coarse)").matches) return;
  var ring = document.querySelector(".cursor-ring");
  var dot = document.querySelector(".cursor-dot");
  if (!ring || !dot) return;
  var rx=0, ry=0, dx=0, dy=0;
  window.addEventListener("mousemove", function(e){
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx+"px"; dot.style.top = dy+"px";
  });
  (function loop(){
    rx += (dx-rx)*0.18; ry += (dy-ry)*0.18;
    ring.style.left = rx+"px"; ring.style.top = ry+"px";
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a, button, .work-card, input, textarea").forEach(function(el){
    el.addEventListener("mouseenter", function(){ ring.classList.add("active"); });
    el.addEventListener("mouseleave", function(){ ring.classList.remove("active"); });
  });

  // magnetic buttons
  document.querySelectorAll(".magnetic").forEach(function(btn){
    btn.addEventListener("mousemove", function(e){
      var r = btn.getBoundingClientRect();
      var mx = e.clientX - r.left - r.width/2;
      var my = e.clientY - r.top - r.height/2;
      btn.style.transform = "translate("+(mx*0.28)+"px,"+(my*0.5)+"px)";
    });
    btn.addEventListener("mouseleave", function(){ btn.style.transform = "translate(0,0)"; });
  });
}

/* ---------- 4. 3D TILT DEVICE ---------- */
function setupTilt(){
  var el = document.getElementById("tiltDevice");
  if (!el || window.matchMedia("(hover:none)").matches) return;
  var wrap = el.closest(".hero-device-wrap");
  wrap.addEventListener("mousemove", function(e){
    var r = wrap.getBoundingClientRect();
    var px = (e.clientX - r.left)/r.width - 0.5;
    var py = (e.clientY - r.top)/r.height - 0.5;
    el.style.transform = "rotateY("+(px*16)+"deg) rotateX("+(-py*16)+"deg) translateZ(10px)";
    var shine = el.querySelector(".screen-shine");
    if (shine) shine.style.transform = "translateX("+(px*160)+"%)";
  });
  wrap.addEventListener("mouseleave", function(){
    el.style.transform = "rotateY(0) rotateX(0)";
  });
}

/* ---------- 5. COUNT-UP STATS ---------- */
function setupCounters(){
  var els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.textContent.replace(/[0-9]/g,"") || "";
      var startTs = null;
      var dur = 1100;
      function step(ts){
        if (!startTs) startTs = ts;
        var p = Math.min((ts-startTs)/dur, 1);
        var eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.floor(eased*target) + (p>=1 ? "+" : "");
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + "+";
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, {threshold:0.6});
  els.forEach(function(el){ obs.observe(el); });
}

/* ---------- 7. ARCHIVE FILTER + MODAL ---------- */
function setupArchive(){
  var buttons = document.querySelectorAll(".archive-tools button");
  var cards = document.querySelectorAll(".work-card");
  buttons.forEach(function(btn){
    btn.addEventListener("click", function(){
      buttons.forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function(card){
        var cats = (card.getAttribute("data-cat")||"").split(" ");
        var show = f === "all" || cats.indexOf(f) !== -1;
        if (window.gsap){
          gsap.to(card, {
            opacity: show?1:0, scale: show?1:0.92, duration:.3,
            onStart:function(){ if (show) card.style.display=""; },
            onComplete:function(){ if (!show) card.style.display="none"; }
          });
        } else {
          card.style.display = show ? "" : "none";
        }
      });
    });
  });

  var overlay = document.getElementById("modalOverlay");
  var closeBtn = document.getElementById("modalClose");
  cards.forEach(function(card){
    card.addEventListener("click", function(){
      document.getElementById("modalCode").textContent = card.getAttribute("data-modal-code") || "";
      document.getElementById("modalTag").textContent = card.getAttribute("data-modal-tag") || "";
      document.getElementById("modalTitle").textContent = card.getAttribute("data-modal-title") || "";
      document.getElementById("modalDesc").textContent = card.getAttribute("data-modal-desc") || "";
      var stackWrap = document.getElementById("modalStack");
      stackWrap.innerHTML = "";
      (card.getAttribute("data-modal-stack")||"").split(",").filter(Boolean).forEach(function(t){
        var i = document.createElement("i"); i.textContent = t.trim(); stackWrap.appendChild(i);
      });
      var link = document.getElementById("modalLink");
      var href = card.getAttribute("data-modal-link");
      if (href){ link.href = href; link.style.display = "inline-flex"; }
      else { link.style.display = "none"; }
      overlay.classList.add("open");
    });
  });
  function closeModal(){ overlay.classList.remove("open"); }
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function(e){ if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeModal(); });
}

/* ---------- 9. BACK TO TOP ---------- */
function setupBackToTop(){
  var btn = document.getElementById("backToTop");
  window.addEventListener("scroll", function(){
    if (window.scrollY > window.innerHeight) btn.classList.add("show");
    else btn.classList.remove("show");
  });
  btn.addEventListener("click", function(){
    window.scrollTo({top:0, behavior: reduceMotion ? "auto" : "smooth"});
  });
}

/* ---------- 10. VILLAIN MODE EASTER EGG ---------- */
function setupVillainMode(){
  var toggle = document.getElementById("themeToggle");
  var logo = document.getElementById("logoMark");
  var flash = document.getElementById("villainFlash");
  var clickCount = 0, clickTimer;
  var konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"];
  var konamiIdx = 0;

  function activate(){
    document.body.classList.toggle("villain-mode");
    flash.classList.remove("hit"); void flash.offsetWidth; flash.classList.add("hit");
    showToast(document.body.classList.contains("villain-mode") ? "VILLAIN MODE ENGAGED" : "VILLAIN MODE OFF");
  }

  if (toggle) toggle.addEventListener("click", activate);
  if (logo) logo.addEventListener("click", function(e){
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function(){ clickCount = 0; }, 800);
    if (clickCount >= 5){ e.preventDefault(); activate(); clickCount = 0; }
  });

  document.addEventListener("keydown", function(e){
    if (e.key.toLowerCase() === "v" && !isTyping(e)) activate();
    if (e.key === konami[konamiIdx]) { konamiIdx++; if (konamiIdx === konami.length){ activate(); konamiIdx = 0; } }
    else konamiIdx = 0;
  });
}
function isTyping(e){
  var tag = (e.target.tagName||"").toLowerCase();
  return tag === "input" || tag === "textarea";
}

/* ---------- 11. TOAST + CONTACT FORM ---------- */
function showToast(msg){
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.classList.remove("show"); }, 2400);
}
function setupContact(){
  var copyBtn = document.querySelector(".copy-email");
  if (copyBtn){
    copyBtn.addEventListener("click", function(){
      var email = copyBtn.getAttribute("data-email");
      if (navigator.clipboard){
        navigator.clipboard.writeText(email).then(function(){ showToast("Email copied — " + email); });
      } else {
        showToast(email);
      }
    });
  }
  var form = document.getElementById("contactForm");
  if (form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name")||"").toString().trim();
      var email = (data.get("email")||"").toString().trim();
      var message = (data.get("message")||"").toString().trim();
      if (!name || !email || !message){ showToast("Fill in every field first"); return; }
      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:priyanshu6202018611@gmail.com?subject=" + subject + "&body=" + body;
      showToast("Opening your mail app…");
      form.reset();
    });
  }
}

/* ---------- 12. KEYBOARD SCENE NAVIGATION ---------- */
function setupKeyboardNav(){
  document.addEventListener("keydown", function(e){
    if (isTyping(e)) return;
    var scenes = Array.prototype.slice.call(document.querySelectorAll(".scene"));
    var mid = window.scrollY + window.innerHeight/2;
    var idx = 0;
    scenes.forEach(function(s, i){
      if (s.offsetTop <= mid) idx = i;
    });
    if (["ArrowDown","j","J"].indexOf(e.key) !== -1 && idx < scenes.length-1){
      scenes[idx+1].scrollIntoView({behavior: reduceMotion?"auto":"smooth"});
    }
    if (["ArrowUp","k","K"].indexOf(e.key) !== -1 && idx > 0){
      scenes[idx-1].scrollIntoView({behavior: reduceMotion?"auto":"smooth"});
    }
  });
}

/* ---------- 13. LIVE GITHUB STATS ---------- */
function setupGithubStats(){
  var el = document.getElementById("ghStats");
  if (!el || !window.fetch) return;
  fetch("https://api.github.com/users/priyanshu18611")
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(function(data){
      var repos = data.public_repos != null ? data.public_repos : "—";
      var followers = data.followers != null ? data.followers : "—";
      el.textContent = repos + " PUBLIC REPOS · " + followers + " FOLLOWERS ON GITHUB";
    })
    .catch(function(){ /* keep default text on failure */ });
}

/* ---------- 14. LENS SWITCHER (Software Engineer / Data Analyst / Full Stack) ---------- */
var LENS_COPY = {
  se:   "I engineer reliable software systems — clean APIs, sound architecture, and code built to be maintained, not just to run once.",
  data: "I turn raw, messy data into decisions — pipelines, star schemas and dashboards that make a number mean something.",
  full: "I ship the whole product — from a React interface down to the database — so nothing gets lost between design and deployment."
};
var LENS_FILTER_MAP = { se:"full", data:"data", full:"full" };

function setupLensSwitcher(){
  var buttons = document.querySelectorAll(".lens-btn");
  var tagline = document.getElementById("lensTagline");
  var toolColumns = document.querySelector(".tool-columns");
  if (!buttons.length) return;

  function applyLens(lens){
    buttons.forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-lens") === lens); });
    if (tagline){
      if (window.gsap){
        gsap.to(tagline, {opacity:0, y:6, duration:.18, onComplete:function(){
          tagline.textContent = LENS_COPY[lens];
          gsap.to(tagline, {opacity:1, y:0, duration:.3});
        }});
      } else {
        tagline.textContent = LENS_COPY[lens];
      }
    }
    // highlight matching stack columns
    if (toolColumns){
      toolColumns.classList.add("lens-active");
      toolColumns.querySelectorAll("[data-lens-col]").forEach(function(col){
        var tags = (col.getAttribute("data-lens-col")||"").split(" ");
        col.classList.toggle("lens-match", tags.indexOf(lens) !== -1);
      });
    }
    // sync the archive filter to the matching category, without forcing a scroll
    var targetFilter = LENS_FILTER_MAP[lens];
    var filterBtn = document.querySelector('.archive-tools button[data-filter="'+targetFilter+'"]');
    if (filterBtn) filterBtn.click();
  }

  buttons.forEach(function(btn){
    btn.addEventListener("click", function(){ applyLens(btn.getAttribute("data-lens")); });
  });
}

/* ---------- terminal typing sequence ---------- */
var TERMINAL_LINES = [
  {p:"$", t:"whoami"},
  {c:"priyanshu_kumar — software engineer · data analyst · full stack dev"},
  {p:"$", t:"cat core_skills.json"},
  {c:'{ "backend": ["FastAPI","Node.js","Express"],'},
  {c:'  "frontend": ["React","JavaScript"],'},
  {c:'  "data": ["Pandas","XGBoost","Power BI","DAX"] }'},
  {p:"$", t:"git commit -m \"build. innovate. evolve.\""}
];
function setupTerminal(){
  var body = document.getElementById("terminalBody");
  if (!body) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      typeTerminal(body);
    });
  }, {threshold:.4});
  obs.observe(body);
}
function typeTerminal(body){
  var li = 0;
  body.innerHTML = "";
  function nextLine(){
    if (li >= TERMINAL_LINES.length){
      var cursor = document.createElement("span");
      cursor.className = "terminal-cursor";
      body.appendChild(cursor);
      return;
    }
    var line = TERMINAL_LINES[li];
    var row = document.createElement("div");
    if (line.c){
      row.innerHTML = '<span class="comment">'+escapeHtml(line.c)+'</span>';
      body.appendChild(row);
      li++; setTimeout(nextLine, 220);
      return;
    }
    row.innerHTML = '<span class="prompt">'+line.p+'</span> ';
    body.appendChild(row);
    var chars = line.t.split("");
    var ci = 0;
    (function typeChar(){
      if (ci < chars.length){
        row.innerHTML = '<span class="prompt">'+line.p+'</span> ' + escapeHtml(chars.slice(0, ci+1).join(""));
        ci++;
        setTimeout(typeChar, 26);
      } else {
        li++; setTimeout(nextLine, 320);
      }
    })();
  }
  nextLine();
}
function escapeHtml(s){
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* ---------- BI dashboard (Power BI / Tableau style demo) ---------- */
var DASH_DATA = {
  all:   {revenue:482000, deals:186, avg:2591, top:"Software", deltaRev:14, deltaDeals:9,  deltaAvg:4,
          quarters:[92,108,121,161], categories:[["Software",42],["Services",26],["Hardware",18],["Support",14]]},
  north: {revenue:151000, deals:58,  avg:2603, top:"Software", deltaRev:11, deltaDeals:6,  deltaAvg:5,
          quarters:[30,34,38,49], categories:[["Software",46],["Services",24],["Hardware",16],["Support",14]]},
  south: {revenue:118000, deals:47,  avg:2510, top:"Services", deltaRev:9,  deltaDeals:4,  deltaAvg:3,
          quarters:[24,27,29,38], categories:[["Software",34],["Services",34],["Hardware",18],["Support",14]]},
  east:  {revenue:96000,  deals:38,  avg:2526, top:"Software", deltaRev:18, deltaDeals:12, deltaAvg:6,
          quarters:[18,21,25,32], categories:[["Software",44],["Services",22],["Hardware",20],["Support",14]]},
  west:  {revenue:117000, deals:43,  avg:2721, top:"Hardware", deltaRev:15, deltaDeals:10, deltaAvg:4,
          quarters:[20,26,29,42], categories:[["Software",36],["Services",22],["Hardware",28],["Support",14]]}
};
var barChart, donutChart;
function setupDashboard(){
  var select = document.getElementById("dashRegion");
  var barCanvas = document.getElementById("chartBar");
  var donutCanvas = document.getElementById("chartDonut");
  if (!select || !window.Chart) return;

  function render(region){
    var d = DASH_DATA[region];
    document.getElementById("kpiRevenue").textContent = "$" + d.revenue.toLocaleString();
    document.getElementById("kpiDeals").textContent = d.deals;
    document.getElementById("kpiAvg").textContent = "$" + d.avg.toLocaleString();
    document.getElementById("kpiTop").textContent = d.top;
    document.getElementById("kpiRevenueDelta").textContent = "+" + d.deltaRev + "% QoQ";
    document.getElementById("kpiDealsDelta").textContent = "+" + d.deltaDeals + "% QoQ";
    document.getElementById("kpiAvgDelta").textContent = "+" + d.deltaAvg + "% QoQ";

    var barData = { labels:["Q1","Q2","Q3","Q4"], datasets:[{ data:d.quarters, backgroundColor:"#ff2b3d", borderRadius:6, maxBarThickness:44 }]};
    var donutData = { labels:d.categories.map(function(c){return c[0];}),
      datasets:[{ data:d.categories.map(function(c){return c[1];}), backgroundColor:["#ff2b3d","#17140f","#c9c2af","#8f8f97"], borderWidth:0 }]};

    if (barChart){ barChart.data = barData; barChart.update(); }
    else { barChart = new Chart(barCanvas, { type:"bar", data:barData,
      options:{ plugins:{legend:{display:false}}, scales:{ y:{grid:{color:"#eee7d8"}}, x:{grid:{display:false}} } } }); }

    if (donutChart){ donutChart.data = donutData; donutChart.update(); }
    else { donutChart = new Chart(donutCanvas, { type:"doughnut", data:donutData,
      options:{ plugins:{legend:{position:"bottom", labels:{boxWidth:10, font:{size:10}}}}, cutout:"62%" } }); }
  }

  select.addEventListener("change", function(){ render(select.value); });
  render("all");
}

/* ---------- command palette ---------- */
function setupCommandPalette(){
  var trigger = document.getElementById("cmdkTrigger");
  var overlay = document.getElementById("cmdkOverlay");
  var input = document.getElementById("cmdkInput");
  var list = document.getElementById("cmdkList");
  if (!trigger || !overlay) return;

  var items = [
    {label:"Opening", hint:"scene", action:function(){ scrollToSel("#home"); }},
    {label:"The Point of View", hint:"scene", action:function(){ scrollToSel("#about"); }},
    {label:"Archive — projects", hint:"scene", action:function(){ scrollToSel("#archive"); }},
    {label:"Tools of the Trade", hint:"scene", action:function(){ scrollToSel("#tools"); }},
    {label:"Data Analytics Lab", hint:"scene", action:function(){ scrollToSel("#datalab"); }},
    {label:"The Journey", hint:"scene", action:function(){ scrollToSel("#journey"); }},
    {label:"Final Frame — contact", hint:"scene", action:function(){ scrollToSel("#contact"); }},
    {label:"CareerPilot AI — open live product", hint:"project", action:function(){ window.open("https://careerpilot-ai-45am.onrender.com/","_blank"); }},
    {label:"Copy email address", hint:"action", action:function(){ document.querySelector(".copy-email").click(); }},
    {label:"Toggle Villain Mode", hint:"action", action:function(){ document.getElementById("themeToggle").click(); }},
    {label:"Preview resume", hint:"action", action:function(){ openResume(); }},
    {label:"Open GitHub profile", hint:"link", action:function(){ window.open("https://github.com/priyanshu18611","_blank"); }},
    {label:"Open LinkedIn", hint:"link", action:function(){ window.open("https://www.linkedin.com/in/priyanshuroy18","_blank"); }}
  ];
  var activeIdx = 0;

  function scrollToSel(sel){
    var el = document.querySelector(sel);
    if (el) el.scrollIntoView({behavior: reduceMotion?"auto":"smooth"});
  }
  function renderList(filter){
    var q = (filter||"").toLowerCase();
    var filtered = items.filter(function(it){ return it.label.toLowerCase().indexOf(q) !== -1; });
    list.innerHTML = "";
    filtered.forEach(function(it, i){
      var row = document.createElement("div");
      row.className = "cmdk-item" + (i === 0 ? " active" : "");
      row.innerHTML = "<b>"+it.label+"</b><span>"+it.hint+"</span>";
      row.addEventListener("click", function(){ it.action(); closePalette(); });
      row.addEventListener("mouseenter", function(){ activeIdx = i; markActive(); });
      list.appendChild(row);
    });
    activeIdx = 0;
    markActive();
    list._filtered = filtered;
  }
  function markActive(){
    Array.prototype.forEach.call(list.children, function(row, i){ row.classList.toggle("active", i === activeIdx); });
    if (list.children[activeIdx]) list.children[activeIdx].scrollIntoView({block:"nearest"});
  }
  function openPalette(){
    overlay.classList.add("open");
    input.value = "";
    renderList("");
    setTimeout(function(){ input.focus(); }, 60);
  }
  function closePalette(){ overlay.classList.remove("open"); }

  trigger.addEventListener("click", openPalette);
  overlay.addEventListener("click", function(e){ if (e.target === overlay) closePalette(); });
  input.addEventListener("input", function(){ renderList(input.value); });
  input.addEventListener("keydown", function(e){
    var filtered = list._filtered || [];
    if (e.key === "ArrowDown"){ e.preventDefault(); activeIdx = Math.min(activeIdx+1, filtered.length-1); markActive(); }
    if (e.key === "ArrowUp"){ e.preventDefault(); activeIdx = Math.max(activeIdx-1, 0); markActive(); }
    if (e.key === "Enter" && filtered[activeIdx]){ filtered[activeIdx].action(); closePalette(); }
    if (e.key === "Escape"){ closePalette(); }
  });
  document.addEventListener("keydown", function(e){
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"){ e.preventDefault(); openPalette(); }
  });
}

/* ---------- resume quick view ---------- */
function openResume(){
  var overlay = document.getElementById("resumeOverlay");
  var frame = document.getElementById("resumeFrame");
  if (!overlay) return;
  frame.src = "assets/resume/Priyanshu-Kumar-Resume.pdf";
  overlay.classList.add("open");
}
function setupResumeViewer(){
  var btn = document.getElementById("resumeBtn");
  var overlay = document.getElementById("resumeOverlay");
  var closeBtn = document.getElementById("resumeClose");
  if (!btn || !overlay) return;
  btn.addEventListener("click", function(e){
    if (window.matchMedia("(max-width:640px)").matches) return; // let mobile just open the PDF directly
    e.preventDefault();
    openResume();
  });
  closeBtn.addEventListener("click", function(){ overlay.classList.remove("open"); document.getElementById("resumeFrame").src = ""; });
  overlay.addEventListener("click", function(e){ if (e.target === overlay){ overlay.classList.remove("open"); document.getElementById("resumeFrame").src = ""; } });
}

/* ---------- github stat card (Experience section) ---------- */
function setupGithubCard(){
  var reposEl = document.getElementById("ghRepos");
  if (!reposEl || !window.fetch) return;
  fetch("https://api.github.com/users/priyanshu18611")
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(function(data){
      document.getElementById("ghRepos").textContent = data.public_repos != null ? data.public_repos : "—";
      document.getElementById("ghFollowers").textContent = data.followers != null ? data.followers : "—";
      document.getElementById("ghFollowing").textContent = data.following != null ? data.following : "—";
    })
    .catch(function(){ /* leave placeholders on failure */ });
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", function(){
  runPreloader();
  setupScrollReveals();
  setupCursor();
  setupTilt();
  setupCounters();
  setupArchive();
  setupBackToTop();
  setupVillainMode();
  setupContact();
  setupKeyboardNav();
  setupGithubStats();
  setupLensSwitcher();
  setupTerminal();
  setupDashboard();
  setupCommandPalette();
  setupResumeViewer();
  setupGithubCard();

  // smooth-scroll for in-page nav links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      var target = document.querySelector(a.getAttribute("href"));
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth"});
      }
    });
  });
});
})();
