!(function (s) {
  "use strict";
  s(".skill-per").each(function () {
    var e = s(this),
      t = e.attr("id");
    e.css("width", t + "%"),
      s({ animatedValue: 0 }).animate(
        { animatedValue: t },
        {
          duration: 1e3,
          step: function () {
            e.attr("id", Math.floor(this.animatedValue) + "%");
          },
          complete: function () {
            e.attr("id", Math.floor(this.animatedValue) + "%");
          },
        }
      );
  }),
    s(window).on("scroll", function () {
      s(window).scrollTop() < 200
        ? s("#header-sticky").removeClass("sticky-menu")
        : s("#header-sticky").addClass("sticky-menu");
    }),
    s(".responsive").on("click", function (e) {
      s("#mobile-menu").slideToggle();
    }),
    s("#mobile-menu").meanmenu({
      meanMenuContainer: ".mobile-menu",
      meanScreenWidth: "992",
    }),
    s(".info-bar").on("click", function () {
      s(".extra-info").addClass("info-open");
    }),
    s(".close-icon").on("click", function () {
      s(".extra-info").removeClass("info-open");
    }),
    s(".menu-tigger").on("click", function () {
      return s(".offcanvas-menu,.offcanvas-overly").addClass("active"), !1;
    }),
    s(".menu-close,.offcanvas-overly").on("click", function () {
      s(".offcanvas-menu,.offcanvas-overly").removeClass("active");
    }),
    s(".main-menu li a").on("click", function () {
      s(window).width() < 700 && s("#mobile-menu").slideUp();
    }),
    s(function () {
      s("a.smoth-scroll").on("click", function (e) {
        var t = s(this);
        s("html, body")
          .stop()
          .animate({ scrollTop: s(t.attr("href")).offset().top - 100 }, 1e3),
          e.preventDefault();
      });
    }),
    (function () {
      var e = s(".slider-active");
      function t(e) {
        e.each(function () {
          var e = s(this),
            t = e.data("delay"),
            i = "animated " + e.data("animation");
          e.css({ "animation-delay": t, "-webkit-animation-delay": t }),
            e
              .addClass(i)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  e.removeClass(i);
                }
              );
        });
      }
      e.on("init", function (e, i) {
        t(s(".single-slider:first-child").find("[data-animation]"));
      }),
        e.on("beforeChange", function (e, i, o, n) {
          t(
            s('.single-slider[data-slick-index="' + n + '"]').find(
              "[data-animation]"
            )
          );
        }),
        e.slick({
          autoplay: !0,
          autoplaySpeed: 1e4,
          dots: !1,
          fade: !0,
          arrows: !0,
          prevArrow:
            '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
          responsive: [
            { breakpoint: 1200, settings: { dots: !1, arrows: !1 } },
          ],
        });
    })(),
    s(".services-active").slick({
      dots: !0,
      infinite: !0,
      arrows: !1,
      speed: 1e3,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".team-active").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      speed: 1e3,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".class-active").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
      speed: 1e3,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".portfolio-active").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
      speed: 1e3,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".brand-active").slick({
      dots: !1,
      infinite: !0,
      autoplay: !0,
      autoplaySpeed: 1500,
      arrows: !1,
      speed: 1e3,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1500,
          settings: { slidesToShow: 4, slidesToScroll: 3, infinite: !0 },
        },
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3, slidesToScroll: 3, infinite: !0 },
        },
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".testimonial-active").slick({
      dots: !0,
      infinite: !0,
      arrows: !1,
      speed: 1e3,
      slidesToShow: 3,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".testimonial-active2").slick({
      dots: !0,
      arrows: !1,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
      speed: 1e3,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: !1,
      fade: !0,
      asNavFor: ".slider-nav",
    }),
    s(".slider-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: !1,
      arrows: !0,
      centerMode: !0,
      focusOnSelect: !0,
      variableWidth: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    }),
    s(".home-blog-active").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      speed: 1e3,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".home-blog-active2").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      speed: 1e3,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0,
          },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
    s(".blog-active").slick({
      dots: !1,
      infinite: !0,
      arrows: !0,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    }),
    s(".count").counterUp({ delay: 100, time: 1e3 }),
    s(".popup-image").magnificPopup({
      type: "image",
      gallery: { enabled: !0 },
    }),
    s(".popup-video").magnificPopup({ type: "iframe" }),
    s(".paroller").length && s(".paroller").paroller(),
    (function () {
      if (s("#parallax").length) {
        var e = document.getElementById("parallax");
        new Parallax(e);
      }
    })(),
    s(".s-single-services").on("mouseenter", function () {
      s(this)
        .addClass("active")
        .parent()
        .siblings()
        .find(".s-single-services")
        .removeClass("active");
    }),
    s.scrollUp({
      scrollName: "scrollUp",
      topDistance: "300",
      topSpeed: 300,
      animation: "fade",
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: '<i class="fas fa-level-up-alt"></i>',
      activeOverlay: !1,
    }),
    s(".grid").imagesLoaded(function () {
      var e = s(".grid").isotope({
        itemSelector: ".grid-item",
        percentPosition: !0,
        masonry: { columnWidth: 1 },
      });
      s(".button-group").on("click", "button", function () {
        var t = s(this).attr("data-filter");
        e.isotope({ filter: t });
      });
    }),
    s(".element").each(function () {
      var e = s(this);
      e.typed({
        strings: e.attr("data-elements").split(","),
        typeSpeed: 100,
        backDelay: 3e3,
      });
    }),
    s(".button-group > button").on("click", function (e) {
      s(this).siblings(".active").removeClass("active"),
        s(this).addClass("active"),
        e.preventDefault();
    }),
    new WOW().init(),
    s(".tabs-box").length &&
      s(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
        e.preventDefault();
        var t = s(s(this).attr("data-tab"));
        if (s(t).is(":visible")) return !1;
        t
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn"),
          s(this).addClass("active-btn"),
          t.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0),
          t
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab animated fadeIn"),
          s(t).fadeIn(300),
          s(t).addClass("active-tab animated fadeIn");
      });
})(jQuery);
