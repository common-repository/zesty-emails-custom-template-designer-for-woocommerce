<?php

	/********* EXPORT JSON FILE FOR DOWNLOAD **********/

	add_action('admin_footer', 'zbldr_ajax_admin_export_script_to_footer');

	function zbldr_ajax_admin_export_script_to_footer(){ ?>

		<script>

			// export page JSON to file
			jQuery(document).ready(function($){
			    $('.zbldr-export-json').click(function(){

			    	zbldrPopulateEmptyElements(); // adds an empty array to empty elements so JSON an save properly

			        var ajaxData = {
			            'type'      	: 'POST',
			            'action'    	: 'zbldr_export_json',
			            'content'     	: zbldrPage,
			            'templateName'  : <?php echo !empty( $_GET['zefw_email_page'] ) ? '"' . esc_attr( $_GET['zefw_email_page'] ) . '"' : 'null'; ?>,
			            'exportDir'		: zbldrData.exportDir,
			        };

			        $.post(ajaxurl, ajaxData, function(response) {

			        	var modal = new bootstrap.Modal(document.getElementById('zbldr-modal'), {});
			        	modal.show();

			        	$('#zbldr-hidden-export-download-button').attr('href', response);
			        	$('.zbldr-modal-content').hide();
			        	$('.zbldr-modal-dialog').removeClass('modal-sm modal-md modal-lg modal-xl');
						$('.zbldr-modal-dialog').addClass('modal-md');
			        	$('.zbldr-modal-content-export-json').show();
			        	$('.zbldr-modal-title').html('Download');

			        });

			    });

			});

		</script>

	<?php }

	add_action( 'wp_ajax_zbldr_export_json', 'zbldr_export_json', 12 );

	function zbldr_export_json() {

		// export json to file

		$json = zbldr_sanitize_page($_POST['content']);

		$export_dir = sanitize_text_field($_POST['exportDir']);
		$template_name = sanitize_title($_POST['templateName']);
		$file_name = $export_dir . $template_name . ".json";

		$myfile = fopen($file_name, "w") or die("Unable to open file!");
		
		fwrite($myfile, json_encode($json));
		fclose($myfile);

		echo esc_attr($file_name); // esc_url breaks download url.  Maybe because it's a relative directory?
	    
	    wp_die();
	    
	}

?>