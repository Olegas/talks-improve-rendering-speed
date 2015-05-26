function generateSnowflake() {
   var div = document.createElement('div');
   div.className = 'snowflake';
   div.appendChild(document.createTextNode('*'));
   div.stepY = 2 + Math.random() * 3;
   div.stepX = 0.1 + Math.random() * 0.1;
   div.x = 0;
   return div;
}

function addToScene(snowflake, fromTop) {
   document.body.appendChild(snowflake);
   snowflake.style.left = Math.random() * window.innerWidth + 'px';
   snowflake.style.top = fromTop ? 0 : Math.random() * window.innerHeight + 'px';
}

function letItSnow(n, animate) {
   while(n-- >= 0) {
      addToScene(generateSnowflake());
   }
   document.getElementById('counter').appendChild(
      document.createTextNode(
         document.getElementsByClassName('snowflake').length));
   animate();
}



