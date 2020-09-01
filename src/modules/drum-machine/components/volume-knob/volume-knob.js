import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {changeVolume} from "../../actions";
import withPlayer from "../hoc";
import {connect} from "react-redux";
import './knob.sass';

class VolumeKnob extends Component {
  op=window.inputKnobsOptions||{};
  makeKnobFrames = (fr,fg,bg)=>{
    let r=
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="${fr*64}" viewBox="0 0 64 ${fr*64}" preserveAspectRatio="none">
<defs><g id="K"><circle cx="32" cy="32" r="30" fill="${bg}" stroke-width="3" stroke="#f0653c"/>
<line x1="32" y1="28" x2="32" y2="7" stroke-linecap="round" stroke-width="6" stroke="${fg}"/></g></defs>
<use xlink:href="#K" transform="rotate(-135,32,32)"/>`;
    for(let i=1;i<fr;++i)
      r+=`<use xlink:href="#K" transform="translate(0,${64*i}) rotate(${-135+270*i/fr},32,32)"/>`;
    return r+"</svg>";
  };

  refreshque=()=>{
    let elem=document.querySelectorAll("input.input-knob,input.input-slider");
    for(let i=0;i<elem.length;++i)
      this.procque.push([this.initKnob,elem[i]]);
  };
  procque=[];

  initKnob(el) {
    let w,h,d,fg,bg;
    if(el.inputKnobs){
      el.redraw();
      return;
    }
    let ik=el.inputKnobs={};
    el.refresh=()=>{
      d=+el.getAttribute("data-diameter");
      let st=document.defaultView.getComputedStyle(el,null);
      w=parseFloat(el.getAttribute("data-width")||d||st.width);
      h=parseFloat(el.getAttribute("data-height")||d||st.height);
      bg=el.getAttribute("data-bgcolor")||this.op.bgcolor;
      fg=el.getAttribute("data-fgcolor")||this.op.fgcolor;
      ik.sensex=ik.sensey=200;
      if(el.className.indexOf("input-knob")>=0)
        ik.itype="k";
      else{
        if(w>=h){
          ik.itype="h";
          ik.sensex=w-h;
          ik.sensey=Infinity;
          el.style.backgroundSize="auto 100%";
        }
        else{
          ik.itype="v";
          ik.sensex=Infinity;
          ik.sensey=h-w;
          el.style.backgroundSize="100% auto";
        }
      }
      el.style.width=w+"px";
      el.style.height=h+"px";
      ik.frameheight=h;
      let src=el.getAttribute("data-src");
      if(src){
        el.style.backgroundImage=`url(${src})`;
        let sp=+el.getAttribute("data-sprites");
        if(sp)
          ik.sprites=sp;
        else
          ik.sprites=0;
        if(ik.sprites>=1)
          el.style.backgroundSize=`100% ${(ik.sprites+1)*100}%`;
        else if(ik.itype!=="k"){
          el.style.backgroundColor=bg;
          el.style.borderRadius=Math.min(w,h)*0.25+"px";
        }
      }
      else{
        let svg;
        switch(ik.itype){
          case "k": svg=this.makeKnobFrames(101,fg,bg); break;
          default: break;
        }
        ik.sprites=100;
        el.style.backgroundImage="url(data:image/svg+xml;base64,"+btoa(svg)+")";
        el.style.backgroundSize=`100% ${(ik.sprites+1)*100}%`;
      }
      ik.valrange={min:+el.min, max:(el.max==="")?100:+el.max, step:(el.step==="")?1:+el.step};
      el.redraw(true);
    };
    el.setValue=(v)=>{
      v=(Math.round((v-ik.valrange.min)/ik.valrange.step))*ik.valrange.step+ik.valrange.min;
      if(v<ik.valrange.min) v=ik.valrange.min;
      if(v>ik.valrange.max) v=ik.valrange.max;
      el.value=v;
      if(el.value!==ik.oldvalue){
        el.setAttribute("value",el.value);
        el.redraw();
        let event=document.createEvent("HTMLEvents");
        event.initEvent("input",false,true);
        el.dispatchEvent(event);
        ik.oldvalue=el.value;
      }
    };
    ik.pointerdown=(ev)=>{
      el.focus();
      if(ev.touches)
        ev = ev.touches[0];
      let rc=el.getBoundingClientRect();
      let cx=(rc.left+rc.right)*0.5,cy=(rc.top+rc.bottom)*0.5;
      let dx=ev.clientX,dy=ev.clientY;
      let da=Math.atan2(ev.clientX-cx,cy-ev.clientY);
      let dv;
      if(ik.itype==="k"&&this.op.knobMode==="circularabs"){
        dv=ik.valrange.min+(da/Math.PI*0.75+0.5)*(ik.valrange.max-ik.valrange.min);
        el.setValue(dv);
      }
      if(ik.itype!=="k"&&this.op.sliderMode==="abs"){
        dv=(ik.valrange.min+ik.valrange.max)*0.5+((dx-cx)/ik.sensex-(dy-cy)/ik.sensey)*(ik.valrange.max-ik.valrange.min);
        el.setValue(dv);
      }
      ik.dragfrom={x:ev.clientX,y:ev.clientY,a:Math.atan2(ev.clientX-cx,cy-ev.clientY),v:+el.value};
      document.addEventListener("mousemove",ik.pointermove);
      document.addEventListener("mouseup",ik.pointerup);
      document.addEventListener("touchmove",ik.pointermove);
      document.addEventListener("touchend",ik.pointerup);
      document.addEventListener("touchcancel",ik.pointerup);
      document.addEventListener("touchstart",ik.preventScroll);
      ev.preventDefault();
      ev.stopPropagation();
    };
    ik.pointermove=(ev)=>{
      let dv;
      let rc=el.getBoundingClientRect();
      let cx=(rc.left+rc.right)*0.5,cy=(rc.top+rc.bottom)*0.5;
      if(ev.touches)
        ev = ev.touches[0];
      let dx=ev.clientX-ik.dragfrom.x,dy=ev.clientY-ik.dragfrom.y;
      let da=Math.atan2(ev.clientX-cx,cy-ev.clientY);
      switch(ik.itype){
        case "k":
          switch(this.op.knobMode){
            case "linear":
              dv=(dx/ik.sensex-dy/ik.sensey)*(ik.valrange.max-ik.valrange.min);
              if(ev.shiftKey)
                dv*=0.2;
              el.setValue(ik.dragfrom.v+dv);
              break;
            case "circularabs":
              if(!ev.shiftKey){
                dv=ik.valrange.min+(da/Math.PI*0.75+0.5)*(ik.valrange.max-ik.valrange.min);
                el.setValue(dv);
              }
              break;
            case "circularrel":
              if(da>ik.dragfrom.a+Math.PI) da-=Math.PI*2;
              if(da<ik.dragfrom.a-Math.PI) da+=Math.PI*2;
              da-=ik.dragfrom.a;
              dv=da/Math.PI/1.5*(ik.valrange.max-ik.valrange.min);
              if(ev.shiftKey)
                dv*=0.2;
              el.setValue(ik.dragfrom.v+dv);
              break;
            default: break;
          }
          break;
        default: break;
      }
    };
    ik.pointerup=()=>{
      document.removeEventListener("mousemove",ik.pointermove);
      document.removeEventListener("touchmove",ik.pointermove);
      document.removeEventListener("mouseup",ik.pointerup);
      document.removeEventListener("touchend",ik.pointerup);
      document.removeEventListener("touchcancel",ik.pointerup);
      document.removeEventListener("touchstart",ik.preventScroll);
      let event=document.createEvent("HTMLEvents");
      event.initEvent("change",false,true);
      el.dispatchEvent(event);
      this.props.changeVolume(el.value);
    };
    ik.preventScroll=(ev)=>{
      ev.preventDefault();
    };
    ik.keydown=()=>{
      el.redraw();
    };
    ik.wheel=(ev)=>{
      let delta=ev.deltaY>0?-ik.valrange.step:ik.valrange.step;
      if(!ev.shiftKey)
        delta*=5;
      el.setValue(+el.value+delta);
      ev.preventDefault();
      ev.stopPropagation();
    };
    el.redraw=(f)=>{
      if(f||ik.valueold!==el.value){
        let v=(el.value-ik.valrange.min)/(ik.valrange.max-ik.valrange.min);
        if(ik.sprites>=1)
          el.style.backgroundPosition="0px "+(-((v*ik.sprites)|0)*ik.frameheight)+"px";
        else{
          switch(ik.itype){
            case "k":
              el.style.transform="rotate("+(270*v-135)+"deg)";
              break;
            default:
              break;
          }
        }
        ik.valueold=el.value;
      }
    };
    el.refresh();
    el.redraw(true);
    el.addEventListener("keydown",ik.keydown);
    el.addEventListener("mousedown",ik.pointerdown);
    el.addEventListener("touchstart",ik.pointerdown);
    el.addEventListener("wheel",ik.wheel);

    this.refreshque();
    setInterval(()=>{
      for(let i=0;this.procque.length>0&&i<8;++i){
        let q=this.procque.shift();
        q[0](q[1]);
      }
      if(this.procque.length<=0)
        this.refreshque();
    },50);
  }

  listenComputerKeyboardEvents() {
    const topComponentContext = this;
    document.addEventListener('keydown', (event) => {

      if (event.code.substr(0, 5) !== 'Arrow') {
        return;
      }
      const volumeElement = document.querySelector('#volume');
      if (event.code === 'ArrowUp') {
        const newValue = topComponentContext.convertToFloat(volumeElement.value) + topComponentContext.convertToFloat(volumeElement.step) * 10;
        volumeElement.value = newValue;
        topComponentContext.props.changeVolume(newValue);
      } else if (event.code === 'ArrowDown') {
        const newValue = topComponentContext.convertToFloat(volumeElement.value) - topComponentContext.convertToFloat(volumeElement.step) * 10;
        volumeElement.value = newValue;
        topComponentContext.props.changeVolume(newValue);
      }
    });
  }

  convertToFloat = (number) => {
    return parseFloat(parseFloat(number).toFixed(2));
  };

  componentDidMount() {
    this.listenComputerKeyboardEvents();
    this.op.knobWidth=this.op.knobWidth||this.op.knobDiameter||64;
    this.op.knobHeight=this.op.knobHeight||this.op.knobDiameter||64;
    this.op.fgcolor=this.op.fgcolor||"#f0653c";
    this.op.bgcolor=this.op.bgcolor||"#fff";
    this.op.knobMode=this.op.knobMode||"linear";
    let el = document.querySelector('#volume');
    this.initKnob(el);
  }

  render() {
    return <input
      type="range"
      min="0"
      max="2"
      step="0.01"
      name="volume"
      id="volume"
      className='input-knob'
      defaultValue={this.props.volumeLevel}/>
  }
}

const mapStateToProps = ({ volumeLevel }) => ({ volumeLevel });

const mapDispatchToProps = (dispatch, { playerService }) => {
  return bindActionCreators({
    changeVolume: changeVolume(playerService)
  }, dispatch);
};

export default withPlayer()(
  connect(mapStateToProps, mapDispatchToProps)(
    VolumeKnob
  )
);
