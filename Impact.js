window.addEventListener("wheel", function (e) {
  e.preventDefault();
}, { passive: false });

var $html = $("html");


/*
vertical section
*/
var page = 1;

var lastPage = $(".content").length;


$html.animate({ scrollTop: 0 }, 10);

$(window).on('wheel', function (e) {
  scrollevent(e.originalEvent.deltaY);
})

$(document).keydown(function (e) {
  if (e.which == 38) // up arrow
    scrollevent(-100);
  else if (e.which == 40) // down arrow
    scrollevent(100);
  else if (e.which == 37) //left arrow
    sliceevent(-100);
  else if (e.which == 39) // right arrow
    sliceevent(100);
});

function scrollevent(num) {
  if ($html.is(":animated")) return;


  $html.animate({ scrollLeft: 0});
  section=1;

  if (num > 0) {
    if (page == lastPage) return;

    page++;
  } else if (num < 0) {
    if (page == 1) return;

    page--;
  }

  var posTop = (page - 1) * $(window).height();

  $html.animate({ scrollTop: posTop });
}
/*
horizontal slides for a section 
*/
var section = 1;
var lastSection = $(".section").length;
console.log(document.body.childNodes[1].childNodes[1].hasChildNodes("section"));
console.log(document.body.childNodes[1].childNodes[1]);
console.log(document.body.childNodes[3].childNodes[1].hasChildNodes("section"));
console.log(document.body.childNodes["content"]);
$html.animate({ scrollLeft: 0 }, 10);
function sliceevent(num) {
  if ($html.is(":animated")) return;

  if (num > 0) {
    if (section == lastSection) return;

    ++section;
  } else if (num < 0) {
    if (section == 1) return;

    --section;
  }
  var posLeft = (section - 1) * $(window).width();

  $html.animate({ scrollLeft: posLeft });
}

/*horizontal click animation*/
var $icon = $(".icon-left, .icon-right");

$icon.click(function(e){
  if ($html.is(":animated")) return;
  var layerWidthHalf = $(".section").width()/2;

  if(e.clientX>layerWidthHalf){
    if(section == lastSection) return;

    ++section;
  }
  
  else{
    if(section == 1) return;

    --section;
  }
  var posLeft = (section -1) * $(window).width();

  $html.animate({scrollLeft: posLeft});
});
