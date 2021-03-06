import React from "react";
import logo from "./logo.svg";
import { complex } from "mathjs";
import "./App.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Vector3, PixelFormat } from "three";
import { getDefaultNormalizer } from "@testing-library/react";
const THREE = require("three");
const PI = Math.PI;
var renderer, scene, camera;
var count = Math.pow(8, 3);
var velx = new Array(count).fill(0);
var vely = new Array(count).fill(0);
var velz = new Array(count).fill(0);
var hit = new Array(count).fill(new Array(count).fill(false));
var y = new Array(count).fill(0);
var z = new Array(count).fill(0);
var Max = new Array(count).fill(0);
var Min = new Array(count).fill(999999);
var move = false;

// for (var j = 0; j < weight.length; j++)
//   for (var i = 0; i < weight.length; i++) weight[j][i] = Math.random();

var controls;

var stats, tempsphere;
const frnd = (x) => Math.fround(x);
const tanh = (x) => Math.tanh(x);
const tan = (x) => Math.tan(x);
const asin = (x) => Math.asin(x);

const sin = (x) => Math.sin(x);
const sqrt = (x) => Math.sqrt(x);
const cos = (x) => Math.cos(x);
const sig = (x) => x / (PI ** PI + Math.abs(x));

const spheres = [];

var start = Date.now();
init();

animate();

