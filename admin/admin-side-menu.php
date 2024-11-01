<?php

add_action('admin_menu', 'zefw_create_menu');
function zefw_create_menu() {
	add_menu_page(ZEFW_PLUGIN_NAME, ZEFW_PLUGIN_NAME, 'administrator', 'zefw_emails', 'zefw_emails_page', ZEFW_MENU_LOGO_URL);
}

function zefw_register_submenu(){
	add_submenu_page( 'zefw_emails', __('Options', 'zesty_emails'), __('Options', 'zesty_emails'), 'manage_options', 'zefw_options', 'zefw_options_page' );
	add_submenu_page( 'zefw_emails', __('Help', 'zesty_emails'), __('Help', 'zesty_emails'), 'manage_options', 'zefw_help', 'zefw_help_page' );
	add_submenu_page( 'zefw_emails', __('Contact', 'zesty_emails'), __('Contact', 'zesty_emails'), 'manage_options', 'zefw_contact', 'zefw_contact_page' );
}

add_action('admin_menu', 'zefw_register_submenu');

function zefw_options_page(){
    include 'options-page.php';
}

function zefw_help_page(){
    include 'help-page.php';
}

function zefw_contact_page(){
    include 'contact-page.php';
}


function zefw_emails_page(){
    include 'emails-page.php';
} ?>