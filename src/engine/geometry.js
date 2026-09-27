export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export const center=(b)=>({x:b.x+b.w/2,y:b.y+b.h/2});
export const facingX=(fighter)=>fighter.facing>=0?1:-1;