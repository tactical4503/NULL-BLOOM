import "./style.css";
import {runMatch} from "./game.js";
import {mountCreator} from "./creator.js";

const app=document.querySelector("#app");
app.innerHTML=`
<div class="shell">
<header><div class="logo">NULL <i>BLOOM</i></div><div class="build">PRE-ALPHA // COMBAT RUNTIME</div></header>
<main>
<section class="stage" id="stage">
<div class="water"></div><div class="tunnel"><div class="wire w1"></div><div class="wire w2"></div><div class="lights"></div><div class="train"><div class="window"><span>NULL BLOOM</span></div><div class="window"></div><div class="window"></div></div><div class="platform"></div></div>
<canvas id="game" width="1200" height="600"></canvas>
<div class="hud"><div><b>PLAYER 1</b><strong id="hp1">100</strong></div><div class="timer" id="timer">99</div><div class="p2hud"><b>CPU</b><strong id="hp2">100</strong></div></div>
<div class="controls">A/D MOVE · W JUMP · J CROUCH/GUARD · J LIGHT · K HEAVY · L SPECIAL</div>
</section>
<nav><button data-mode="versus">VERSUS</button><button data-mode="training">TRAINING</button><button data-mode="creator">CREATOR</button></nav>
<section id="panel"><h2>COMBAT RUNTIME</h2><p>Frame-based movement, attacks, hitboxes, hurtboxes, hitstop, hitstun, knockback and CPU behavior are now connected to the playable stage.</p></section>
</main></div>`;
const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d"),hp1=document.querySelector("#hp1"),hp2=document.querySelector("#hp2");
const render=(p1,p2,combat)=>{ctx.clearRect(0,0,1200,600);const draw=(p,flip)=>{ctx.save();ctx.translate(p.x,p.y);ctx.scale(flip?-1:1,1);ctx.fillStyle=p===p1?"#e7c83b":"#d85a4a";ctx.fillRect(-22,-104,44,65);ctx.fillStyle="#e5a982";ctx.fillRect(-16,-130,32,26);ctx.fillStyle="#315b86";ctx.fillRect(-17,-39,13,39);ctx.fillRect(4,-39,13,39);ctx.restore()};draw(p1,false);draw(p2,true);if(combat.lastHit){ctx.fillStyle="#fff1a8";ctx.font="bold 34px Arial";ctx.fillText("HIT!",p1.x<p2.x?p2.x-30:p1.x-30,180)}hp1.textContent=p1.health;hp2.textContent=p2.health};
runMatch(canvas,render);
const panel=document.querySelector("#panel");
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{const mode=b.dataset.mode;if(mode==="creator"){mountCreator(panel);return}panel.innerHTML=mode==="training"?`<h2>TRAINING</h2><p>Training shares the same combat simulation. Frame-data inspection and hitbox visualization use the same runtime.</p>`:`<h2>VERSUS</h2><p>Local match runtime is active. Player 1 uses A/D/W/J/K/L while the CPU controls Player 2.</p>`});
