var App = {
	init: function() {

		$(document).foundation();

		this.collapseFilter();				// Collapse / Expand advanced filters section
		this.equalHeights();				// Equal height to divs
		this.genericCollapse();				// Generic collapse/expand function
		this.noUiSlider();					// noUiSlider init
		this.slider();						// Gallery slider init
		this.stylishSelect();				// Stylish select init
		this.noUISliderToSSelect();			// noUiSlider slider to Stylish select
		this.modal();						// Modal script
		this.removePhoto();					// remove uploaded photo
	},

	// Collapse advanced filters section
	collapseFilter: function(){
		if($('.filter form').length){
			var base = $('.filter form'),
				btn = $('#advanced'),
				section = $('#advanced-filter');

			btn.on('click', function(e){
				e.preventDefault();
				$(this).toggleClass('active')
				section.slideToggle('250');

				$(this).text(function(i, text){
					return text === "wyszukiwanie zaawansowane" ? "ukryj kryteria wyszukiwania" : "wyszukiwanie zaawansowane";
				});
			});
		}
	},

	// Equal heights divs
	equalHeights: function(){
		equalheight = function(container){

			var currentTallest = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0;
			$(container).each(function() {

				$el = $(this);
				$($el).height('auto')
				topPostion = $el.position().top;

				if (currentRowStart != topPostion) {
					for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
						rowDivs[currentDiv].height(currentTallest);
					}
					rowDivs.length = 0; // empty the array
					currentRowStart = topPostion;
					currentTallest = $el.height();
					rowDivs.push($el);
				} else {
					rowDivs.push($el);
					currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}

				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
			});
		}

		$(window).load(function() {
			equalheight('.equal');
		});


		$(window).resize(function(){
			equalheight('.equal');
		});
	},

	// Collapse section
	genericCollapse: function(){
		var root = $('.collapsable'),
			trigger = root.find('.trigger');

		trigger.on('click', function(e){

			var section = $(this).closest(root).find('.section-to-collapse');

			e.preventDefault();

			$(this).text(function(i, text){
				return text === "rozwiń" ? "zwiń" : "rozwiń";
			});

			if(section.length){
				$(this).toggleClass('collapsed')
				section.stop().slideToggle().toggleClass('collapsed');
			} else {
				console.log('here');
				$(this).closest(root).stop().slideUp().toggleClass('hidden');
			}
		});
	},


	// noUiSlider
	noUiSlider: function(){
		// Range slider init
		var base = $('.range-slider');

		base.noUiSlider({
			start: [ 0 ],
			animate: true,
			step: 5,
			range: {
				'min': 0,
				'max': 100
			},
			format: wNumb({
				decimals: 0,
				postfix: '%',
			})
		}).Link('lower').to('-inline-');


		// Set value according to "data-range"
		setTimeout(function() {
			base.each(function(index, value){
				var curVal = $(this).attr('data-range');
				if(curVal !== 'undefined'){
					$(this).val(curVal);
				}
			});
		}, 300);
	},


	// Slider init function
	slider: function(){

		if($('.slider').length){

			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.slider-nav'
			});

			$('.slider-nav').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: false,
				arrows: false,
				centerMode: true,
				focusOnSelect: true
			});
		}
	},


	// Stylish select
	stylishSelect: function(){

		if($('select.rating').length){
			$('select.rating').sSelect({ddMaxHeight: '248px'});			
		}
	},


	// noUiSlider slider to Stylish select
	noUISliderToSSelect: function(){

		if($('.rating-group').length){

			var item = $('.single-rating-wrap'),
				i = 1;

			item.each(function() {
				$(this).append('<select id="select-term-'+ i +'" class="rating" name="rating">')
				i++;
			});


			for (var el = 0; el <= 100; el=el+5) {
				$('select.rating').append('<option value="'+ el +'">'+ el +' %</option>');
			}

			App.stylishSelect();
		}
	},


	modal: function(){

		if($('a[data-modal]').length){
			
			$("body").append("<div class='modal-overlay'></div>");
			$(".modal-box header").append("<a href='#' class='modal-close'>×</a>");

			$('a[data-modal]').click(function(e) {
				e.preventDefault();
				var modalBox = $(this).attr('data-modal');
				$('.modal-overlay, #'+ modalBox).addClass('active');
			});
		  
			$(".modal-close").click(function(e) {
				e.preventDefault();
				$(".modal-box, .modal-overlay").removeClass('active');			 
			});
		}
	},


	removePhoto: function(){

		if($('.uploaded-photos').length){
			
			$('.uploaded-photos a.remove').on('click', function(){
				$(this).parent('li').fadeOut();
				return false;
			});
		}
	}
};


$(function(){
	App.init();
});
