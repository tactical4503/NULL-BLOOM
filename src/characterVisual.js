const cache=new Map();
const stateMap={idle:"idle",walk:"walk",run:"walk",jump:"jump",fall:"jump",crouch:"crouch",guard:"guard",light:"light",heavy:"heavy",special:"special",hit:"hit",knockdown:"knockdown",getup:"getup",victory:"victory",defeat:"defeat"};

const atlasMeta={
  sol:{frameWidth:64,frameHeight:80,columns:6,frames:{idle:[0,1],walk:[2,3],jump:[4,5],crouch:[6],guard:[7],light:[8,9],heavy:[10,11],special:[12,13,14],hit:[15,16],knockdown:[17,18],getup:[19,20],victory:[21],defeat:[22]}},
  morrow:{frameWidth:64,frameHeight:80,columns:6,frames:{idle:[0,1],walk:[2,3],jump:[4,5],crouch:[6],guard:[7],light:[8,9],heavy:[10,11],special:[12,13],hit:[14],knockdown:[15,16],getup:[17,18],victory:[19],defeat:[20]}}
};

function load(url){
  if(!cache.has(url)){const img=new Image();img.decoding="async";img.src=url;cache.set(url,img);}
  const img=cache.get(url);
  return img.complete&&img.naturalWidth?img:null;
}

function atlasFor(id){
  const meta=atlasMeta[id];
  if(!meta)return null;
  const url=new URL("../assets/generated/"+id+"-atlas.webp",import.meta.url).href;
  const img=load(url);
  return img?{img,meta}:null;
}

function svgFallback(character,state){
  const id=character?.id;if(!id)return null;
  const mapped=stateMap[state]||"idle";
  const custom=new URL("../assets/characters/"+id+"/animations/"+mapped+"/00.svg",import.meta.url).href;
  const idle=new URL("../assets/characters/"+id+"/animations/idle/00.svg",import.meta.url).href;
  return load(custom)||load(idle);
}

export function drawFighter(ctx,p,character,debug=false,time=0){
  const id=character?.id;
  const mapped=stateMap[p.state]||"idle";
  const atlas=atlasFor(id);
  const meta=atlas?.meta;
  const frames=meta?.frames[mapped]||meta?.frames.idle;
  const frameIndex=frames?.[Math.floor(time*10)%frames.length]??0;
  const bob=p.state==="idle"?Math.sin(time*5+p.x*.01)*2:0;

  ctx.save();
  ctx.translate(p.x,p.y+bob);
  ctx.scale(p.facing<0?-1:1,1);
  ctx.shadowColor="rgba(0,0,0,.6)";
  ctx.shadowBlur=12;
  ctx.shadowOffsetY=8;

  if(atlas){
    const sx=(frameIndex%meta.columns)*meta.frameWidth;
    const sy=Math.floor(frameIndex/meta.columns)*meta.frameHeight;
    const h=170,w=h*(meta.frameWidth/meta.frameHeight);
    ctx.imageSmoothingEnabled=true;
    ctx.drawImage(atlas.img,sx,sy,meta.frameWidth,meta.frameHeight,-w/2,-h,w,h);
  }else{
    const img=svgFallback(character,p.state);
    if(img){
      const h=170,w=h*(img.naturalWidth/img.naturalHeight);
      ctx.drawImage(img,-w/2,-h,w,h);
    }
  }
  ctx.restore();

  if(debug){
    ctx.save();
    ctx.strokeStyle="#58a8ff";
    const b=p.hurtbox();
    ctx.strokeRect(b.x,b.y,b.w,b.h);
    ctx.restore();
  }
}
