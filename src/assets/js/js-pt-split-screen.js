jQuery.fn.pt_split_screen = function () {
  return this.each(function () {
    jQuery('body').addClass('body-one-screen');

    var $this_el = jQuery(this),
      $el = $this_el.find('.screen-item'),
      $nav = $this_el.find('.navigation-block'),
      $pagination = $nav.find('.pagination'),
      delay = 1000,
      status = false;

    $el.each(function (index) {
      index++;
      $pagination.append('<span>'+leadZero(index)+'</span>');
    });

    jQuery(window).on('load resize', function () {
      var height = jQuery(window).outerHeight() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').outerHeight();
      $this_el.css('height', height);
      $this_el.find('.items .item').css('height', height);
    });

    function vertical_parallax(coef, index) {
      index = index === undefined ? false : index;
      if (coef != false) {
        var index = $this_el.find('.screen-item.current').index() - coef;
      }
      $el.eq(index).removeClass('prev next').addClass('current').siblings().removeClass('current');
      $el.eq(index).prevAll().removeClass('next').addClass('prev');
      $el.eq(index).nextAll().removeClass('prev').addClass('next');

      $pagination.find('span:eq('+index+')').addClass('current').siblings().removeClass('current');

      if(index == 0) {
        $nav.find('.prev').addClass('disabled');
      } else {
        $nav.find('.prev').removeClass('disabled');
      }
      
      if(index == ($el.length - 1)) {
        $nav.find('.next').addClass('disabled');
      } else {
        $nav.find('.next').removeClass('disabled');
      }
    }

    vertical_parallax(false, 0);

    $this_el.on('mousewheel wheel', function (e) {
      if (jQuery(window).width() > 768) {
        e.preventDefault();
        var cur = $this_el.find('.screen-item.current').index();
        if (status != true) {
          status = true;
          if (e.originalEvent.deltaY > 0 && cur != parseInt($el.length - 1)) {
            vertical_parallax('-1');
            setTimeout(function () {
              status = false
            }, delay);
          } else if (e.originalEvent.deltaY < 0 && cur != 0) {
            vertical_parallax('1');
            setTimeout(function () {
              status = false
            }, delay);
          } else {
            status = false;
          }
        }
      }
    });

    $pagination.on('click', 'span:not(.current)', function () {
      vertical_parallax(false, jQuery(this).index());
    });

    $nav.on('click', '.prev', function() {
      vertical_parallax('1');
    }).on('click', '.next', function() {
      vertical_parallax('-1');
    });

    if(jQuery(window).width() > 768) {
      $this_el.find('.item-right').each(function () {
        jQuery(this).swipe({
          preventDefaultEvents: false,
          swipeUp: function () {
            vertical_parallax('-1');
          },
          swipeDown: function () {
            vertical_parallax('1');
          }
        });
      });
      $this_el.find('.item-left').each(function () {
        jQuery(this).swipe({
          preventDefaultEvents: false,
          swipeUp: function () {
            vertical_parallax('1');
          },
          swipeDown: function () {
            vertical_parallax('-1');
          }
        });
      });
    }
  });
};