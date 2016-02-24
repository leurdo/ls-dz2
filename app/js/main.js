//Price select
(function() {

    publicMethod();
    init();
    attachEvents();

    function init() {
        priceSelect();
        initSelect2();
    };

    function attachEvents() {
        $('.slider__item').on('click', onImageSlider);
        $('.view__item').on('click', onChangeView);
    };

    function priceSelect() {
        var 
          min = parseInt($('#amount1').attr('data-min')),
          max = parseInt($('#amount2').attr('data-max'));

        $('#slider-range').slider({
          range: true,
          min: min,
          max: max,
          values: [ min, max ],
          slide: function( event, ui ) {
            $('#amount1').val( ui.values[ 0 ]);
            $('#amount2').val( ui.values[ 1 ]);
          }
        });
        $('#amount1').val( $('#slider-range').slider('values', 0 ) );
        $('#amount2').val( $('#slider-range').slider('values', 1 ) );

        $('#amount1').keyup(function() {
            $('#slider-range').slider('values', 0, $(this).val() );
        });
        $('#amount2').keyup(function() {
            $('#slider-range').slider('values', 1, $(this).val() );
        });
    };

    function initSelect2() {
      $('.sorting__select').select2({
          minimumResultsForSearch: Infinity
      });
    };

    function onImageSlider(e) {
          e.preventDefault();
          var
          $this = $(this),
          block = $this.closest('.slider').find('.slider__block'),
          path = $this.find('img').attr('src');

          if (!$this.hasClass('active')) {
            $this.addClass('active');
            $this.siblings().removeClass('active');

            block.find('img').fadeOut(function() {
            
            $(this).attr('src', path).fadeIn();

            });

          }
    };

    function onChangeView(e) {
      e.preventDefault();
      var
      $this = $(this),
      viewClass = $this.attr('id'),
      currentClass = $this.siblings('.active').attr('id');

      if (!$this.hasClass('active')) {

        $this.addClass('active');
        $this.siblings().removeClass('active');

        $('.products')
          .removeClass(currentClass)
          .addClass(viewClass);
      }
    }

    function publicMethod() {};

})();