import {InputManager} from "./engine/input.js";
import {Fighter} from "./engine/fighter.js";
import {Combat} from "./engine/combat.js";
import {GameLoop} from "./engine/loop.js";
import def from "../data/characters/example/character.json" with {type:"json"};
import attacks from "../data/characters/example/attacks.json" with {type:"json"};
export function createMatch(){const definition={...def,speed:5,attacks};const p1=new Fighter(definition,350,510,1);const p2=new Fighter(definition,850,510,-1);return {p1,p2,combat:new Combat(p1,p2)};}
export const bindings={p1:{left:"KeyA",right:"KeyD",jump:"KeyW",crouch:"KeyS",guard:"KeyS",light:"KeyJ",heavy:"KeyK",special:"KeyL"}};
export function runMatch(canvas,ui){const ctx=canvas.getContext("2d");const input=new InputManager();const {p1,p2,combat}=createMatch();const read=()=>({left:input.held(bindings.p1.left),right:input.held(bindings.p1.right),jump:input.consume(bindings.p1.jump),crouch:input.held(bindings.p1.crouch),guard:input.held(bindings.p1.guard)});const loop=new GameLoop(()=>{const i=read();if(input.consume(bindings.p1.light))p1.startAttack("light");if(input.consume(bindings.p1.heavy))p1.startAttack("heavy");if(input.consume(bindings.p1.special))p1.startAttack("special");p1.update(i,p2,1/60);const ai={left:p2.x>p1.x+70,right:p2.x<p1.x-70,jump:false,crouch:false,guard:p1.attack!==null};if(!p2.attack&&Math.abs(p1.x-p2.x)<100)p2.startAttack("light");p2.update(ai,p1,1/60);combat.resolve();combat.endFrame();ui(p1,p2,combat);input.endFrame()},()=>{});loop.start();return {stop:()=>loop.stop()};}