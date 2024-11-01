<ul class="nav nav-pills zefw-admin-nav-menu">
  <li><a href="https://zestyplugins.com/"><img src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/logo-med.png'); ?>"/></a></li>
  <li class="nav-item">
    <a class="nav-link <?php echo $_GET['page'] == 'zefw_emails' ? 'active' : ''; ?>" href="admin.php?page=zefw_emails"><i class="fa-solid fa-envelope"></i> <?php _e('Emails', 'zesty_emails'); ?></a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php echo $_GET['page'] == 'zefw_options' ? 'active' : ''; ?>" aria-current="page" href="admin.php?page=zefw_options"><i class="fa-solid fa-gears"></i> <?php _e('Options', 'zesty_emails'); ?></a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php echo $_GET['page'] == 'zefw_help' ? 'active' : ''; ?>" href="admin.php?page=zefw_help"><i class="fa-solid fa-circle-question"></i> <?php _e('Help', 'zesty_emails'); ?></a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php echo $_GET['page'] == 'zefw_contact' ? 'active' : ''; ?>" href="admin.php?page=zefw_contact"><i class="fa fa-envelope"></i> <?php _e('Contact', 'zesty_emails'); ?></a>
  </li>
</ul>

<?php do_action('zefw_after_admin_menu'); ?>