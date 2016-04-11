//var overflows = [];
//var not = [".multi-select-checkbox"]

$(".form-input").each( function( index ) {
	var me = $(this);
	var label = me.find( "label" );
	var input = me.find( "input" );
	//exclude
	var isMS = me.find(".multi-select-checkbox").length;
	var isCB = me.find("input[type=checkbox]").length;
	
	//don't do it on these fields
	if( isMS || isCB ) { return; }
	/////////////////////////////////

	var tmpObj = ( function () {
		me.on("mouseover", function() {
			$(".data").popover("show");
		});

		me.on("mouseout", function() {
			$(".data").popover("hide");
		});

		input.keypress( function( event ) {			
			
			var visibleWidth = me.width();
		    var inputWidth = input[0].scrollWidth;
		   //console.log("widths: " + visibleWidth + " iwL : " + inputWidth);
		
		    if( inputWidth >= visibleWidth ) {
		    	val = input.val();
		    	l = label.text();
		    	console.log(l)

		    	if( me.find(".data").length == 1 ) {
		    		me.find(".data").attr("title", val);
		    	} else {
		    		me.append('<div class="data" data-toggle="popover"' +
		    	 			'data-placement="bottom"' +
		    	 			'title="' + l +
		    	 			'" data-content="' + val + '"></div>');
		    		$(".data").popover();
		    	}
		    } else {
		    	$(".data").remove();
		    }
		});

		return {
			reset: function() {
			}
		}
	})();

	//overflows.push(tmpObj);
});

