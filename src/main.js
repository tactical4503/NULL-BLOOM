import "./style.css";

const app=document.querySelector("#app");
app.innerHTML=`
<div class="shell">
<header><div class="logo">NULL <i>BLOOM</i></div><div class="build">PRE-ALPHA // FIGHTING SYSTEM</div></header>
<main>
<section class="stage">
<div class="water"></div><div class="tunnel"><div class="wire w1"></div><div class="wire w2"></div><div class="lights"></div><div class="train"><div class="window"><span>NULL BLOOM</span></div><div class="window"></div><div class="window"></div></div><div class="platform"></div></div>
<div class="fighter p1"><div class="head"></div><div class="body"></div><div class="leg l"></div><div class="leg r"></div></div>
<div class="fighter p2"><div class="head"></div><div class="body"></div><div class="leg l"></div><div class="leg r"></div></div>
<div class="hud"><div><b>PLAYER 1</b><strong>100</strong></div><div class="timer">99</div><div class="p2hud"><b>PLAYER 2</b><strong>100</strong></div></div>
<div class="controls">A/D MOVE · W JUMP · J LIGHT · K HEAVY · L SPECIAL · S GUARD</div>
</section>
<nav><button data-mode="versus">VERSUS</button><button data-mode="training">TRAINING</button><button data-mode="creator">CREATOR</button></nav>
<section id="panel"><h2>NULL BLOOM</h2><p>Select a mode. The combat runtime is being built data-first so fighters, attacks and animations can be added without rewriting the engine.</p></section>
</main></div>`;

const panel=document.querySelector("#panel");
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{
 const mode=b.dataset.mode;
 panel.innerHTML= mode==="creator"
 ? "<h2>FIGHTER CREATOR</h2><p>Modular architecture reserved for bodies, heads, faces, hair, tops, bottoms, footwear, accessories, weapons, markings, effects and palettes.</p><div class='chips'><span>BODY</span><span>HEAD</span><span>FACE</span><span>HAIR</span><span>OUTFIT</span><span>ACCESSORY</span><span>WEAPON</span><span>PALETTE</span></div>"
 : mode==="training"
 ? "<h2>TRAINING</h2><p>Hitbox, hurtbox, frame-data and input-debug systems will plug into the same combat runtime.</p>"
 : "<h2>VERSUS</h2><p>Local-versus shell initialized. Fighter manifests and animation assets will populate the selection flow.</p>";
});