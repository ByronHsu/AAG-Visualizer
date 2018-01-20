import Viz from 'viz.js';
import parser from './js/parser.js';
import './js/animate.js';
import './scss/index.scss';
import opt01 from './aag/opt01.aag';
import sim01 from './aag/sim01.aag';
import strash01 from './aag/strash01.aag';
import C432 from './aag/C432.aag';

$(window).on('load', function() {
  document.querySelector('body').setAttribute("style", "display: block");
});

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
    document.getElementById("status").innerHTML = 'Please upload a file first.';
    document.getElementById("image").innerHTML = '';//clear svg
    document.getElementById("custom-download-btn").setAttribute("style", "display: none");
    return;
   }else
   if(!/.aag/g.test(input.files[0].name)){
    $('#btn').animateCss('shake');
    document.getElementById("status").innerHTML = 'Sorry.\nThe Format is wrong.';
    document.getElementById("image").innerHTML = '';//clear svg
    document.getElementById("custom-download-btn").setAttribute("style", "display: none");
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
        document.getElementById("status").innerHTML = 'Sorry.\nThe File is too big.';
        document.getElementById("image").innerHTML = '';//clear svg
        document.getElementById("custom-download-btn").setAttribute("style", "display: none");
        return;
     }
     var svgXml = Viz(digraph, { format: "svg" });

     document.getElementById("image").innerHTML = svgXml;
     $('#image').animateCss('fadeIn');
     document.getElementById("status").innerHTML = input.files[0].name;
     document.getElementById("custom-download-btn").setAttribute("style", "display: inline");
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
  $('#image').animateCss('fadeIn');
  document.getElementById("status").innerHTML = fileName;
  document.getElementById("custom-download-btn").setAttribute("style", "display: inline");
}


function downloadSvg() {
  var svg = $("#image").html();
  var b64 = btoa(svg);
  var str = 'data:image/svg+xml;base64,\n'+b64;
  var url = str.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');


  var link = document.createElement('a');
  var filename = document.getElementById("status").firstChild.nodeValue;
  filename += '.svg';
  if (typeof link.download === 'string') {
    link.href = url;
    link.download = filename;
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(url);
  }
}

document.getElementById('download').addEventListener('click', downloadSvg);
document.getElementById('input').addEventListener('change', handleFileUpload);
document.getElementById('btn').addEventListener('click', handleFileSelected);
document.querySelectorAll('.demo-aag').forEach(dom=>{
  dom.addEventListener('click', handleClickDemo);
})