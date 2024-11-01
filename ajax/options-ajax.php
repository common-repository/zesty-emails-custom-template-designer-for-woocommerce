<?php

	add_action( 'wp_ajax_zefw_save_option', 'zefw_save_option', 12 );

	function zefw_save_option() {
		if($_POST['type'] == 'integer'){
			update_option(sanitize_text_field($_POST['option']), (int) $_POST['value']);
		} else {
			update_option(sanitize_text_field($_POST['option']), sanitize_text_field($_POST['value']));
		}
	    
	    wp_die();
	}

	/*
	** Save Ajax
	*/

	add_action('admin_footer', 'zefw_ajax_admin_scripts_to_footer');

	function zefw_ajax_admin_scripts_to_footer(){ ?>
		<script>

			// save page build to database
			jQuery(document).ready(function($){
			    $('.zbldr-save, .zbldr-toolbar-save, .zbldr-send').click(function(){

			    	zbldrPopulateEmptyElements(); // adds an empty array to empty elements so JSON an save properly

			        var ajaxData = {
			            'type'      	: 'POST',
			            'action'    	: 'zefw_save_template',
			            'content'     	: zbldrPage,
			            'id'			: <?php echo !empty( $_GET['zefw_page_id'] ) ? (int) $_GET['zefw_page_id'] : 'null'; ?>,
			            'templateName'  : <?php echo !empty( $_GET['zefw_email_page'] ) ? '"' . esc_attr( $_GET['zefw_email_page'] ) . '"' : 'null'; ?>,
			            'IDCounter'		: zbldrData.IDCounter,
			            'css'			: zbldrRenderCSS(zbldrPage.containers),
			        };

			        $('.zbldr-save-wrapper').fadeIn();

			        $.post(ajaxurl, ajaxData, function(response) {
			            $('.zbldr-save-wrapper').fadeOut();
			        });

			    });
			});

			// toggle email template enable/disable status
			jQuery(document).ready(function($){
			    $('.zefw-email-status-toggle').click(function(){

			    	var clicked = $(this);

			    	if($(this).prop("checked") == true) {
			            var status = 'enabled';
			        } else {
			            var status = 'disabled';
			        }

			        var ajaxData = {
			            'type'      	: 'POST',
			            'action'    	: 'zefw_email_status_toggle',
			            'status'  		: status,
			            'id'			: $(this).data('id'),
			        };

			        $('.zefw-ajax-save-option-icon').fadeIn();

			        $.post(ajaxurl, ajaxData, function(response) {
			        	if(response.search('true') === -1) {
			        		alert('You need to edit and save this template before it can be enabled.  Click "Edit" to get started.');
			        		clicked.prop('checked', false);
			        		clicked.addClass('zefw-unchecked');
			        	}
			            $('.zefw-ajax-save-option-icon').delay(750).fadeOut();
			        });

			    });

			});

			// render template with php renderer
			jQuery(document).ready(function($){
			    $('.zefw-email-preview-order-id').click(function(){

			        var ajaxData = {
			            'type'      	: 'POST',
			            'action'    	: 'zefw_email_preview',
			            'json'			: zbldrPage,
			            'order-id'		: $(this).data('order-id'),
			        };

			        $.post(ajaxurl, ajaxData, function(response) {
			        	var modal = new bootstrap.Modal(document.getElementById('zbldr-modal'));
			        	$('.zbldr-modal-content').hide();
			        	$('.zbldr-modal-dialog').removeClass('modal-sm modal-md modal-lg modal-xl');
						$('.zbldr-modal-dialog').addClass('modal-xl');
			        	$('.zbldr-modal-content-preview-email').show();
			        	$('#zefw-email-preview-content').html(response);
			        	$('.zbldr-modal-title').html('Email Preview');
			        	$('.zbldr-floating-toolbar').fadeOut();
			        	modal.show();
			        });

			    });

			});

		</script>
	<?php } 

	add_action( 'wp_ajax_zefw_save_template', 'zefw_save_template', 12 );

	function zefw_save_template() {

		// zbldr_sanitize_page is wp_kses with allowed tag options
		zefw_update_template( json_encode( zbldr_sanitize_page( $_POST['content'] ), JSON_UNESCAPED_SLASHES ), wp_filter_nohtml_kses( $_POST['css'] ), sanitize_title( $_POST['templateName'] ), get_current_user_id(), time(), (int) $_POST['id']);

        update_option('zefw_element_id_counter', (int) $_POST['IDCounter']);
	    
	    wp_die();
	}

	add_action( 'wp_ajax_zefw_load_template', 'zefw_load_template', 12 );

	function zefw_load_template() {

		global $wpdb;
		$id = (int) $_POST['id'];
		
		$table_name = $wpdb->prefix . 'zefw_custom_emails';
		$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name} WHERE id = %d ORDER BY save_time DESC LIMIT 1", $id));
		
		if(!empty($results)) {

			if($results[0]->json !== null){
				$json = '{ "starter" : "false", "page" : ' . $results[0]->json . '}';
			} else {
				$starter_template_url = apply_filters('zefw_single_starter_template_url', sanitize_url($_POST['pluginURL']) . '/json_templates/basic/');
				$json = '{ "starter" : "true", "page" : ' . file_get_contents($starter_template_url . sanitize_title($_POST['templateName']) . '.json') . '}';
			}		
		}

		echo $json;
	    
	    wp_die();
	}

	add_action( 'wp_ajax_zefw_email_status_toggle', 'zefw_email_status_toggle', 12 );

	function zefw_email_status_toggle() {

		$template = zefw_get_template_by_id((int) $_POST['id']);

		if($template->json === null){
			echo (int) $_POST['id'];
			wp_die();
		} else {
			global $wpdb;
			$table_name = $wpdb->prefix . 'zefw_custom_emails';

			$updated = $wpdb->update(
	            $table_name, array(
	                "status" => sanitize_title($_POST['status']),
	            ), 
	            array('id' => (int) $_POST['id']),
	            array("%s"),
	            array('%d'),
	        );

	        echo "true";
		    
		    wp_die();
		}

	}

	add_action( 'wp_ajax_zefw_email_preview', 'zefw_email_preview', 12 );

	function zefw_email_preview() {

		$order_id = (int) $_POST['order-id'];

		if($order_id != -1) {

			$render = new ZBLDR_Render(json_encode($_POST['json']), false, $order_id);
			$allowed = zbldr_kses_allowed();
			echo wp_kses($render->page(), $allowed);

		} else {
			echo '<div class="alert alert-danger" style="margin-bottom: 0;">You need to have at least one completed order in your WooCommerce store to preview emails.</div>';
		}

		wp_die();

	}

?>