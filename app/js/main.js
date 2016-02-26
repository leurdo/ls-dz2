
(function() {

    publicMethod();
    init();
    attachEvents();

    function init() {
      $(function(){

        priceSelect();
        initSelect2();
        columnize();

        });
    };

    function attachEvents() {
        $('.slider__item').on('click', onImageSlider);
        $('.view__item').on('click', onChangeView);
        $('.fb-body__link').on('click', onClearInputs);
        $('.fb-header').on('click', onCloseBlocks);
    };

    function priceSelect() {
        var 
          min = parseInt($('#amount1').attr('data-min')),
          max = parseInt($('#amount2').attr('data-max')),
          val1 = min,
          val2 = max;

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

        $('#amount1').change(function() {
            val1 = $(this).val();
            val2 = $('#amount2').val();
            
            if (parseInt(val1) > parseInt(val2)) {
              val1 = val2;
            }
            if (parseInt(val1) < min || val1 == '') {
              val1 = min;
            }
            
            $(this).val(val1);

            $('#slider-range').slider('values', 0, $(this).val() );
        });

        $('#amount2').change(function() {
            val1 = $('#amount1').val();
            val2 = $(this).val();

            if (parseInt(val2) < parseInt(val1)) {
              val2 = val1;
            }
            if (parseInt(val2) > max || val2 == '') {
              val2 = max;
            }
            $(this).val(val2);

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
    };

    function onClearInputs(e) {
      e.preventDefault();
      var
      $this = $(this);

      $this.closest('.fb-body').find('input').removeAttr('checked');
    };

    function onCloseBlocks(e) {
      e.preventDefault();
      var
      $this = $(this);

      $this.closest('.formblock').find('.fb-body').slideToggle();
      $this.toggleClass('fb-header_closed')
    };

    function columnize() {
      $('.information__p').addClass('dontsplit');
      $('.information__text').columnize({ columns: 2, lastNeverTallest: true });
    };

    function publicMethod() {};

})();