<?php

class ZBLDR_Render {

	function __construct($json, $responsive = true, $order_id = null){
		$this->content = '';
		$this->class = '';
		$this->responsive = $responsive;
		$this->order_id = $order_id;
		$this->order = wc_get_order( $order_id );
		$this->json = json_decode( $json, true);
	}

	private function replaceParameters($content) {

		$site_name = get_option( 'blogname' );
		$user = wp_get_current_user();

		$content = str_replace('{username}', $user->user_login, $content);
		$content = str_replace('{fname}', $user->first_name, $content);
		$content = str_replace('{lname}', $user->last_name, $content);
		$content = str_replace('{current_date}', date('dd/mm/yyyy'), $content);
		$content = str_replace('{site_name}', $site_name, $content );

		if( class_exists('WooCommerce') ) {

			$woo_account_link = wc_get_page_permalink( 'myaccount' );
			$content = str_replace('{woo_account_link}', '<a href="' . esc_url($woo_account_link) . '">' . esc_url($woo_account_link) . '</a>', $content );

			$woo_reset_password_link = wc_lostpassword_url();
			$content = str_replace('{woo_reset_password_link}', '<a href="' . esc_url($woo_reset_password_link) . '">' . esc_url($woo_reset_password_link) . '</a>', $content );

			$woo_reset_password_link = wc_lostpassword_url();
			$content = str_replace('{woo_reset_password_link}', '<a href="' . esc_url($woo_reset_password_link) . '">' . esc_url($woo_reset_password_link) . '</a>', $content );

			if($this->order_id !== null){
				$content = str_replace('{woo_order_id}', $this->order_id, $content );
			}

			if($this->order_id !== null){
				$order = wc_get_order( $this->order_id );
				$date_formatted = date('M d, Y', strtotime($order->get_date_created()));
				$content = str_replace('{woo_order_date}', $date_formatted, $content );
			}
		}

		$content = wp_kses(stripslashes($content), 'post');

		return $content;
	}

	function wooGetShopAddress() {
		if(class_exists('WooCommerce')){
			$address = '';
			$address .= !empty( WC()->countries->get_base_address() ) ? WC()->countries->get_base_address() . ', ' : '';
			$address .= !empty( WC()->countries->get_base_address_2() ) ? WC()->countries->get_base_address_2() . ', ' : '';
			$address .= !empty( WC()->countries->get_base_city() ) ? WC()->countries->get_base_city() . ', ' : '';
			$address .= !empty( WC()->countries->get_base_postcode() ) ?  WC()->countries->get_base_postcode() . ', ' : '';
			$address .= !empty( WC()->countries->get_base_state() ) ? WC()->countries->get_base_state() . ', ': '';
			$address .= !empty( WC()->countries->get_base_country() ) ? WC()->countries->get_base_country() : '';
			return $address;
		} else {
			return '{Shop Address}';
		}
	}

	function wooGetCustomerBillingAddress() {
		if(class_exists('WooCommerce')){
			$order = wc_get_order( $this->order_id );
			$address = !empty( $order->get_billing_first_name() ) ? $order->get_billing_first_name() . ' ' : '';
			$address .= empty( $order->get_billing_last_name() ) ? '<br/>' : '';
			$address .= !empty( $order->get_billing_last_name() ) ? $order->get_billing_last_name() . '<br/>' : '';
			$address .= !empty( $order->get_billing_company() ) ? $order->get_billing_company() : '';
			$address .= !empty( $order->get_billing_address_1() ) ? $order->get_billing_address_1() . " " : '';
			$address .= !empty( $order->get_billing_address_2() ) ? $order->get_billing_address_2() . "<br/>" : '';
			$address .= !empty( $order->get_billing_city() ) ? $order->get_billing_city() . ' ' : '';
			$address .= !empty( $order->get_billing_state() ) ? $order->get_billing_state() . ' ' : '';
			$address .= !empty( $order->get_billing_postcode() ) ? $order->get_billing_postcode() . "<br/>" : '';
			$address .= !empty( $order->get_billing_country() ) ? $order->get_billing_country() . '<br/>' : '';
			$address .= !empty( $order->get_billing_email() ) ? $order->get_billing_email() . "<br/>" : '';
			$address .= !empty( $order->get_billing_phone() ) ? $order->get_billing_phone() : '';
			return $address;
		} else {
			return '{Customer Billing Address}';
		}
	}

