import Viz from 'viz.js';
import parser from './parser.js';
import './scss/index.scss'

function handleFileSelected(event) {
   var input = document.getElementById('input');
   var reader = new FileReader();
   reader.onload = function(){
     var text = reader.result;
     var digraph = parser(text);
     const image = Viz(digraph, { format: "svg" });
     document.getElementById("image").innerHTML = image;
   };
  //  reader.onprogress = function(){
  //   // console.log(input.files);
  //   console.log('reading');
  //   if(!/.aag/g.test(input.files[0])) {
  //     console.log('error');
  //     reader.abort();
  //   } 
  //   document.getElementById("image").innerHTML = 'reading...';
  //  }

  //  reader.onabort = function(){
  //   document.getElementById("image").innerHTML = 'error...';
  //  }
   reader.readAsText(input.files[0]);
};

document.getElementById('btn').addEventListener('click', handleFileSelected);