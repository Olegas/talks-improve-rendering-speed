var gpuAnimation = (function(){

   return function gpuAnimation() {
      var col = document.querySelectorAll('.snowflake');
      var winHeights = window.innerHeight;
      var calculatedData = [].slice.call(col).map(function readRects(item){
         var rect = item.getBoundingClientRect();
         return {
            div: item,
            steady: item.classList.contains('steady'),
            rect: {
               left: rect.left,
               top: rect.top,
               bottom: rect.bottom
            }
         }
      }).map(function calculateNewRects(item){
         item.rect.top = item.rect.top + item.div.stepY;
         item.rect.left = Math.sin((item.div.x += item.div.stepX));
         if (item.rect.bottom > winHeights) {
            item.mustStop = true;
         }
         return item;
      });
      calculatedData.forEach(function applyRects(item){
         if (item.mustStop) {
            if (!item.steady) {
               item.div.classList.add('steady');
               addToScene(generateSnowflake(), true);
               setTimeout(remove.bind(null, item.div), 1000);
            }
         } else {
            item.div.style.top = '0px';
            item.div.style.transform = 'translate3d(' + item.rect.left + 'px,' +  item.rect.top + 'px, 0);';
            item.div.style.WebkitTransform = 'translate3d(' + item.rect.left + 'px,' +  item.rect.top + 'px, 0)';
         }
      });
      calculatedData.filter(function filterLaying(item){
         return item.div.classList.contains('drop');
      }).forEach(function removeLaying(item){
         item.div.parentNode.removeChild(item.div);
      });
      setTimeout(gpuAnimation, 0);
   };

   function remove(snowflake) {
      snowflake.classList.add('drop');
   }

})();