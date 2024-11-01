<?php include 'admin-nav-menu.php'; ?>

<div class="wrap">
    <div class="container">
    	<div class="row">
    		<div class="col-12">
                <?php do_action('zefw_before_options'); ?>
    			<div class="card zefw-card zefw-options-card" id="zefw-general-options">
                    <div class="card-header">
                    <?php _e('General Options', 'zesty_emails'); ?>
                    </div>
                    <div class="card-body">
                        <div class="row bp-single-admin-option">
                            <div class="col-8">
                                <h4 class="card-title"><?php _e('Default Test Email Address', 'zesty_emails'); ?></h4>
                                <p class="card-text"><?php _e('The default email address you\'d like to have test emails sent to', 'zesty_emails'); ?>.</p>
                            </div>
                            <div class="col-4">
                                <?php $default_email = esc_attr(get_option('zefw-default-email-address')); ?>
                                <input type="email" data-type="text" class="zefw-option-text form-control tbs-form-control" data-option="zefw-default-email-address" value="<?php echo esc_attr($default_email); ?>">
                            </div>
                        </div>
                    </div>
                </div>
                <?php do_action('zefw_after_options'); ?>
    		</div>
    	</div>
    </div>
</div>