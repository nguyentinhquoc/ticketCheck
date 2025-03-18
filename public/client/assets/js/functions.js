(function($){
    "use strict";
    $(document).ready(function(){
        // lightcase 
        $('a[data-rel^=lightcase]').lightcase();

        $(".main-menu>li>.submenu").parent("li").children("a").addClass("dd-icon-down");
        $(".main-menu>li>.mega-menu").parent("li").children("a").addClass("dd-icon-down");
        $(".m-menu>li>.m-submenu").parent("li").children("a").addClass("dd-icon-down");
        $(".main-menu>li>.submenu .submenu").parent("li").children("a").addClass("dd-icon-right");
        $(".m-menu>li>.m-submenu .submenu").parent("li").children("a").addClass("dd-icon-right");

        // mobile menu responsive
        $(document).on('click','.header-bar',function(){
            $(".mobile-header").toggleClass("close");
        });

        //mobile drodown menu display
        $('.mobile-menu-area .m-menu li a').on('click', function(e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(1000,"swing");
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown(1000,"swing");
                element.siblings('li').children('ul').slideUp(1000,"swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(1000,"swing");
            }
        });

        var stcky = $(".primary-menu");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 55) {
                stcky.addClass("bg-white");
            } else {
                stcky.removeClass("bg-white");
            }
        });

        var stcky_one = $(".banner-wrapper");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 1020) {
                stcky_one.addClass("banner-none");
                $('body').removeClass("d-shape");
            } else {
                stcky_one.removeClass("banner-none");
                $('body').addClass("d-shape");
            }
        });

        var stcky_two = $("body");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 1920) {
                $('body').addClass("remove");
            } else {
                $('body').removeClass("remove");
            }
        });

        // sticky menu
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-100px";
            }
            prevScrollpos = currentScrollPos;
        }

        // scroll up start here
        $(document).ready(function(){
            //Check to see if the window is top if not then display button
            $(window).scroll(function(){
                if ($(this).scrollTop() > 300) {
                    $('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
                } else {
                    $('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
                }
            });
            //Click event to scroll to top
            $('.scrollToTop').click(function(){
                $('html, body').animate({scrollTop : 0},500);
                return false;
            });
        });

        //Isotope
        jQuery(window).on('load',function() {   
            //Isotope activation js codes
            var $gellary = $('.grid').isotope({
              itemSelector: '.grid-item',
              percentPosition: true,
              transitionDuration: '0.5s',
              masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
                gutter: 0
              },
              getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function( itemElem ) {
                  var weight = $( itemElem ).find('.weight').text();
                  return parseFloat( weight.replace( /[\(\)]/g, '') );
                }
              }
            });
        

            // filter functions
            var filterFns = {
              // show if number is greater than 50
              numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt( number, 10 ) > 50;
              },
              // show if name ends with -ium
              ium: function() {
                var name = $(this).find('.name').text();
                return name.match( /ium$/ );
              }
            };

            // bind filter button click
            $('.portfolio ul').on( 'click', 'li', function() {
              var filterValue = $( this ).attr('data-filter');
              // use filterFn if matches value
              filterValue = filterFns[ filterValue ] || filterValue;
              $gellary.isotope({ filter: filterValue });
            });


            // change is-checked class on buttons
            $('.portfolio ul').each( function( i, liList ) {
              var $liList = $( liList );
              $liList.on( 'click', 'li ', function() {
                $liList.find('.active').removeClass('active');
                $( this ).addClass('active');
              });
            }); 
        });

        // sponsor slider 
        var swiper = new Swiper('.sponsor-slider',{
            slidesPerView: 6,
            speed: 1200,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                991: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 1,
                }
            },
            loop: true
        });

        // testimonial section start here
        var swiper = new Swiper('.testimonial-slider',{
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1200,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                991: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 1,
                }
            },
            loop: true
        });

        var swiper = new Swiper('.testimonial-slider-2',{
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 1200,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                991: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                },
                576: {
                    slidesPerView: 1,
                }
            },
            loop: true
        });

        // sticky-widget
        $(document).ready(function() {
            $('section .container .sticky-widget').theiaStickySidebar();
        });

        // Add smooth scrolling to all links
        $("a").on('click', function (event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll The optional number
                // (800) specifies the number of milliseconds it takes to scroll to the
                // specified area
                $('html, body').animate({
                    scrollTop: $(hash)
                        .offset()
                        .top
                }, 800, function () {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                     window.location.hash = hash;
                });
            } // End if
        });

        // wow animation
        new WOW().init();
    });
    
    $(document).ready(function(){
        //set animation timing
        var animationDelay = 2500,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect 
        revealDuration = 600,
        revealAnimationDelay = 1500,
        stopAnimation = false;
        
        initHeadline();
        

        function initHeadline() {
            //insert <i> element for each letter of a changing word
            singleLetters($('.cd-headline.letters').find('b'));
            //initialise headline animation
            animateHeadline($('.cd-headline'));
        }

        function singleLetters($words) {
            $words.each(function(){
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (i in letters) {
                    if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function(){
                var headline = $(this);
                
                if(headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
                } else if (headline.hasClass('clip')){
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type') ) {
                    //assign to .cd-words-wrapper the width of its longest word
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function(){
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                };

                //trigger animation
                setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word); 
            if(stopAnimation){
              return false;
            }
        
            if($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting'); 
                setTimeout(function(){ 
                    parentSpan.removeClass('selected'); 
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
            } else if($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
            }  else if($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
                    switchWord($word, nextWord);
                    showWord(nextWord);
            });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
                setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
            } else {
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            }  else if($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
                    setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');
            
            if(!$letter.is(':last-child')) {
                setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
            } else if($bool) { 
                setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
            }

            if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            } 
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');
            
            if(!$letter.is(':last-child')) { 
                setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
            } else { 
                if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
                if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }
    });
}(jQuery));




    

