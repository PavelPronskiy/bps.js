/*!
 * jQuery page scroller button
 *
 * Copyright by Pavel Pronskiy and jQuery Foundation
 * date: 14.08.2017
 * Version: 0.1
 *
 * Example:
 * jQuery(document).ready(function($){
 *		$('body').buttonPageScroller({
 *			distance: 200 //scrollPosition
 *		});
 * });
 */

(function ($, window, document) {
	$.fn.buttonPageScroller = function(options) {
		var tself = this;

		var defaults = {
			element: {
				button: 'button-page-scroller',
				body: this
			},
			trigger: false,
			distance: 100,
			animate: {
				speed: 500,
				scrollTop: 0
			},
			css: {
				button: {
					'position'		: 'fixed',
					'z-index'		: '20',
					'padding'		: '15px 10px 10px',
					'background'	: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGBAMAAACDAP+3AAAAKlBMVEX0I0gAAAD0I0j0I0j0I0j0I0j0I0j0I0j0I0j0I0j0I0j0I0j0I0j0I0h9jECpAAAADnRSTlNcAE0eCVYXKjgOSzcGO8jNecgAAAD+SURBVEjH7dbLaUJRFIXhhfFiXoOsSJ5kYCCEDCNYgGgDV7AAtQJtwQq0A+3AErQD7UiPjysiZ6+tQ/Eff7N9DnuDoXo/xXHJX4Whtekg1u/O1BDvZ2OKsCqvTdc0hWCKsCsTrAqTJ1gSJke8QtXGszTfqEqTx780N5hI84CSNDnsB87DnrLxA3FzWTVTbYYDSQp8k2ZMjpSZkVP1EEj5CxZcNTdJwtCLae4Y+jBNLxD7695z06dhHrfmyzBtbmtFyS13vUdNg1lpdOTMsoaffYmruZrzzemlUiSeXeDZKZ7d5Nlxnl3p2rl6dztvAH1L6JvEddvoG8l9a+mbbQnafym/8tJIQwAAAABJRU5ErkJggg==') no-repeat left top",
					'right' 		: '5%',
					'bottom'		: '5%',
					'width' 		: '62px',
					'height'		: '57px',
					'cursor'		: 'pointer',
					'display'		: 'none'
				}
			},
			mobile: true
		};

		options = $.extend(defaults, options);

		var constructor = {
			isMobile: function() {
				return (/Mobi/.test(w.navigator.userAgent))
					? true
					: false;
			},
			show: function() {
				if (options.trigger === false) {
					$('div#' + options.element.button).fadeIn(options.animate.speed);
					options.trigger = true;
				}
			},
			hide: function() {
				if (options.trigger === true) {
					$('div#' + options.element.button).fadeOut(options.animate.speed);
					options.trigger = false;
				}
			},
			initialize: function() {

/*				if (options.mobile === true && !constructor.isMobile())
					return false;
*/
				$('<div/>', {
					id: options.element.button,
					css: options.css.button
				}).appendTo(options.element.body);

				options.scrollTop = $(window).scrollTop();
				if (options.scrollTop >= options.distance)
					constructor.show();

				$(window).scroll(function () {
					options.scrollTop = $(this).scrollTop();
					if (options.scrollTop >= options.distance)
						return constructor.show();
					else 
						return constructor.hide();

				});

				$('div#' + options.element.button).on('touchstart click', function() {
					options.element.body.animate(options.animate, options.animate.speed);
					return false;
				});
			}
		};

		return constructor.initialize();
	};

})(jQuery, window, document);
