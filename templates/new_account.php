<?php 

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$generalCSS = file_get_contents(ZEFW_PLUGIN_URL . '/templates/email_styles.php');
$template = zefw_get_template_by_type( basename( __FILE__, '.php' ) );
$render = new ZBLDR_Render($template->json, false, null);
$content = $render->page();
$css = $template->css . $generalCSS;
$content = zbldr_style_inline($content, $css);

$allowed = zbldr_kses_allowed();
echo wp_kses($content, $allowed);

?>