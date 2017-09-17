function scroll_to(section){
	$('html, body').animate({
		scrollTop: $(section).offset().top
	},1500);
}
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 1500);
        return false;
      }
    }
  });
});

$(document).ready(function () {
    window.onload=function(){
        setTimeout(function(){
            scrollTo(0,-1);
        },0);
    }
    $(".button-collapse").sideNav();
});
