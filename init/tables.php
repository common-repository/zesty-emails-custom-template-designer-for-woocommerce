<?php

	function zefw_create_custom_emails_table() {

	    global $wpdb;
	    add_option('zefw_custom_emails_table_version', "1.0");
	    $table_name = $wpdb->prefix . 'zefw_custom_emails';
	    $charset_collate = $wpdb->get_charset_collate();

	    $sql = "CREATE TABLE $table_name (
	        id bigint(20) NOT NULL AUTO_INCREMENT,
	        json JSON DEFAULT NULL,
	        triggers JSON DEFAULT NULL,
	        status varchar(32),
	        css LONGTEXT,
	        email_type VARCHAR(256),
	        template BOOLEAN,
	       	save_time bigint(20),
			user_ID bigint(20),
	        primary key (id)
	    ) $charset_collate;";

	    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	    dbDelta( $sql );

	}

	register_activation_hook( __FILE__, 'zefw_create_custom_emails_table');

	function zefw_update_db_tracking_table_check() {
	    $ver = get_site_option( "zefw_custom_emails_table_version");
	    if($ver != "1.0") {
	        zefw_create_custom_emails_table();

	        update_option('zefw_element_id_counter', 100000);

	        $user_id = get_current_user_id();
	        $time = time();
	        $types = array('admin_cancelled_order', 'admin_failed_order', 'admin_new_order', 'completed_order', 'customer_note', 'invoice', 'new_account', 'order_on_hold', 'processing_order', 'refunded_order', 'reset_password');

	        global $wpdb;
	        $table_name = $wpdb->prefix . 'zefw_custom_emails';

	        $sql = "SELECT id FROM {$table_name}";
	        $results = $wpdb->get_results($sql);

	        if(empty($results)) {
	            foreach($types as $type) {
	                $wpdb->insert($table_name, array(
	                    'status'        => 'disabled',
	                    'css'           => null,
	                    'email_type'    => $type,
	                    'template'      => 0,
	                    'save_time'     => $time,
	                    'user_ID'       => $user_id,
	                ));
	            }
	        }
	    }
	}

	add_action( 'plugins_loaded', 'zefw_update_db_tracking_table_check' );

?>