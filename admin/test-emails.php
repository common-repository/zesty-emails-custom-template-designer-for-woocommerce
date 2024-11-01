<?php

// test emai send and alerts
add_action('zefw_after_admin_menu', 'zefw_send_test_email');
function zefw_send_test_email(){

    if(!isset($_POST['emailAddress']) && !empty($_POST['emailAddress'])){
      echo '<div class="container"><div class="row"><div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Error:</strong> Please set an email address to send the test email to.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
    } elseif(!isset($_POST['orderID']) && !empty($_POST['orderID'])){
      echo '<div class="container"><div class="row"><div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Error:</strong> Please select an order ID when sending a test email.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
    } elseif(isset($_POST['sendTestEmail'])){

      $order_id = (int) $_POST['orderID'];

      $template = zefw_get_template_by_id( (int) $_POST['templateID'] );
      $render = new ZBLDR_Render($template->json, false, $order_id);
      $content = $render->page();
      $css = $template->css;
      $content = zbldr_style_inline($content, $css);

      $allowed = zbldr_kses_allowed();

      if(class_exists('WooCommerce')){
        // inlines all styles
        $wc_email = new WC_Email();
        //$content = $wc_email->style_inline( $content );
        $to = sanitize_email($_POST['emailAddress']);
        $subject = __('Zesty Emails Test', 'zesty_emails');
        $body = wp_kses($content, $allowed);
        $headers = array('Content-Type: text/html; charset=UTF-8');
         
        $mail = wp_mail( $to, $subject, $body, $headers );

        if($mail === true){
          echo '<div class="container"><div class="row"><div class="alert alert-success alert-dismissible fade show" role="alert">Test email successfully sent.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
        } elseif(empty($template->json)) {
          echo '<div class="container"><div class="row"><div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Error:</strong> You need to save your email template before sending a test email.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
        } else {
          echo '<div class="container"><div class="row"><div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Error:</strong> Test email not sent.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
        }
      
      } else {
        echo '<div class="container"><div class="row"><div class="alert alert-warning alert-dismissible fade show" role="alert">WooCommerce must be active to send test emails.<button type="button" class="btn-close zefw-email-alert-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div></div>';
      }
    }
}

// test and preview email toolbar
add_action('admin_footer', 'zefw_add_test_email_buttons');
function zefw_add_test_email_buttons(){ 

  if(isset($_GET['zefw_email_page']) && class_exists('WooCommerce')) { ?>

    <div class="zbldr-send-test-email-wrapper">
      <ul class="zbldr-responsive-toolbar">
        <li class="zbldr-send zbldr-open-modal" title="Send Test Email" data-modal-type="send-test-email" data-modal-size="modal-md" data-bs-toggle="modal" href=".zbldr-modal" role="button"><i class="fa-solid fa-paper-plane"></i></li>

        <li>
          <div class="btn-group dropup">
            <button type="button" class="btn btn-secondary dropdown-toggle zbldr-open-modal" data-bs-toggle="dropdown" aria-expanded="false" title="Preview Email">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <ul class="dropdown-menu">
              <?php
                if(class_exists('WooCommerce')){
                  $query = new WC_Order_Query( array(
                      'limit' => 10,
                      'orderby' => 'date',
                      'order' => 'DESC',
                      'return' => 'ids',
                  ));
                  $orders = $query->get_orders();
                  if(!empty($orders)){
                    foreach($orders as $order) {
                      echo '<li class="zefw-email-preview-order-id zbldr-open-modal" title="Preview Email Template" data-modal-size="modal-xl" data-order-id="' . (int) $order . '">Order: #' . (int) $order . '</li>';
                    }
                  } else {
                    echo '<li class="zefw-email-preview-order-id" data-order-id="-1">No Orders to Preview</li>';
                  }
                }
              ?>
            </ul>
          </div>
        </li>
      </ul>
    </div>

  <?php }

}

// modal test and preview email content
add_action('zbldr_after_modal_body', 'zefw_modal_content');

function zefw_modal_content(){ ?>
  <div class="zbldr-modal-content zbldr-modal-content-send-email" data-modal-type="send-test-email">
    <?php if(class_exists('WooCommerce')){ ?>
      <?php 
        $query = new WC_Order_Query( array(
            'limit' => 10,
            'orderby' => 'date',
            'order' => 'DESC',
            'return' => 'ids',
        ));
        $orders = $query->get_orders();
      ?>
      <?php if(!empty($orders)) { ?>
      <label><?php _e('Email Address', 'zesty_emails'); ?>: </label><br>
      <form action="" method="post">
        <?php $default_email = get_option('zefw-default-email-address'); ?>
        <input type="email" value="<?php echo esc_attr($default_email); ?>" placeholder="email" id="zbldr-send-test-email-address" class="zbldr-input" name="emailAddress"/><br>
        <label><?php _e('Order ID', 'zesty_emails'); ?>: </label><br>
        <select name="orderID" class="zbldr-select" >
          <?php
            foreach($orders as $order) {
              echo '<option value="' . (int) $order . '">' . (int) $order . '</option>';
            }
          ?>
        </select><br>
        <input type="hidden" value="<?php echo isset($_GET['zefw_page_id']) ? (int) $_GET['zefw_page_id'] : ''; ?>" name="templateID"/><br>
        <input type="submit" value="Send" class="btn btn-primary zbldr-btn-primary" name="sendTestEmail"/>
      </form>
    <?php } else {
      echo '<div class="alert alert-danger" style="margin-bottom: 0;">You need to have at least one completed order in your WooCommerce store to send test emails.</div>';
    } ?>
    <?php } else { //if WooCommerce class exists ?>
      <div class="alert alert-danger" style="margin-bottom: 0;">WooCommerce needs to be installed and activated before you can send test emails.</div>
    <?php } ?>
  </div>
  <div class="zbldr-modal-content zbldr-modal-content-preview-email" data-modal-type="preview-email">
    <div id="zefw-email-preview-content" data-type="css" style="min-height: 420px;"></div>
  </div>
<?php }