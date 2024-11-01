<?php 

	add_action('admin_footer', 'zbldr_modal');

	function zbldr_modal(){ ?>

		<div id="zbldr-modal" class="modal fade zbldr-modal" tabindex="-1" style="display: none;">
			<div class="modal-dialog zbldr-modal-dialog">
				  <div class="modal-content">
					    <div class="modal-header">
					      <h5 class="modal-title zbldr-modal-title"></h5>
					      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="color: #fff;"></button>
					    </div>
					    <div class="modal-body">
					    	<div class="zbldr-modal-content zbldr-modal-content-export-json" data-modal-type="download-json">
					      		<a class="btn btn-primary zbldr-btn-primary" role="button" id="zbldr-hidden-export-download-button" href="" download><?php _e('Download', 'zesty_emails'); ?></a>
					  		</div>
					  		<div class="zbldr-modal-content zbldr-modal-content-css" data-modal-type="css">
					  			<div id="zbldr-custom-page-css" data-type="css" style="min-height: 420px;"></div>
					  		</div>
					  		<?php do_action('zbldr_after_modal_body'); ?>
					    </div>
				  </div>
			</div>
		</div>

	<?php }

    /** 
    * Inlines all styles for rendered page HTML
    * @param $content is rendered html
    * @param $css should be css stylesheet with no style tags
    * @return HTML with inline styling
    */

    function zbldr_style_inline($content, $css) {

        $emogrifier_class = 'Pelago\\Emogrifier';

        if ( class_exists( 'DOMDocument' ) && class_exists( $emogrifier_class ) ) {
            try {
                $emogrifier = new $emogrifier_class( $content, $css );
                $content    = $emogrifier->emogrify();
                $html_prune = \Pelago\Emogrifier\HtmlProcessor\HtmlPruner::fromHtml( $content );
                $html_prune->removeElementsWithDisplayNone();
                $content    = $html_prune->render();
            } catch ( Exception $e ) {
                $logger = wc_get_logger();
                $logger->error( $e->getMessage(), array( 'source' => 'emogrifier' ) );
            }
        }  else {
            $content = '<style type="text/css">' . $css . '</style>' . $content;
        }

        return $content;

    }

    /** 
    * Returns allowed tags and attributes for wp_kses.  Used for escaping rendered HTML pages.
    * @return an multidimensional array of allowed tags and attributes
    */

	function zbldr_kses_allowed(){

		$allowedAttr = array(
			'style'			 	=> array(),
		    'class'				=> array(),
		    'id'				=> array(),
		);

		$allowed = array(
			'style'	=> array(
                'type'  => array(),
            ),
		    'table' => array(
		        'align' 			=> array(),
		        'width' 			=> array(),
		        'cellspacing' 		=> array(),
		        'cellpadding' 		=> array(),
		        'style'			 	=> array(),
		        'class'				=> array(),
		        'id'				=> array(),
		        'border'			=> array(),
		        'role'				=> array(),
		    ),
		    'img'	=> array(
		    	'title'				=> array(),
		    	'alt'				=> array(),
		    	'align' 			=> array(),
		        'width' 			=> array(),
		        'height' 			=> array(),
		        'src' 				=> array(),
		        'style'			 	=> array(),
		        'class'				=> array(),
		        'id'				=> array(),
		    ),
		    'a'		=> array(
                'title'             => array(),
		    	'href'				=> array(),
		        'style'			 	=> array(),
		        'class'				=> array(),
		        'id'				=> array(),
		    ),
            'ul'            => $allowedAttr,
            'ol'            => $allowedAttr,
            'li'            => $allowedAttr,
            'br'            => $allowedAttr,
            'hr'            => $allowedAttr,
		    'h1'			=> $allowedAttr,
		    'h2'			=> $allowedAttr,
		    'h3'			=> $allowedAttr,
		    'h4'			=> $allowedAttr,
		    'h5'			=> $allowedAttr,
		    'h6'			=> $allowedAttr,
		    'tbody' 		=> $allowedAttr,
		    'thead' 		=> $allowedAttr,
		    'tfooter' 		=> $allowedAttr,
		    'span' 			=> $allowedAttr,
		    'div' 			=> $allowedAttr,
		    'br' 			=> $allowedAttr,
		    'tr' 			=> $allowedAttr,
		    'td' 			=> $allowedAttr,
		    'th' 			=> $allowedAttr,
		    'section' 		=> $allowedAttr,
		    'strong' 		=> $allowedAttr,
		    'b' 			=> $allowedAttr,
		);

		return $allowed;

	}

	/** 
    * Sanitizes the complete page
    * @param $json should be decoded json
    * @return sanitized decoded json Zesty Builder page
    */

	function zbldr_sanitize_page($json){

		$views = array('desktop', 'tablet', 'mobile');

        $json['type'] = sanitize_title($json['type']);
       	$json['builderName'] = sanitize_title($json['builderName']);
        $json['ID'] = (int) $json['ID'];
        $json['css'] = sanitize_textarea_field($json['css']);
        $json['responsive'] = sanitize_title($json['responsive']);

        /********** CONTAINERS **********/

        if(isset($json['containers'])){
            for($c = 0; $c < count($json['containers']); $c++){
                $json['containers'][$c]['ID'] = (int) $json['containers'][$c]['ID'];
                $json['containers'][$c]['editable'] = sanitize_title($json['containers'][$c]['editable']);
                $json['containers'][$c]['css']['desktop'] = sanitize_textarea_field($json['containers'][$c]['css']['desktop']);
                $json['containers'][$c]['css']['tablet'] = sanitize_textarea_field($json['containers'][$c]['css']['tablet']);
                $json['containers'][$c]['css']['mobile'] = sanitize_textarea_field($json['containers'][$c]['css']['mobile']);

                foreach($views as $view) {
                    if(isset($json['containers'][$c]['style'][$view])) {
                        foreach($json['containers'][$c]['style'][$view] as $key => $value) {
                            $json['containers'][$c]['style'][$view][$key] = sanitize_text_field($json['containers'][$c]['style'][$view][$key]);

                        }
                    }
                }
                
                /********** ROWS **********/

                if(isset($json['containers'][$c]['rows'])){
                    for($r = 0; $r < count( $json['containers'][$c]['rows'] ); $r++){
                        $json['containers'][$c]['rows'][$r]['ID'] = (int) $json['containers'][$c]['rows'][$r]['ID'];
                        $json['containers'][$c]['rows'][$r]['editable'] = sanitize_title($json['containers'][$c]['rows'][$r]['editable']);
                        $json['containers'][$c]['rows'][$r]['css']['desktop'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['css']['desktop']);
                        $json['containers'][$c]['rows'][$r]['css']['tablet'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['css']['tablet']);
                        $json['containers'][$c]['rows'][$r]['css']['mobile'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['css']['mobile']);

                        foreach($views as $view) {
                            if(isset($json['containers'][$c]['rows'][$r]['style'][$view])) {
                                foreach($json['containers'][$c]['rows'][$r]['style'][$view] as $key => $value) {
                                    $json['containers'][$c]['rows'][$r]['style'][$view][$key] = sanitize_text_field($json['containers'][$c]['rows'][$r]['style'][$view][$key]);

                                }
                            }
                        }

                        foreach($json['containers'][$c]['rows'][$r]['columns'] as $col => $val) {
                            $json['containers'][$c]['rows'][$r]['columns'][$col] = (int) $val;
                        }

                        /********** ELEMENTS **********/

                        if(isset($json['containers'][$c]['rows'][$r]['elements'])) {
                            for($e = 0; $e < count($json['containers'][$c]['rows'][$r]['elements']); $e++){

                                $json['containers'][$c]['rows'][$r]['elements'][$e] = apply_filters('zbldr_filter_element_sanitization', $json['containers'][$c]['rows'][$r]['elements'][$e]); // if any elements are included in an add-on, this allows for sanitization of those elements

                                $json['containers'][$c]['rows'][$r]['elements'][$e]['ID'] = (int) $json['containers'][$c]['rows'][$r]['elements'][$e]['ID'];
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['editable'] = sanitize_title($json['containers'][$c]['rows'][$r]['elements'][$e]['editable']);
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['css']['desktop'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['elements'][$e]['css']['desktop']);
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['css']['tablet'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['elements'][$e]['css']['tablet']);
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['css']['mobile'] = sanitize_textarea_field($json['containers'][$c]['rows'][$r]['elements'][$e]['css']['mobile']);
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['content'] = wp_kses($json['containers'][$c]['rows'][$r]['elements'][$e]['content'], 'post');         
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['type'] = sanitize_title($json['containers'][$c]['rows'][$r]['elements'][$e]['type']);
                                $json['containers'][$c]['rows'][$r]['elements'][$e]['position'] = (int) $json['containers'][$c]['rows'][$r]['elements'][$e]['position'];

                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['text'])) {
                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['text'] = sanitize_text_field($json['containers'][$c]['rows'][$r]['elements'][$e]['text']);   
                                }

                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['tag'])) {
                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['tag'] = sanitize_title($json['containers'][$c]['rows'][$r]['elements'][$e]['tag']);
                                }

                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['link'])) {
                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['link'] = esc_url_raw($json['containers'][$c]['rows'][$r]['elements'][$e]['link']);
                                }

                                if(isset($element['align'])) {
                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['align'] = sanitize_title($json['containers'][$c]['rows'][$r]['elements'][$e]['align']);
                                }

                                // styles
                                foreach($views as $view) {
                                    if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view])) {
                                        foreach($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view] as $key => $value) {

                                            if( is_array( $json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key] ) === true ) {
                                                foreach( $json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key] as $tagKey => $tagVal ) {

                                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key][$tagKey] = sanitize_text_field($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key][$tagKey]);

                                                }
                                            } else {
                                                $json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key] = sanitize_text_field($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key]);
                                            }

                                        }
                                    }
                                }

                                // attributes
                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['attr'])) {
                                    foreach($json['containers'][$c]['rows'][$r]['elements'][$e]['attr'] as $attrKey => $attrVal) {
                                        if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['attr']['src'])) {
                                            if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view])){
                                                $json['containers'][$c]['rows'][$r]['elements'][$e]['attr']['src'] = esc_url_raw($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view][$key]['src']);
                                            }
                                        }
                                        if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['attr']['src'])){
                                            if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['attr'][$attrKey])) {
                                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['style'][$view])){
                                                    $json['containers'][$c]['rows'][$r]['elements'][$e]['attr']['href'] = esc_url_raw($json['containers'][$c]['rows'][$r]['elements'][$e]['attr']['href']);
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                // social icons
                                if(isset($json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons']) && is_array($json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons']) === true) {
                                    $count = 0;
                                    foreach( $json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'] as $icon) {
                                        $json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['url'] = esc_url_raw($json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['url']);
                                        $json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['name'] = sanitize_title($json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['name']);
                                        $json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['class'] = sanitize_text_field($json['containers'][$c]['rows'][$r]['elements'][$e]['socialIcons'][$count]['class']);
                                        $count++;
                                    }
                                }
                                
                            }
                        }
                        
                        /********** ELEMENTS **********/

                    }
                }
                

                /********** ROWS **********/
            }
        }
        
        /********** CONTAINERS **********/

        return $json;

	}

?>