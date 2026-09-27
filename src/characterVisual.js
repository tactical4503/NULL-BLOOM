const cache=new Map();
const stateMap={idle:"idle",walk:"walk",run:"walk",jump:"jump",fall:"jump",crouch:"crouch",guard:"guard",light:"light",heavy:"heavy",special:"special",hit:"hit",knockdown:"knockdown",getup:"getup",victory:"victory",defeat:"defeat"};

const generated={
  sol:{
    idle:{frames:7,cols:7},walk:{frames:9,cols:8},crouch:{frames:6,cols:6},
    jump:{frames:8,cols:8},light:{frames:6,cols:6},special:{frames:6,cols:6},
    hit:{frames:6,cols:6},knockdown:{frames:8,cols:8}
  },
  morrow:{
    idle:{frames:7,cols:7},walk:{frames:9,cols:8},crouch:{frames:6,cols:6},
    jump:{frames:8,cols:8},light:{frames:6,cols:6},special:{frames:6,cols:6},
    hit:{frames:6,cols:6},knockdown:{frames:8,cols:8}
  }
};

function load(url){
  if(!cache.has(url)){
    const img=new Image();
    img.decoding="async";
    img.src=url;
    cache.set(url,img);
  }
  const img=cache.get(url);
  return img.complete&&img.naturalWidth?img:null;
}

function generatedSheet(id,state){
  const spec=generated[id]?.[state];
  if(!spec)return null;
  const url=new URL("../assets/generated/"+id+"/"+state+".webp",import.meta.url).href;
  const img=load(url);
  return img?{img,...spec}:null;
}

function svgFallback(character,state){
  const id=character?.id;
  if(!id)return null;
  const mapped=stateMap[state]||"idle";
  const custom=new URL("../assets/characters/"+id+"/animations/"+mapped+"/00.svg",import.meta.url).href;
  const idle=new URL("../assets/characters/"+id+"/animations/idle/00.svg",import.meta.url).href;
  return load(custom)||load(idle);
}

export function drawFighter(ctx,p,character,debug=false,time=0){
  const id=character?.id;
  const mapped=stateMap[p.state]||"idle";
  const sheet=generatedSheet(id,mapped);
  const bob=p.state==="idle"?Math.sin(time*5+p.x*.01)*2:0;

  ctx.save();
  ctx.translate(p.x,p.y+bob);
  ctx.scale(p.facing<0?-1:1,1);
  ctx.shadowColor="rgba(0,0,0,.45)";
  ctx.shadowBlur=10;
  ctx.shadowOffsetY=7;

  if(sheet){
    const frame=Math.floor(time*10)%sheet.frames;
    const cols=sheet.cols;
    const rows=Math.ceil(sheet.frames/cols);
    const sw=sheet.img.naturalWidth/cols;
    const sh=sheet.img.naturalHeight/rows;
    const h=170;
    const w=h*(sw/sh);
    ctx.imageSmoothingEnabled=true;
    ctx.drawImage(sheet.img,(frame%cols)*sw,Math.floor(frame/cols)*sh,sw,sh,-w/2,-h,w,h);
  }else{
    const img=svgFallback(character,p.state);
    if(img){
      const h=170;
      const w=h*(img.naturalWidth/img.naturalHeight);
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
