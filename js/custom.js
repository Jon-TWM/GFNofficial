$(document).ready(function(){


    $('.account-center-opener-wrap').click(function(){
        let self = $(this);
        console.log('Hi')
        $('#accountOption').toggle();
    })
    $(document).click(function(e) {
        var target = e.target;
    
        if (!$(target).is('#accountOption') && !$(target).parents().is('.account-center-opener-wrap')) {
            $('#accountOption').hide();
        }
    });
    // Class Version TT
    $('.modal-opener').click(function(e){
        e.preventDefault;
        let tt = $(this).attr('tt-to');
        console.log(tt)
        $('.' + tt).show();
        $('body').css({
            'max-height': '100vh',
            'max-width': '100vw',
            'overflow': 'hidden',
            // 'position': 'fixed'
        })
    })
    $('.modal-closer, .modal-closer_btn, .modal-closer-btn-na').click(function(){
        $(this).parents('.modal').hide();
        $('body').css({
            'max-height': 'auto',
            'max-width': 'auto',
            'overflow': 'auto',
            'position': 'relative'
        })
    })
    // ID Version TT
    $('.receipt-link').click(function(){
        let tt = $(this).attr('tt-to');
        let ttself = $(document.getElementById(tt))
        ttself.toggle();
        
    })
    $('.receipt-close').click(function() {
        $(this).parents('.receipt').hide();
    })

    /*
    ------
    Custom Select
    ------
    */

   $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
    
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
    
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            console.log($this.val());
            let sp = $('#' + $this.val());
            sp.show();
            sp.siblings().hide();
        });
    
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

        

    });
    $('.primary_input-wrap input').focus(function(){
        $(this).siblings('.primary_input-title').addClass('focus');
    })
    $('.primary_input-wrap input').focusout(function(){
        $(this).siblings('.primary_input-title').removeClass('focus');
    })

    $('.answer-opener').click(function(){
        $(this).parents('tr').next().toggle();
        $(this).children('.answer-opener-a').toggleClass('active')
    })

    function ShowStr(e) {
        var Str = document.getElementById(e).nodeValue;
        alert(Str);
    }

    $('.section-panel-nav-tab').click(function(){
        let target = $(this).attr('nv-target');
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $('#' + target).css('display', 'inline-flex');
        $('#' + target).siblings('.sys').hide();
    })
    $('.section-panel-nav-tab.sm').click(function(){
        let target = $(this).attr('nv-target');
        $('#' + target).css('display', 'inline-flex');
        $('#' + target).siblings('.sys').hide();
        $('.section-panel-nav-tab.' + target).addClass('active')
        $('.section-panel-nav-tab.' + target).siblings().removeClass('active')
    })
    //switch nav-tab 
    $('.type-nav-tab').click(function(){
        let target = $(this).attr('nv-target');
        $(this).addClass('active');
        $(this).siblings('').removeClass('active'); 

        $(target).addClass('active');
        $(target).siblings('.type-section').removeClass('active');
    })
    $('.section-nav-tab').click(function(){
        let target = $(this).attr('nv-target');
        $(this).addClass('active');
        $(this).siblings('').removeClass('active'); 
        console.log(target);

        $(target).addClass('active');
        $(target).siblings('.chart-section, .inner-chart-section').removeClass('active');
    })
    // scrollspy
    $(function() {
  
        var link = $('.section-anchor-nav-tab, .anchor-tab');
        var alink = $('a.anchor');
        var alinkInput = $('input.anchor');
        
        // Move to specific section when click on menu link
        link.on('click', function(e) {
          var target = $($(this).attr('href'));
          $('html, body').animate({
            scrollTop: target.offset().top - 100
          }, 600);
          $(this).addClass('active');
          e.preventDefault();
        });
        alink.on('click', function(e) {
            var target = $($(this).attr('href'));
            $('html, body').animate({
              scrollTop: target.offset().top - 100
            }, 600);
            $(this).addClass('active');
            e.preventDefault();
          });
          alinkInput.on('click', function(e) {
            var target = $($(this).attr('href'));
            $('html, body').animate({
              scrollTop: target.offset().top - 100
            }, 600);
            $(this).addClass('active');
          });
        
        // Run the scrNav when scroll
        $(window).on('scroll', function(){
          scrNav();
        });
        
        // scrNav function 
        // Change active dot according to the active section in the window
        function scrNav() {
          var sTop = $(window).scrollTop();
          $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top-1,
                height = $(this).height();
            if(sTop >= offset && sTop < offset + height) {
              link.removeClass('active');
              $('#navbar').find('[data-scroll="' + id + '"]').addClass('active');
            }
          });
        }
        scrNav();
      });
      $('.modal-opener.pr-v').click(function(){
          $('.promo-video video')[0].play();
          $('.promo-video video')[0].muted = !$('.promo-video video')[0].muted;
      })
      $('.promo-video .modal-closer, .modal-closer_btn, .modal-closer-btn-na').click(function(){
          console.log('hit')
        $('.promo-video video')[0].pause();
        $('.promo-video video')[0].currentTime = 0;
      })

    //   偵測搜尋欄位內的內容
    $('.game-search-input').keydown(function(){
        if(!$(this).val()) {
            $('.input-content-delete').css({
                'display': 'inline-flex',
            });
        }
    })
    $(".input-content-delete").click(function(){
        $('.game-search-input').val('');
        $(this).hide();
    })
})

