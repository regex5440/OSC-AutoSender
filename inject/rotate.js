document.getElementById('content').style.display="none";
var panel = document.createElement('div'); panel.id = "rotateBtn";
panel.innerHTML = `
<button>Rotate</button>
<div id="brightness"><button>+</button><span>Brightness</span><button>-</button></div>
`
document.getElementsByTagName('html')[0].appendChild(panel);
var allbtns = panel.getElementsByTagName('button');
var attachImg = document.getElementsByTagName('body')[0];
var angle=0, brightness=100;
allbtns[0].onclick = ()=>{
    angle+=90;
    attachImg.style.transform = `rotate(${angle%360}deg)`;
};

allbtns[2].onclick = ()=>{
    brightness-=20;
    attachImg.style.filter = `brightness(${brightness}%)`;
}
allbtns[1].onclick = ()=>{
    brightness+=20;
    attachImg.style.filter = `brightness(${brightness}%)`;
}
