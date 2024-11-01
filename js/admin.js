/*
** Options Ajax
*/

jQuery(document).ready(function($){

    var typingTimer;
    var doneTypingInterval = 250;

    $(document).on('keyup click', '.zefw-option-text', function(){

        clicked = jQuery(this);
        clearTimeout(typingTimer);
        if (clicked.val()) {
            typingTimer = setTimeout(zefwDoneOptionTyping, doneTypingInterval);
        }

        value = $(this).val();
        option = $(this).data('option');
        type = $(this).data('type');

    });

    function zefwDoneOptionTyping(){
        var data = {
            'type'      : 'POST',
            'action'    : 'zefw_save_option',
            'value'     : value,
            'option'    : option,
            'type'      : type,
        };

        $('.zefw-ajax-save-option-icon').fadeIn();

        jQuery.post(ajaxurl, data, function(response) {
            $('.zefw-ajax-save-option-icon').delay(750).fadeOut();
        });
    }
});

/*
** Import JSON
*/

jQuery(document).ready(function($){

    $('.zbldr-import-json').click(function(){
        $('#zbldr-import-json').click();
    });

    function zbldrIsValidJSON(json) {
        try {
            JSON.parse(json);
            return true;
        } catch {
            return false;
        }
    }

    if($('#zbldr-import-json').length > 0){
        document.getElementById("zbldr-import-json").addEventListener("change", function() {

            var file_to_read = document.getElementById("zbldr-import-json").files[0];
            var fileread = new FileReader();

            fileread.onload = function(e) {
                var content = e.target.result;

                if(zbldrIsValidJSON(content) === false){
                    alert('Invalid file type.  Make sure you\'re uploading a JSON file that\'s compatible with this plugin.');
                    return false;
                } else {
                    // is valid JSON
                    var json = JSON.parse(content); // parse json

                    // check if is a JSON file that's a compatible template file
                    if(json.builderName == 'zesty_email_designer' || json.builderName == 'zesty_email_designer_for_woocommerce'){
                        zbldrPage = json;
                        zbldrPage.type = zbldrData.type;

                        zbldrAssignUniqueIDs(zbldrPage);
                        
                        jQuery(zbldrPage.selector).html(zbldrRenderPage(json));
                    } else {
                        alert('Invalid JSON File.  Make sure you\'re uploading a JSON file that\'s compatible with this plugin.');
                        return false;
                    }

                }

            };

            fileread.readAsText(file_to_read);

        });
    }

});

/*
** Builder Errors/Alerts
*/

function zbldrBeforeRenderPage() {
    // check that the order table element is included in the appropriate email templates
    if(zbldrPage.type === 'completed_order' || zbldrPage.type === 'customer_note' || zbldrPage.type === 'order_on_hold'  || zbldrPage.type === 'processing_order' || zbldrPage.type === 'refunded_order' || zbldrPage.type === 'admin_cancelled_order' || zbldrPage.type === 'admin_failed_order' || zbldrPage.type === 'admin_new_order'){
      if(zbldrHasElementType('woo-order') === false) {
        jQuery('.zbldr-alert-wrapper').fadeIn();
        jQuery('.zbldr-alert').addClass('alert alert-danger');
        jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template requires a "WooCommerce Order Details" element so your customers can see their order details.  Please add this now.');
      } else if(zbldrHasElementType('woo-customer-billing-address') === false) {
        jQuery('.zbldr-alert-wrapper').fadeIn();
        jQuery('.zbldr-alert').addClass('alert alert-danger');
        jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template requires a "Woo Customer Address" element so your customers can see their billing address.  Please add this now.');
      } else if(zbldrHasElementType('woo-customer-note') === false && zbldrPage.type === 'customer_note') { 
            jQuery('.zbldr-alert-wrapper').fadeIn();
            jQuery('.zbldr-alert').addClass('alert alert-danger');
            jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template requires a "WooCommerce Customer Note" element so your customers can see notes attached to their orders.  Please add this now.');
      } else {
        jQuery('.zbldr-alert-wrapper').fadeOut();
      }
    }

    if(zbldrPage.type === 'reset_password' || zbldrPage.type === 'new_account') {
        if(zbldrHasElementType('woo-order') !== false) {
            jQuery('.zbldr-alert-wrapper').fadeIn();
            jQuery('.zbldr-alert').addClass('alert alert-danger');
            jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template should not have a "Woo Order Details" element.  Please remove.');
          } else if(zbldrHasElementType('woo-customer-billing-address') !== false) {
            jQuery('.zbldr-alert-wrapper').fadeIn();
            jQuery('.zbldr-alert').addClass('alert alert-danger');
            jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template should not have a "Woo Customer Address" element.  Please remove.');
          } else if(zbldrHasElementType('woo-customer-note') === false && zbldrPage.type === 'customer_note') { 
                jQuery('.zbldr-alert-wrapper').fadeIn();
                jQuery('.zbldr-alert').addClass('alert alert-danger');
                jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template should not have a "Woo Order Notes" element.  Please remove.');
          } else if(zbldrHasElementType('woo-order-date') === false && zbldrPage.type === 'customer_note') { 
                jQuery('.zbldr-alert-wrapper').fadeIn();
                jQuery('.zbldr-alert').addClass('alert alert-danger');
                jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template should not have a "Woo Order Date" element.  Please remove.');
          } else if(zbldrHasElementType('woo-order-date') === false && zbldrPage.type === 'customer_note') { 
                jQuery('.zbldr-alert-wrapper').fadeIn();
                jQuery('.zbldr-alert').addClass('alert alert-danger');
                jQuery('.zbldr-alert').html('<strong>WARNING: </strong>This email template should not have a "Woo Order ID" element.  Please remove.');
          } else {
            jQuery('.zbldr-alert-wrapper').fadeOut();
          }
    }
}

/*
** Image to Modal
*/

jQuery(document).ready(function($){
    $('.zefw-modal-img').next('button').click(function(){

        var img = $(this).prev();

        $('#zedImgModal .modal-body').html(img.clone());

    });
});