export class GameLoop{
 constructor(update,render){this.update=update;this.render=render;this.last=performance.now();this.acc=0;this.step=1000/60;this.running=false;}
 start(){this.running=true;const tick=now=>{if(!this.running)return;const delta=Math.min(100,now-this.last);this.last=now;this.acc+=delta;while(this.acc>=this.step){this.update(1/60);this.acc-=this.step;}this.render(this.acc/this.step);requestAnimationFrame(tick)};requestAnimationFrame(tick)}
 stop(){this.running=false}
}