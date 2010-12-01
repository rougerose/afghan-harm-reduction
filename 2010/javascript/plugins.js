/*
* Slider
* script est un mix entre deux sources principales : 
* http://jqueryfordesigners.com/coda-slider-effect/
* et
* http://jqueryfordesigners.com/jquery-infinite-carousel/
*/

$.fn.slider = function () {
	return this.each(function(){
		var $scroll = $("> div", this),
			$conteneur = $scroll.find('> ul'),
			$items = $conteneur.find('> li'),
			pages = $items.length,
			pageCourante = 1,
			pageLargeur = $items.outerWidth(),
			pageHauteur = $items.eq((pageCourante - 1)).outerHeight(),
			horizontal = true,
			boutonHauteur = 60;
			
		// pas de barre défilement sur le div.scroll
		$scroll.css({ 'overflow': 'hidden' });

		// défilement horizontal du slider
		if (horizontal) {
			$items.css({ 'float': 'left', 'position': 'relative' });
			$conteneur.css('width', pageLargeur * pages );
		}

		// boutons de navigation gauche et droite
		// et application de la hauteur du premier panneau
		$scroll
			.before('<span id="sBg" class="scrollBouton gauche">&nbsp;</span>')
			.after('<span id="sBd" class="scrollBouton droite">&nbsp;</span>')
			.css({ height: pageHauteur });

		// ajustement du positionnement en hauteur des boutons de navigation
		$("span.scrollBouton").css({ top: Math.round((pageHauteur - boutonHauteur)/2) });

		$('span.scrollBouton.gauche', this).click(function () {
			return gotoPage(pageCourante - 1);
		});
		$('span.scrollBouton.droite', this).click(function () {
			return gotoPage(pageCourante + 1);
		});

		function gotoPage(page) {
			var dir = page < pageCourante ? -1 : 1,
				n = Math.abs(pageCourante - page),
				left = pageLargeur * dir * n;

			if (page < 1) {
				left = Math.abs(left * pages);
				page = pages;
			} else if (page > pages) {
				left = - (pageLargeur * pages);
				page = 1;
			}
			pageCourante = page;
			
			// modification de la hauteur du scroll en fonction de celle du panneau affiché
			var hauteur = $items.eq(pageCourante-1).outerHeight();
			
			$scroll.animate({
				scrollLeft: '+=' + left,
				height: hauteur
			},500);
		}

	});
}

/*
$("#slider").each(function(){
	var $slider = $(this),
		$scroll = $(".scroll"),
		conteneur = $(""),
		panneaux = $(""),
		pages = panneaux.length,
		pageCourante = 1,
		panneauLargeur = panneaux.outerWidth(),
		horizontal = true,
		delai = 700;

	// pas de barre défilement sur le div.scroll
	scroll.css("overflow","hidden");


	// défilement horizontal du slider
	if (horizontal) {
		panneaux.css({ 'float': 'left', 'position' : 'relative' });
		conteneur.css('width', panneauLargeur * pages);
	}

	// hauteur du premier panneau
	var panneauHauteur = panneaux.eq((pageCourante - 1)).outerHeight();

	// boutons de navigation gauche et droite
	// et application de la hauteur du premier panneau
	scroll
		.before('<span id="sbg" class="scrollBouton gauche">&nbsp;</span>')
		.after('<span id="sbd" class="scrollBouton droite">&nbsp;</span>')
		.css({ height:panneauHauteur });

	// ajustement du positionnement en hauteur des boutons de navigation
	$("span.scrollBouton").css({ top: Math.round(panneauHauteur/2) })

	// navigation via les boutons
	$('span.scrollBouton.gauche', this).click(function () {
		return gotoPage(pageCourante - 1);
	});
	$('span.scrollBouton.droite', this).click(function () {
		return gotoPage(pageCourante + 1);
	});

	function gotoPage(page) {
		var dir = page < pageCourante ? -1 : 1,
			n = Math.abs(pageCourante - page),
			left = panneauLargeur * dir * n;

		if (page < 1) {
			left = Math.abs(left*pages);
			page = pages;
		} else if (page > pages) {
			left = - (panneauLargeur * pages);
			page = 1;
		}

		pageCourante = page;

		// modification de la hauteur du scroll en fonction de celle du panneau affiché
		var hauteur = panneaux.eq(pageCourante-1).outerHeight();

		scroll.animate({
			scrollLeft: '+=' + left,
			height: hauteur
		},delai);
	}

	$("#slider .navigation a").each(function (a) {
		$(this).bind("click",function(){
			gotoPage(a + 1);
		});
	});

	// l'url comporte un hash, on affiche l'œuvre directement
	if (window.location.hash) {
		var afficher = '[hash=' + window.location.hash + ']';
		$("#slider .navigation a").filter(afficher).click();
	}
});
*/