var inputs = [];

$(".form-input").each( function( index ) {
	var me = $(this);
	var label = me.find( "label" );
	var val;
	//exclude
	var isMS = me.find(".multi-select-checkbox").length;
	var isCB = me.find("input[type=checkbox]").length;
	var isTA = me.find("textarea").length;
	var isTI = me.find("input[type=text]").length;
	
	if( isMS || isCB ) { return; }

	var tmp = ( function () {
		me.click( function( event ) {
			event.stopPropagation();
			resetAllPlaceholders()
			//me.addClass("form-input-active");
			label.addClass("form-placeholder-label-active");
		});

		return {
			reset: function() {
				
				if(isTA) {
					val = me.find("textarea").val()
				} else if( isTI ) {
					val = me.find("input[type=text]").val();
				}

				if( val == "" ) {
					label.removeClass("form-placeholder-label-active");
				}
			},

			init: function() {
				if(isTA) {
					val = me.find("textarea").val()
				} else if( isTI ) {
					val = me.find("input[type=text]").val();
				}

				if( val != "" ) {
					label.addClass("form-placeholder-label-active");
				}
			}()
		}
	})();		

	inputs.push(tmp);
});

function resetAllPlaceholders() {
	for(var k = 0; k < inputs.length; k++) {
		inputs[k].reset()
	}
}

$(document).click(function(event) {
	resetAllPlaceholders();
});
