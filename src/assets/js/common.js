import '../scss/font-awesome.scss'
import '../scss/style.scss'
import 'owl.carousel/dist/assets/owl.carousel.css'
//import 'textillate/assets/animate.css'

import 'owl.carousel'
import 'jquery-match-height'
import 'waypoints/lib/jquery.waypoints.min.js'
import 'waypoints/lib/shortcuts/inview.min.js'
import 'jquery.counterup'
// import 'textillate'
// import 'letteringjs'

const Isotope = require('isotope-layout')
const imagesLoaded = require('imagesloaded')
const $body = $('body')

// **********************************************************************//
// ! Toggle menu mobile
// **********************************************************************//
const toggleMenuAside = function () {
    let $btnControl = $('[data-control="aside"]')

    $btnControl.on('click', function (e) {
        e.preventDefault()
        $body.toggleClass('is-aside')
    })
}

// **********************************************************************//
// ! Check Mobile Responsive
// **********************************************************************//
const checkResponsiveAside = function () {
    let $headerControl = $('#header-control')

    if (!$headerControl.is(':visible') && $body.hasClass('is-aside'))
        $body.removeClass('is-aside')
}

// **********************************************************************//
// ! Owl Carousel
// **********************************************************************//
const owlCarousel = function () {
    let $owlCarousel = $('[data-carousel]'),
        defaults = {
            items: 3,
            loop: false,
            center: false,
            margin: 20,
            autoWidth: false,
            rtl: false,
            responsive: {},
            responsiveBaseElement: window,
            lazyLoad: false,
            autoHeight: false,
            autoplay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            nav: false,
            navText: '',
            navElement: 'button',
            navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
            dots: true
        }

    // Check exit owl element
    if ($owlCarousel.length > 0) {
        $owlCarousel.each(function () {
            // config mode
            let configs = $(this).data('carousel'),
                opts = $.extend({}, defaults, configs),
                $scope = $('.' + $(this).data('scope')),
                $prev = $scope.find('.' + $(this).data('prev')),
                $next = $scope.find('.' + $(this).data('next'))

            // Run owl carousel with option merged
            let owl = $(this).owlCarousel(opts)

            // Trigger next
            $next.on('click', function () {
                owl.trigger('next.owl.carousel')
            })

            // Trigger prev
            $prev.on('click', function () {
                owl.trigger('prev.owl.carousel')
            })
        })
    }
}

// **********************************************************************//
// ! Isotope masonry
// **********************************************************************//
const isotopeLayout = function () {

    // Element isotope
    let $isotope = $('[data-grid]'),
        defaults = {
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            stagger: 30,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        }

    // Init isotope if exit elenment
    if ($isotope.length > 0) {
        $isotope.each(function () {
            let configs = $(this).data('grid'),
                opts = $.extend({}, defaults, configs),
                $grid = $(this).find('.grid'),
                $filter = $(this).find('[data-filter]')

            // Init Isotope
            let iso = new Isotope($grid[0], opts)

            imagesLoaded($grid[0], function () {
                iso.layout()
            })

            // Filter item
            $filter.on('click', function (e) {
                e.preventDefault()
                var filterValue = $(this).data('filter'),
                    $li = $filter.parent(),
                    $target = $(this).parent()
                $li.removeClass('is-filter')
                $target.addClass('is-filter')
                iso.arrange({ filter: filterValue })
            })
        })
    }
}

// **********************************************************************//
// ! Owl Slider Sync
// **********************************************************************//
const owlSync = function () {
    let flag = false,
        duration = 300,
        $owlLarge = $('#owl-large'),
        $owlThumbnail = $('#owl-thumbnail')
    if ($owlLarge.length > 0) {
        $owlLarge
            .owlCarousel({
                items: 1,
                loop: false,
                center: false,
                margin: 0,
                autoWidth: false,
                rtl: false,
                responsive: {},
                responsiveBaseElement: window,
                lazyLoad: false,
                autoHeight: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                nav: false,
                navText: '',
                navElement: 'button',
                navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
                dots: false,
                responsive: {
                    768: {
                        nav: true,
                        dots: true
                    }
                }
            })
            .on('changed.owl.carousel', function (e) {
                if (!flag) {
                    flag = true
                    $owlThumbnail.find('.owl-item').removeClass('is-current')
                    $owlThumbnail.find('.owl-item').eq(e.item.index).addClass('is-current')
                    $owlThumbnail.trigger('to.owl.carousel', [e.item.index, duration, true])
                    flag = false
                }
            })
    }

    if ($owlThumbnail.length > 0) {
        $owlThumbnail
            .owlCarousel({
                items: 5,
                loop: false,
                center: false,
                margin: 10,
                autoWidth: false,
                rtl: false,
                responsive: {},
                responsiveBaseElement: window,
                lazyLoad: false,
                autoHeight: false,
                autoplay: false,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                nav: true,
                navText: '',
                navElement: 'button',
                navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
                dots: false,
                onInitialized: function (event) {
                    $(event.target).find('.owl-item').eq(0).addClass('is-current')
                }
            })
            .on('click', '.owl-item', function () {
                $owlThumbnail.find('.owl-item').removeClass('is-current')
                $(this).addClass('is-current')
                $owlLarge.trigger('to.owl.carousel', [$(this).index(), duration, true])
            })
            .on('changed.owl.carousel', function (e) {
                if (!flag) {
                    flag = true
                    $owlLarge.trigger('to.owl.carousel', [e.item.index, duration, true])
                    flag = false
                }
            })
    }

}

// **********************************************************************//
// ! Count up number
// **********************************************************************//
const counterUpNumber = function () {
    let $panelCounterRise = $('.plan-title span', '.panel-plan');
    if ($panelCounterRise.length > 0) {
        $panelCounterRise.counterUp({
            delay: 10,
            time: 1000
        });
    }
};

// **********************************************************************//
// ! Effect Text
// **********************************************************************//
const effectText = function () {
    const $elm = $('[data-parallax="true"]');
    if($elm.length > 0) {
        $elm.each(function () {
            var that = $(this);
            new Waypoint.Inview({
                element: that[0],
                enter: function (direction) {
                    that
                        .find('.mainvisual-heading').addClass('fadeInUp').end()
                        .find('.mainvisual-content').addClass('fadeInUp').end()
                        .find('.banner-heading').addClass('fadeInUp')
                },
                exited: function (direction) {
                    that
                        .find('.mainvisual-heading').removeClass('fadeInUp').end()
                        .find('.mainvisual-content').removeClass('fadeInUp').end()
                        .find('.banner-heading').removeClass('fadeInUp')
                }
            })
        })
    }
    

    // new Waypoint.Inview({
    //     element: $('.panel-banner')[0],
    //     enter: function (direction) {
    //         $('.panel-banner')
    //             .find('.banner-heading').addClass('fadeInUp')
    //     },
    //     exited: function (direction) {
    //         $('.panel-banner')
    //             .find('.banner-heading').removeClass('fadeInUp')
    //     }
    // })
}

// **********************************************************************//
// ! Window resize
// **********************************************************************//
$(window).on('resize', function () {
    checkResponsiveAside()
})

// **********************************************************************//
// ! DOM ready
// **********************************************************************//
$(document).ready(function () {
    owlCarousel()
    toggleMenuAside()
    isotopeLayout()
    owlSync()
    counterUpNumber()
    effectText()
})