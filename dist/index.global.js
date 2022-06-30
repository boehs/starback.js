(()=>{function s(h,t){return Math.floor(Math.random()*(t-h)+1)+h}function c(h){return h[Math.floor(Math.random()*h.length)]}function p(h){return Math.sin(h*(Math.PI/180))}function v(h){return Math.cos(h*(Math.PI/180))}var f=class{constructor(t,i){this.stars=[];this.config={quantity:100,direction:100,speed:[.5,.8],backgroundColor:"#ccc",starColor:"white",starSize:[0,3]};this.overflowSize=10;this.canvas=null;this.ctx=null;this.config={...this.config,...i},this.canvas=t,this.ctx=t.getContext("2d")}draw(){for(let t=0;t<this.stars.length;t++){let i=this.stars[t];this.ctx.beginPath(),this.ctx.fillStyle=this.config.starColor,this.ctx.save(),this.ctx.globalAlpha=i.opacity,this.ctx.arc(i.x,i.y,i.size,0,Math.PI*2),this.ctx.fill(),this.ctx.restore(),this.ctx.closePath()}}update(){let t=p(this.config.direction),i=v(this.config.direction);for(let a=0;a<this.stars.length;a++){let o=this.stars[a];if(o.x+=t*o.speed,o.y+=i*o.speed,o.x>this.canvas.width+this.overflowSize||o.x<0-this.overflowSize||o.y>this.canvas.height+this.overflowSize||o.y<0-this.overflowSize){this.stars.splice(a,1);let r,n,e;i==-1||i==1?(e=0,r=s(e,this.canvas.width),n=i==1?0:this.canvas.height):t==-1||t==1?(e=t==1?0:this.canvas.width,r=e+this.overflowSize*-t,n=s(0,this.canvas.height)):t>0&&i>0?(e=-this.overflowSize,r=c([e,s(e,this.canvas.width-this.overflowSize)]),n=r==e?s(e,this.canvas.height-this.overflowSize):-this.overflowSize):t<0&&i>0?(e=-this.canvas.width+this.overflowSize,r=c([e,s(e,0+this.overflowSize)]),n=r==e?s(e,0-this.canvas.height+this.overflowSize):-this.overflowSize):t<0&&i<0?(e=this.canvas.width+this.overflowSize,r=c([e,s(e,0+this.overflowSize)]),n=r==e?s(e,0+this.overflowSize):this.canvas.height+this.overflowSize):t>0&&i<0&&(e=-this.overflowSize,r=c([e,s(e,this.canvas.width-this.overflowSize)]),n=r==e?s(e,this.canvas.height-this.overflowSize):this.canvas.height+this.overflowSize);let m={x:r,y:n};this.generate(1,m)}}}generate(t,i=null){if(i){let{x:a,y:o}=i,r={x:a,y:o,size:this.randomSize(),opacity:this.randomOpacity(),speed:this.randomSpeed()};return this.stars.push(r)}for(let a=0;a<t;a++){let o=s(0,this.canvas.width),r=s(0,this.canvas.height);this.stars.push({x:o,y:r,size:this.randomSize(),opacity:this.randomOpacity(),speed:this.randomSpeed()})}}randomSize(){return typeof this.config.starSize=="object"?s(this.config.starSize[0],this.config.starSize[1]):this.config.starSize}randomOpacity(){let t=this.config.randomOpacity;return typeof t=="boolean"?t?(t?Math.random():1).toFixed(2):1:(Math.random()*(t[1]-t[0])+t[0]).toFixed(2)}randomSpeed(){let t=this.config.speed;return Array.isArray(t),Math.random()*(t[1]-t[0])+t[0]}},u=f;var d=class{constructor(t,i){this.stars=[];this.config={type:"line",slope:{x:1,y:1},frequency:10,speed:2,starSize:100,starColor:["#fb00ff","#00dde0"],spread:1,directionY:-1,directionX:1,distanceX:.1,quantity:200};this.direction=225;this.canvas=null;this.ctx=null;this.config={...this.config,...i},this.canvas=t,this.ctx=t.getContext("2d")}draw(){this.ctx.strokeStyle="white",this.stars.forEach(t=>{let i;Array.isArray(this.config.starColor)?(i=this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height),this.config.starColor.forEach((a,o)=>i.addColorStop(o/this.config.starColor.length,a))):i=this.config.starColor,this.ctx.save(),this.ctx.strokeStyle=i,this.ctx.beginPath(),this.ctx.moveTo(t.start.x,t.start.y),this.ctx.setLineDash([this.config.starSize,t.startPoint*this.config.frequency]),this.ctx.lineDashOffset=this.config.directionY*(t.progress+t.length),this.ctx.quadraticCurveTo(t.curve.x,t.curve.y,t.end.x,t.end.y),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()})}update(){this.stars.map((t,i)=>{t.progress+=t.speed})}generate(){for(let t=0;t<this.config.quantity;t++){let i=s(-20,this.canvas.width),a=i<=0?s(0,this.canvas.height):0,o=100,r=i+(this.canvas.width*this.config.distanceX+this.config.spread*i*this.config.directionX),n=r-i,e=this.canvas.height;this.stars.push({x:i,y:a,length:e,height:o,progress:0,speed:this.config.speed+Math.random()/5,lineDash:s(50,100),filter:{opacity:c([s(20,100)+"%",!1])},start:{x:i,y:a},curve:{x:i+n*this.config.slope.x,y:a+this.canvas.height*this.config.slope.y},startPoint:s(10,100),end:{x:r,y:this.canvas.height}})}return this.stars}},x=d;var S={width:800,height:600,randomOpacity:!0,showFps:!1,type:"dot"},g=class{constructor(t,i={}){this.config={};this.stars=null;this.canvas=null;this.starTypes={dot:u,line:x};this.fps=0;this.repeat=0;this.lastCalledTime=0;this.lastGenerated=0;this.frontCallbacks=[];this.behindCallbacks=[];this.canvas=t instanceof HTMLCanvasElement?t:document.querySelector(t),this.ctx=this.canvas.getContext("2d"),this.mergeConfig(i),this.frontCallbacks=[],this.behindCallbacks=[],this.init()}static create(t,i={}){return new g(t,i)}mergeConfig(t){let i={...S,...t};this.config=i}init(){this.canvas.setAttribute("width",this.config.width),this.canvas.setAttribute("height",this.config.height),this.stars=new this.starTypes[this.config.type](this.canvas,this.config),this.generateStar(),requestAnimationFrame(t=>this.render(t))}setBackground(){let t;typeof this.config.backgroundColor=="string"?t=this.config.backgroundColor:typeof this.config.backgroundColor=="object"&&(t=this.ctx.createLinearGradient(this.canvas.width/2,0,this.canvas.width/2,this.canvas.height),this.config.backgroundColor.forEach((i,a)=>{t.addColorStop(a/this.config.backgroundColor.length,i)})),this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}draw(){this.behindCallbacks.forEach(t=>t(this.ctx)),this.stars.draw(),this.frontCallbacks.forEach(t=>t(this.ctx)),this.config.showFps&&this.drawFps()}update(){this.stars.update()}addToFront(t){this.frontCallbacks.push(t)}addToBehind(t){this.behindCallbacks.push(t)}generateStar(){this.stars.generate(this.config.quantity)}drawFps(){this.ctx.fillStyle="white",this.ctx.fillText(`${this.fps} fps`,10,10)}render(t){this.lastCalledTime||(this.lastCalledTime=t);let i=t-this.lastCalledTime;this.fps=Math.round(1e3/i),this.lastCalledTime=t,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.setBackground(),this.draw(),this.update(),requestAnimationFrame(a=>this.render(a))}},l=g;l.DefaultConfig=S;var D=l;})();
