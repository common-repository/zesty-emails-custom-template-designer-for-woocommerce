<?php

	function zefw_get_template_by_id($id){
		global $wpdb;
		$table_name = $wpdb->prefix . 'zefw_custom_emails';
		$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name} WHERE id = %d ORDER BY save_time DESC LIMIT 1", $id));
		
		if(!empty($results)) {
			$result = $results[0];
		} else {
			$result = 'undefined';
		}

		return $result;
	}

	function zefw_get_template_by_type($type){
		global $wpdb;
		$table_name = $wpdb->prefix . 'zefw_custom_emails';
		$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name} WHERE email_type = %s ORDER BY save_time DESC LIMIT 1", $type));
		
		if(!empty($results)) {
			$result = $results[0];
		} else {
			$result = false;
		}

		return $result;
	}

	function zefw_get_template_status_by_type($type){
		global $wpdb;
		$table_name = $wpdb->prefix . 'zefw_custom_emails';
		$results = $wpdb->get_results( $wpdb->prepare("SELECT status FROM {$table_name} WHERE email_type = %s ORDER BY save_time DESC LIMIT 1", $type));
		
		if(!empty($results)) {
			return $results[0]->status;
		} else {
			$result = false;
		}

		return $result;
	}

	function zefw_update_template($json, $css, $type, $user_ID, $time, $id){
		global $wpdb;
		$table_name = $wpdb->prefix . 'zefw_custom_emails';

		// save page build to database

		$updated = $wpdb->update(
            $table_name, array(
                "json"               	=> $json,
                "css"					=> $css,
                "email_type"            => $type,
                "user_ID"				=> (int) $user_ID,
                "save_time"				=> $time,
            ), 
            array('id' => (int) $id),
            array("%s", "%s", "%s", "%d", "%d"),
            array('%d'),
        );
	}

?>