export function drawFighter(ctx,p,character,debug=false){
  const v=character.visual||{primary:"#e7c83b",secondary:"#315b86",skin:"#e5a982",accent:"#f06a4f"};
  const s=p.scale||1;ctx.save();ctx.translate(p.x,p.y);ctx.scale((p.facing<0?-1:1)*s,s);
  const bob=p.onGround?Math.sin(p.frame*.12)*1.5:0;ctx.translate(0,bob);
  ctx.lineWidth=4;ctx.strokeStyle="#10151b";ctx.lineJoin="round";
  ctx.fillStyle=v.secondary;ctx.fillRect(-19,-42,38,42);ctx.strokeRect(-19,-42,38,42);
  ctx.fillStyle=v.primary;ctx.beginPath();ctx.roundRect(-24,-88,48,46,8);ctx.fill();ctx.stroke();
  ctx.fillStyle=v.skin;ctx.beginPath();ctx.arc(0,-106,20,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle=v.accent;ctx.beginPath();ctx.arc(7,-110,4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=v.secondary;ctx.fillRect(-16,-18,13,18);ctx.fillRect(3,-18,13,18);
  if(p.state==="guard"){ctx.fillStyle=v.accent;ctx.beginPath();ctx.arc(28,-66,11,0,Math.PI*2);ctx.fill();ctx.stroke();}
  if(p.attack){ctx.strokeStyle=v.accent;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(20,-65);ctx.lineTo(p.attack.name==="heavy"?62:50,-70);ctx.stroke();}
  ctx.restore();
  if(debug){ctx.strokeStyle="#58a8ff";ctx.strokeRect(p.hurtbox().x,p.hurtbox().y,p.hurtbox().w,p.hurtbox().h);}
}