import {overlap} from "./geometry.js";
export class Combat{
 constructor(a,b){this.a=a;this.b=b;this.roundOver=false;this.lastHit=null;}
 resolve(){
  for(const [attacker,target] of [[this.a,this.b],[this.b,this.a]]){
   const box=attacker.attackBox();if(!box||attacker._hitThisFrame)return;
   if(overlap(box,target.hurtbox())&&!target.guard){target.receiveHit(attacker.attack,attacker);attacker._hitThisFrame=true;this.lastHit={attacker,target};}
  }
  if(this.a.health<=0||this.b.health<=0)this.roundOver=true;
 }
 endFrame(){this.a._hitThisFrame=false;this.b._hitThisFrame=false;}
}