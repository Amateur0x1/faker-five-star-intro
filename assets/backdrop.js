/* Deterministic GLSL light field. No wall clock: HyperFrames/GSAP owns time. */
(function () {
  'use strict';
  const canvas = document.getElementById('shader-bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', {alpha:false, antialias:false, preserveDrawingBuffer:true});
  if (!gl) { console.warn('WebGL unavailable: using CSS backdrop'); return; }
  canvas.width = 1920; canvas.height = 1080;
  const vertex = `attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.,1.);}`;
  const fragment = `precision highp float;
  varying vec2 v_uv;uniform float u_time;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
  float grid(vec2 p,float spacing,float width){vec2 q=abs(mod(p+spacing*.5,spacing)-spacing*.5);return 1.-smoothstep(width,width+1.,min(q.x,q.y));}
  float ray(vec2 p,vec2 a,vec2 b){vec2 ba=b-a;float h=clamp(dot(p-a,ba)/dot(ba,ba),0.,1.);return exp(-length(p-a-ba*h)*.43);}
  void main(){
    float t=u_time;vec2 uv=vec2(v_uv.x,1.-v_uv.y);vec2 px=uv*vec2(1920.,1080.);
    float enter=smoothstep(1.35,2.18,t);float final=smoothstep(3.42,3.72,t);
    vec2 q=uv*vec2(1.77778,1.);
    float grain=(hash(floor(px)+floor(t*30.)*.17)-.5);
    vec3 dark=vec3(.021,.023,.025)+vec3(.011)*noise(uv*4.);
    dark+=vec3(.08,0.,.026)*exp(-dot((uv-vec2(.5,.8))*vec2(2.,1.),(uv-vec2(.5,.8))*vec2(2.,1.))*4.);
    vec3 col=vec3(.27,.29,.85);
    float mid=exp(-pow((uv.x-.53)*3.8,2.));
    col=mix(col,vec3(.99,.015,.60),mid*.94);
    float coral=exp(-dot((uv-vec2(.37,.08))*vec2(2.6,2.3),(uv-vec2(.37,.08))*vec2(2.6,2.3)));
    col=mix(col,vec3(1.,.39,.37),coral*.85);
    float cyan=smoothstep(.73,1.,uv.x)*(.65+.3*sin(uv.y*3.+.5));
    col=mix(col,vec3(.14,.92,.91),cyan*.83);
    col+=vec3(.12,.07,.17)*noise(uv*vec2(6.,4.)+vec2(t*.07,0.));
    float blue=exp(-dot((uv-vec2(.08,.48))*vec2(3.,1.),(uv-vec2(.08,.48))*vec2(3.,1.))*3.);
    col=mix(col,vec3(.28,.35,.89),blue*.65);
    col=mix(dark,col,enter);
    vec3 pastel=vec3(.90,.99,.95);
    pastel=mix(pastel,vec3(.99,.86,.96),.36+.25*sin(uv.x*4.8+uv.y*2.6));
    pastel=mix(pastel,vec3(.78,.96,1.),.25*(1.-uv.x));
    col=mix(col,pastel,final);
    // Fine graph paper with restrained brightness, anchored to the camera drift.
    float spacing=mix(mix(90.,45.,smoothstep(1.2,2.1,t)),101.,final);
    vec2 drift=vec2(sin(t*.35)*12.,t*8.)*(1.-final);
    float fine=grid(px+drift,spacing,.35);
    col+=fine*mix(mix(vec3(.042),vec3(.16),enter),vec3(-.24),final);
    float sub=grid(px+drift,spacing*.2,.05);
    col+=sub*.025*enter*(1.-final);
    float flareShow=smoothstep(1.85,2.35,t)*(1.-smoothstep(3.4,3.64,t));
    float centerY=mix(240.,590.,smoothstep(2.45,3.22,t));
    vec2 center=vec2(960.,centerY);
    vec2 delta=(px-center)/1080.;float r=length(delta);
    float swell=smoothstep(3.08,3.37,t)*(1.-smoothstep(3.37,3.7,t));
    float core=exp(-r*r/(.00042+swell*.06));
    float halo=exp(-r*(15.-swell*10.));
    float cross=exp(-abs(delta.x)*350.)*exp(-abs(delta.y)*22.)+exp(-abs(delta.y)*420.)*exp(-abs(delta.x)*22.);
    float diagonal=(exp(-abs(delta.x-delta.y)*290.)+exp(-abs(delta.x+delta.y)*290.))*exp(-r*43.);
    col+=vec3(1.,.92,.72)*(core*1.7+halo*.32+cross*.56+diagonal*.32)*flareShow;
    // Rays meet the light, changing from straight perspective to a bowed lens warp.
    float rays=0.;
    for(int i=0;i<7;i++){
      float k=float(i)-3.;
      vec2 end=vec2(960.+k*380.,1250.);
      vec2 bendpx=px; bendpx.x+=sin(uv.y*3.14159)*k*swell*85.;
      rays+=ray(bendpx,center+vec2(0.,25.),end);
    }
    col+=vec3(.58,.54,.55)*rays*.38*flareShow*(.3+.7*smoothstep(2.1,2.7,t));
    // Stable seeded dust, with subtle drift. No state from a previous frame.
    vec2 cells=uv*vec2(110.,62.)+vec2(t*.13,t*.21);
    vec2 cell=floor(cells);vec2 local=fract(cells)-vec2(hash(cell),hash(cell+18.));
    float dotSize=mix(.018,.12,pow(hash(cell+4.),8.));
    float dots=(1.-smoothstep(dotSize*.4,dotSize,length(local)))*step(.955,hash(cell+8.));
    col+=mix(vec3(.75),vec3(-.23,-.35,-.12),final)*dots*mix(.06,.6,enter);
    col+=grain*mix(.018,.028,enter);
    float vignette=1.-.28*pow(length((uv-.5)*vec2(1.1,.9)),1.6);
    col*=mix(vignette,1.,final);
    float flash=pow(max(0.,1.-abs(t-3.38)/.24),1.8);
    col=mix(col,vec3(1.,.97,.91),flash*.97);
    gl_FragColor=vec4(col,1.);
  }`;
  function shader(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(sh));return sh;}
  const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,'a_pos');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const time=gl.getUniformLocation(program,'u_time');
  window.renderBackdrop=function(t){gl.viewport(0,0,1920,1080);gl.uniform1f(time,Math.max(0,Math.min(5,t)));gl.drawArrays(gl.TRIANGLES,0,6);};
  window.addEventListener('hf-seek',function(e){window.renderBackdrop(e.detail.time);});
  window.renderBackdrop(0);
})();
