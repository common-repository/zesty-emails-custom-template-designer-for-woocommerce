<?php include 'admin-nav-menu.php'; ?>

<?php if(isset($_GET['zefw_email_page'])) {
    include 'edit_single_template.php';
} else { ?>

    <?php 

        $edit_text = __('Edit', 'zesty_emails');

        global $wpdb;
        $table_name = $wpdb->prefix . 'zefw_custom_emails';
        $sql = "SELECT id, status, email_type FROM {$table_name}";
        $results = $wpdb->get_results($sql);

    ?>
    
<div class="container">
	<div class="row">
		<div class="col-12">
            <?php do_action('zefw_before_emails_table'); ?>
            <div class="card zefw-card zefw-options-card">
                <div class="card-body" style="padding: 0;">
        			<table class="table table-striped zefw-emails-table">
                      <thead>
                        <tr>
                            <th scope="col"><?php _e('Enable', 'zesty_emails'); ?></th>
                            <th scope="col"><?php _e('Email Template', 'zesty_emails'); ?></th>
                            <th scope="col"><?php _e('Recipient', 'zesty_emails'); ?></th>
                            <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php 

                        if(!empty($results)) {
                            foreach($results as $result) { 

                                $checked = $result->status === 'enabled' ? 'checked' : ''; ?>

                                <tr>
                                    <td><input type="checkbox" class="zefw-email-status-toggle" data-id="<?php echo (int) $result->id; ?>" <?php echo esc_attr($checked); ?>></td>
                                    <td scope="row"><?php echo strtoupper( str_replace('_', ' ', esc_html($result->email_type)) ); ?></td>
                                    <td><?php echo strpos($result->email_type, 'admin') !== false ? esc_html(__('Admin', 'zesty_emails')) : esc_html(__('Customer', 'zesty_emails')); ?></td>
                                    <td><a href="?page=zefw_emails&zefw_email_page=<?php echo esc_attr($result->email_type); ?>&zefw_page_id=<?php echo (int) $result->id; ?>" class="btn btn-primary zefw-btn-primary" role="button"><?php echo esc_html($edit_text); ?></a></td>
                                </tr>
                            
                        <?php } // end foreach
                        } // end if ?>
                      </tbody>
                    </table>
                </div>
    		</div>
            <?php do_action('zefw_after_emails_table'); ?>
        </div>
	</div>
</div>
<?php } ?>