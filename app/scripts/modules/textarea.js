var inherits = require('inherits');
var highlight = require('./form-input-highlight');
var placeholder = require('./form-input-placeholder');

var textAreas = [];

$( ".form-input" ).each( function( index ) {
	var me = $(this);	
	var isTA = me.find("textarea").length;
	
	if( !isTA ) { return; }

	var $ta = me.find( ".form-textarea" );
	var $label = me.find( "label" );
	var $scrollbarClass = me.find('.textarea-scrollbar');
	var tmp = ( function () {		

		me.click( function ( event ) {
			$ta.addClass( "form-textarea-active" );
			me.focus();
			$scrollbarClass.scrollbar();
		});

		return {
			reset: function() {
				$val = $ta.val();
				$ta.removeClass( "form-textarea-active" );		
				$scrollbarClass.scrollbar( "destroy" );

				if( $val != "" ) {
					me.addClass("form-textarea-has-content");
					$label.addClass("form-placeholder-label-active");				
				} else {
					me.removeClass("form-textarea-has-content");
					$label.removeClass("form-placeholder-label-active");
				}
			}
		}
	})();

	textAreas.push( tmp );
});

function resetAllTextareas() {
	for(var k = 0; k < textAreas.length; k++) {
		textAreas[k].reset()
	}
}

$(document).click( function( event ) {
	resetAllTextareas();
});
