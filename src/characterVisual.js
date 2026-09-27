const cache=new Map();
function spriteFor(character,state){
 const id=character?.id;if(!id)return null;
 const key=["idle","light"].includes(state)?state:"idle";
 const url=new URL(`../assets/characters/${id}/animations/${key}/00.svg`,import.meta.url).href;
 if(!cache.has(url)){const img=new Image();img.src=url;cache.set(url,img);}
 const img=cache.get(url);return img.complete&&img.naturalWidth?img:null;
}
export function drawFighter(ctx,p,character,debug=false){
 const v=character.visual||{primary:"#e7c83b",secondary:"#315b86",skin:"#e5a982",accent:"#f06a4f"};
 const img=spriteFor(character,p.state);
 ctx.save();ctx.translate(p.x,p.y);
 if(img){const h=128,w=h*(img.naturalWidth/img.naturalHeight);ctx.scale(p.facing<0?-1:1,1);ctx.drawImage(img,-w/2,-h,w,h);}
 else{ctx.scale(p.facing<0?-1:1,1);ctx.lineWidth=4;ctx.strokeStyle="#10151b";ctx.fillStyle=v.secondary;ctx.fillRect(-19,-42,38,42);ctx.fillStyle=v.primary;ctx.beginPath();ctx.roundRect(-24,-88,48,46,8);ctx.fill();ctx.fillStyle=v.skin;ctx.beginPath();ctx.arc(0,-106,20,0,Math.PI*2);ctx.fill();ctx.fillStyle=v.accent;ctx.beginPath();ctx.arc(7,-110,4,0,Math.PI*2);ctx.fill();}
 if(p.guard){ctx.strokeStyle=v.accent;ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,-68,34,-1.1,1.1);ctx.stroke();}
 if(debug){ctx.strokeStyle="#58a8ff";ctx.strokeRect(p.hurtbox().x-p.x,p.hurtbox().y-p.y,p.hurtbox().w,p.hurtbox().h);}
 ctx.restore();
}