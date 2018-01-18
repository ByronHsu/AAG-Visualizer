import Viz from 'viz.js';
import parser from './parser.js';

// const string = 'digraph G {{node [color=pink;shape=box;height=0.5]; 0;}{rank = same;node [color=red;shape=box];1,2,3;}{rank = same;node [color=blue;shape=box];9,10;}{node [color=black;shape=invtrapezium];4,5,6,7;}node [color=green;shape=box];6->9 [arrowhead=odot];7->10 [arrowhead=none];1->4 [arrowhead=none];8->4 [arrowhead=none];8->5 [arrowhead=none];1->5 [arrowhead=none];4->6 [arrowhead=none];2->6 [arrowhead=none];2->7 [arrowhead=none];5->7 [arrowhead=none];}'
// const image = Viz(string, { format: "png-image-element" });
// document.body.appendChild(image);

function handleFileSelect(event) {
   var input = event.target;

   var reader = new FileReader();
   reader.onload = function(){
     var text = reader.result;
     var digraph = parser(text);
     const image = Viz(digraph, { format: "png-image-element" });
     document.body.appendChild(image);
   };
   reader.readAsText(input.files[0]);
 };

document.getElementById('input').addEventListener('change', handleFileSelect, false);