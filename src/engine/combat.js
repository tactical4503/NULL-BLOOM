import {overlap} from "./geometry.js";
export class Combat{
 constructor(a,b){this.a=a;this.b=b;this.roundOver=false;this.lastHit=null;this.events=[];}
 resolve(){
  this.lastHit=null;this.events=[];
  for(const [attacker,target] of [[this.a,this.b],[this.b,this.a]]){
   const box=attacker.attackBox();if(!box||attacker._hitThisFrame)continue;
   if(overlap(box,target.hurtbox())){
    const blocked=target.guard;
    target.receiveHit(attacker.attack,attacker,blocked);
    attacker._hitThisFrame=true;
    attacker.hitstop=Math.max(attacker.hitstop,blocked?4:7);
    this.lastHit={attacker,target,blocked};
    this.events.push({type:blocked?"block":"hit",x:target.x,y:target.y});
   }
  }
  const dx=this.b.x-this.a.x,min=42;
  if(Math.abs(dx)<min){const push=(min-Math.abs(dx))/2,dir=dx===0?1:Math.sign(dx);this.a.x-=push*dir;this.b.x+=push*dir;}
  this.a.x=Math.max(70,Math.min(1130,this.a.x));this.b.x=Math.max(70,Math.min(1130,this.b.x));
  if(this.a.health<=0||this.b.health<=0)this.roundOver=true;
 }
 endFrame(){this.a._hitThisFrame=false;this.b._hitThisFrame=false;}
}
