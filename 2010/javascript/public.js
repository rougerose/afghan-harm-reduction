$(document).ready(function(){

	/*
	 * Grille de mise en page ajoutée aux boutons d'administration de spip
	 */
		$("#spip-admin").append("<a id='grille' class='spip-admin-boutons' href='#'>Grille</a>");
		$("#grille").click(function(){
			$(".grid_16,#contenu").toggleClass("grille");
		});

	$("#barreNav").superfish({
		animation:   {opacity:'show',height:'show'},
		autoArrows: false
	});


	/*
	 * Slider (cf. plugins.js)
	 */
	$(".slider").slider();

	/*
	 * In-fields label (cf. plugins.js)
	 */
	$("label").inFieldLabels();

	$(".formulaire_spip.ajax").ajaxComplete(function(){
		$("label").inFieldLabels();
		$("li.erreur").inFieldLabels();
	});


	/*
	 * Afficher/masquer une partie d'un texte.
	 * Bricolage qui tiendra pour le site tant qu'il n'a qu'une seule page
	 */
/*	$(".article .texte").each(function(){
		$("> p",this).slice(2).wrapAll('<div class="more" />').parent("div.more").hide();
		$(".ps,.notes").appendTo(".more");
		$("> p:visible:last",this).append(' <a href="#" class="read-more">MORE</a>');
		$(".read-more").click(function(){
			$(this).hide().parent().next().slideDown("slow");
			return false;
		});
	});
*/
	/*
	 * Afficher/masquer l'info "website under construction"
	 */
//	$("p.website-info").delay(8000).fadeOut("slow");


	$("a.icone-lien").append('<span class="icone-loupe"></span>').children("span").css({ 'opacity':0 });
	$("a.icone-lien").hover(
		function(){
			$(this).children("span.icone-loupe").stop().show().animate({
				opacity: 1
			},500);
		},
		function(){
			$(this).children("span.icone-loupe").stop().animate({
				opacity: 0
			}, 500);
		});


	/**
	 *	Plugin Mediabox (colorbox) installé via Spip
	 *	pour afficher titre et descriptif de l'image
	 */
	$("a.mediabox").colorbox({
		title: function(){
			// différentes hypothèses :
			// - ou bien l'image vient d'un modèle image ou img,
			// - ou bien d'un modèle doc,
			// - ou bien encore vient du slider (forme utilisée pour le slider mais aussi par inclure/documents.html)

			// Attention : dans l'immédiat, seule la 3è possibilité est en œuvre

			if ($(this).hasClass("modeleImg")) {
				var description = $(this).children("img[title]");
				var titre = description.attr("title");

				// l'image a un descriptif (précédé de *) ?
				if (titre.match(/\*/)) {
					titre = titre.match(/^(.+)\*(.+)$/);
					return '<h3>' + titre[1] + '</h3>' + '<p>' + titre[2] + '</p>';
				} else {
					// on ne prend que le titre + [date]
					titre = titre.match(/^(.+)(\[.+\])$/);
					return '<h3>' + titre[1] + '</h3>' + '<p>' + titre[2] + '</p>';
				}
			}
			else  if ($(this).hasClass("modeleDoc")) {
				var titre = $(this).parent().parent("dl").children("dd.spip_doc_titre");
				var description = titre.next("dd.spip_doc_descriptif");
				titre = titre.html(); description = description.html();

				// au cas où le titre ou descriptif serait vide
				if (titre == null) { titre = ''; }
				if (description == null) { description = ''; }
				return titre + description;
			}
			else if ($(this).hasClass("sliderImg")) {
				var titre = $(this).next(".imageLegend").html();
				if (titre == null) { titre = ''; }
				return titre;
			}
		}
	});
});
