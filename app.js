const $=id=>document.getElementById(id);
const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projects=[
  {
    kicker:"PREVENTIVI / CATALOGO",
    title:"QuoteFlow",
    description:"Velocizza la preventivazione con catalogo locale, prezzo e IVA precompilati, senza cambiare il gestionale o il flusso principale.",
    features:["Catalogo locale","IVA per riga",".qflow","PDF / CSV"],
    url:"https://ago993.github.io/quoteflow-demo/?demo=1"
  },
  {
    kicker:"REPORT / KPI / CSV",
    title:"ReportFlow",
    description:"Trasforma un export operativo in KPI, margini, trend mensili e riepiloghi leggibili senza ricostruire ogni volta il report.",
    features:["KPI automatici","Trend mensile","Margini","PDF / CSV"],
    url:"https://ago993.github.io/reportflow-demo/?demo=1"
  },
  {
    kicker:"LISTINI / DIFFERENZE / CONTROLLO",
    title:"ListinoDiff",
    description:"Confronta due listini prima di aggiornare cataloghi o sistemi e individua subito aumenti, ribassi, nuovi articoli e prodotti rimossi.",
    features:["Confronto CSV","Delta %","Filtri","Export listino"],
    url:"https://ago993.github.io/listinodiff-demo/?demo=1"
  }
];

let activeProject=0;
let autoTimer=null;

function renderProject(index){
  activeProject=(index+projects.length)%projects.length;
  const data=projects[activeProject];
  $("projectKicker").textContent=data.kicker;
  $("projectTitle").textContent=data.title;
  $("projectDescription").textContent=data.description;
  $("projectLink").href=data.url;

  const features=$("projectFeatures");
  features.replaceChildren();
  data.features.forEach(item=>{
    const chip=document.createElement("span");
    chip.textContent=item;
    features.append(chip);
  });

  document.querySelectorAll(".project-tab").forEach((tab,i)=>{
    const active=i===activeProject;
    tab.classList.toggle("active",active);
    tab.setAttribute("aria-selected",String(active));
  });

  const slides=[...document.querySelectorAll(".project-slide")];
  slides.forEach((slide,i)=>{
    slide.classList.remove("active","next","back");
    const rel=(i-activeProject+slides.length)%slides.length;
    if(rel===0) slide.classList.add("active");
    else if(rel===1) slide.classList.add("next");
    else slide.classList.add("back");
  });

  document.querySelectorAll(".showcase-dots span").forEach((dot,i)=>{
    dot.classList.toggle("active",i===activeProject);
  });
}

function restartAutoplay(){
  if(prefersReduced) return;
  clearInterval(autoTimer);
  autoTimer=setInterval(()=>renderProject(activeProject+1),6500);
}

document.querySelectorAll(".project-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    renderProject(Number(tab.dataset.project));
    restartAutoplay();
  });
});

$("prevProject").addEventListener("click",()=>{
  renderProject(activeProject-1);
  restartAutoplay();
});
$("nextProject").addEventListener("click",()=>{
  renderProject(activeProject+1);
  restartAutoplay();
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const delay=Number(entry.target.dataset.delay||0);
    window.setTimeout(()=>entry.target.classList.add("is-visible"),delay);
    revealObserver.unobserve(entry.target);
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const heroStage=$("heroStage");
if(heroStage&&!prefersReduced){
  let frame=null;
  heroStage.addEventListener("pointermove",event=>{
    if(frame) cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const rect=heroStage.getBoundingClientRect();
      const nx=((event.clientX-rect.left)/rect.width-.5)*2;
      const ny=((event.clientY-rect.top)/rect.height-.5)*2;
      heroStage.style.transform="rotateX("+(-ny*3.8)+"deg) rotateY("+(nx*5.5)+"deg)";
      heroStage.querySelectorAll("[data-depth]").forEach(card=>{
        const depth=Number(card.dataset.depth||1);
        card.style.translate=(nx*depth*8)+"px "+(ny*depth*6)+"px";
      });
    });
  });
  heroStage.addEventListener("pointerleave",()=>{
    heroStage.style.transform="";
    heroStage.querySelectorAll("[data-depth]").forEach(card=>card.style.translate="");
  });
}

const briefText=[
  "Ciao, vorrei capire se questo processo può essere automatizzato.","",
  "1. Attività che svolgo oggi:","[descrivi il processo]","",
  "2. File o strumenti utilizzati:","[Excel, CSV, gestionale, email, altro]","",
  "3. Risultato che vorrei ottenere automaticamente:","[descrivi l'output]","",
  "4. Frequenza:","[ogni giorno / settimana / mese / quando serve]"
].join("\n");
function legacyCopy(text){
  const area=document.createElement("textarea");
  area.value=text;
  area.setAttribute("readonly","");
  area.style.position="fixed";
  area.style.opacity="0";
  document.body.append(area);
  area.select();
  const ok=document.execCommand("copy");
  area.remove();
  return ok;
}

$("copyBriefBtn").addEventListener("click",async()=>{
  let copied=false;
  try{
    if(navigator.clipboard&&window.isSecureContext){
      await navigator.clipboard.writeText(briefText);
      copied=true;
    }
  }catch{}
  if(!copied){
    try{copied=legacyCopy(briefText);}catch{}
  }
  $("copyStatus").textContent=copied
    ?"Traccia copiata. Puoi incollarla nel messaggio di contatto."
    :"Copia non disponibile: seleziona e copia manualmente la traccia.";
});

renderProject(0);
restartAutoplay();
