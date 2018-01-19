import Viz from 'viz.js';
import parser from './js/parser.js';
import './js/animate.js';
import './scss/index.scss';
import opt01 from './assets/opt01.aag';
import sim01 from './assets/sim01.aag';
import strash01 from './assets/strash01.aag';

console.log(opt01);

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

     const image = Viz(digraph, { format: "svg" });
     document.getElementById("image").innerHTML = `${input.files[0].name}<br/><br/>`+image;
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
  }
  var obj = parser(text);
  var digraph = obj.digraph;
  var max = obj.max;
  const image = Viz(digraph, { format: "svg" });
  document.getElementById("image").innerHTML = `${fileName}<br/><br/>`+image;
}

document.getElementById('input').addEventListener('change', handleFileUpload);
document.getElementById('btn').addEventListener('click', handleFileSelected);
document.querySelectorAll('.demo-aag').forEach(dom=>{
  console.log('hi');
  console.log(dom);
  dom.addEventListener('click', handleClickDemo);
})