	private function inlineAttr($elementAttr){
		$inlineAttributes = '';
		if(!empty($elementAttr)) {
			$attr = $elementAttr;
			foreach($attr as $key => $val) {
				$inlineAttributes .= esc_attr($key) . '="' . esc_attr($val) . '" ';
			}
		}
		return $inlineAttributes;
	}

	private function setClass($class){
		$this->class = $class;
	}

	private function setContent($content){
		$this->content = $this->replaceParameters($content);
	}

	private function setElement($element){
		$this->element = $element;
	}

	private function setTag($tag){
		$this->tag = $tag;
	}

	private function element($element){

		$html = '';

		$this->setClass('zbldr-element-' . (int) $element['ID']);
		$this->setContent($element['content']);
		if( isset($element['tag']) ) { $this->setTag($element['tag']); }
		$this->setElement($element);

		$element = apply_filters('zbldr_element', $element);

		switch( $element['type'] ) {
			case 'text':
				$html .= $this->text($element);
			break;
			case 'button':
				$html .= $this->button($element);
			break;
			case 'image':
				$html .= $this->image($element);
			break;
			case 'divider':
				$html .= $this->divider($element);
			break;
			case 'spacer':
				$html .= $this->spacer($element);
			break;
			case 'header':
				$html .= $this->header($element);
			break;
			case 'social-media-icons':
				$html .= $this->socialIcons($element);
			break;
			case 'woo-order':
				$html .= $this->wooOrderDetails($element);
			break;
			case 'woo-order-id':
				$html .= $this->wooOrderID($element);
			break;
			case 'woo-order-date':
				$html .= $this->wooOrderDate($element);
			break;
			case 'woo-customer-note':
				$html .= $this->wooCustomerNote($element);
			break;
			case 'woo-shop-address':
				$html .= $this->wooShopAddress($element);
			break;
			case 'woo-customer-billing-address':
				$html .= $this->wooCustomerBillingAddress($element);
			break;
		}

		return $element['position'] === "false" ? '' : $html;

	}

	private function pageResponsive(){

		$html = '';

		/********** CONTAINERS **********/

		foreach($this->json['containers'] as $container){

			$cID = 'zbldr-container-' . (int) $container['ID'];
			$customID = isset($container['css']['id']) ? $container['css']['id'] : '';
			$customClass = isset($container['css']['class']) ? $container['css']['class'] : '';

			$html .= '<div id="' . $customID . '" class="zbldr-container ' . $cID . ' ' . $customClass . '">';

				/********** ROWS **********/

				foreach($container['rows'] as $row) {

					$rID = 'zbldr-row-' . (int) $row['ID'];
					$customID = isset($row['css']['id']) ? $row['css']['id'] : '';
					$customClass = isset($row['css']['class']) ? $row['css']['class'] : '';

					$col_count = 0;
					$html .= '<div id="' . $customID . '" class="zbldr-row ' . $rID . ' ' . $customClass . '">';

					/********** COLUMNS **********/
					foreach($row['columns'] as $column) {

						$html .= '<div class="zbldr-column zbldr-' . (int) $column . '">';

						/********** ELEMENTS **********/

						foreach($row['elements'] as $element) {

							$customID = isset($element['css']['id']) ? $element['css']['id'] : '';
							$customClass = isset($element['css']['class']) ? $element['css']['class'] : '';

							if((int) $col_count === (int) $element['position']){
								$html .= '<div id="' . $customID . '" class="zbldr-element ' . $customClass . '">';
									$html .= $this->element($element);
								$html .= '</div>';
							}

						}

						/********** END ELEMENTS **********/

						$html .= '</div>';

						$col_count++;

					}

					/********** END COLUMNS **********/

					$html .= '</div>';

				}

				/********** END ROWS **********/

			$html .= '</div>';
		}

		/********** END CONTAINERS **********/

		return $html;

	}

