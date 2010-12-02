$(document).ready(function(){
	
	/*
	 * Grille de mise en page ajoutée aux boutons d'administration de spip
	 */	
		$("#spip-admin").append("<a id='grille' class='spip-admin-boutons' href='#'>Grille</a>");
		$("#grille").click(function(){
			$("#page").toggleClass("grille");
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


	$(".article .texte").each(function(){
		$("> p",this).slice(2).wrapAll('<div class="more" />').parent("div.more").hide();
		$(".ps,.notes").appendTo(".more");
		$("> p:visible:last",this).append(' <a href="#" class="read-more">MORE</a>');
		$(".read-more").click(function(){
			$(this).hide().parent().next().slideDown("slow");
			return false;
		});
	});
	
	
	$("p.website-info").delay(4000).fadeOut("slow");


});
