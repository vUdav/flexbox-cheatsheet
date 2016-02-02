$(document).ready(function() {
	// pulse code block then hover on value shorthand properties
	$('.code-container__element a').hover(function(){
		var propertyId = $(this).attr('href');
		$(propertyId).toggleClass('code-container__element--pulse');
	});

	// copy to clipboard property and value then click on value
	var clipboard = new Clipboard('.code-container__element-value');
	clipboard.on('success', function(e) {
		$('#copy-notify').html('<strong>'+e.text+'</strong><br>is copied!');
		$('#copy-notify').addClass('copy-notify--success');
		setTimeout(function(){$('#copy-notify').removeClass('copy-notify--success')}, 3000);
		e.clearSelection();
	});
});