	private function pageTables(){

		$html = '';

		/********** CONTAINERS **********/

		foreach($this->json['containers'] as $container){

			$containerWidth = esc_attr($container['style']['desktop']['width']);
			$containerStyle = 'style="width: ' . $containerWidth . '; max-width: ' . esc_attr($container['style']['desktop']['max-width']) . '; border-collapse: collapse;"';
			$align = empty($container['align']) ? 'center' : $container['align'];

			$cID = 'zbldr-container-' . (int) $container['ID'];
			$customID = isset($container['css']['id']) ? $container['css']['id'] : '';
			$customClass = isset($container['css']['class']) ? $container['css']['class'] : '';

			$html .= '<table width="100%" style="border-collapse: collapse; width: 100%;" cellspacing="0" cellpadding="0"><tr><td><table ' . $containerStyle . ' class="zbldr-email-container zbldr-container" align="' . $align . '" width="' . str_replace('px', '', $containerWidth) . '"><tr><td id="' . $customID . '" class="zbldr-container ' . $cID . ' ' . $customClass . '">';

				/********** ROWS **********/

				foreach($container['rows'] as $row) {

					$rID = 'zbldr-row-' . (int) $row['ID'];
					$customID = isset($row['css']['id']) ? $row['css']['id'] : '';
					$customClass = isset($row['css']['class']) ? $row['css']['class'] : '';

					$col_count = 0;
					$html .= '<table class="zbldr-tr-row" style="width: 100%;"><tr style="position: relative; z-index: 1;"><td id="' . $customID . '" class="zbldr-row ' . $rID . ' ' . $customClass . '"><table width="100%"><tr>';

					/********** COLUMNS **********/
					foreach($row['columns'] as $column) {

						$html .= '<td style="vertical-align: top;" class="zbldr-column zbldr-td-' . (int) $column . '">';

						/********** ELEMENTS **********/

						foreach($row['elements'] as $element) {

							$customID = isset($element['css']['id']) ? $element['css']['id'] : '';
							$customClass = isset($element['css']['class']) ? $element['css']['class'] : '';

							if((int) $col_count === (int) $element['position']){
								$html .= '<table id="' . $customID . '" class="zbldr-element ' . $customClass . '" style="width: 100%;">';
									$html .= $this->element($element);
								$html .= '</table>';
							}

						}

						/********** END ELEMENTS **********/

						$html .= '</td>';

						$col_count++;

					}

					/********** END COLUMNS **********/

					$html .= '</tr></table></td></tr></table>';

				}

				/********** END ROWS **********/

			$html .= '</td></tr></table></td></tr></table>';
		}

		/********** END CONTAINERS **********/

		return $html;

	}

	function page(){
		if($this->responsive === true){
			return $this->pageResponsive();
		} else {
			return $this->pageTables();
		}
	}

	function text($element){
		if($this->responsive === true) {
			return '<div class="zbldr-text ' . $this->class . '">' . $this->content . '</div>';		
		} else {
			return '<td style="text-align: ' . esc_attr($element['style']['desktop']['text-align']) . ';" class="zbldr-text ' . $this->class . '">' . $this->content . '</td>';
		}
	}

	function divider($element){
		if($this->responsive === true) {
			return  '<div class="zbldr-divider ' . $this->class . '"></div>';	
		} else {
			return '<td><table style="height: ' . $this->element['style']['desktop']['margin-top'] . ';"><tr><td></td></tr></table><table width="100%"><tr><td style="margin-top:0; margin-bottom:0;" class="zbldr-divider ' . $this->class . '"></td></tr></table><table style="height: ' . $this->element['style']['desktop']['margin-bottom'] . ';"><tr><td></td></tr></table></td>';
		}
	}

	function spacer($element){
		if($this->responsive === true) {
			return '<div class="zbldr-spacer ' . $this->class . '"></div>';
		} else {
			return '<td><table width="100%"><tr><td class="zbldr-spacer ' . $this->class . '">' . $this->content . '</td></tr></table></td>';
		}
	}

	function header($element){
		if($this->responsive === true) {
			return '<' . $this->tag . ' class="' . $this->class . '">' . $this->content . '</' . $this->tag . '>';
		} else {
			return '<td><' . $this->tag . ' class="' . $this->class . '">' . $this->content . '</' . $this->tag . '></td>';	
		}
	}

	function image($element){
		if($this->responsive === true){
			$image = '<div class="zbldr-image-wrapper ' . $this->class . '">';
			$image .= !empty($this->element['link']) ? '<a href="' . esc_url($this->element['link']) . '">' : '';
			$image .= '<img ' . $this->inlineAttr($this->element['attr']) . '/>';
			$image .= !empty($this->element['link']) ? '</a>' : '';
			$image .= '</div>';
		} else {
			$width = isset($element['style']['desktop']['img']['width']) ? 'width="' . str_replace('px', '', esc_attr($element['style']['desktop']['img']['width'])) . '"' : '';

			$image = '<td class="zbldr-image-wrapper ' . $this->class . '">';
			$image .= !empty($element['link']) ? '<a href="' . esc_url($element['link']) . '">' : '';
			$image .= '<img ' . $this->inlineAttr($this->element['attr']) . ' ' . $width . '/>';
			$image .= !empty($element['link']) ? '</a>' : '';
			$image .= '</td>';
		}

		return $image;
	}