function makeSphere() {
  const sphere = new THREE.Line(
    new THREE.SphereBufferGeometry(8, 8, 8),

    new THREE.MeshPhongMaterial({
      //   color:(
      //     (Math.random() * (255*255)%255

      // ),(Math.random() * (255*255)%255

      // ),(Math.random() * (255*255)%255

      // )),

      // flatShading: true,

      // fog: true,

      blending: THREE.NormalBlending,

      transparent: true,

      reflectivity: 255,
      //  bumpScale:5
    })
  );
  return sphere;
}
function init() {
  camera = new THREE.PerspectiveCamera(
    105,

    window.innerWidth / window.innerHeight,

    0.000001,
    10000000000000
  );

  camera.position.y = 128.0;
  camera.position.z = 128.0;
  camera.position.x = 128.0;

  scene = new THREE.Scene();
  var light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(1000000.0, 1000000, 1000000.0);
  scene.add(light);
  light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(-1000000.0, -1000000, -1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(0.0, 1000000, 1000000.0);
  scene.add(light);
  light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(0.0, -1000000, -1000000.0);
  scene.add(light);
  var light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(1000000.0, 1000000, 0.0);
  scene.add(light);
  light = new THREE.PointLight(0xff0000, 0.2, 100, 0);
  light.position.set(-1000000.0, -1000000, 0.0);
  scene.add(light);
  light = new THREE.PointLight(0x99, 255, 100, 0);
  light.position.set(0.0, 0.0, 0.0);
  scene.add(light);

  var d = new Date();
  var countsplit = Math.pow(count, 1 / 3);
  // for (var j = 0; j <= countsplit; j++) {
  //   for (var k = 0; k <= countsplit; k++) {
  //     tempsphere = makeSphere();

  //     const ii= ((i - countsplit / 2));
  //     const kk= ((k - countsplit / 2));
  //     const jj= ((j - countsplit / 2));
  //     const r = Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2) + Math.pow(kk, 2));
  //     const rhat = (Math.sqrt(Math.pow(ii, 2) + Math.pow(jj, 2)));
  //     const phi =   Math.atan2(jj,ii )   ;//(i / countsplit) * PI; //Math.atan2(ii, -kk) * (Math.PI / 180);
  //     const theta = (Math.atan2(rhat,kk));
  //     const time = parseInt(d.getTime());
  //     // tempsphere.position.x = 64 * ((i - countsplit / 2));
  //       // tempsphere.position.y = 64 * ((j - countsplit / 2));
  //       // tempsphere.position.z = 64 * ((k - countsplit / 2));
  //       tempsphere.position.x =Math.round( 128* Math.sin(theta)*(Math.sin(phi)));
  //       tempsphere.position.y =Math.round( 128* Math.sin(theta)*(Math.cos(phi)));
  //       tempsphere.position.z =Math.round( 128*(Math.cos(theta)));//Math.fround( (ii));

  //       // tempsphere.position.z = 32 *  Math.cos(Math.pow(j/Math.PI,2));
  //       // tempsphere.color = new THREE.Color(0x923);
  //     }
  //   }
  const gr = frnd((sqrt(5.0) + 1.0) / 2.0); // golden ratio = 1.6180339887498948482
  const ga =frnd((2.0 - gr) * (2.0 * PI)); // golden angle = 2.39996322972865332

  for (var i = 0; i < count; i++) {
    const lat = asin(-1.0 + (2.0 * i) / (count ));
    const lon = ga * i;
    tempsphere = makeSphere();

    tempsphere.position.x = frnd(360 * cos(lon) * cos(lat));
    tempsphere.position.y = frnd(360 * sin(lon) * cos(lat));
    tempsphere.position.z = frnd(360 * sin(lat));

    spheres.push(tempsphere);
    scene.add(tempsphere);
  }
  let size = spheres.length;

  renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);

  stats = new Stats();

  document.body.appendChild(stats.dom);

  document.body.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
var step = false;
function animate() {
  stats.update();
  // setTimeout(
  //   () => {
  //     // stats.begin();
  //   },
  //   (1000 / 60) * step == false ? 2 : (step = true),
  //   1
  //   );
  requestAnimationFrame(animate);
  // step = true;
  render();
  // stats.end();
}

function render() {
  var size = spheres.length;
  var bounce = false,
    bcount = 0;
  var avgx, avgy, avgz, bavgx, bavgy, bavgz;
  const r = 1 / size; //Math.sqrt(Math.PI); //*.1;
  var sphere1, sphere;

  const r1 = 0.00001;
  Array(Max).fill(0, 0, size);
  Array(Min).fill(9999, 0, size);

  // Min = new Array(size).fill(9999);//Array(Max).fill(0,0,size);
  // Min.fill(999999,0,size);S
  var closestx, closesty, closestz, closest;
  for (let ndx1 = 0; ndx1 < size; ndx1++) {
    sphere1 = spheres[ndx1];
    // velx[ndx1] = frnd(.9999 * velx[ndx1]);
    // vely[ndx1] = frnd(.9999 * vely[ndx1]);
    // velz[ndx1] = frnd(.9999 * velz[ndx1]);

    sphere1.translateX(frnd(velx[ndx1]));
    sphere1.translateY(frnd(vely[ndx1]));
    sphere1.translateZ(frnd(velz[ndx1]));
    // sphere1.rotateOnAxis(new THREE.Vector3(1, 0, 0), (velx[ndx1]));
    // sphere1.rotateOnAxis(new THREE.Vector3(0, 1, 0), (vely[ndx1]));
    // sphere1.rotateOnAxis(new THREE.Vector3(0, 0, 1), (velz[ndx1]));
    // Array(hit[ndx1]).fill(false,0,size);
  }
  // alert(Min);
  // spheres.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.5);
  for (let i = 1; i < size; i++) {
    sphere1 = spheres[i];
    const x1 = frnd(sphere1.position.x);
    const y1 = frnd(sphere1.position.y);
    const z1 = frnd(sphere1.position.z);
    for (var j = i - 1; j >= 0; j--) {
      sphere = spheres[j];
      // if(!Max[j]||!Min[j]||Max[j] - Min[j]<0)continue;
      const x = frnd(sphere.position.x);
      const y = frnd(sphere.position.y);
      const z = frnd(sphere.position.z);
      var dis = ((frnd(sphere.position.distanceTo(sphere1.position)))
      ); // ((Math.sqrt((x1-x)**2+(y1-y)**2+(z1-z)**2)));
      // dis = (3*(dis**2)-(1))/2;
      var dirx = dis > 0.0 ? ((x1 - x) ) / ( dis) : 0; //>0?(x-x1)/Math.abs(x-x1):0;//>0? (x1-x/Math.abs(x1-x)):0 ;//Math.fround(Math.atan2(x, x1-x ));//a*Math.sign(x1-x));
      var diry = dis > 0.0 ? ((y1 - y) ) / ( dis) : 0; //>0?(y-y1)/Math.abs(y-y1):0;//>0? (y1-y/Math.abs(y1-y)):0 ;//Math.fround(Math.atan2(y, y1-y ));//a*Math.sign(y1-y));
      var dirz = dis > 0.0 ? ((z1 - z) ) / ( dis) : 0; //>0?(z-z1)/Math.abs(z-z1):0;//>0? (z1-z/Math.abs(z1-z)):0 ;//Math.fround(Math.atan2(z, z1-z ));//a*Math.sign(z1-z));
      // diry = (3*(diry**2)-(1))/2;
      // dirz = (3*(dirz**2)-(1))/2;
      // if (dis <= 1 && !hit[j][i]) {
      {
        // } else if (dis > 1)

        const finx = frnd((dirx * PI) / 180);
        const finy = frnd((diry * PI) / 180);
        const finz = frnd((dirz * PI) / 180);
        velx[i] -= frnd(dirx * 0.0001); //sin(finx)*cos(finx*2));//Math.sin(2 * finx) * Math.cos(finx)); //360 * (Math.sin((finx * PI) / 180)*(Math.cos((finx * PI*2) / 180)))); //-Math.cos((finx*PI*2)/180)*-Math.sin((finx*PI)/180)*360);
        vely[i] -= frnd(diry * 0.0001); //sin(finy)*cos(finy*2));//Math.sin(2 * finy) * Math.cos(finy)); //360 * (Math.sin((finy * PI) / 180)*(Math.cos((finy * PI*2) / 180)))); //-Math.cos((finy*PI*2)/180)*-Math.sin((finy*PI)/180)*360);
        velz[i] -= frnd(dirz * 0.0001); //sin(finz)*cos(finz*2));//Math.sin(2 * finz) * Math.cos(finz)); //360 * (Math.sin((finz * PI) / 180)*(Math.cos((finz * PI*2) / 180)))); //-Math.cos((finz*PI*2)/180)*-Math.sin((finz*PI)/180)*360);
        velx[j] += frnd(dirx * 0.0001); //sin(finx)*cos(finx*2));//Math.sin(2 * finx) * Math.cos(finx)); //360 * (Math.sin((finx * PI) / 180)*(Math.cos((finx * PI*2) / 180)))); //-Math.cos((finx*PI*2)/180)*-Math.sin((finx*PI)/180)*360);
        vely[j] += frnd(diry * 0.0001); //sin(finy)*cos(finy*2));//Math.sin(2 * finy) * Math.cos(finy)); //360 * (Math.sin((finy * PI) / 180)*(Math.cos((finy * PI*2) / 180)))); //-Math.cos((finy*PI*2)/180)*-Math.sin((finy*PI)/180)*360);
        velz[j] += frnd(dirz * 0.0001); //sin(finz)*cos(finz*2));//Math.sin(2 * finz) * Math.cos(finz)); //360 * (Math.sin((finz * PI) / 180)*(Math.cos((finz * PI*2) / 180)))); //-Math.cos((finz*PI*2)/180)*-Math.sin((finz*PI)/180)*360);
        // (π x)/180 - (13 π^3 x^3)/34992000 + (121 π^5 x^5)/22674816000000 + O(x^6)
        // velx[j] *= Math.fround(Math.abs(.999999));
        // vely[j] *= Math.fround(Math.abs(.999999));
        // velz[j] *= Math.fround(Math.abs(.999999));
        // velx[i] *= Math.fround(Math.abs(.999999));
        // vely[i] *= Math.fround(Math.abs(.999999));
        // velz[i] *= Math.fround(Math.abs(.999999));
      }
    }
  }
  // camera.translateX(-.1);
  // camera.translateY(-.1);
  //
  // }

  renderer.render(scene, camera);
  controls.update();
  stats.update();
}

function App() {
  return <div />;
}

export default App;
// for (let ndx = size; ndx >= 0; ndx--) {
//   var i = (ndx1 + ndx) % size;
//   if (ndx1 === i) continue;
//   sphere = spheres[i];

// //   max = Math.max(max, sphere.position.distanceTo(sphere1.position));
// // }
// for (let ndx = size; ndx >= 0; ndx--) {
//   var i = (ndx1 + ndx) % size;
//   sphere = spheres[i];
//   if (ndx1 === i ) continue;
//   const x = sphere.position.x;
//   const y = sphere.position.y;
//   const z = sphere.position.z;
//   const dis = ((sphere.position.distanceTo(sphere1.position)/max));
//   const dis1 = (Math.cos(sq(dis))) ;
//   if(dis1<.9)continue;
//   const midx = (x - x1) !== 0 ? (x - x1) / Math.abs(x - x1) : 0;
//   const midy = (y - y1) !== 0 ? (y - y1) / Math.abs(y - y1) : 0;
//   const midz = (z - z1) !== 0 ? (z - z1) / Math.abs(z - z1) : 0;
//   const dirx = midx *((dis1)); //Math.sqrt(Math.pow((x1 - x),2))!==0?Math.sqrt(Math.pow((x1 - x),2)):0;
//   const diry = midy *((dis1)); //Math.sqrt(Math.pow((y1 - y),2))!==0?Math.sqrt(Math.pow((y1 - y),2)):0;
//   const dirz = midz *((dis1)); //Math.sqrt(Math.pow((z1 - z),2))!==0?Math.sqrt(Math.pow((z1 - z),2)):0;
//   // if (disx === 0 ||
//   //     disy === 0 ||
//   //     disz === 0||
//   //   dis===0) continue;

//   // for(let  dis2 =dis;dis2<=2;dis2= sphere1.position.distanceTo(sphere.position) )
//   // if(sphere1.position.distanceTo(sphere.position)<=2)
//   //  {
//   //   weight[i] = true;

//   //  // weight[ndx1]=true;
//   //   bounce=true;
//   //   //bcount++;
//   //   const midvelx = (velx[i])-velx[ndx1] ;
//   //   const midvely = (vely[i])-vely[ndx1] ;
//   //   const midvelz = (velz[i])-velz[ndx1] ;
//   //   const midvelx1 = (velx[i])+velx[ndx1] ;
//   //   const midvely1 = (vely[i])+vely[ndx1] ;
//   //   const midvelz1 = (velz[i])+velz[ndx1] ;

//   //   velx[ndx1]= midvelx1;
//   //   vely[ndx1]= midvely1;
//   //   velz[ndx1]= midvelz1;
//   //   velx[i] = midvelx;
//   //   vely[i] = midvely;
//   //   velz[i] = midvelz;

//   //   // dis2= sphere1.position.distanceTo(sphere.position)
//   //  continue;
//   // }
//   {
//     velx[i] -= .0001 * ((dirx));
//     vely[i] -= .0001 * ((diry));
//     velz[i] -= .0001 * ((dirz));
//     //  alert(   velx[ndx1]);
//   }
//   weight[i] = false;
//   //weight[ndx1]=false;
// }
// var light= new THREE.PointLight(25,33,1000000,0);
// light.position.set(0.0, 0.0, 1000000.0);
// scene.add(light);
// var light=new THREE.PointLight(255,6,1000000,0);
// light.position.set(1000000.0, 0.0, 1000000.0);
// scene.add(light);
// var light= new THREE.PointLight(255,33,1000000,0);
// light.position.set(.0, 1000000.0, 1000000.0);
// scene.add(light);
// var light = new THREE.PointLight(32,255,1000000,100);
// light.position.set(-1000000.0, -1000000.0, 1000000.0);
// scene.add(light);
// var light = new THREE.HemisphereLight(55, 255, 55);
// light.position.set(1, 1, 1);
// light.decay = 0;
// scene.add(light);
// var light = new THREE.HemisphereLight(255, 55, 55);
// light.position.set(1, -1, 1);
// light.decay = 0;
// scene.add(light);
// var light = new THREE.HemisphereLight(5, 255, 55);
// light.position.set(1, 1, -1);
// light.decay = 0;
// scene.add(light);

// var light = new THREE.HemisphereLight(255, 0x880000, 0.5);
// light.position.set(-1, -1.5, -1);
// light.decay = 0;
// scene.add(light);
//   // velx[j] *=Math.fround(Math.abs(.999999));
//   // vely[j] *=Math.fround(Math.abs(.999999));
//   // velz[j] *=Math.fround(Math.abs(.999999));
//   velx[i] = Math.fround(-velx[i] - velx[j]);
//   vely[i] = Math.fround(-vely[i] - vely[j]);
//   velz[i] = Math.fround(-velz[i] - velz[j]);
//   velx[j] = Math.fround(-velx[j] - velx[i]);
//   vely[j] = Math.fround(-vely[j] - vely[i]);
//   velz[j] = Math.fround(-velz[j] - velz[i]);
// //   // hit[i]=true;
// //   hit[i][j] = true;
// hit[i][j] = false;
// // hit[j]=true;
// var finx = dis >= 0.3 ? Math.fround(dirx * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
// var finy = dis >= 0.3 ? Math.fround(diry * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
// var finz = dis >= 0.3 ? Math.fround(dirz * 360 * Math.pow(dis, -2)) : 0; //*Math.pow(PI,PI):0;
