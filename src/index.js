import Viz from 'viz.js';
import parser from './js/parser.js';
import './js/animate.js';
import './scss/index.scss';
import opt01 from './assets/opt01.aag';
import sim01 from './assets/sim01.aag';
import strash01 from './assets/strash01.aag';
import C432 from './assets/C432.aag';

function handleFileUpload(event){
  var input = document.getElementById('input');
  var reader = new FileReader();
  reader.onprogress = function(){
    document.getElementById("fileName").innerHTML = input.files[0].name;
  }
  reader.readAsText(input.files[0]);
}

function handleFileSelected(event) {
   var input = document.getElementById('input');
   var reader = new FileReader();
   
   //error handling
   if(input.files.length === 0) {
    $('#btn').animateCss('shake');
    return;
   }else
   if(!/.aag/g.test(input.files[0].name)){
    $('#btn').animateCss('shake');
    return;
   }

   $('#btn').animateCss('rubberBand');
   reader.onload = function(){
     var text = reader.result;
     var obj = parser(text);
     var digraph = obj.digraph;
     var max = obj.max;
     //FIXME throw an error and catch by reader.onerror
     if(max > 500){
        document.getElementById("image").innerHTML = 'Sorry.\nThe File is too big.';
        return;
     }
     var svgXml = Viz(digraph, { format: "svg" });

     document.getElementById("image").innerHTML = svgXml;
     document.getElementById("status").innerHTML = input.files[0].name;

   };
   reader.onprogress = function(){
     //FIXME spinning icon when loading
   }
   reader.readAsText(input.files[0]);
};

function handleClickDemo(e){
  $('#btn').animateCss('rubberBand');
  var fileName = e.target.firstChild.nodeValue.toString().replace(/\s/g,'');
  var text;
  switch(fileName){
    case "opt01":
      text = opt01;
    break;
    case "sim01":
      text = sim01;
    break;
    case "strash01":
      text = strash01;
    break;
    case "C432":
      text = C432;
    break;
  }
  var obj = parser(text);
  var digraph = obj.digraph;
  var max = obj.max;
  const svgXml = Viz(digraph, { format: "svg" });
  document.getElementById("image").innerHTML = svgXml;
  document.getElementById("status").innerHTML = fileName;
}


function downloadSvg() {
  var svg = $("svg").parent().html();
  var b64 = btoa(svg);
  console.log(svg);
  var str = 'data:image/svg+xml;base64,\n'+b64;
  var url = str.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
  // window.open(url);
  location.href = url;
  console.log(location.href);
}

document.getElementById('download').addEventListener('click', downloadSvg);

document.getElementById('input').addEventListener('change', handleFileUpload);
document.getElementById('btn').addEventListener('click', handleFileSelected);
document.querySelectorAll('.demo-aag').forEach(dom=>{
  console.log('hi');
  console.log(dom);
  dom.addEventListener('click', handleClickDemo);
})