	function button(){

		$link = isset($this->element['link']) ? esc_url($this->element['link']) : '';
		$align = $this->element['style']['desktop']['text-align'];

		if($this->responsive === true) {
			$button = '<div class="zbldr-button-wrapper" style="text-align: ' . $align . ';"><a class="' . $this->class . '" href="' . $link . '">';
			$button .= $this->content;
			$button .= '</a></div>';
			return $button;
		} else {
			// Yes, I know this is very ugly but rendering buttons in tables for certain email clients is a MAJOR pain.
			$buttonWrapperStyles = $buttonStylesInner = 'style="';
			$wrapperStyles = array(
				'border-width'		=> $this->element['style']['desktop']['border-width'],
				'border-style'		=> $this->element['style']['desktop']['border-style'],
				'border-radius'		=> $this->element['style']['desktop']['border-radius'],
				'border-color'		=> $this->element['style']['desktop']['border-color'],
				'border-width'		=> $this->element['style']['desktop']['border-width'],
				'padding-top'		=> $this->element['style']['desktop']['padding-top'],
				'padding-bottom'	=> $this->element['style']['desktop']['padding-bottom'],
				'padding-left'		=> $this->element['style']['desktop']['padding-left'],
				'padding-right'		=> $this->element['style']['desktop']['padding-right'],
				'background-color'	=> $this->element['style']['desktop']['background-color'],
				'background-image'	=> $this->element['style']['desktop']['background-image'],
			);

			foreach($wrapperStyles as $key => $value) {
				$buttonWrapperStyles .= $key . ':' . esc_attr($value) . ';';
			}

			$buttonWrapperStyles .= '"';

			$stylesInner = array(
				'font-family'		=> $this->element['style']['desktop']['font-family'],
				'font-size'			=> $this->element['style']['desktop']['font-size'],
				'font-weight'		=> $this->element['style']['desktop']['font-weight'],
				'text-decoration'	=> $this->element['style']['desktop']['text-decoration'],
				'color'				=> $this->element['style']['desktop']['color'],
				'margin'			=> 0,
				'text-transform'	=> 'none',
				'background'		=> $this->element['style']['desktop']['background-color'],
				'line-height'		=> '120%',
			);

			foreach($stylesInner as $key => $value) {
				$buttonStylesInner .= $key . ':' . esc_attr($value) . ';';
			}

			$buttonStylesInner .= '"';
			
			return '<td><div style="margin-top: ' . $this->element['style']['desktop']['margin-top'] . ';"></div><table border="0" cellpadding="0" cellspacing="0" role="presentation" align="' . esc_attr($align) . '" style="border-collapse:separate; line-height:100%;">
			  <tr>
			    <td role="presentation" ' . $buttonWrapperStyles . ' valign="middle" align="' . $align . '">
			      <a href="' . $link . '" ' . $buttonStylesInner . ' target="_blank">' . $this->content . '</a>
			    </td>
			  </tr>
			</table><div style="margin-bottom: ' . esc_attr($this->element['style']['desktop']['margin-bottom']) . ';"></div></td>';
		} 
	}

