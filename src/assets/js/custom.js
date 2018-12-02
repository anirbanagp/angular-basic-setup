$(document).ready(function() {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        autoplay: true,
        loop: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,


    });
});


(function() {
    var nav = $('.home-fixed-nav');

    $(window).scroll(function() {
        if ($(document).scrollTop() > 150) {
            nav.slideDown('medium');
        } else {
            nav.slideUp('medium');
        }
    });

})();




$(document).ready(function() {
    var button = $('.nav-tog'),
        text = $('.nav-menu');
    button.on('click', function() {
        //alert('hello');
        text.slideToggle(400);
    });
});

$(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
})
$(document).ready(function() {
    $("[rel='tooltip']").tooltip();

    $('.thumbnail').hover(
        function() {
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function() {
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    );
});
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function() {
        backToTop();
    });
    $('#back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
}

/* START OF DEMO JS - NOT NEEDED */
if (window.location == window.parent.location) {
    $('#fullscreen').html('<span class="glyphicon glyphicon-resize-small"></span>');
    $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/PbDb5');
    $('#fullscreen').attr('title', 'Back To Bootsnipp');
}
$('#fullscreen').on('click', function(event) {
    event.preventDefault();
    window.parent.location = $('#fullscreen').attr('href');
});
$('#fullscreen').tooltip();
/* END DEMO OF JS */

$('.navbar-toggler').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.navbar-minimal').toggleClass('open');
})


function htmlbodyHeightUpdate() {
    var height3 = $(window).height()
    var height1 = $('.nav').height() + 50
    height2 = $('.main').height()
    if (height2 > height3) {
        $('html').height(Math.max(height1, height3, height2) + 10);
        $('body').height(Math.max(height1, height3, height2) + 10);
    } else {
        $('html').height(Math.max(height1, height3, height2));
        $('body').height(Math.max(height1, height3, height2));
    }

}
$(document).ready(function() {
    htmlbodyHeightUpdate()
    $(window).resize(function() {
        htmlbodyHeightUpdate()
    });
    $(window).scroll(function() {
        height2 = $('.main').height()
        htmlbodyHeightUpdate()
    });
});

// flex slider
$(document).ready(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        start: function(slider) {
            $('body').removeClass('loading');
        }
    });
});