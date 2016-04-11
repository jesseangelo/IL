var $ = require('jquery');

var multiSelects = [];

$( ".form-multi-select" ).each( function( index ) {

	var me = $(this);
	var tmp = ( function () {
		var selects = ["aaa", "aa1", "aa3"];
		var isOpen = false;
		var outsideClick = false;
		var label = me.find(".form-placeholder-label");
		var dropdown = me.find( ".form-multi-select-dropdown" );
		var selectsDiv = me.find(".multi-select-selects" );
		
		$(document).click(function(event) {
			outsideClick = true;
			var $k = $( event.target );
			var same = $($k)[0] == $(me)[0];

			if(isOpen && !same) { close() }
		});
		
		me.click( function( event ) {
			event.stopPropagation();
			var $k = $( event.target );
		 	var isCheckbox = $k.is( '.multi-select-checkbox' );

			if(isCheckbox) {
				//console.log("you clicked on a checkbox")
				var input = $k.find("input");
				var id = input.attr("id");

				//if it's in the selects remove
				if($.inArray( id, selects ) > -1) {
					var index = selects.indexOf(id);
					if (index > -1) {
					    selects.splice(index, 1);
					}
				} else {
					selects.push(id);
				}				
				render()
			} else {
				if(isOpen) {
					//close()
				} else {
					open()
				}
			}
		})

		var open = function() {
			isOpen = true;
			render();
		};
		var close = function() {
			isOpen = false;
			outsideClick = false;
			render();
		}

		function render() {
			var renderDropdown = function() { 
				if( isOpen ) {
					$(dropdown).addClass("open");
				} else {
					$(dropdown).removeClass("open");
				}
			}();

			var renderLabel = function() {
				if( !selects.length ) {
					label.removeClass( "form-placeholder-label-active" );
				} else {
					label.addClass( "form-placeholder-label-active" );
				}
			}();

			var renderChecks = function(id) {

				$(me).find(".multi-select-checkbox" ).each( function( index ) {
					var input = $(this).find("input");
					var id = input.attr("id");
					if($.inArray( id, selects ) > -1) {						
						input.prop("checked", true);					
					} else {
						input.prop("checked", false);
					}					
				});
			}();

			var renderPills = function() {
				$(selectsDiv).empty();
				for(var q = 0; q < selects.length; q++) {
					$(selectsDiv).append('<span>' + selects[q] + '&nbsp;</span>');
				}
			}();
		}

		$(document).ready( function() {
			init();
		})

		function init() {
			render()
		}

	})();

	multiSelects.push(tmp);
});
