import {clamp} from "./geometry.js";
export const STATES=Object.freeze({IDLE:"idle",WALK:"walk",JUMP:"jump",FALL:"fall",CROUCH:"crouch",GUARD:"guard",LIGHT:"light",HEAVY:"heavy",SPECIAL:"special",HIT:"hit",KNOCKDOWN:"knockdown",GETUP:"getup",VICTORY:"victory",DEFEAT:"defeat"});
export class Fighter{
 constructor(def,x,ground,facing){this.def=def;this.x=x;this.y=ground;this.ground=ground;this.facing=facing;this.vx=0;this.vy=0;this.health=100;this.state=STATES.IDLE;this.frame=0;this.hitstun=0;this.hitstop=0;this.attack=null;this.onGround=true;this.guard=false;this._hitThisFrame=false;this.pushbox={w:42,h:100};}
 body(){return {x:this.x-this.pushbox.w/2,y:this.y-this.pushbox.h,w:this.pushbox.w,h:this.pushbox.h}}
 hurtbox(){return {x:this.x-18,y:this.y-98,w:36,h:92}}
 setState(s){if(this.state!==s){this.state=s;this.frame=0;}}
 startAttack(name){const a=this.def.attacks[name];if(!a||!this.onGround||this.hitstun||this.guard)return false;this.attack={name,...a};this._hitThisFrame=false;this.setState(a.state);return true;}
 update(input,opponent,dt){
  if(this.hitstop>0){this.hitstop--;return;}
  this.guard=Boolean(input.guard)&&this.onGround&&!this.attack&&!this.hitstun;
  if(this.hitstun>0){this.guard=false;this.hitstun--;this.vx*=.88;this.y+=this.vy;this.vy+=.8;if(this.y>=this.ground){this.y=this.ground;this.vy=0;this.onGround=true;}return;}
  this.frame++;
  if(this.attack){if(this.frame>this.attack.startup+this.attack.active+this.attack.recovery){this.attack=null;this.setState(this.onGround?STATES.IDLE:STATES.FALL);}else if(this.frame>this.attack.startup+this.attack.active){this.vx*=.8;}return;}
  const left=input.left,right=input.right;
  this.vx=(right-left)*this.def.speed;
  if(left||right)this.facing=right?1:-1;
  if(input.jump&&this.onGround){this.vy=-15;this.onGround=false;this.setState(STATES.JUMP);}
  if(!this.onGround){this.y+=this.vy;this.vy+=.75;if(this.vy>0)this.setState(STATES.FALL);if(this.y>=this.ground){this.y=this.ground;this.vy=0;this.onGround=true;this.setState(STATES.IDLE);}}
  else if(input.crouch)this.setState(STATES.CROUCH);
  else if(this.guard)this.setState(STATES.GUARD);
  else if(left||right)this.setState(STATES.WALK);else this.setState(STATES.IDLE);
  this.x=clamp(this.x+this.vx,70,1130);
 }
 attackBox(){if(!this.attack)return null;const activeStart=this.attack.startup+1,activeEnd=this.attack.startup+this.attack.active;if(this.frame<activeStart||this.frame>activeEnd)return null;const w=this.attack.range;return {x:this.facing>0?this.x+18:this.x-18-w,y:this.y-this.attack.height,w,h:this.attack.height};}
 receiveHit(a,attacker,blocked=false){
  if(blocked){this.hitstun=Math.max(5,Math.floor(a.hitstun*.45));this.vx=attacker.facing*Math.max(1,a.knockback*.35);this.hitstop=4;return;}
  this.health=clamp(this.health-a.damage,0,100);this.hitstun=a.hitstun;this.hitstop=7;this.vx=attacker.facing*a.knockback;this.vy=-a.launch;this.attack=null;this.guard=false;this.setState(this.health<=0?STATES.KNOCKDOWN:STATES.HIT);
 }
}