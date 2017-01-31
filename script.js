$(document).ready(function(){
	
	$('.panes-container').on('click', '.btn-focus', function() {
		
		var $pane = $(this).closest('.pane');
		var $panesContainer = $pane.closest('.panes-container');
		var $allPanes = $panesContainer.find('.pane');

		if ($panesContainer.hasClass('expanded') && $pane.hasClass('primary')) {
			
			$pane.removeClass('primary');
			$panesContainer.removeClass('expanded');
		
		} else {
			$allPanes.removeClass('primary');
			$pane.addClass('primary');
			$panesContainer.addClass('expanded');
		
		}
		
	});

	$('.panes-container').on('click', '.btn-close', function() {
		var $pane = $(this).closest('.pane');
		$pane.hide();
	});
});
