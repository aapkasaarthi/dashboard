function isTouchDevice(){
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

if (isTouchDevice()) {
  document.body.addClass('touch-device');

  // navigation
  // document.querySelectorAll('.nav-link-drop').onclick= function(e){
  //   e.preventDefault();
  //   console.log('this!!')
  //   $(this).next().toggleClass('visible');
  // };
}

let accordionItem = document.querySelectorAll('.accordion-item');
let accordionHead = document.querySelectorAll('.accordion-head');

accordionItem.forEach((element) => {
  element.onclick  = function(){
    accordionItem.forEach((e) => {
      e.classList.remove('active');
    });
    element.classList.add('active');
  }
});
