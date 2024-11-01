<?php

    function zefw_enqueue_admin_scripts(){
        wp_enqueue_media();
        wp_enqueue_style( 'bld-font-awesome-icons', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css' );
        wp_enqueue_script('jquery-ui-js');
        wp_enqueue_style( 'wp-color-picker' ); 
        wp_enqueue_script( 'wp-color-picker' ); 
        wp_enqueue_script("jquery-ui-draggable");
        wp_enqueue_script("jquery-ui-resizable");
        wp_enqueue_script("wp-tinymce");
        wp_enqueue_style('spectrum-css', plugins_url('../css/spectrum.min.css', __FILE__));
        wp_enqueue_script('spectrum', plugins_url('../js/spectrum/spectrum.min.js', __FILE__ ), 'jquery', null, true);

        if(isset($_GET['page'])){
            if($_GET['page'] == 'zefw_emails' || $_GET['page'] == 'zefw_options' || $_GET['page'] == 'zefw_help' || $_GET['page'] == 'zefw_contact'){
                // only enqueue bootstrap for this plugin
                wp_enqueue_style( 'bootstrap-css', plugins_url('../css/bootstrap.min.css',  __FILE__ ) );
                wp_enqueue_script('bootstrap-js', plugins_url('../js/bootstrap.bundle.min.js', __FILE__ ), 'jquery', null, true);
            }
        }

        if(isset($_GET['zefw_email_page'])) {
            wp_enqueue_script('builder-js', plugins_url('../js/builder.js', __FILE__), 'jQuery', '1.0');
            wp_enqueue_script('iblize-js', plugins_url('../js/iblize.min.js', __FILE__), 'jQuery');
        }           

        wp_enqueue_script('zed-admin-js', plugins_url('../js/admin.js', __FILE__), 'jQuery');
        wp_enqueue_style('builder-style', plugins_url('../css/builder.css', __FILE__));
        wp_enqueue_style('zed-style', plugins_url('../css/style.css', __FILE__));

        if(ZBLDR_RESPONSIVE === true){
            wp_enqueue_style('zed-style', plugins_url('../css/style-responsive.css', __FILE__));
            wp_enqueue_script('container-query', plugins_url('../js/containerQuery.min.js', __FILE__ ), 'jquery', null, true);
        }

    }
    add_action( 'admin_enqueue_scripts', 'zefw_enqueue_admin_scripts' );

?>