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

let png_src = "";

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
     tmp = Viz.svgXmlToPngImageElement(svgXml);
     document.getElementById("image").innerHTML = svgXml;
   };
   reader.onprogress = function(){
     //FIXME spinning icon when loading
   }
   reader.readAsText(input.files[0]);
};


function downloadPng() {
    var img = png_src;
// ref: https://stackoverflow.com/questions/10473932/browser-html-force-download-of-image-from-src-dataimage-jpegbase64
    var image_data = atob(img.src.split(',')[1]);
    // Use typed arrays to convert the binary data to a Blob
    var arraybuffer = new ArrayBuffer(image_data.length);
    var view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    try {
        // This is the recommended method:
        var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
    } catch (e) {
        // The BlobBuilder API has been deprecated in favour of Blob, but older
        // browsers don't know about the Blob constructor
        // IE10 also supports BlobBuilder, but since the `Blob` constructor
        //  also works, there's no need to add `MSBlobBuilder`.
        var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
        bb.append(arraybuffer);
        var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
    }

    // Use the URL object to create a temporary URL
    var url = (window.webkitURL || window.URL).createObjectURL(blob);
    location.href = url; // <-- Download!
}

document.getElementById('foo').addEventListener('click', downloadPng);
document.getElementById('input').addEventListener('change', handleFileUpload);
document.getElementById('btn').addEventListener('click', handleFileSelected);