<?php include 'admin-nav-menu.php'; ?>

<div class="wrap">
	<div class="container">	
		<div class="row">
			<div class="col-md-12">
				<div class="accordion zefw-admin-accordion" id="accordionPanelsStayOpenExample">
				  <div class="accordion-item">
				    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
				      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
				      	Getting Started
				      </button>
				    </h2>
				    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
				      <div class="accordion-body">
				       	<p>This is meant to be a very quick setup guide for Zesty Emails for WooCommerce.</p>
				       	
				       		<p>Click “Zesty Emails for WooCommerce” in the admin area of your WordPress website.</p>
							<p>Click “edit” on the template you’d like to begin editing.</p>
							<div class="zefw-tutorial-img-wrapper">
								<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/getting-started-step-1.png'); ?>"/>
								<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
									<i class="fa fa-search"></i>
								</button>
							</div>

							<p>You’ll now see the template you’ve chosen to edit.</p>
							<div class="zefw-tutorial-img-wrapper">
								<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/getting-started-step-2.png'); ?>"/>
								<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
									<i class="fa fa-search"></i>
								</button>
							</div>
							<p>Edit the template.</p>
							<div class="zefw-tutorial-img-wrapper">
								<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/getting-started-step-3.png'); ?>"/>
								<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
									<i class="fa fa-search"></i>
								</button>
							</div>
							<p>Enable the template you just edited and saved.</p>
							<div class="zefw-tutorial-img-wrapper">
								<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/getting-started-step-4.png'); ?>"/>
								<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
									<i class="fa fa-search"></i>
								</button>
							</div>
							<p>Now, whenever an order is completed (in this case), your custom template will be sent out.</p>
				       	
				      </div>
				    </div>
				  </div>
				  <div class="accordion-item">
				    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
				      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
				        How to Edit Email Templates
				      </button>
				    </h2>
				    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
				      <div class="accordion-body">
				        <p><strong>Containers</strong> are the biggest sections.  They contain rows and elements.  This is typically where you'll set main backgrounds and the overall width and padding on your email template.</p>
				        <div class="zefw-tutorial-img-wrapper">
							<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/editing-step-1.png'); ?>"/>
							<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
								<i class="fa fa-search"></i>
							</button>
						</div>
				        <p><strong>Rows</strong> sit inside containers and are unique in that you can set the number of columns for each row.</p>
				        <div class="zefw-tutorial-img-wrapper">
							<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/editing-step-2.png'); ?>"/>
							<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
								<i class="fa fa-search"></i>
							</button>
						</div>
				        <p><strong>Elements</strong> sit at the very inside of your containers, rows and columns.  Elements include images, text, headers, dividers, order data and more.</p>
				        <div class="zefw-tutorial-img-wrapper">
							<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/editing-step-3.png'); ?>"/>
							<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
								<i class="fa fa-search"></i>
							</button>
						</div>
				        <p><strong>Columns</strong> for rows can be set and selected by clicking the <i class="fa fa-columns"></i> icon.</p>
				        <div class="zefw-tutorial-img-wrapper">
							<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/editing-step-4.png'); ?>"/>
							<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
								<i class="fa fa-search"></i>
							</button>
						</div>
				        <p><strong>Add</strong> new containers, rows or elements below by clicking the <i class="fa fa-plus"></i> icon.</p>
				        <p><strong>Delete</strong> new containers, rows or elements below by clicking the <i class="fa fa-trash"></i> icon.</p>
				        <p><strong>Edit</strong> a container, row or element by clicking on it or by clicking on the <i class="fa fa-gear"></i> icon.</p>
				        <p><strong>Sort</strong> a container, row or element by pressing and holding your left mouse button down on the <i class="fas fa-grip-horizontal"></i> icon and dragging it where you'd like to place it.</p>
				        <p><strong>Clone</strong> a container, row or element by clicking the <i class="fa-regular fa-clone"></i> icon.</p>				        
				      </div>
				    </div>
				  </div>
				  <div class="accordion-item">
				    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
				      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
				        Custom CSS
				      </button>
				    </h2>
				    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
				      <div class="accordion-body">
				        <p>Zesty Emails for WooCommerce lets you edit the CSS for individual elements or for an entire email template.</p>
				        <p>Click the <i class="fa-solid fa-code"></i> icon in the bottom left of the screen to edit the CSS for the template you're working on.</p>
				        <p>To edit the CSS for an individual element, simply select the element, then open up the CSS editor.  No selectors are needed, just apply your styles.</p>
				        <div class="zefw-tutorial-img-wrapper">
							<img class="zefw-tutorial-img zefw-modal-img" data-bs-target="#zedImgModal" src="<?php echo esc_url(ZEFW_PLUGIN_URL . 'images/tutorials/css-step-3.png'); ?>"/>
							<button type="button" data-bs-toggle="modal" data-bs-target="#zedImgModal">
								<i class="fa fa-search"></i>
							</button>
						</div>
				      </div>
				    </div>
				  </div>
				  <div class="accordion-item">
				    <h2 class="accordion-header" id="panelsStayOpen-headingFour">
				      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
				        Preview Emails
				      </button>
				    </h2>
				    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
				      <div class="accordion-body">
				        <p>Click the <i class="fa-solid fa-magnifying-glass"></i> icon in the bottom left of your screen to preview the email template you're working on.</p>
				        <p>You'll need to choose an order from your WooCommerce store to preview.  This is so you can see exactly what an email will look like without any placeholders.</p>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal for Images -->
<div class="modal fade" id="zedImgModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>

