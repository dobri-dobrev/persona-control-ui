$( document ).ready(function() {
  $('#start-ad-button').click(function(event){
  	event.preventDefault();
  	var jqxhr = $.get( "/startAd")
	  .done(function() {
	    console.log('started Ad')
	  })
	  .fail(function() {
	    alert( "error" );
	  });
  });
  $('#stop-ad-button').click(function(event){
  	event.preventDefault();
  	var jqxhr = $.get( "/endAd")
	  .done(function() {
	    console.log('stopped Ad')
	  })
	  .fail(function() {
	    alert( "error" );
	  });
  });
  $('#start-enoder-button').click(function(event){
  	event.preventDefault();
  	var jqxhr = $.get( "/startEncoder")
	  .done(function() {
	    console.log('started encoder')
	  })
	  .fail(function() {
	    alert( "error" );
	  });
  });
  $('#stop-encoder-button').click(function(event){
  	event.preventDefault();
  	var jqxhr = $.get( "/stopEncoder")
	  .done(function() {
	    console.log('stopped encoder')
	  })
	  .fail(function() {
	    alert( "error" );
	  });
  });
});