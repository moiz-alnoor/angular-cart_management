(function (jQuery) {
  "use strict";
  jQuery.fn.pt_owl_filter = function () {
    return this.each(function () {

      var $this = jQuery(this),
          $slider = $this.find('.owl-carousel');

      function set_count($el, index = 0, count = 0) {
        if($el == 'load') {
          $slider.find('.item').each(function(index) {
            jQuery(this).find('.count, .num').text(leadZero(index+1));
          });
        } else {
          $el.find('.count, .num').text(leadZero(index+1));
        }
      }

      $this.append('<div class="cache-items"></div>');

      set_count('load');

      if($this.find('.filter-buttons').length != 0) {
        if ($this.find('.cache-items .owl-item').length == 0) {
          $slider.find('.item').each(function () {
            $this.find('.cache-items').append(jQuery(this).clone());
          });
        }

        function showProjectsbyCat(cat) {
          $slider.addClass('loading');
          setTimeout(function () {
            if (cat == '*') {
              $this.find('.cache-items .item').each(function (index) {
                set_count(jQuery(this), index, $this.find('.cache-items .item').length);

                var $elem = jQuery(this).clone();
                $elem.find('[data-id]').attr('data-id', index);
                $slider.trigger('add.owl.carousel', [$elem]);
                $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
              })
            } else {
              $slider.find('.item:not(' + cat + ')').each(function () {
                var targetPos = jQuery(this).parent().index(),
                  $elem = jQuery(this).parent();
                $slider.trigger('remove.owl.carousel', [targetPos]);
                $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
              });
              $this.find('.cache-items .item' + cat).each(function (index) {
                set_count(jQuery(this), index, $this.find('.cache-items .item' + cat).length);

                var $elem = jQuery(this).clone();
                $elem.find('[data-id]').attr('data-id', index);
                $slider.trigger('add.owl.carousel', [$elem]);
                $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
              });
            }
          }, 500);
        }

        $this.on('click', '.filter-buttons button', function (e) {
          e.preventDefault();
          jQuery(this).addClass('current').siblings().removeClass('current');

          var cat = jQuery(this).data('filter');
          showProjectsbyCat(cat);
        });

        $slider.on('refreshed.owl.carousel', function () {
          setTimeout(function () {
            $slider.removeClass('loading')
          }, 500);
        });
      }
    });
  }
})(jQuery);