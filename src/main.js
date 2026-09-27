import "./style.css";
import {runMatch} from "./game.js";
import {mountCreator} from "./creator.js";

const app=document.querySelector("#app");
app.innerHTML=`<div class="shell"><header><div class="logo">NULL <i>BLOOM</i></div><div class="build">BUILD 0.3 // ROULETTE ROAD</div></header><main><section class="stage" id="stage"><canvas id="game" width="1200" height="600"></canvas><div class="hud"><div><b>PLAYER 1</b><strong id="hp1">100</strong><small id="wins1">○ ○</small></div><div class="timer" id="timer">99</div><div class="p2hud"><b>CPU</b><strong id="hp2">100</strong><small id="wins2">○ ○</small></div></div><div id="roundMessage" class="round-message">FIGHT!</div><div class="controls">A/D MOVE · W JUMP · S CROUCH · H GUARD · J LIGHT · K HEAVY · L SPECIAL</div></section><nav><button data-mode="versus">VERSUS</button><button data-mode="training">TRAINING</button><button data-mode="creator">CREATOR</button><button data-mode="restart">RESTART</button></nav><section id="panel"><h2>ROULETTE ROAD</h2><p>NULL BLOOM is now staged on a moving casino transport truck racing through Roulette Road.</p></section></main></div>`;

const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d"),hp1=document.querySelector("#hp1"),hp2=document.querySelector("#hp2"),timer=document.querySelector("#timer"),msg=document.querySelector("#roundMessage"),wins1=document.querySelector("#wins1"),wins2=document.querySelector("#wins2");
const stageImage=new Image();
stageImage.src=new URL("../assets/stages/roulette-road.jpg",import.meta.url).href;
const render=(p1,p2,combat,match)=>{
  ctx.clearRect(0,0,1200,600);
  if(stageImage.complete&&stageImage.naturalWidth){
    ctx.imageSmoothingEnabled=true;
    ctx.drawImage(stageImage,0,0,1200,600);
  } else {
    ctx.fillStyle="#111";ctx.fillRect(0,0,1200,600);
  }
  if(combat.lastHit){
    ctx.save();
    ctx.globalAlpha=.9;
    ctx.font="900 34px Impact,Arial";
    ctx.fillStyle=combat.lastHit.blocked?"#8ed1ff":"#fff1a8";
    ctx.textAlign="center";
    ctx.fillText(combat.lastHit.blocked?"BLOCK!":"HIT!",600,180);
    ctx.restore();
  }
  hp1.textContent=Math.ceil(p1.health);hp2.textContent=Math.ceil(p2.health);timer.textContent=Math.ceil(match.time);
  wins1.textContent="● ".repeat(match.p1Wins)+"○ ".repeat(Math.max(0,2-match.p1Wins));
  wins2.textContent="● ".repeat(match.p2Wins)+"○ ".repeat(Math.max(0,2-match.p2Wins));
  msg.textContent=match.lastMessage;msg.style.opacity=match.finished||match.transition?"1":"0.0";
};
const runtime=runMatch(canvas,render);
const panel=document.querySelector("#panel");
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{
  const mode=b.dataset.mode;
  if(mode==="restart"){runtime.restart();panel.innerHTML="<h2>ROULETTE ROAD</h2><p>Match restarted.</p>";return}
  if(mode==="creator"){mountCreator(panel);return}
  panel.innerHTML=mode==="training"?`<h2>TRAINING</h2><p>Training uses the same combat runtime.</p><div class="chips"><span>J LIGHT</span><span>K HEAVY</span><span>L SPECIAL</span><span>H GUARD</span><span>W JUMP</span></div>`:`<h2>VERSUS</h2><p>PLAYER 1 versus CPU. First fighter to two rounds wins.</p>`;
});
