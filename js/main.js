$(function() { ({

	resultFilter: {},

	init: function() {

		var me = this;

		var isHomepage = false;
		if ($('body').hasClass('home')) isHomepage = true;


		$('.article-list').isotope({ layoutMode: 'packery' });

		// Filter results
		$('[data-role="filter-list"]').click(function(ev) {
			ev.preventDefault();

			var filter = $(this).attr('data-filter');
			var filterType = $(this).attr('data-filter-type');

			var disable = $(this).hasClass('active');

			// Mark all links as inactive
			$(this).closest('ul').find('[data-role="filter-list"]').removeClass('active');

			// If already active, disable filter
			if (disable) {
				me.resultFilter[filterType] = null;
			} else {
				me.resultFilter[filterType] = filter;
				$(this).addClass('active');
			}

			me.filterResults();
		});

		$('[data-role="filter-list"]:first').click();



		// Mobile navigation toggle
		$('[data-role="mobile-nav-toggle"]').click(function(ev) {
			ev.preventDefault();
			$('body').toggleClass('mobile-nav-open');
		});

		// Mobile navigation: click on the content leaves the navigation
		/*$('#website-container').click(function(ev) {
			//ev.preventDefault();
			console.log(ev.target);
			if ($(ev.target).is('#website-container')) $('body').removeClass('mobile-nav-open');
		});*/

		// Desktop navigation: show more toggle
		var originalMoreLabel = $('.show-more a').text();
		$('.show-more').click(function(ev) {
			ev.preventDefault();

			$(this).parent().find('.more').slideToggle();

			$(this).find('a').text($(this).text() == originalMoreLabel ? 'Show less' : originalMoreLabel);
		});



	},

	filterResults: function() {

		var filters = [];

		for (var filter in this.resultFilter) {
			v = this.resultFilter[filter];
			if (v) filters.push('.' + filter + '-' + v);
			console.log(filter + ' = ' + v);
		}

		console.log(filters.join(' '));

		$('.article-list').isotope({ filter: filters.join(''), layoutMode: 'packery' });

	}

}).init(); });




