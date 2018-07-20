/*
OBJECTIVES:
------------
- Recreate a card.
- Make a book.
- Add more pages.
- Responsive design.
*/

var totalSlides = $('#book .slides').length;
var selectedSlide = 2;

var bgColor = $('body').css('background-color');
$('.slides .void').css({backgroundColor: bgColor});

for (var i=1; i<=totalSlides; i++) {
  if (i != selectedSlide)
    $('#slide-' + i).css({ zIndex: 0, width: 0});
}

$('#slide-' + selectedSlide).css({zIndex: 2});

showHideControllers(selectedSlide);

$('.controllers').hover(
  function() {
    $(this).children('.tab').addClass('show');
  }, function() {
    $(this).children('.tab').removeClass('show');
  }
);

$('.controllers').click( function() {
  if ( $(this).attr('id') == 'next' && selectedSlide < totalSlides ) {
    showHideControllers(selectedSlide+1);

    if (selectedSlide+1 == totalSlides)
      $('#fx-right').hide();
    else
      $('#fx-right').show();

    $('<div id="flip" class="slides"></div>').insertBefore('#prev');

    var clon1 = $('#slide-' + selectedSlide).clone();
    clon1.css({ direction: 'rtl', width: 'calc(80vh * 1.4)' });

    var clon2 = $('#slide-' + (selectedSlide+1)).clone();
    clon2.css({ width: '100%', display: 'none', transform: 'rotateY(180deg)' });
    $('#flip')
      .css({right: 0, 'transform-origin': '0% 0%', direction: 'rtl'})
      .append(clon1)
      .append(clon2)
      .append('<div class="fxright"></div>');

    $('#slide-' + selectedSlide).css({width: '50%', zIndex: 2});
    $('#slide-' + (selectedSlide+1)).css({zIndex: 1, width: '100%'});

    $('#flip').animate({borderSpacing: -180}, {
      step: function(now,fx) {
        $(this).css('transform','rotateY('+now+'deg)');

        if (now <= -90) {
          $('#flip > .slides:nth-child(1)').hide();
          $('#flip > .slides:nth-child(2)').show();
        }
      },
      complete: function() {
        $('#slide-' + selectedSlide).css({width: 0, zIndex: 0});
        $('#slide-' + (selectedSlide+1)).css({zIndex: 2});

        $('#flip').remove();

        $('#fx-left').show();

        selectedSlide++;
      },
      duration: 1000
    });

  } else if ( $(this).attr('id') == 'prev' && selectedSlide > 1 ) {
    showHideControllers(selectedSlide-1);

    if (selectedSlide-1 == 1)
      $('#fx-left').hide();
    else
      $('#fx-left').show();

    $('<div id="flip" class="slides"></div>').insertBefore('#prev');

    var clon1 = $('#slide-' + selectedSlide).clone();
    clon1.css({ direction: 'rtl' });

    var clon2 = $('#slide-' + (selectedSlide-1)).clone();
    clon2.css({ width: 'calc(80vh * 1.4)', display: 'none', transform: 'rotateY(180deg)' });
    $('#flip')
      .css({left: 0, 'transform-origin': '100% 0%'})
      .append(clon1)
      .append(clon2)
      .append('<div class="fxleft"></div>');

    $('#slide-' + selectedSlide).css({width: '100%', zIndex: 1});
    $('#slide-' + (selectedSlide-1)).css({zIndex: 2, width: '50%'});

    $('#flip').animate({borderSpacing: 180}, {
      step: function(now,fx) {
        $(this).css('transform','rotateY('+now+'deg)');

        if (now >= 90) {
          $('#flip > .slides:nth-child(1)').hide();
          $('#flip > .slides:nth-child(2)').show();
        }
      },
      complete: function() {
        $('#slide-' + selectedSlide).css({width: 0, zIndex: 0});
        $('#slide-' + (selectedSlide-1)).css({zIndex: 2, width: '100%'});

        $('#flip').remove();

        $('#fx-right').show();

        selectedSlide--;
      },
      duration: 1000
    });
  }
});

function showHideControllers(slide) {
  if (slide == 1)
    $('#prev').hide();
  else
    $('#prev').show();
  if (slide == totalSlides)
    $('#next').hide();
  else
    $('#next').show();
}
