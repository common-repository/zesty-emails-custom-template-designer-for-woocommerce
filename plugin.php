<?php

/**
* Plugin Name: Zesty Emails Custom Template Designer for WooCommerce
* Description: Customize and design built-in email templates for WooCommerce like order completion and more.
* Version: 1.0.01
* Author: Bijingus
* Plugin URI: https://zestyplugins.com
* Author URI: http://mylesenglish.ca
* Text Domain: zesty_emails
* Domain Path: /lang
* License: GPL2
*/

defined('ABSPATH') or die("No script kiddies please!");
define("ZEFW_PLUGIN_URL", plugin_dir_url( __FILE__ ));

include 'admin/config.php';
include 'admin/ZBLDR_Config.php';
include 'admin/admin-side-menu.php';
include 'admin/test-emails.php';
include 'functions/functions.php';
include 'functions/ZBLDR_Functions.php';
include 'classes/ZBLDR_Render.php';
include 'init/enqueue.php';
include 'init/tables.php';
include 'ajax/ZBLDR_Ajax.php';
include 'ajax/options-ajax.php';

// Add links below plugin on plugins page
add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'zefw_action_links' );

function zefw_action_links( $links ) {
    $links = array_merge( array(
        '<a href="' . esc_url( admin_url( '/admin.php?page=zefw_emails' ) ) . '">' . __( 'Email Templates', 'zesty_emails' ) . '</a>',
        '<a href="' . esc_url( admin_url( '/admin.php?page=zefw_options' ) ) . '">' . __( 'Options', 'zesty_emails' ) . '</a>',
        '<a href="' . esc_url( admin_url( '/admin.php?page=zefw_help' ) ) . '">' . __( 'Help', 'zesty_emails' ) . '</a>',
    ), $links );
    return $links;
}

add_action('admin_head', 'zefw_builder_style_to_head');

function zefw_builder_style_to_head(){
  echo '<style id="zbldr-custom-css"></style>';
}

add_action('admin_footer', 'zefw_ajax_icon');

function zefw_ajax_icon(){ ?>

  <div class="zefw-ajax-save-option-icon" style="display: none;">
    <div class="zefw-ajax-save-option-icon-inner">
      <div class="zefw-saving-text"><i class="fa fa-spinner fa-spin"></i> <?php _e('Saving', 'zesty_emails'); ?>...</div>
    </div>
  </div>

<?php } 

  // custom woo templates
  add_filter( 'wc_get_template', 'zefw_filter_woo_email_content', 10, 5);

  function zefw_filter_woo_email_content( $template, $template_name, $args, $template_path, $default_path ) {

    $templates = array(
      array(
        'old_template'    => 'emails/admin-new-order.php',
        'new_template'    => '/templates/admin_new_order.php',
        'type'            => 'admin_new_order',
      ),
      array(
        'old_template'    => 'emails/admin-cancelled-order.php',
        'new_template'    => '/templates/admin_cancelled_order.php',
        'type'            => 'admin_cancelled_order',
      ),
      array(
        'old_template'    => 'emails/admin-failed-order.php',
        'new_template'    => '/templates/admin_failed_order.php',
        'type'            => 'admin_failed_order',
      ),
      array(
        'old_template'    => 'emails/customer-invoice.php',
        'new_template'    => '/templates/invoice.php',
        'type'            => 'invoice',
      ),
      array(
        'old_template'    => 'emails/customer-completed-order.php',
        'new_template'    => '/templates/completed_order.php',
        'type'            => 'completed_order',
      ),
      array(
        'old_template'    => 'emails/customer-reset-password.php',
        'new_template'    => '/templates/reset_password.php',
        'type'            => 'reset_password',
      ),
      array(
        'old_template'    => 'emails/customer-new-account.php',
        'new_template'    => '/templates/new_account.php',
        'type'            => 'new_account',
      ),
      array(
        'old_template'    => 'emails/customer-on-hold-order.php',
        'new_template'    => '/templates/order_on_hold.php',
        'type'            => 'order_on_hold',
      ),
      array(
        'old_template'    => 'emails/customer-refunded-order.php',
        'new_template'    => '/templates/refunded_order.php',
        'type'            => 'refunded_order',
      ),
      array(
        'old_template'    => 'emails/customer-processing-order.php',
        'new_template'    => '/templates/processing_order.php',
        'type'            => 'processing_order',
      ),
      array(
        'old_template'    => 'emails/customer-note.php',
        'new_template'    => '/templates/customer_note.php',
        'type'            => 'customer_note',
      ),
    );

    foreach($templates as $t) {
      if($template_name == $t['old_template']){
        $enabled = zefw_get_template_status_by_type($t['type']);
        if($enabled === 'enabled'){
          // return custom completed order template
          $template_name = __DIR__ . $t['new_template'];
          return $template_name;
        } else {
          // returm the default template
          return $template;
        }
      }
    }

    return $template;
    
  }

  // wp_kses was removing rgb values from inline styling for some reason.
  add_filter('safecss_filter_attr_allow_css', 'safecss_filter_attr_allow_css', 10, 2);

  function safecss_filter_attr_allow_css($allow_css, $css_test_string){
    if(strrpos($css_test_string, 'rgb') || strrpos($css_test_string, 'rgba')){
      $allow_css = true;
    }
    
    return $css_test_string;
  }

?>