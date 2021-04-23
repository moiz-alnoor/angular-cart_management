(function (jQuery) {
  "use strict";

  jQuery.fn.pt_one_page_scroll = function () {
    return this.each(function () {
      var $area = jQuery(this),
        $wrap = $area.find('.ops-wrap'),
        $screen_item = $area.find('.ops-screen'),
        $nav = $area.find('.ops-nav'),
        lastAnimation = 0,
        animationTime = 500,
        height = 0,
        current_screen = 0,
        count_screen = $screen_item.length,
        pos = 0,
        flag = true;
      
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        console.log('dsds'); 
        return false;
      }

      $screen_item.each(function () {
        $nav.append('<div><span></span></div>');
      });

      $screen_item.eq(0).addClass('current').siblings().removeClass('current');
      $nav.find('div').eq(0).addClass('current').siblings().removeClass('current');

      jQuery(window).on('load resize', function () {
        height = jQuery(window).height() - jQuery('#wpadminbar').height() - jQuery('.header-space:visible').height();

        $area.css('height', height);
        $screen_item.css('height', height);

        update(current_screen);
      });

      jQuery(document).on('scroll', function () {
        var d_top = jQuery(document).scrollTop(),
          w_top = $area.offset().top;

        if (d_top > w_top - 100 && d_top < w_top + 100 && flag) {
          flag = false;
          event.preventDefault();
          jQuery('body, html').animate({
            scrollTop: w_top
          }, 500);

          var t = setTimeout(function () {
            flag = true;
          }, 5000);
        } else {
          clearTimeout(t);
        }
      });

      function scroll(type, delta) {
        if (!type) {
          var timeNow = new Date().getTime(),
            timeout = 500,
            d_top = jQuery(document).scrollTop(),
            w_top = $area.offset().top-jQuery('#wpadminbar').height();

          if (timeNow - lastAnimation < timeout + animationTime) {
            event.preventDefault();
            return false;
          }

          if ((current_screen == 0 && delta > 0) || (current_screen == count_screen - 1 && delta < 0)) {
            return false;
          } else {

            if (d_top == w_top) {
              event.preventDefault();
            } else {
              return false;
            }
          }

          if (delta < 0) {
            current_screen++;
          } else {
            current_screen--;
          }
        } else {
          current_screen = delta;
        }

        pos = -height * current_screen;

        $wrap.css({
          "-webkit-transform": "translate3d(0, " + pos + "px, 0)",
          "-moz-transform": "translate3d(0, " + pos + "px, 0)",
          "-ms-transform": "translate3d(0, " + pos + "px, 0)",
          "transform": "translate3d(0, " + pos + "px, 0)",
        });

        $screen_item.eq(current_screen).addClass('current').siblings().removeClass('current');
        $nav.find('div').eq(current_screen).addClass('current').siblings().removeClass('current');

        lastAnimation = timeNow;
      }

      function update(current_screen) {
        pos = -height * current_screen;

        $wrap.css({
          "-webkit-transform": "translate3d(0, " + pos + "px, 0)",
          "-moz-transform": "translate3d(0, " + pos + "px, 0)",
          "-ms-transform": "translate3d(0, " + pos + "px, 0)",
          "transform": "translate3d(0, " + pos + "px, 0)",
        });
      }

      $area.on('mousewheel DOMMouseScroll', function (event) {
        var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        scroll('', delta);
      }).on('click', '.ops-nav div:not(.current)', function (e) {
        scroll('dots', jQuery(this).index());
      }).swipe({
        swipeUp: function () {
          scroll('', -100);
        },
        swipeDown: function () {
          scroll('', 100);
        },
        threshold: 20,
        preventDefaultEvents: false
      });

    });
  };

})(jQuery);