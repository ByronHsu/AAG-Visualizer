import Viz from 'viz.js';
import parser from './parser.js';
import './animate.js'
import './scss/index.scss'

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
     var tmp = Viz.svgXmlToPngImageElement(svgXml);
     // document.getElementById("image").innerHTML = image;
     document.getElementById("image").appendChild(tmp);
   };
   reader.onprogress = function(){
     //FIXME spinning icon when loading
   }
   reader.readAsText(input.files[0]);
};


function hey() {
    var img = document.querySelector('img')
    var url = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    var ifr = document.createElement('iframe');


    ifr.style.display = 'none';
    ifr.src = url;

    document.body.appendChild(ifr);
    var filename = 'tmp.png';
    ifr.contentWindow.document.execCommand('SaveAs', false, fileName);
    document.body.removeChild(ifr);
}

document.getElementById('foo').addEventListener('click', hey);
document.getElementById('input').addEventListener('change', handleFileUpload);
document.getElementById('btn').addEventListener('click', handleFileSelected);