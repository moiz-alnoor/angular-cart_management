(function (jQuery) {
  "use strict";

  jQuery.fn.pt_project_scroll = function () {
    return this.each(function () {
      var $area = jQuery(this),
        $items = $area.find('.psb-items'),
        count = $area.find('.psb-items .item').length,
        lastAnimation = 0,
        animationTime = 300,
        height = 0,
        pos = 0;

      if ($items.find('.item').length < 2) {
        $area.remove();
        return false;
      }

      $items.append('<div class="psb-col"></div><div class="psb-col"></div><div class="psb-col last"></div>');

      $items.find('.item').each(function (index) {
        var $col = jQuery(this).parent();

        if (index == 0 || index == 1) {
          jQuery(this).clone().appendTo($col);
        } else if (index == count - 2) {
          jQuery(this).clone().prependTo($col);
        } else if (index == count - 1) {
          jQuery(this).clone().insertAfter($col.find('.item:first'));
        }
      });

      $items.find('.item').each(function (index) {
        jQuery(this).addClass('item' + index).appendTo($items.find('.psb-col'));
      });

      jQuery(window).on('load resize', function () {
        height = jQuery(window).height() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').height();

        $area.css('height', height);
        $items.css('height', height);

        $items.find('.item').css('height', height - 200);
        $items.find('.item .h').css('max-width', height - 200);

        $items.find('.psb-col.last .current.opened').each(function () {
          var $item = jQuery(this),
            window_w = jQuery(window).width(),
            item_pt = $item.offset().top,
            item_pl = $item.offset().left,
            item_pr = window_w - item_pl - $item.outerWidth();

          $item.find('.wrap').css({
            'position': 'absolute',
            'top': -item_pt,
            'right': -item_pr,
            'left': -item_pl,
            'bottom': -item_pt,
            'height': 'auto'
          });
        });

        scroll('0');
      });

      jQuery(window).on('load', function () {
        scroll('0');
      });

      $area.on('mousewheel DOMMouseScroll', function (event) {
        if (!$area.hasClass('opened')) {

          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail,
            timeNow = new Date().getTime(),
            timeout = 500;

          if (timeNow - lastAnimation < timeout + animationTime) {
            return false;
          }

          scroll(delta);

          lastAnimation = timeNow;

        }
      }).swipe({
        swipeUp: function () {
          scroll(-100);
        },
        swipeDown: function () {
          scroll(100);
        },
        threshold: 20
      }).on('click', '.psb-col.last .current:not(.opened)', function (e) {
        e.preventDefault();
        open_project();
      }).on('click', '.psb-navigation .prev', function () {
        if ($area.hasClass('opened')) return false;
        scroll(-100);
      }).on('click', '.psb-navigation .next', function () {
        if ($area.hasClass('opened')) return false;
        scroll(100);
      }).on('click', '.explore', function() {
        jQuery('body, html').animate({ scrollTop: height-jQuery('.site-header').height() }, 1100);
      });

      function scroll(delta) {
        $items.find('.psb-col').each(function (index) {
          var $this = jQuery(this),
            item = d_item = 2,
            coef = 100;

          $this.removeClass('wot');

          if (index == 0) {
            item = count - 1;
          } else if (index == 1) {
            item = count + 1;
            coef = height / 2 + 50;
          }

          pos = -(height - 125) * item + coef;

          if (delta > 0) {
            var d_item = item - 1;
            if (index == 1) {
              d_item = item + 1;
            }
            pos = -(height - 125) * d_item + coef;

            setTimeout(function () {
              if (index == 1) {
                $this.find('.item:last').after($this.find('.item:first'));
              } else {
                $this.find('.item:first').before($this.find('.item:last'));
              }

              $this.addClass('wot').css('transform', 'translate3d(0, ' + (-(height - 125) * item + coef) + 'px, 0)');
            }, animationTime);
          } else if (delta < 0) {
            var d_item = item + 1;
            if (index == 1) {
              d_item = item - 1;
            }
            pos = -(height - 125) * d_item + coef;

            setTimeout(function () {
              if (index == 1) {
                $this.find('.item:first').before($this.find('.item:last'));
              } else {
                $this.find('.item:last').after($this.find('.item:first'));
              }

              $this.addClass('wot').css('transform', 'translate3d(0, ' + (-(height - 125) * item + coef) + 'px, 0)');
            }, animationTime);
          } else {
            $this.removeClass('wot');
          }

          if (index == 2) {
            $this.find('.item').eq(d_item).addClass('current').siblings().removeClass('current');
          }

          $this.css({
            "-webkit-transform": "translate3d(0, " + pos + "px, 0)",
            "-moz-transform": "translate3d(0, " + pos + "px, 0)",
            "-ms-transform": "translate3d(0, " + pos + "px, 0)",
            "transform": "translate3d(0, " + pos + "px, 0)",
          });

          $area.addClass('loaded');
        });
      }

      function open_project() {
        var $item = $items.find('.psb-col.last .current'),
          $content_block = $area.find('.psb-content'),
          title = $item.find('.h').text(),
          window_w = jQuery(window).width(),
          item_pt = $item.offset().top,
          item_pl = $item.offset().left,
          item_pr = window_w - item_pl - $item.outerWidth(),
          item_url = $item.attr('data-url'),
          full_img = $item.attr('data-full-img');

        $area.addClass('opened loading');
        $item.addClass('opened');

        window.history.pushState(item_url, title, item_url);

        $item.find('.wrap').css({
          'position': 'absolute',
          'top': -item_pt,
          'right': -item_pr,
          'left': -item_pl,
          'bottom': -item_pt,
          'height': 'auto'
        }).find('.img div').css({
          'background-image': 'url('+full_img+')'
        });

        $content_block.stop(true).slideUp(300).parent().delay(300).queue(function (next) {
          jQuery(this).find('.sub-h').remove();
          jQuery(this).find('.h').text(title);
          jQuery(this).find('.explore').show();
          $content_block.slideDown();
          next();
        });

        $area.next('.psb-load-content').find('.container').load(item_url + ' .project-content-block', function () {
          var $this = jQuery(this);
          $this.imagesLoaded(function () {
            $area.removeClass('loading');
            $this.find('.isotope').isotope();
          });
        });
      }

    });
  };

})(jQuery);