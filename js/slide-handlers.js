var activeFrame;
var slice = [].slice;

window.addEventListener('popstate', function(e){
   var hash = shower.getSlideHash(shower.getCurrentSlideNumber()).substr(1), frame;
   if (activeFrame) {
      activeFrame.src = '';
   }
   switch(hash) {
      case 'jqueryDemo1':
      case 'jqueryDemo2':
      case 'basicDemo1':
      case 'basicDemo2':
      case 'basicDemo3':
      case 'fastDemo1':
      case 'fastDemo2':
      case 'gpuDemo1':
      case 'gpuDemo2':
         frame = document.getElementById(hash).getElementsByTagName('iframe')[0];
         frame.src = '../../snowflakes.html?' + frame.getAttribute('data-params');
         break;
      case 'demoRects':
         // Chrome only!!!
         var bodyTransform = document.body.style.transform;
         var scale = parseFloat(bodyTransform.match(/scale\(([\d.]+)\)/)[1]);
         var slide = document.getElementById(hash).firstElementChild;
         var diffRect = slide.getBoundingClientRect();
         slice.call(slide.querySelectorAll('*')).map(function(elt){
            var i = {
               dom: elt,
               rects: slice.call(elt.getClientRects())
            };
            if (elt.tagName == 'P') {
               var range = document.createRange();
               range.selectNode(elt);
               i.rects = i.rects.concat(slice.call(range.getClientRects()));
            }
            return i;
         }).forEach(function(item){
            item.rects.forEach(function(rect){
               var dom = document.createElement('div');
               dom.className = 'demoRect';
               dom.style.left = rect.left/scale - diffRect.left/scale + 'px';
               dom.style.top = rect.top/scale - diffRect.top/scale + 'px';
               dom.style.width = rect.right/scale - rect.left/scale + 'px';
               dom.style.height = rect.bottom/scale - rect.top/scale + 'px';
               document.getElementById(hash).appendChild(dom);
            });
         });
         break;
      default:
         var rects = document.querySelectorAll('.demoRect');
         for(var i = 0, l = rects.length; i < l; i++) {
            var rect = rects[i];
            rect.parentNode.removeChild(rect);
         }
   }
   activeFrame = frame;
}, false);