(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var h = require('./modules/myModule');

h.helloWorld();

$(document).ready(function () {
	$(".form-multi-select-dropdown").hide();
	//have to calc the placeholder stuff here

	//$('.scrollbar').mCustomScrollbar();

	$(".browse").click( function() {
		$(".box__file").click();
	});

	//file upload stuff
	var droppedFiles = false;
	var $form = $("body");
	var $input    = $form.find('input[type="file"]'),
    	$label    = $form.find('label'),
    	showFiles = function(files) {
      		//$label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
    	};

	$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	})
	.on('dragover dragenter', function() {
		$form.addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
		$form.removeClass('is-dragover');
	})
	.on('drop', function(e) {
	  droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
	  showFiles( droppedFiles );

	});

	$input.on('change', function(e) {
	  showFiles(e.target.files);
	});

	$form.on('submit', function(e) {
	  if ($form.hasClass('is-uploading')) return false;

	  $form.addClass('is-uploading').removeClass('is-error');

	  if (isAdvancedUpload) {
	    // ajax for modern browsers
	  } else {
	    // ajax for legacy browsers
	  }
	});
	//end file upload stuff
});


var resetFocus = function(target) {

	$( ".form-input" ).each( function( index ) {
		var $inputWrapper = $( this );
		var $label = $inputWrapper.find( "label" );
		var $val;
		var k = $(this)[0];
		console.log( "this? " + k + " / " + target )
		
		if( $inputWrapper.find( ".form-text-input" ).length == 1 ) {
			
			$val = $inputWrapper.find( ".form-text-input" ).val();
			$inputWrapper.removeClass( "form-input-active" );
					
			if( $val != "" ) {
				$label.addClass( "form-placeholder-label-active" );		
			} else {
				$label.removeClass( "form-placeholder-label-active" );
			}

		//TEXTAREA
		} else if( $inputWrapper.find( ".form-textarea" ).length == 1) {
			
			$val = $inputWrapper.find( ".form-textarea" ).val();
			$inputWrapper.find( ".form-textarea" ).removeClass( "form-textarea-active" );
			$inputWrapper.removeClass( "form-input-active" );		

			if( $val != "" ) {		
				$label.addClass( "form-placeholder-label-active");
				$inputWrapper.addClass("form-textarea-has-content");		
			} else {
				$inputWrapper.removeClass("form-textarea-has-content");
				$label.removeClass( "form-placeholder-label-active");
			}

		} 
	});
};

$(document).click(function(event) {

	//MULTI SELECT
	if( !$( event.target ).closest( '.form-multi-select' ).length &&
       !$( event.target ).is( '.form-multi-select' )) {
        if($( '.form-multi-select-dropdown' ).hasClass( "open" )) {
            $( '.form-multi-select-dropdown' ).removeClass( "open" )
        }
    }

    //reset ALL
    //resetFocus(event.target);
   	$( ".form-input" ).each( function( index ) {
		var $inputWrapper = $( this );
		var $label = $inputWrapper.find( "label" );
		var $val;
		
		//TEXT INPUT
		if( $inputWrapper.find( ".form-text-input" ).length == 1 ) {
			
			$val = $inputWrapper.find( ".form-text-input" ).val();
			$inputWrapper.removeClass( "form-input-active" );
			//placeholder
			if( $val != "" ) {
				$label.addClass( "form-placeholder-label-active" );		
			} else {
				$label.removeClass( "form-placeholder-label-active" );
			}

		//TEXTAREA
		} else if( $inputWrapper.find( ".form-textarea" ).length == 1) {
			
			$val = $inputWrapper.find( ".form-textarea" ).val();
			$inputWrapper.find( ".form-textarea" ).removeClass( "form-textarea-active" );
			$inputWrapper.removeClass( "form-input-active" );		

			if( $val != "" ) {		
				$label.addClass( "form-placeholder-label-active");
				$inputWrapper.addClass("form-textarea-has-content");		
			} else {
				$inputWrapper.removeClass("form-textarea-has-content");
				$label.removeClass( "form-placeholder-label-active");
			}

		} 
	});

    ///// END RESET
    var myTarget = event.target;
   	if( $(event.target).is('.form-text-input') ) {
	    myTarget = $( event.target ).parent();
	    console.log(myTarget)
   	}

    //SET HIGHLIGHT to inactive
    if( $(myTarget).is('.form-input') ) {
    	var $inputWrapper = $(myTarget);
    	var $label = $inputWrapper.find( "label" );

		//first, exclude checkbox
		if( $inputWrapper.find( ".form-checkbox" ).length != 1) {

			$label.addClass( "form-placeholder-label-active" );
			$inputWrapper.addClass( "form-input-active" );
			
			//TEXT INPUT
			if($inputWrapper.find( ".form-text-input" ).length === 1) {	
				//make active				
				$inputWrapper.find( ".form-text-input" ).focus();
			}

			//TEXTAREA
			if($inputWrapper.find( ".form-textarea" ).length === 1) {
				//console.log("textarea")
				//if it's a text area
				$inputWrapper.find( "textarea" ).addClass( "form-textarea-active" );
				$inputWrapper.find( "textarea" ).focus();
			}
		}
    } else {
    	
    }
});

$(".form-multi-select").click(function() {
	clickHandler( $(".form-multi-select") );
});

var clickHandler = function(target) {
	$(target).find(".form-multi-select-dropdown").toggleClass("open");
	resetFocus();
}


},{"./modules/myModule":2}],2:[function(require,module,exports){
'use strict';

exports.helloWorld = function() {
	console.log( "Hello world" );
};
},{}]},{},[1]);
