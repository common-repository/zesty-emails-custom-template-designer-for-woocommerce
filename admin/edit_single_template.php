<!--[if IE]>
<div class="wrap"><div class="container"><div class="row"><div class="col-md-12"><div class="alert alert-danger" role="alert"><strong>WARNING: </strong>Internet Explorer is not compatible with Zesty Emails for WooCommerce.  Please switch to a modern browser like Chrome, Firefox or Edge.</div></div></div></div></div>
<![endif]--> 

<div class="wrap" id="zefw-ie-not-supported-alert" style="display: none;"><div class="container"><div class="row"><div class="col-md-12"><div class="alert alert-danger" role="alert"><strong>WARNING: </strong>Internet Explorer is <strong>not compatible</strong> with Zesty Emails for WooCommerce.  Please switch to a modern browser like Chrome, Firefox or Edge.</div></div></div></div></div>

<script>

	// IE 10 and 11 Compatability Message

	function zedIsIE() {
	    // IE 10 and IE 11
	    return /Trident\/|MSIE/.test(window.navigator.userAgent);
	}

	if(zedIsIE() == true){
		jQuery('#zefw-ie-not-supported-alert').show();
	}

</script>

<?php $template_name = apply_filters('zefw_single_template_name', sanitize_title($_GET['zefw_email_page'])); ?>

<div id="zbldr-builder-render"></div>

<script>

	var templateName = <?php echo isset($template_name) && !empty($template_name) ? '"' . esc_attr($template_name) . '"' : 'null'; ?>;

	if(templateName === 'invoice' || templateName === 'completed_order' || templateName === 'order_on_hold' || templateName === 'processing_order' || templateName === 'refunded_order' || templateName === 'admin_cancelled_order' || templateName === 'admin_failed_order' || templateName === 'admin_new_order'){
		var templateSupports = ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo-order', 'woo-products', 'woo-order-date', 'woo-order-id', 'woo-customer-billing-address', 'woo-shop-address'];
	} else if(templateName === 'reset_password' || templateName === 'new_account'){
		var templateSupports = ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo-products', 'woo-shop-address'];
	} else if(templateName === 'customer_note') {
		var templateSupports = ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo-products', 'woo-shop-address', 'woo-customer-note'];
	} else {
		var templateSupports = ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo-products', 'woo-shop-address'];
	}

	zbldrData.IDCounter = <?php echo (int) get_option('zefw_element_id_counter'); ?>;

	zbldrBuilderInit(
		{
			elements 		: templateSupports,
			fonts 			: ['Arial', 'Calibri', 'Cambria', 'Candara', 'Consolas', 'Courier New', 'Franklin Gothic', 'Georgia', 'Helvetica', 'Impact', 'Segoe UI', 'Tahoma', 'Trebuchet MS', 'Verdana'],
			dir 			: '../wp-content/plugins/zesty-emails-for-woocommerce/',
			exportDir 		: '../wp-content/plugins/zesty-emails-for-woocommerce/exports/',
			type 			: templateName,
			responsive 		: <?php echo '"' . esc_attr(ZBLDR_RESPONSIVE) . '"'; ?>,
			selector 		: <?php echo '"' . esc_attr(ZBLDR_SELECTOR) . '"'; ?>,
			builderName 	: <?php echo '"' . esc_attr(ZBLDR_NAME) . '"'; ?>,
		}
	);

	// load page from database
	jQuery(document).ready(function($){

        var ajaxData = {
            'type'      	: 'POST',
            'action'    	: 'zefw_load_template',
            'pluginURL'		: <?php echo '"' . esc_url(ZEFW_PLUGIN_URL) . '"'; ?>,
            'templateName'	: "<?php echo !empty( $_GET['zefw_email_page'] ) ? esc_attr($_GET['zefw_email_page']) : 'null'; ?>",
            'id'			: <?php echo !empty( $_GET['zefw_page_id'] ) ? (int) $_GET['zefw_page_id'] : 'null'; ?>,
        };

        $('.zbldr-load-wrapper').fadeIn();

        $.post(ajaxurl, ajaxData, function(response) {
            $('.zbldr-load-wrapper').fadeOut();

            var json = JSON.parse(response);
            zbldrPage = json.page;

            zbldrPopulateEmptyElements();

            // check if starter template loaded or if saved data loaded
            if(json.starter === 'true') {
            	zbldrAssignUniqueIDs(zbldrPage);
            }

            $(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
            zbldrUpdateHistory();
            
        });

	});
	
</script>