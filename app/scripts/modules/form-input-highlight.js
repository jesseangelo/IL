var inputs = [];
//var not = [".multi-select-checkbox"]

$(".form-input").each( function( index ) {
	var me = $(this);
	var label = me.find( "label" );
	var type;
	var val;
	//exclude
	var isMS = me.find(".multi-select-checkbox").length;
	var isCB = me.find("input[type=checkbox]").length;
	
	//don't highlight on these fields
	if( isMS || isCB ) { return; }
	/////////////////////////////////

	var tmpObj = ( function () {
		me.click( function( event ) {
			event.stopPropagation();
			resetAll();
			me.addClass("form-input-active");
			me.find( "input" ).focus();
		});

		return {
			reset: function() {
				me.removeClass("form-input-active");
			}
		}
	})();

	inputs.push(tmpObj);
});

function resetAll() {
	for(var k = 0; k < inputs.length; k++) {
		inputs[k].reset()
	}
}

$(document).click(function(event) {
	resetAll()
});
