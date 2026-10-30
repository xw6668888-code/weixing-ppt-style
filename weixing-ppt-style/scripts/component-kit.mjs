import fs from 'node:fs';
// Editable construction helpers. Read component-grammar.md before choosing a composition.
// These are weekly-family approximations, not exact native copies or a universal page template.
// Geometry uses CSS px at 1280 x 720. Layout parameters are documented in the skill references.
export const C = {blue:'#1F497D',line:'#4472C4',deep:'#1D438F',light:'#EAF2FA',pale:'#F6F9FC',red:'#C00000',ink:'#202020',muted:'#657183',white:'#FFFFFF'};
export function shape(s,name,x,y,w,h,fill='none',stroke='none',lw=0,geometry='rect',extra={}) {
 return s.shapes.add({name,geometry,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:lw,style:'solid'},...extra});
}
export function text(s,str,x,y,w,h,size=24,color=C.ink,bold=false,align='left',extra={}) {
 const a=shape(s,str.slice(0,22),x,y,w,h);
 a.text=str;a.text.style={typeface:'微软雅黑',fontSize:size,color,bold,alignment:align,verticalAlignment:'middle',wrap:'square',autoFit:'none',insets:0,...extra};return a;
}
// Color bands are hard stops inside one native shape. Its single silhouette
// gives the band and body identical corners, one outline/shadow, and preserves
// PowerPoint's native connector sites. No rectangle overlays or white masks.
const cornerRadius = (w,h,r) => Math.max(0,Math.min(Number(r)||0,w/2,h/2));
function solidColor(fill) {
 if(fill==='none'||fill==='transparent'||fill?.type==='none')return C.white+'/0';
 if(typeof fill==='string'&&!/^(linear|radial)\(/.test(fill))return fill;
 if(fill?.type==='solid')return fill.color;
 if(fill?.type==='rgb'||fill?.type==='theme')return fill;
 throw new TypeError('Panel and conclusion bands require solid colors.');
}
function bandFill(band,body,fraction,angleDeg) {
 const start=solidColor(band),end=solidColor(body);
 if(fraction<=0)return {type:'solid',color:end};
 if(fraction>=1)return {type:'solid',color:start};
 const cut=Math.max(1,Math.min(99999,Math.round(fraction*100000)));
 return {type:'gradient',gradientKind:'linear',angleDeg,stops:[
  {offset:0,color:start},{offset:cut-1,color:start},
  {offset:cut,color:end},{offset:100000,color:end}]};
}
export function frame(s,name,x,y,w,h,{fill=C.white,stroke=C.line,dash=false,shadow=false,round=8,lw=1.3}={}) {
 const r=cornerRadius(w,h,round);
 return shape(s,name,x,y,w,h,fill,stroke,lw,r?'roundRect':'rect',{
  ...(r?{borderRadius:r}:{}),
  line:{fill:stroke,width:lw,style:dash?'dashDot':'solid'},
  ...(shadow?{shadow:typeof shadow==='string'?shadow:'2px 3px 5px #1F497D/12'}:{})});
}
export function strip(s,label,x,y,w,h=37,{fill=C.blue,size=23,color=C.white}={}) {
 shape(s,label+'条头',x,y,w,h,fill);return text(s,label,x+10,y,w-20,h,size,color,true,'center');
}
export function panel(s,label,x,y,w,h,opts={}) {
 const {headerHeight=38,headerFill=C.blue,headerColor=C.white,size=23,fill=C.white,stroke=C.line,dash=false,shadow=true,round=8,lw=1.3}=opts;
 const hh=Math.max(0,Math.min(h,headerHeight));
 const f=frame(s,label+'图文组合框',x,y,w,h,{fill:bandFill(headerFill,fill,hh/h,90),stroke,lw,dash,shadow,round});
 if(label&&w>20&&hh>0)text(s,label,x+10,y,w-20,hh,size,headerColor,true,'center');return f;
}
export function hanging(s,label,x,y,w,h,{tagWidth=250,...opts}={}) {
 const f=frame(s,label+'分组',x,y,w,h,{dash:true,lw:2.5,...opts});
 frame(s,label+'悬挂标签',x+(w-tagWidth)/2,y-15,tagWidth,37,{fill:C.blue,stroke:'none',lw:0,round:9});
 text(s,label,x+(w-tagWidth)/2,y-15,tagWidth,37,22,C.white,true,'center');return f;
}
export function arrow(s,x,y,w,h,dir='right',color=C.deep){
 return shape(s,'阶段渐变箭头',x,y,w,h,{type:'gradient',gradientKind:'linear',angleDeg:dir==='down'?90:0,stops:[{offset:0,color:color+'/0'},{offset:70000,color},{offset:100000,color}]},'none',0,dir==='down'?'downArrow':'rightArrow');
}
export function connect(s,from,to,{fromSide='right',toSide='left',kind='straight',color=C.line,width=2,end=true}={}) {
 const line=s.shapes.connect(from,to,{kind,fromSide,toSide,line:{fill:color,width,style:'solid'},tail:{type:end?'triangle':'none',width:'med',length:'med'}});line.bringToFront();return line;
}
export function node(s,label,x,y,w,h,{fill=C.white,size=22,stroke=C.line,bold=false}={}) {
 const a=frame(s,label,x,y,w,h,{fill,stroke,round:5,lw:1.25});text(s,label,x+7,y+4,w-14,h-8,size,C.ink,bold,'center');return a;
}
export function header(s,title,sub,n,{project="",footer=""}={}){
 s.background.fill=C.white;
 text(s,title,24,13,1030,58,44,C.blue,true,'left',{typeface:'黑体'});
 text(s,project,1065,29,187,30,18,C.blue,true,'right');
 shape(s,'页眉分隔',23,81,1233,2,C.line);
 shape(s,'菱形主题',38,111,14,14,C.deep,'none',0,'diamond');
 text(s,sub,64,94,1180,45,28,C.blue,true);
 text(s,footer,30,687,700,22,15,C.muted);
 text(s,String(n).padStart(2,'0'),1205,682,45,30,20,C.blue,true,'right');
}
export function conclusion(s,label,body,y=627,opts={}){
 const {x=38,w=1204,h=51,labelWidth=131,fill=C.light,stroke='#B6CAE5',round=6,lw=.8,shadow=false,labelFill=C.blue,labelColor=C.white,size=22,bodySize=23,bodyColor=C.blue}=opts;
 const left=Math.max(0,Math.min(w,labelWidth));
 const f=frame(s,'页底结论',x,y,w,h,{fill:bandFill(labelFill,fill,left/w,0),stroke,round,lw,shadow});
 if(label&&left>20)text(s,label,x+10,y,left-20,h,size,labelColor,true,'center');
 if(body&&w-left>38&&h>4)text(s,body,x+left+18,y+2,w-left-38,h-4,bodySize,bodyColor,true);return f;
}
export function image(s,path,x,y,w,h,alt){return s.images.add({blob:new Uint8Array(fs.readFileSync(path)),contentType:'image/png',fit:'contain',position:{left:x,top:y,width:w,height:h},alt});}
