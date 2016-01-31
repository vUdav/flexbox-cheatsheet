$(document).ready(function() {
	// pulse code block then hover on value shorthand properties
	$('.code-container__element a').hover(function(){
		var propertyId = $(this).attr('href');
		$(propertyId).toggleClass('code-container__element--pulse');
	});
});