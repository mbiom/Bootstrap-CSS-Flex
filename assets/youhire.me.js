$( document ).ready( function() {
  var lang = $.url().param('lang') || Cookies.get('lang') || 'EN';
  $.i18n.properties({
    name:'Messages',
    path:'/assets/js/locales/',
    mode:'both',
    language:lang.toLowerCase()
  });
  $('#floating-menu').hcSticky();
  function initClock() {
    var formatTime = function(dt) {
      var hours = dt.getHours();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var minutes = dt.getMinutes();
      // var seconds = dt.getSeconds();
      return (hours < 10?('0' + hours):hours) + ":" + (minutes < 10?('0' + minutes):minutes) + ' ' + ampm;
    }
    var setTime = function() {
      var now = new Date();
      $('#timezone').text(formatTime(now));
    }
    setTime();
    setInterval(setTime, 1000*60);
  }
  initClock();
  // Home Page - close.
  if( $( ".close" ).length != 0 ) {
    $('.close').click(function() {
      $('.search').remove();
      $('.search-div').remove();
    });
  }
  // Header Nav.
  if( $( ".header-nav" ).length != 0 ) {
    $( document ).scroll( function() {
      if( $( document ).scrollTop() >= 20 && $( 'html' ).height() > $( window ).height() +  150 ) {
        $('.header-nav').addClass( 'container header navbar navbar-fixed-top' );
      } else {
        $('.header-nav').removeClass( 'container header navbar navbar-fixed-top' );
      }
    });
  }
  //  Accordion Panels.
  if( $( ".accordion-main-div" ).length != 0 ) {
    $('.accordion-main-div').hide();
    $('.parent-accordion:first').find('.accordion-main-div').show();
    $('.parent-accordion:first').find('.accordion-main-div').addClass('active');

    $('.parent-accordion:first > div:first > div').addClass('minus-div');

    $('.parent-accordion:first > div:first > div > a > img').attr('src', '/assets/images/minus.png');

    $('.parent-accordion:first > .chat-session-accordion > div').removeClass('background-grey');
    $('.parent-accordion:first > .chat-session-accordion > div').addClass('background-grey-active');
    $(".accordion-click").click(function () {
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.minus-main').addClass('plus-main');
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.minus-main').removeClass('minus-main');
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.minus-div').addClass('plus-div');
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.minus-div').removeClass('minus-div');

      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.accordion-click > img').attr('src', '/assets/images/plus.png');

      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.chat-session-accordion > div').removeClass('background-grey-active');
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.chat-session-accordion > div').addClass('background-grey');

      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.active').slideToggle(300);
      $(".accordion-click").not($(this)).parents(".parent-accordion").find('.active').removeClass("active");
      $(this).parents(".parent-accordion").find('.accordion-main-div').slideToggle(300, function() {
        if( $(this).parents(".parent-accordion").find('.accordion-main-div').is(':hidden') ) {
          $(this).parents(".parent-accordion").find('.minus-main').addClass('plus-main');
          $(this).parents(".parent-accordion").find('.minus-main').removeClass('minus-main');
          $(this).parents(".parent-accordion").find('.minus-div').addClass('plus-div');
          $(this).parents(".parent-accordion").find('.minus-div').removeClass('minus-div');

          $(this).parents(".parent-accordion").find('.accordion-click > img').attr('src', '/assets/images/plus.png');

          $(this).parents(".parent-accordion").find('.chat-session-accordion > div').removeClass('background-grey-active');
          $(this).parents(".parent-accordion").find('.chat-session-accordion > div').addClass('background-grey');

          $(this).parents(".parent-accordion").find('.accordion-main-div').removeClass("active");
        }
        else {
          $(this).parents(".parent-accordion").find('.plus-main').addClass('minus-main');
          $(this).parents(".parent-accordion").find('.plus-main').removeClass('plus-main');
          $(this).parents(".parent-accordion").find('.plus-div').addClass('minus-div');
          $(this).parents(".parent-accordion").find('.plus-div').removeClass('plus-div');

          $(this).parents(".parent-accordion").find('.accordion-click > img').attr('src', '/assets/images/minus.png');

          $(this).parents(".parent-accordion").find('.chat-session-accordion > div').removeClass('background-grey');
          $(this).parents(".parent-accordion").find('.chat-session-accordion > div').addClass('background-grey-active');

          $(this).parents(".parent-accordion").find('.accordion-main-div').addClass("active");
        }
      });
    });
  }
  // Tabs.
  if( $( ".profile-tab" ).length != 0 ) {
    $( '.profile-tab' ).click( function() {
      $('.profile-only-tab').show();
      $('.all-tabs').removeClass( 'col-lg-12 col-md-12 col-sm-12' );
      $('.all-tabs').addClass( 'col-lg-9 col-md-9 col-sm-9' );
    });
    $( '.other-tabs' ).click( function() {
      $('.profile-only-tab').hide();
      $('.all-tabs').removeClass( 'col-lg-9 col-md-9 col-sm-9' );
      $('.all-tabs').addClass( 'col-lg-12 col-md-12 col-sm-12' );
    });
  }
  // Carousel.
  if( $( "#owl-demo" ).length != 0 ) {
    $("#owl-demo").owlCarousel({
      autoPlay: 3000, // Set AutoPlay to 3 seconds.
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
    });
  }
  // Scroll Top.
  if( $( ".scroll-up" ).length != 0 ) {
    $( '.scroll-up' ).on( 'click', function() {
      $( 'html,body' ).animate({ scrollTop: 0 }, 800 );
    });
  }
  if($("#city").length) {
    $(function() {
      var a = $("#city").autocomplete({
        source: "/cities.html",
        minLength: 3,
        select: function( event, ui ) {
          event.preventDefault();
          $("#city").val(ui.item.label);
          $("#cityId").val(ui.item.value);
        },
        focus: function(event, ui) {
          event.preventDefault();
        }
      });
      $('.set-city').click(function(){
        $.ajax({
          type: "POST",
          url: "/city/" + $('#cityId').val() + ".html",
          data: {},
          success: function(msg){
            $('#cityMessage').hide();
          },
          dataType: 'json'
        });
      });
    });
  }
  var token = $("meta[name='_csrf']").attr("content");
  $('#yesBtn').on('click', function(){ // yes
    var v = $('#q').attr('value');
    if(v == 'q1') {
      $('#q').html($.i18n.prop('verify_account'));
      $( "#yesBtn" ).remove();
      $( "#noBtn" ).remove();
      $.ajax({url : '/answer/0.html',
        type : "POST",
        data : {},
        headers: {
          "X-CSRF-TOKEN":token
        }
      });
    }
    if(v == 'q2') {
      $('#q').html($.i18n.prop('find_referral'));
      $( "#yesBtn" ).remove();
      $( "#noBtn" ).remove();
      $.ajax({url : '/answer/1.html',
        type : "POST",
        data : {},
        headers: {
          "X-CSRF-TOKEN":token
        }
      });
    }
    if(v == 'q3') {
      $('#q').html($.i18n.prop('find_referral'));
      $( "#yesBtn" ).remove();
      $( "#noBtn" ).remove();
      $.ajax({url : '/answer/2.html',
        type : "POST",
        data : {},
        headers: {
          "X-CSRF-TOKEN":token
        }
      });
    }
  });
  $('#noBtn').on('click', function(){
    var v = $('#q').attr('value');
    if(v == 'q1') {
      $('#q').html($.i18n.prop('looking_for_job'));
      $('#q').attr('value', 'q2');
    }
    if(v == 'q2') {
      $('#q').html($.i18n.prop('is_hr_manager'));
      $('#q').attr('value', 'q3');
    }
    if(v == 'q3') {
      $('#q').html($.i18n.prop('share_the_site'));
      $( "#yesBtn" ).remove();
      $( "#noBtn" ).remove();
      $.ajax({url : '/answer/3.html',
        type : "POST",
        data : {},
        headers: {
          "X-CSRF-TOKEN":token
        }
      });
    }
  });

  /**
   * 语言切换
   * 如果设置了 Cookie: lang 则作为默认值，否则使用 EN 作为默认值
   *
   * EN - English
   * FR - Français
   * ES - Espagnol
   */
  (function(window, $) {
    // Language cookie key
    var langCookieKey = 'lang';

    // Parse current language from url querystring `?lang=xx`
    var currentLang = $.url().param('lang') || Cookies.get(langCookieKey) || 'EN';

    $('.js-lang-current')
    // Inject html
      .html(currentLang + ' <span class="caret" />')
      // Highlight item
      .end().find('.dropdown-menu > li[lang="' + currentLang + '"]')
      .addClass('active')
      // Register click event & jump
      .end().find('.dropdown-menu a').on('click', function() {
      var lang = $(this).attr('lang') || 'EN';

      Cookies.set(langCookieKey, lang, { expires: 365 }); // Expires 365 days

      window.location.href = '?' + $.param(
          $.extend({}, $.url().param(), { lang: lang })
        );
    });
  })(window, $);

  /**
   * JD Content fold / unfold
   */
    (function(window, $) {
      var foldCls = 'icon-caret-down';
      var unfoldCls = foldCls + ' is-rotate';

      $('[data-toggle="foldunfold"]').each(function() {
        var $toggle = $(this);
        var $icon = $toggle.find('svg');
        var $target = $($toggle.data('target'));

        $toggle.on('click', function() {
          $target.toggleClass('in');
          if ($icon.attr('class') === foldCls) {
            $icon.attr('class', unfoldCls);
          } else {
            $icon.attr('class', foldCls);
          }
        });
      });
    })(window, $);
    $('.popover-linkedin').popover({
      html: true,
      trigger: 'hover',
      content: function () {
        var $this = $(this);
        var intro = $this.data('intro') || '';
        var content = '<img src="/assets/images/verified_icon.jpg" style="width: 20px; height: 20px; border-radius: 20px;" /> LinkedIn Verified'

        if (intro) {
          // Append content to popover
          content += '<div style="margin-top: 10px;">' + intro + '</div>';
        }

        return content
      }
    });
});
