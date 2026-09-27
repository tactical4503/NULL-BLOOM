export class InputManager{
 constructor(target=window){this.down=new Set();this.pressed=new Set();this.target=target;this.onKeyDown=e=>{if(["INPUT","SELECT","TEXTAREA"].includes(e.target?.tagName))return;if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault();if(!this.down.has(e.code))this.pressed.add(e.code);this.down.add(e.code);};this.onKeyUp=e=>this.down.delete(e.code);target.addEventListener("keydown",this.onKeyDown);target.addEventListener("keyup",this.onKeyUp);}
 held(code){return this.down.has(code)}
 consume(code){if(!this.pressed.has(code))return false;this.pressed.delete(code);return true}
 endFrame(){this.pressed.clear()}
 destroy(){this.target.removeEventListener("keydown",this.onKeyDown);this.target.removeEventListener("keyup",this.onKeyUp);this.down.clear();this.pressed.clear();}
}
