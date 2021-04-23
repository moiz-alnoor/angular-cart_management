(function (jQuery) {
  "use strict";
  jQuery.fn.pt_tabs = function () {
    return this.each(function () {
      var $tabs = jQuery(this),
        $tabs_head = $tabs.find('.tabs-buttons'),
        $tab_content = $tabs.find('.tab-item');

      function set_tab(index) {
        $tabs_head.find('li').eq(index).addClass('current').siblings().removeClass('current');
        $tab_content.eq(index).children('.tab-m-button').addClass('current').parent().siblings().children('.tab-m-button').removeClass('current');
        $tab_content.eq(index).find('.inner').slideDown().parent().siblings().find('.inner').slideUp();

        if ($tabs.find('.isotope').length > 0) {
          $tabs.find('.isotope').isotope();
        }
        jQuery(window).trigger('resize').trigger('scroll');

        setTimeout(function () {
          jQuery(window).trigger('resize').trigger('scroll');
        }, 500);
      }

      $tabs_head.on('click', 'li:not(.current)', function () {
        set_tab(jQuery(this).index());
      });

      $tab_content.on('click', '.tab-m-button:not(.current)', function () {
        set_tab(jQuery(this).parent().index());
      });

      set_tab(0);
    });
  };

})(jQuery);