	function socialIcons(){
		if($this->responsive === true){
			$icons = '<div class="zbldr-social-media-icons-wrapper" style="text-align:' . esc_attr($this->element['style']['desktop']['text-align']) . ';">';
			foreach($this->element['socialIcons'] as $icon) {
				if(strlen($icon['url']) > 0) {
					$src = $this->element['style']['desktop']['color'] === '#fff' ? esc_url(ZBLDR_BASE_URL) . 'svg/' . esc_attr($icon['name']) . '_icon_light.svg' : esc_url(ZBLDR_BASE_URL) . 'svg/' . esc_attr($icon['name']) . '_icon.svg';
					$icons .= '<a href="' .  esc_url($icon['url']) . '" class="' . esc_attr($this->class) . '" ><img src="' . esc_url($src) . '"></' . esc_attr($this->tag) . '></a>';
				}
			}
			$icons .= '</div>';
		} else {
			$icons = '<td class="zbldr-social-media-icons-wrapper" style="text-align:' . esc_attr($this->element['style']['desktop']['text-align']) . ';"><table width="100%"><tr>';
			foreach($this->element['socialIcons'] as $icon) {
				if(strlen($icon['url']) > 0) {

					$src = $this->element['style']['desktop']['color'] === '#fff' ? esc_url(ZBLDR_BASE_URL) . 'images/icons/' . esc_attr($icon['name']) . '_icon_light.png' : esc_url(ZBLDR_BASE_URL) . 'images/icons/' . esc_attr($icon['name']) . '_icon.png';

					// <a> tags are stripped in some email clients if href is not valid.  # is used as temporary url to activate social icons in the builder.
					$url = $icon['url'];
					if ( strpos($url, 'http') !== false || strpos($url, 'www.') !== false ) {
					    $tag = 'a';
					    $href = 'href="' . esc_url($icon['url']) . '"';
					} else {
					    $tag = 'div';
					    $href = '';
					}

					$width = 'width="' . str_replace('px', '', $this->element['style']['desktop']['width']) . '"';

					$icons .= '<td><table align="' . esc_attr($this->element['style']['desktop']['text-align']) . '"><tr><td class="' . esc_attr($this->class) . '"><' . $tag . ' ' . $href . ' style="display:block; width: ' . esc_attr($this->element['style']['desktop']['width']) . '; height: ' . esc_attr($this->element['style']['desktop']['width'])  . ';"><img src="' . esc_url($src) . '" ' . $width . '></' . $tag . '>' . '</td></tr></table></td>';
					
				}
			}
			$icons .= '</td></tr></table>';
		}

		return $icons;

	}

	function wooOrderID(){

		if($this->responsive === true) {
			return '<div class="' . $this->class . '">' . __('Order', 'zesty_emails') . ': ' . $this->order_id . '</div>';
		} else {
			return '<td class="' . $this->class . '">' . __('Order', 'zesty_emails') . ': ' . $this->order_id . '</td>';
		}	
									
	}

	function wooOrderDetails(){

		if($this->order_id !== null) {
			ob_start();
			woocommerce_order_details_table( $this->order_id );
			$order_details_table = ob_get_contents();
			ob_end_clean();	
		}

		if($this->responsive === true){
			return '<div class="' . $this->class . '">' . wp_kses($order_details_table, 'post') . '</div>';
		} else {
			return '<td style="text-align: ' . esc_attr($this->element['style']['desktop']['text-align']) . ';" class="' . $this->class . '">' . wp_kses($order_details_table, 'post') . '</td>';
		}		

	}

	function wooOrderDate(){

		$order = wc_get_order( $this->order_id );
		$date_formatted = date('M d, Y', strtotime($order->get_date_created()));

		if($this->responsive === true) {
			return '<div class="' . $this->class . '">' . esc_html($date_formatted) . '</div>';
		} else {
			return '<td class="' . $this->class . '">' . esc_html($date_formatted) . '</td>';
		}
									
	}

	function wooCustomerNote(){

		$args = array(
		'limit'         => 1,
		'order_id'      => $this->order_id,
		);

		$notes = wc_get_order_notes( $args );
		$note = wp_kses($notes[0]->content, 'post');

		if($this->responsive === true) {
			return '<div class="' . $this->class . '">' . esc_html($note) . '</div>';
		} else {
			return '<td class="' . $this->class . '">' . esc_html($note) . '</td>';
		}
									
	}

	function wooShopAddress(){
		if($this->responsive === true) {
			return '<div class="zbldr-woo-shop-address ' . $this->class . '">' . wp_kses($this->wooGetShopAddress(), 'post') . '</div>';
		} else {
			return '<td class="zbldr-woo-shop-address ' . $this->class . '">' . wp_kses($this->wooGetShopAddress(), 'post') . '</td>';
		}						
	}

	function wooCustomerBillingAddress(){
		if($this->responsive === true) {
			return '<div class="zbldr-woo-customer-address ' . $this->class . '">' . wp_kses($this->wooGetCustomerBillingAddress(), 'post') . '</div>';
		} else {
			return '<td class="zbldr-woo-customer-address ' . $this->class . '">' . wp_kses($this->wooGetCustomerBillingAddress(), 'post') . '</td>';
		}
	}

}

?>