function copyTxt() {
    var copyText = document.getElementById("copyInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "已複製";
  }
  
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "點擊複製";
  }

  function navUpdate() {
    $(window).resize(function () {
        if ($(this).width() > 1024) {
            $('.m-menu').slideUp();
            $('nav .primary-btn').removeClass('open');
            $('#nav-icon2, .hover-dropdown, .account-center-opener').removeClass('open');
        }
        if($(this).width() < 1024) {
            $('.ac-opener-main-btn .nav-item').removeClass('open');
        }
    })
    var scrollTop = $(".scrollTop");
    $(window).scroll(function() {
        var topPos = $(this).scrollTop();
        if (topPos > 100) {
        $(scrollTop).css("opacity", "1");

        } else {
        $(scrollTop).css("opacity", "0");
        }
    }); 
    //Click event to scroll to top
    $(scrollTop).click(function() {
        $('html, body').animate({
        scrollTop: 0
        }, 800);
        return false;
    }); 
    $('.hover-dropdown, .account-center-opener, .ac-opener-main-btn .nav-item, #notify').click(function(event){
        $(this).toggleClass('open');
        event.stopPropagation();
    })
    $(window).click(function() {
        $('.hover-dropdown, .account-center-opener, .ac-opener-main-btn .nav-item, #notify').removeClass('open');
    });
    $('.ac-opener-main-btn .nav-item').click(function(){
        var pic = $("#pIc")[0].getBoundingClientRect();
        let windowWidth = $(window).width();
        let x = windowWidth - pic.left;
        let y = pic.top;
        console.log(x)
        console.log(y)

        $(this).siblings('.account-center-opener-wrap').css({
            'position': 'fixed',
            'top': y + 55,
            'right': x - 65,
        })
        $('.hover-dropdown, .account-center-opener, #notify').removeClass('open');
    })
    $('#notify').click(function(){
        $('.hover-dropdown, .account-center-opener, .ac-opener-main-btn .nav-item').removeClass('open');
        
        let nfTop = $(this).position().top;
        let nfLeft = $(this).position().left
        let item = $('.inbox-menu');
        let top = item.position().top;
        let height = item.height();
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();
        let bottom = windowHeight - top - height;

        
        
        if(windowWidth > 500 && bottom <= 0) {
            $('.inbox-item-section').css({
                height: 'calc(100vh - 80px - 92px)',
                'overflow-y': 'scroll'
            })
            $('.inbox-menu').css({
                'top': nfTop + 75,
                'left': nfLeft  - 5,
                'height': 'auto',
                'width': 'auto',
            })
            console.log('TYPE1')
        }
        if(windowWidth > 500 && bottom > 0) {
            $('.inbox-item-section').css({
                height: 'auto',
                overflow: 'hidden'
            })
            $('.inbox-menu').css({
                'top': nfTop + 75,
                'left': nfLeft + 20,
                'height': 'auto',
                'width': 'auto',
            })
            console.log('TYPE2')
        }
        if(windowWidth <= 500 && $('#notify.open').length == 1) {
            $('.inbox-menu').css({
                'top': '55px',
                'left': '0',
                'height': '100vh',
                'width': '100vw',
            })
            $('.inbox-item-section').css({
                'min-height': 'calc(100vh - 55px - 92px)',
                'max-height': 'calc(100vh - 55px - 92px)',
                'height': 'calc(100vh - 55px - 92px)',
                'overflow-y': 'scroll'
            })
            $('body').css({
                'max-height': '100vh',
                'max-width': '100vw',
                'overflow': 'hidden',
                // 'position': 'fixed'
            })
            console.log('TYPE3')
        }
        if($('#notify.open').length == 0 && windowWidth <= 500) {
            $('.inbox-menu').css({
                'top': '55px',
                'left': '0',
                'height': '100vh',
                'width': '100vw',
            })
            $('.inbox-item-section').css({
                'max-height': 'calc(100vh - 55px - 92px)',
                'overflow-y': 'scroll'
            })
            $('body').css({
                'max-height': 'auto',
                'max-width': 'auto',
                'overflow': 'auto',
                'position': 'relative'
            })
            console.log('TYPE4')
        }
    })
    $(window).resize(function(){
        $('.hover-dropdown, .account-center-opener, .ac-opener-main-btn .nav-item, #notify').removeClass('open');
        $('.inbox-menu').css({
            'top': 'unset',
            'left': 'unset',
            'height': 'unset',
            'width': 'unset',
        })
        $('.inbox-item-section').css({
            'min-height': 'unset',
            'max-height': 'unset',
            'height': 'unset',
            'overflow-y': 'unset'
        })
        
    })
    
  }
