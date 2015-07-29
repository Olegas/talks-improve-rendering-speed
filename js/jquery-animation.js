var jqueryAnimation = (function() {

   function step() {
      $('.snowflake').each(function(){
         var pos = $(this).offset();
         $(this).css({
            top: this.stepY + pos.top,
            left:  Math.sin(this.x += this.stepX) + pos.left
         });
      });
   }

   function check() {
      $('.snowflake:not(.steady)').each(function(){
         var $i = $(this);
         var pos = $i.offset();
         var h = $i.height();
         if (pos.top + h > window.innerHeight) {
            $i.addClass('steady');
            addToScene(generateSnowflake());
            setTimeout(remove.bind(null, this), 1000);
         }
      });
   }

   function remove(item) {
      item.parentNode.removeChild(item);
   }

   return function jqueryAnimationInner() {
      step();
      check();
      setTimeout(jqueryAnimationInner, 0);
   };

})();