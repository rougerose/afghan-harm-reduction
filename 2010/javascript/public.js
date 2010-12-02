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


$(".article .texte").each(function(){
	$("p").slice(3).wrapAll('<div class="more" />').parent("div.more").hide();
	$("p:visible:last").append(' <a href="#" class="read-more">MORE</a>');
	$(".read-more").click(function(){
		$(this).hide().parent().next().slideDown("slow");
		return false;
	});
});


});
