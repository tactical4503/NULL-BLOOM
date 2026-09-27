import {InputManager} from "./engine/input.js";
import {Fighter} from "./engine/fighter.js";
import {Combat} from "./engine/combat.js";
import {GameLoop} from "./engine/loop.js";
import {MatchState} from "./engine/match.js";
import sol from "../data/characters/sol/character.json" with {type:"json"};
import morrow from "../data/characters/morrow/character.json" with {type:"json"};
import attacks from "../data/characters/example/attacks.json" with {type:"json"};
export function createMatch(){const p1def={...sol,speed:sol.speed??5.5,attacks};const p2def={...morrow,speed:morrow.speed??4.5,attacks};const p1=new Fighter(p1def,330,510,1);const p2=new Fighter(p2def,870,510,-1);const combat=new Combat(p1,p2);const match=new MatchState(p1,p2,{roundTime:99});match.resetRound();return {p1,p2,combat,match};}
export const bindings={p1:{left:"KeyA",right:"KeyD",jump:"KeyW",crouch:"KeyS",guard:"KeyH",light:"KeyJ",heavy:"KeyK",special:"KeyL"}};
export function runMatch(canvas,ui){const input=new InputManager();const {p1,p2,combat,match}=createMatch();const read=()=>({left:input.held(bindings.p1.left),right:input.held(bindings.p1.right),jump:input.consume(bindings.p1.jump),crouch:input.held(bindings.p1.crouch),guard:input.held(bindings.p1.guard)});const loop=new GameLoop(()=>{if(match.finished){ui(p1,p2,combat,match);input.endFrame();return}const i=read();if(input.consume(bindings.p1.light))p1.startAttack("light");if(input.consume(bindings.p1.heavy))p1.startAttack("heavy");if(input.consume(bindings.p1.special))p1.startAttack("special");p1.update(i,p2,1/60);const distance=p1.x-p2.x;const ai={left:distance<90,right:distance>130,jump:false,crouch:false,guard:p1.attack!==null};if(!p2.attack&&Math.abs(distance)<105)p2.startAttack(Math.abs(distance)<65?"light":"heavy");p2.update(ai,p1,1/60);combat.resolve();combat.endFrame();match.tick();ui(p1,p2,combat,match);input.endFrame()},()=>{});loop.start();return {stop:()=>loop.stop(),match,p1,p2};}