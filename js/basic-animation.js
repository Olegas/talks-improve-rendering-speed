var basicAnimation = (function() {

   function step() {
      var col = document.querySelectorAll('.snowflake:not(.steady)');
      for (var i = 0, l = col.length; i < l; i++) {
         var item = col[i];
         item.style.top = item.getBoundingClientRect().top + item.stepY + 'px';
         item.style.left = item.getBoundingClientRect().left + Math.sin(item.x += item.stepX) + 'px'
      }
   }

   function check() {
      var col = document.querySelectorAll('.snowflake:not(.steady)');
      for (var i = 0, l = col.length; i < l; i++) {
         var item = col[i];
         var rect = item.getBoundingClientRect();
         if (rect.bottom > window.innerHeight) {
            item.classList.add('steady');
            addToScene(generateSnowflake());
            setTimeout(remove.bind(null, item), 1000);
         }
      }
   }

   function remove(item) {
      item.parentNode.removeChild(item);
   }

   return function basicAnimationInner() {
      step();
      check();
      setTimeout(basicAnimation, 0);
   };

})();