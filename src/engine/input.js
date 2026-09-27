export class InputManager{
  constructor(target=window){this.down=new Set();this.pressed=new Set();target.addEventListener("keydown",e=>{if(!this.down.has(e.code))this.pressed.add(e.code);this.down.add(e.code);});target.addEventListener("keyup",e=>this.down.delete(e.code));}
  held(code){return this.down.has(code)}
  consume(code){if(!this.pressed.has(code))return false;this.pressed.delete(code);return true}
  endFrame(){this.pressed.clear()}
}