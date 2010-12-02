/*
* Slider
* script est un mix entre deux sources principales : 
* http://jqueryfordesigners.com/coda-slider-effect/
* et
* http://jqueryfordesigners.com/jquery-infinite-carousel/
*/
(function($){
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
	
	
	
	
	
	
	
	
	
	
	
})(jQuery);


/*
 * In-Field Label jQuery Plugin
 * http://fuelyourcoding.com/scripts/infield.html
 *
 * Copyright (c) 2009 Doug Neiner
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.1
 */ 
(function($){
	
    $.InFieldLabels = function(label,field, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of each element
        base.$label = $(label);
        base.label = label;

 		base.$field = $(field);
		base.field = field;
        
		base.$label.data("InFieldLabels", base);
		base.showing = true;
        
        base.init = function(){
			// Merge supplied options with default options
            base.options = $.extend({},$.InFieldLabels.defaultOptions, options);

			// Check if the field is already filled in
			if(base.$field.val() != ""){
				base.$label.hide();
				base.showing = false;
			};
			
			base.$field.focus(function(){
				base.fadeOnFocus();
			}).blur(function(){
				base.checkForEmpty(true);
			}).bind('keydown.infieldlabel',function(e){
				// Use of a namespace (.infieldlabel) allows us to
				// unbind just this method later
				base.hideOnChange(e);
			}).change(function(e){
				base.checkForEmpty();
			}).bind('onPropertyChange', function(){
				base.checkForEmpty();
			});
        };

		// If the label is currently showing
		// then fade it down to the amount
		// specified in the settings
		base.fadeOnFocus = function(){
			if(base.showing){
				base.setOpacity(base.options.fadeOpacity);
			};
		};
		
		base.setOpacity = function(opacity){
			base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration);
			base.showing = (opacity > 0.0);
		};
		
		// Checks for empty as a fail safe
		// set blur to true when passing from
		// the blur event
		base.checkForEmpty = function(blur){
			if(base.$field.val() == ""){
				base.prepForShow();
				base.setOpacity( blur ? 1.0 : base.options.fadeOpacity );
			} else {
				base.setOpacity(0.0);
			};
		};
		
		base.prepForShow = function(e){
			if(!base.showing) {
				// Prepare for a animate in...
				base.$label.css({opacity: 0.0}).show();
				
				// Reattach the keydown event
				base.$field.bind('keydown.infieldlabel',function(e){
					base.hideOnChange(e);
				});
			};
		};

		base.hideOnChange = function(e){
			if(
				(e.keyCode == 16) || // Skip Shift
				(e.keyCode == 9) // Skip Tab
			  ) return; 
			
			if(base.showing){
				base.$label.hide();
				base.showing = false;
			};
			
			// Remove keydown event to save on CPU processing
			base.$field.unbind('keydown.infieldlabel');
		};
      
		// Run the initialization method
        base.init();
    };
	
    $.InFieldLabels.defaultOptions = {
        fadeOpacity: 0.5, // Once a field has focus, how transparent should the label be
		fadeDuration: 300 // How long should it take to animate from 1.0 opacity to the fadeOpacity
    };
	

    $.fn.inFieldLabels = function(options){
        return this.each(function(){
			// Find input or textarea based on for= attribute
			// The for attribute on the label must contain the ID
			// of the input or textarea element
			var for_attr = $(this).attr('for');
			if( !for_attr ) return; // Nothing to attach, since the for field wasn't used
			
			
			// Find the referenced input or textarea element
			var $field = $(
				"input#" + for_attr + "[type='text']," + 
				"input#" + for_attr + "[type='password']," + 
				"textarea#" + for_attr
				);
				
			if( $field.length == 0) return; // Again, nothing to attach
			
			// Only create object for input[text], input[password], or textarea
            (new $.InFieldLabels(this, $field[0], options));
        });
    };
	
})(jQuery);