var fastAnimation = (function(){

   function remove(snowflake) {
      snowflake.classList.add('drop');
   }


   return function fastAnimation() {
      var col = document.querySelectorAll('.snowflake');
      var calculatedData = [].slice.call(col).map(function(item){
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
      }).map(function(item){
         item.rect.top = item.rect.top + item.div.stepY;
         item.rect.left = item.rect.left + Math.sin(item.div.x += item.div.stepX);
         if (item.rect.bottom > window.innerHeight) {
            item.mustStop = true;
         }
         return item;
      });
      calculatedData.forEach(function(item){
         if (item.mustStop) {
            if (!item.steady) {
               item.div.classList.add('steady');
               addToScene(generateSnowflake(), true);
               setTimeout(remove.bind(null, item.div), 1000);
            }
         } else {
            item.div.style.top = item.rect.top + 'px';
            item.div.style.left = item.rect.left + 'px';
         }
      });
      calculatedData.filter(function(item){
         return item.div.classList.contains('drop');
      }).forEach(function(item){
         item.div.parentNode.removeChild(item.div);
      });
      setTimeout(fastAnimation, 0);
   }

})();