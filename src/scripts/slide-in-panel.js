jQuery(document).ready(function($){
	//open the lateral panel
	$('.cd-btn').on('click', function(event){
		event.preventDefault();
		$('.cd-panel').addClass('is-visible');
    $('body').addClass('stop-scrolling')
	});
	//clode the lateral panel
	$('.cd-panel').on('click', function(event){
		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') || $(event.target).is('#close') ) { 
			$('.cd-panel').removeClass('is-visible');
			event.preventDefault();
      $('body').removeClass('stop-scrolling')
		}
	});
});