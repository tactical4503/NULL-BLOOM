const cache=new Map();
const timing={idle:[8,10,true],walk:[8,12,true],run:[8,16,true],jump:[5,12,false],fall:[4,10,true],crouch:[4,10,true],guard:[4,10,true],light:[8,14,false],heavy:[12,14,false],special:[14,14,false],hit:[6,12,false],knockdown:[8,12,false],getup:[8,12,false],victory:[12,10,true],defeat:[8,10,true]};
function spriteFor(character,state,frame){
 const id=character?.id;if(!id)return null;
 const [count,fps,loop]=timing[state]||timing.idle;
 const index=loop?Math.floor((frame/fps)%count):Math.min(count-1,Math.floor(frame/fps));
 const key=`${id}/${state}/${index.toString().padStart(2,"0")}`;
 const url=new URL(`../assets/characters/${id}/animations/${state}/${index.toString().padStart(2,"0")}.svg`,import.meta.url).href;
 if(!cache.has(url)){const img=new Image();img.decoding="async";img.src=url;cache.set(url,img);}
 const img=cache.get(url);return img.complete&&img.naturalWidth?img:null;
}
function fallback(ctx,p,v){ctx.scale(p.facing<0?-1:1,1);ctx.lineWidth=4;ctx.strokeStyle="#10151b";ctx.fillStyle=v.secondary;ctx.fillRect(-19,-42,38,42);ctx.fillStyle=v.primary;ctx.beginPath();ctx.roundRect(-24,-88,48,46,8);ctx.fill();ctx.fillStyle=v.skin;ctx.beginPath();ctx.arc(0,-106,20,0,Math.PI*2);ctx.fill();ctx.fillStyle=v.accent;ctx.beginPath();ctx.arc(7,-110,4,0,Math.PI*2);ctx.fill();}
export function drawFighter(ctx,p,character,debug=false){
 const v=character.visual||{primary:"#e7c83b",secondary:"#315b86",skin:"#e5a982",accent:"#f06a4f"};
 const img=spriteFor(character,p.state,p.frame);
 ctx.save();ctx.translate(p.x,p.y);
 if(img){const h=128,w=h*(img.naturalWidth/img.naturalHeight);ctx.scale(p.facing<0?-1:1,1);ctx.drawImage(img,-w/2,-h,w,h);}
 else fallback(ctx,p,v);
 if(p.guard){ctx.strokeStyle=v.accent;ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,-68,34,-1.1,1.1);ctx.stroke();}
 ctx.restore();
 if(debug){ctx.save();ctx.strokeStyle="#58a8ff";const b=p.hurtbox();ctx.strokeRect(b.x,b.y,b.w,b.h);ctx.restore();}
}