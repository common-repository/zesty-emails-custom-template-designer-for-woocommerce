/********** DEFAULT SELECTION DATA **********/

var zbldrData = {
	dir 				: '../', // default dir of builder
	exportDir 			: '/exports', // default JSON export dir
	phoneBreak 			: '420px',
	tabletBreakPoint 	: '800px',
	pageOffset 		: { // for when builder is used in a page with something like menus that offset the builder from the boundaries of the document
		left 	: 165,
		right 	: 0,
		top 	: 0,
		bottom 	: 0,
	},
	fonts 			: [],
	dir				: '../',
	view 			: 'desktop', // or mobile or tablet
	builderView 	: 'full', // or 'simple'
	IDCounter 		: 10000, // Used for assigning unique IDs to elements, rows and containers.  Should be incremented.
	selected 		: {
		status 		: false,
		containerID : 0,
		rowID 		: 0,
		colID 		: 0,
		elemID		: null,
		type 		: null,
		grab 		: false,
		grabbedID   : null,
	},
	mouseOver : {
		containerID : null,
		rowID 		: null,
		colID 		: null,
		elemID 		: null,
		first 		: false, // bool used to tell if mouse is over first element, row or container
		last 		: false, // bool used to tell if mouse is over last element, row or container
		top  		: false, // bool used to tell if mouse is in upper half of element, row or container
		bottom 		: false, // bool used to tell if mouse is in bottom half of element, row or container

	},
	history 		: [],
	historyPos 		: null,
}

// only allow history to be updated every so often
var canPushHistory = true;
setInterval(function(){
	canPushHistory = true;
}, 2500);

// default element styles
const zbldrDefaultElementStyles = {
	'box-sizing'		: 'border-box',
	'background-image'	: 'none',
	'background-color'	: 'none',
	'background-size'	: 'auto',
	'background-repeat'	: 'no-repeat',
	'color'				: '#000',
	'font-family'		: 'Arial',
	'font-style'		: 'normal',
	'font-weight'		: 'normal',
	'font-size'			: '18px',
	'text-align'		: 'center',
	'text-decoration'	: 'none',
	'padding-top'		: '20px',
	'padding-bottom'	: '20px',
	'padding-left'		: '20px',
	'padding-right'		: '20px',
	'margin-top'		: '0',
	'margin-bottom'		: '0',
	'margin-left'		: '0',
	'margin-right'		: '0',
	'border-color'		: 'none',
	'border-style'		: 'none',
	'border-width'		: '1px',
	'border-radius'		: '0',
	'display'			: 'block',
	'text-shadow'		: 'none',
	'width'				: '100%',
	'max-width'			: '100%',
}

// social icons for rendering
const zbldrSocialIcons = [
	{
		name	: 'facebook',
		class 	: 'fa-brands fa-facebook',
		url 	: '#',
	},
	{
		name	: 'instagram',
		class 	: 'fa-brands fa-instagram',
		url 	: '#',
	},
	{
		name	: 'linkedin',
		class 	: 'fa-brands fa-linkedin',
		url 	: '',
	},
	{
		name	: 'pinterest',
		class 	: 'fa-brands fa-pinterest',
		url 	: '',
	},
	{
		name	: 'reddit',
		class 	: 'fa-brands fa-reddit',
		url 	: '',
	},
	{
		name	: 'tiktok',
		class 	: 'fa-brands fa-tiktok',
		url 	: '',
	},
	{
		name	: 'tumblr',
		class 	: 'fa-brands fa-tumblr',
		url 	: '',
	},
	{
		name	: 'twitter',
		class 	: 'fa-brands fa-twitter',
		url 	: '#',
	},
	{
		name	: 'vimeo',
		class 	: 'fa-brands fa-vimeo',
		url 	: '',
	},
	{
		name	: 'youtube',
		class 	: 'fa-brands fa-youtube',
		url 	: '#',
	},
];




var zbldrUI = [{
	toolbars : [
	/********** LOADING WRAPPER **********/
	{
			before	: '<div class="zbldr-load-wrapper" style="display: none;">',
			after 	: '<br><div class="text-light zbldr-saving-text"> Loading...</div></div>',
			tag 	: 'div',
			attr 	: {
				class 	: 'spinner-border text-light bp-ajax-icon',
				role 	: 'status',
			},
			tools 	: [{
				tag 	: 'span',
				attr 	: {
					class 	: 'visually-hidden', 
				}
			}],

	},
	/********** Save WRAPPER **********/
	{
			before	: '<div class="zbldr-save-wrapper" style="display: none;">',
			after 	: '<br><div class="text-light zbldr-saving-text"> Saving...</div></div>',
			tag 	: 'div',
			attr 	: {
				class 	: 'spinner-border text-light bp-ajax-icon',
				role 	: 'status',
			},
			tools 	: [{
				tag 	: 'span',
				attr 	: {
					class 	: 'visually-hidden', 
				}
			}],

	},
	/********** ALERT WRAPPER **********/
	{
		before 	: '<div class="zbldr-alert-wrapper" style="display: none;">',
		after 	: '</div>',
		tag 	: 'div',
		attr 	: {
			class 	: 'zbldr-alert',
		},
	},
	/********** IMPORT JSON HIDDEN INPUT **********/
	{
		before 	: '<div style="display: none;">',
		after 	: '</div>',
		tag 	: 'div',
		tools 	: [{
			tag 	: 'input',
			attr 	: {
				type 					: 'file',
				id 						: 'zbldr-import-json',
				style 					: 'display: none',
				'data-template-type'	: typeof zbldrPage === 'undefined' ? null : zbldrPage.type,
			}
		}],
	},
	/********** IMPORT/EXPORT/SAVE TOOLBAR **********/
	{
		before 	: '<div class="zbldr-toolbar-wrapper">',
		after 	: '</div>',
		tag 	: 'ul',
		attr 	: {
			class 	: 'zbldr-toolbar',
		},
		tools 	: [{
			tag 	: 'li',
			icon 	: 'fa fa-upload',
			attr 	: {
				class 	: 'zbldr-import-json',
				title 	: 'Import Template',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa fa-download',
			attr 	: {
				class 	: 'zbldr-export-json',
				title 	: 'Export Template',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa fa-undo',
			attr 	: {
				class 	: 'zbldr-undo',
				title 	: 'Undo',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa fa-redo',
			attr 	: {
				class 	: 'zbldr-redo',
				title 	: 'Redo',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa fa-floppy-disk',
			attr 	: {
				class 	: 'zbldr-save',
				title 	: 'Save',
			}
		}],
	},
	/********** VIEW TOOLBAR **********/
	{
		before 	: '<div class="zbldr-responsive-toolbar-wrapper">',
		after 	: '</div>',
		tag 	: 'ul',
		attr 	: {
			class 	: 'zbldr-responsive-toolbar',
		},
		tools 	: [
		{
			responsiveOnly 	: true,
			tag 	: 'li',
			icon 	: 'fa-solid fa-mobile',
			attr 	: {
				class 	: 'zbldr-phone',
				title 	: 'Mobile View',
			}
		},
		{
			responsiveOnly 	: true,
			tag 	: 'li',
			icon 	: 'fa-solid fa-tablet',
			attr 	: {
				class 	: 'zbldr-tablet',
				title 	: 'Tablet View',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa-solid fa-desktop',
			attr 	: {
				class 	: 'zbldr-desktop',
				title 	: 'Desktop View',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa-solid fa-table-columns',
			attr 	: {
				class 	: 'zbldr-simple',
				title 	: 'Block View',
			}
		},
		{
			tag 	: 'li',
			icon 	: 'fa-solid fa-code',
			attr 	: {
				class 	: 'zbldr-css zbldr-open-modal',
				'data-bs-toggle'	: 'modal',
				'data-modal-type'	: 'css',
				'data-modal-size'	: 'modal-xl',
				href 				: '.zbldr-modal',
				role 				: 'button',
				title 	: 'Custom CSS',
			}
		}],
	}],
	modals : [{

	}],
}]; 

var zbldrTools = [
	/********** BORDER **********/
	{
		tabID 	: 1,
		type 	: 'border',
		options : [
			{
				label 	: 'Border Style',
				inputs 	: [{
					tag : 'select',
					attr : {
						'data-key' : 'border-style',
						'data-element' 	: 'this',					
						'class' : 'zbldr-select',
						type : 'select',
					},
					options : ['none', 'solid', 'dotted', 'dashed'],
					value 	: 'none',
				}]
			},
			{
				label 	: 'Border Width',
				inputs 	: [{
					tag 	: 'input',
					attr : {
						'class' : 'zbldr-range',
						'min' 	: '0',
						'max' 	: '60',					
						type 	: 'range',
						value 	: 1,
					},
				},
				{
					tag 	: 'input',
					attr : {
						'data-element'	: 'this',
						'data-key' 		: 'border-width',
						'data-unit' 	: 'px',
						'class' 		: 'zbldr-range-input',
						placeholder 	: '1px',
						type 			: 'text',
						value 			: '',
					},
				}],
			},
			{
				label 	: 'Border Radius',
				inputs 	: [{
					tag 	: 'input',
					attr : {
						'class' : 'zbldr-range',
						'min' 	: '0',
						'max' 	: '10',					
						type 	: 'range',
						value 	: 1,
					},
				},
				{
					tag 	: 'input',
					attr : {
						'data-element'	: 'this',
						'data-key' 		: 'border-radius',
						'data-unit' 	: 'px',
						'class' 		: 'zbldr-range-input',
						placeholder 	: '1px',
						type 			: 'text',
						value 			: '',
					},
				}],
			},
			{
				label 	: 'Border Color',
				inputs 	: [{
					tag 	: 'input',
					attr : {
						'data-key' 		: 'border-color',
						'data-element'	: 'this',
						'id'			: 'zbldr-border-color',
						'class' 		: 'zbldr-color-field zbldr-border-color',				
						type 			: 'range',
						value 			: '#000000',
					},
				}],
			},
		],
	},
	/********** ALIGNMENT **********/
	{
		tabID 	: 1,
		type 	: 'alignment',
		options	: [
			{
				label 		: 'Alignment',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-align-left',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-align',
						type 			: 'button',
						value 			: 'left',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-center',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-align',
						type 			: 'button',
						value 			: 'center',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-right',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-align',
						type 			: 'button',
						value 			: 'right',
					},
				}],
			},
		],
	},
	/********** COLUMNS **********/
	{
		tabID 			: 1,
		type 			: 'columns',
		responsiveOnly	: true,
		options	: [
			{
				label 		: 'Vertical Alignment',
				inputs 		: [{
					tag 	: 'button',
					text 	: 'Top',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'flex-start',
						'data-key'		: 'align-items',
						'data-element' 	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'Middle',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'center',
						'data-key'		: 'align-items',
						'data-element' 	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'Bottom',
					attr 	: {					
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'flex-end',
						'data-key'		: 'align-items',
						'data-element' 	: 'this',
					},
				}],
			},
		],
	},
	/********** CONTENT **********/
	{
		tabID 	: 0,
		type 	: 'content',
		options	: [
			{
				label 		: 'Content',
				content 	: '',
				inputs 		: [{
					tag 	: 'textarea',
					text 	: '',
					attr 	: {				
						'id' 			: 'zbldr-toolbar-textarea',
						type 			: 'textarea',
						'data-property' : 'content'
					},
				},
				{
					tag 	: 'button',
					text 	: '{username}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{username}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{fname}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{fname}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{lname}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{lname}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{current_date}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{current_date}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{site_name}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{site_name}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{woo_order_id}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{woo_order_id}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{woo_order_date}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{woo_order_date}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{woo_reset_password_link}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{woo_reset_password_link}'
					},
				},
				{
					tag 	: 'button',
					text 	: '{woo_account_link}',
					attr 	: {				
						'class' 		: 'zbldr-dynamic-text',
						type 			: 'button',
						'value' 		: '{woo_account_link}'
					},
				}],
			},
		],
	},
	/********** CSS **********/
	{
		tabID 	: 1,
		type 	: 'css',
		options	: [
			{
				label 		: 'ID',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						type 			: 'text',
						id  			: 'zbldr-css-id',
					},
				}],
			},
			{
				label 		: 'Class',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						type 			: 'text',
						id  			: 'zbldr-css-class',
					},
				}],
			},
			{
				label 		: 'CSS',
				inputs 		: [{
					tag 	: 'div',
					attr 	: {				
						class 			: 'zbldr-toolbar-css',
						id  			: 'zbldr-toolbar-css',
						'data-type' 	: 'css',
					},
				}],
			},
		],
	},
	/********** HEADERS **********/
	{
		tabID 	: 1,
		type 	: 'header',
		options	: [
			{
				label 		: 'Header',
				inputs 		: [{
					tag 	: 'button',
					text 	: 'H1',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '60px',
						'data-tag'		: 'h1',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'H2',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '52px',
						'data-tag'		: 'h2',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'H3',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '40px',
						'data-tag'		: 'h3',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'H4',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '32px',
						'data-tag'		: 'h4',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'H5',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '24px',
						'data-tag'		: 'h5',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					text 	: 'H6',
					attr 	: {				
						'class' 		: 'zbldr-button-tag-select zbldr-button-select',
						type 			: 'button',
						value 			: '18px',
						'data-tag'		: 'h6',
						'data-key'		: 'font-size',
						'data-element'	: 'this',
					},
				}],
			},
		],
	},
	/********** ICON DESIGN **********/
	{
		tabID 	: 1,
		type 	: 'icon-design',
		options	: [
			{
				label 		: 'Icon Size',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						value 			: '32',
						'min'			: '0',
						'max'			: '120',
					},
				},
				{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range-input zbldr-social-icon-range-size',
						type 			: 'text',
						'data-key'		: 'width',
						'data-unit'		: 'px',
						'placeholder'	: '32px',
						value 			: '32px',
						'data-element'	: 'this',

					},
				}],
			},
			{
				label : 'Icon Color',
				inputs : [{
					tag 	: 'select',
					options : ['#fff', '#000'],
					attr 	: {				
						'class' 		: 'zbldr-select',
						'data-key'		: 'color',
						'data-element'	: 'this',
					},
				}],
			},
			{
				label : 'Icon Background Color',
				inputs : [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-color-field zbldr-font-color',
						type 			: 'color',
						value 			: '#fff',
						'data-key'		: 'background-color',
						'data-element'	: 'this',
					},
				}],
			},	
		],
	},
	/********** TEXT **********/
	{
		tabID 	: 0,
		type 	: 'text',
		options	: [
			{
				label 		: 'Text',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'text',
						'data-element'	: 'this',
						'data-property'	: 'content',
					},
				}],
			},
		],
	},
	/********** LINK **********/
	{
		tabID 	: 0,
		type 	: 'link',
		options	: [
			{
				label 		: 'Link',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text zbldr-toolbar-link',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'link',
						'data-element'	: 'this', // "this" to apply styles directly to the element or tag (h1, p, span, etc.) to apply styles to specific child elements
						'data-property'	: 'link', // property of element object where the data is sent and retrieved from
					},
				}],
			},
		],
	},
	/********** IMAGE **********/
	{
		tabID 	: 0,
		type 	: 'image',
		options	: [
			{
				label 		: 'Image URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-img-url',
						'style'			: 'width: 80.5%;',
						type 			: 'text',
						value 			: '',
						'data-key'		: 'src',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-plus',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-add-image zbldr-button-positive zbldr-button',
						'data-key'		: 'src',
						type 			: 'button',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-trash',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-delete-image-button zbldr-button-negative zbldr-button',
						type 			: 'button',
					},
				}],
			},
		],
	},
	/********** BACKGROUND **********/
	{
		tabID 	: 0,
		type 	: 'background',
		options	: [
			{
				label 	: 'Background Color',
				inputs 	: [{
					tag 	: 'input',
					attr : {
						'data-key' 		: 'background-color',
						'data-element'	: 'this',
						'class' 		: 'zbldr-color-field',				
						type 			: 'color',
						value 			: '#ffffff',
					},
				}],
			},
			{
				label 		: 'Background Image URL',
				after 		: '<div class="zbldr-bg-img-preview" style="display: none;"></div>',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-img-url',
						'style'			: 'width: 80.5%;',
						type 			: 'text',
						value 			: '',
						'data-key'		: 'background-image',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-plus',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-add-image zbldr-button-positive zbldr-button',
						'data-key'		: 'background-image',
						type 			: 'button',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-trash',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-delete-image-button zbldr-button-negative zbldr-button',
						type 			: 'button',
					},
				}],
			},
			{
				label 	: 'Background Size',
				inputs 	: [{
					tag : 'select',
					attr : {
						'data-key' : 'background-size',
						'data-element' 	: 'this',					
						'class' : 'zbldr-select',
					},
					options : ['auto', 'contain', 'cover'],
					value 	: 'auto',
				}]
			},
			{
			label 	: 'Background Repeat',
				inputs 	: [{
					tag : 'select',
					attr : {
						'data-key' : 'background-repeat',
						'data-element' 	: 'this',					
						'class' : 'zbldr-select',
					},
					options : ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
					value 	: 'no-repeat',
				}]
			},
			{
			label 	: 'Background Position',
				inputs 	: [{
					tag : 'select',
					attr : {
						'data-key' : 'background-position',
						'data-element' 	: 'this',					
						'class' : 'zbldr-select',
					},
					options : ['top', 'bottom', 'left', 'right', 'center'],
					value 	: 'center',
				}]
			},
		],
	},
	/********** TYPOGRAPHY **********/
	{
		tabID 	: 1,
		type 	: 'typography',
		options	: [
			{
				label 		: 'Alignment',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-align-left',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'left',
						'data-key'		: 'text-align',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-center',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'center',
						'data-key'		: 'text-align',
						'data-element'	: 'this',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-right',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'right',
						'data-key'		: 'text-align',
						'data-element'	: 'this',
					},
				}],
			},
			{
				label 		: 'Font Style',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-bold',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'bold',
						'data-key'		: 'font-weight',
						'data-element'	: 'this',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-italic',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'italic',
						'data-key'		: 'font-style',
						'data-element'	: 'this',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-underline',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'underline',
						'data-key'		: 'text-decoration',
						'data-element'	: 'this',
						'data-status'	: false,
						'data-false-val': 'none',
					},
				}],
			},
			{
				label 		: 'Font Size',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '120',
						value 			: '16',
					},
				},
				{
					tag 	: 'input',
					icon 	: 'fa fa-italic',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '16px',
						'data-key'		: 'font-size',
						'data-unit'		: 'px',
						'data-element'	: 'this',
					},
				}],
			},
			{
				label 		: 'Font',
				inputs 		: [{
					tag 	: 'select',
					attr 	: {				
						'class' 		: 'zbldr-select',
						'data-key'		: 'font-family',
						'data-element'	: 'this',
					},
					options : [], // Fonts set on init then passed to data.  Font options set at render.  Render looks for data-key equal to font-family
				}],
			},
			{
				label 		: 'Font Color',
				inputs 		: [{
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#000000',
						type 			: 'color',
						'data-key'		: 'color',
						'data-element'	: 'this',
					},
				}],
			},
		],
	},
	/********** SOCIAL MEDIA ICONS **********/
	{
		tabID 	: 0,
		type 	: 'social-media-icons',
		options	: [
			{
				label 		: 'Facebook URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'facebook',
					},
				}],
			},
			{
				label 		: 'Instagram URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'instagram',
					},
				}],
			},
			{
				label 		: 'LinkedIn URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'linkedin',
					},
				}],
			},
			{
				label 		: 'Pinterest URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'pinterest',
					},
				}],
			},
			{
				label 		: 'Reddit URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'reddit',
					},
				}],
			},
			{
				label 		: 'TikTok URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'tiktok',
					},
				}],
			},
			{
				label 		: 'Tumblr URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'tumblr',
					},
				}],
			},
			{
				label 		: 'Twitter URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'twitter',
					},
				}],
			},
			{
				label 		: 'Vimeo URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'vimeo',
					},
				}],
			},
			{
				label 		: 'YouTube URL',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-toolbar-text',
						type 			: 'text',
						value 			: '',
						'data-type'		: 'social-url',
						'data-name'		: 'youtube',
					},
				}],
			},
		],
	},
	/********** WOOCOMMERCE ORDER DETAILS TABLE **********/
	{
		tabID 	: 1,
		type 	: 'table',
		options	: [
			{
				label 		: 'Title Alignment',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-align-left',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'left',
						'data-key'		: 'text-align',
						'data-element'	: 'h2',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-center',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'center',
						'data-key'		: 'text-align',
						'data-element'	: 'h2',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-right',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'right',
						'data-key'		: 'text-align',
						'data-element'	: 'h2',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				inputs 		: [{
					before 		: '<div class="zbldr-8"><label>Title Size</label><br>',
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '120',
						value 			: '32',
						'data-element'	: 'h2',
					},
				},
				{
					after 		: '</div>',
					tag 	: 'input',
					icon 	: 'fa fa-italic',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '32px',
						'data-key'		: 'font-size',
						'data-unit'		: 'px',
						'data-element'	: 'h2',
					},
				},
				{
					before 		: '<div class="zbldr-4"><label>Title Color</label><br>',
					after 		: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#000000',
						type 			: 'color',
						'data-key'		: 'color',
						'data-element'	: 'h2',
					},
				}],
			},
			{
				label 		: 'Title Font',
				inputs 		: [{
					tag 	: 'select',
					attr 	: {				
						'class' 		: 'zbldr-select',
						'data-key'		: 'font-family',
						'data-element'	: 'h2',
					},
					options : [], // Fonts set on init then passed to data.  Font options set at render.  Render looks for data-key equal to font-family
				}],
			},
			{
				label 		: 'Font Style',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-bold',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'bold',
						'data-key'		: 'font-weight',
						'data-element'	: 'h2',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-italic',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'italic',
						'data-key'		: 'font-style',
						'data-element'	: 'h2',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-underline',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'underline',
						'data-key'		: 'text-decoration',
						'data-element'	: 'h2',
						'data-status'	: false,
						'data-false-val': 'none',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				label 		: 'Title Padding',
				inputs 		: [{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-top',
						'data-unit'		: 'px',
						'data-element'	: 'h2',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'h2',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Left</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-left',
						'data-unit'		: 'px',
						'data-element'	: 'h2',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Right</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-right',
						'data-unit'		: 'px',
						'data-element'	: 'h2',
						placeholder		: '20px',
					},
				}],
			},
			{
				label 		: 'Table Text Alignment',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-align-left',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'left',
						'data-key'		: 'text-align',
						'data-element'	: 'td,th',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-center',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'center',
						'data-key'		: 'text-align',
						'data-element'	: 'td,th',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-align-right',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-select',
						type 			: 'button',
						value 			: 'right',
						'data-key'		: 'text-align',
						'data-element'	: 'td,th',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				inputs 		: [{
					before 		: '<div class="zbldr-8"><label>Table Font Size</label><br>',
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '120',
						value 			: '32',
						'data-element'	: 'td,th',
					},
				},
				{
					after 		: '</div>',
					tag 	: 'input',
					icon 	: 'fa fa-italic',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '32px',
						'data-key'		: 'font-size',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
					},
				}],
			},
			{
				label 		: 'Table Font',
				inputs 		: [{
					tag 	: 'select',
					attr 	: {				
						'class' 		: 'zbldr-select',
						'data-key'		: 'font-family',
						'data-element'	: 'td,th',
					},
					options : [], // Fonts set on init then passed to data.  Font options set at render.  Render looks for data-key equal to font-family
				}],
			},
			{
				label 		: 'Font Style',
				inputs 		: [{
					tag 	: 'button',
					icon 	: 'fa fa-bold',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'bold',
						'data-key'		: 'font-weight',
						'data-element'	: 'td,th',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-italic',
					text 	: '',
					attr 	: {				
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'italic',
						'data-key'		: 'font-style',
						'data-element'	: 'td,th',
						'data-status'	: false,
						'data-false-val': 'normal',
					},
				},
				{
					tag 	: 'button',
					icon 	: 'fa fa-underline',
					text 	: '',
					attr 	: {					
						'class' 		: 'zbldr-button-toggle',
						type 			: 'button',
						value 			: 'underline',
						'data-key'		: 'text-decoration',
						'data-element'	: 'td,th',
						'data-status'	: false,
						'data-false-val': 'none',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				label 		: 'Cell Padding',
				inputs 		: [{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-top',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
						value			: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
						value 			: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Left</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-left',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
						value 			: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Right</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-right',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
						value 			: '20px',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				inputs 		: [{
					before 	: '<div class="zbldr-8"><label>Border Width</label><br>',
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '120',
						value 			: '1',
						'data-element'	: 'td,th',
					},
				},
				{
					after 	: '</div>',
					tag 	: 'input',
					icon 	: 'fa fa-italic',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '10px',
						'data-key'		: 'border-width',
						'data-unit'		: 'px',
						'data-element'	: 'td,th',
					},
				},
				{
					before 	: '<div class="zbldr-4"><label>Border Color</label><br>',
					after 	: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#f5f5f5',
						type 			: 'color',
						'data-key'		: 'border-color',
						'data-element'	: 'td,th',
					},
				}],
			},
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				inputs 		: [{
					before 	: '<div class="zbldr-3"><label>TH BG Color</label><br>',
					after 	: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#ffffff',
						type 			: 'color',
						'data-key'		: 'background-color',
						'data-element'	: 'th',
					},
				},
				{
					before 	: '<div class="zbldr-3"><label>TH Text Color</label><br>',
					after 	: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#ffffff',
						type 			: 'color',
						'data-key'		: 'color',
						'data-element'	: 'th',
					},
				},
				{
					before 	: '<div class="zbldr-3"><label>TD BG Color</label><br>',
					after 	: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#ffffff',
						type 			: 'color',
						'data-key'		: 'background-color',
						'data-element'	: 'td',
					},
				},
				{
					before 	: '<div class="zbldr-3"><label>TD Text Color</label><br>',
					after 	: '</div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-color-field',
						value 			: '#ffffff',
						type 			: 'color',
						'data-key'		: 'color',
						'data-element'	: 'td',
					},
				}],
			},
		],
	},
	/********** SIZING **********/
	{
		tabID 	: 1,
		type 	: 'image-sizing',
		options	: [
			{
				responsiveOnly 	: true,
				label 			: 'Max Width',
				inputs 			: [{
				tag 			: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '1920',
						value 			: '600',
					},
				},
				{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '600px',
						'data-key'		: 'max-width',
						'data-unit'		: 'px',
						'data-element'	: 'img',
					},
				}],
			},
			{
				label 		: 'Width',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '1920',
						value 			: '600',
					},
				},
				{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '600px',
						'data-key'		: 'width',
						'data-unit'		: 'px',
						'data-element'	: 'img',
					},
				}],
			},
		],
	},
	/********** SIZING **********/
	{
		tabID 	: 1,
		type 	: 'sizing',
		options	: [
			{
				label 		: 'Max Width',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '100',
						value 			: '100',
					},
				},
				{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '100%',
						'data-key'		: 'max-width',
						'data-unit'		: 'px',
						'data-element'	: 'this',
					},
				}],
			},
			{
				label 		: 'Width',
				inputs 		: [{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range',
						type 			: 'range',
						min 			: '0',
						max 			: '100',
						value 			: '100',
					},
				},
				{
					tag 	: 'input',
					attr 	: {				
						'class' 		: 'zbldr-range-input',
						type 			: 'text',
						value 			: '100%',
						'data-key'		: 'width',
						'data-unit'		: '%',
						'data-element'	: 'this',
					},
				}],
			},
		],
	},
	/********** SPACING **********/
	{
		tabID 	: 1,
		type 	: 'spacing',
		options	: [
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				label 		: 'Padding',
				inputs 		: [{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-top',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Left</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-left',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Right</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-right',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				}],
			},
			{
				before 			: '<div class="zbldr-options-row">',
				after 			: '</div>',
				label 			: 'Margin',
				responsiveOnly 	: true,
				inputs 		: [{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-top',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Left</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-left',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Right</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-right',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				}],
			},
		],
	},
	/********** DIVIDER SPACING **********/
	{
		tabID 	: 1,
		type 	: 'divider-spacing',
		options	: [
			{
				before 		: '<div class="zbldr-options-row">',
				after 		: '</div>',
				label 		: 'Padding',
				inputs 		: [{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-top',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Left</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-left',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-3">',
					after 		: '<label class="bldb-center-label">Right</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'padding-right',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				}],
			},
			{
				before 			: '<div class="zbldr-options-row">',
				after 			: '</div>',
				label 			: 'Margin',
				inputs 		: [{
					before 		: '<div class="zbldr-6">',
					after 		: '<label class="bldb-center-label">Top</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-top',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				},
				{
					before 		: '<div class="zbldr-6">',
					after 		: '<label class="bldb-center-label">Bottom</label></div>',
					tag 		: 'input',
					attr 		: {				
						'class' 		: 'zbldr-input-number',
						type 			: 'text',
						'data-key'		: 'margin-bottom',
						'data-unit'		: 'px',
						'data-element'	: 'this',
						placeholder		: '20px',
					},
				}],
			},
		],
	},
];

var zbldrColumns = [
	{
		class 		: 'zbldr-icon-12',
		columns 	: [12],
	},
	{
		class 		: 'zbldr-icon-6-6',
		columns 	: [6,6],
	},
	{
		class 		: 'zbldr-icon-4-4-4',
		columns 	: [4,4,4],
	},
	{
		class 		: 'zbldr-icon-3-3-3-3',
		columns 	: [3,3,3,3],
	},
	{
		class 		: 'zbldr-icon-2-2-2-2-2-2',
		columns 	: [2,2,2,2,2,2],
	},
	{
		class 		: 'zbldr-icon-6-3-3',
		columns 	: [6,3,3],
	},
	{
		class 		: 'zbldr-icon-3-3-6',
		columns 	: [3,3,6],
	},
	{
		class 		: 'zbldr-icon-4-8',
		columns 	: [4,8],
	},
	{
		class 		: 'zbldr-icon-8-4',
		columns 	: [8,4],
	},
	{
		class 		: 'zbldr-icon-6-2-2-2',
		columns 	: [6,2,2,2],
	},	
	{
		class 		: 'zbldr-icon-2-2-2-6',
		columns 	: [2,2,2,6],
	},
	{
		class 		: 'zbldr-icon-2-2-4-2-2',
		columns 	: [2,2,4,2,2],
	},
];

// base container obj

var zbldrContainer = {
	attr 		: {},
	ID 			: null,
	tools 		: ['alignment', 'background', 'border', 'css', 'sizing', 'spacing'],
	editable 	: true,
	selected 	: false,
	class 		: '',
	css 		: {
		desktop : '',
		tablet 	: '',
		mobile 	: '',
	},
	style 	: { 
		desktop : {
			'-webkit-box-sizing' 	: 'border-box',
			'box-sizing'			: 'border-box',
			'background-color'		: '#fff',
			'background-image'		: "none",
			'background-size'		: "auto",
			'padding-top'			: '40px',
			'padding-bottom'		: '40px',
			'padding-left'			: '40px',
			'padding-right'			: '40px',
			'margin-top'			: '0',
			'margin-bottom'			: '0',
			'margin-left'			: 'auto',
			'margin-right'			: 'auto',
			'border-color'			: 'none',
			'border-style'			: 'none',
			'border-width'			: '1px',
			'border-radius'			: '0',
			'max-width'				: '100%',
			'width'					: '800px',
		},
		tablet 	: {

		},
		mobile 	: {

		},
	},
	rows 		: [],
}

// base row obj

var zbldrRow = {
	attr 		: {},
	ID 			: null,
	columns		: [12],
	css 		: {
		desktop : '',
		tablet 	: '',
		mobile 	: '',
	},
	editable 	: true,
	selected 	: false,
	tools 		: ['background', 'border', 'columns', 'css', 'spacing'],
	style 		: {
		desktop : {
			'background-image'	: 'none',
			'background-color'	: 'none',
			'background-size'	: 'auto',
			'background-repeat'	: 'no-repeat',
			'padding-top'		: '40px',
			'padding-bottom'	: '40px',
			'padding-left'		: '40px',
			'padding-right'		: '40px',
			'margin-top'		: '0',
			'margin-bottom'		: '0',
			'margin-left'		: '0',
			'margin-right'		: '0',
			'border-color'		: 'none',
			'border-style'		: 'none',
			'border-width'		: '1px',
			'border-radius'		: '0',
			'max-width'			: '100%',
		},
		tablet 	: {

		},
		mobile 	: {

		}
	},
	elements 	: [],
}

var zbldrElements = [
	/********** BUTTONS **********/
	{
		attr  		: {
			href : '',
		},
		class 		: 'zbldr-button',
		content 	: 'Click Here',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		icon 		: 'fa fa-link',
		name 		: 'Button',
		style : {
			desktop : {
				'background-color' 	: '#1b89db',
				'border-radius'		: '4px',
				color 				: '#fff',
				display 			: 'inline-block',
				width 				: 'auto',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: 'a',
		type 		: 'button',
		tools 		: ['background', 'border', 'css', 'typography', 'text', 'link', 'spacing'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			html = '<div class="zbldr-button-wrapper" style="text-align: ' + elementObj.style[zbldrData.view]['text-align'] + '">';
			html += '<a class="zbldr-button ' + classID + '" href="#">';
			html += elementObj.content;
			html += '</a>';
			html += '</div>';
			return html;
		}
	},
	/********** DIVIDERS **********/
	{
		class 		: 'zbldr-divider',
		content 	: '',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		icon 		: 'fa fa-minus',
		name 		: 'Divider',
		style : {
			desktop : {
				'background-color'	: '#000',
				'margin-top'		: '20px',
				'margin-bottom'		: '20px',
				'padding-top'		: '1px',
				'padding-bottom'	: '1px',
				'padding-left'		: '0',
				'padding-right'		: '0',
				'width'				: '100%',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: 'hr',
		type 		: 'divider',
		tools 		: ['alignment', 'background', 'border', 'css', 'sizing', 'divider-spacing'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="zbldr-divider-wrapper"><div class="' + this.class + ' ' + classID + '"></div></div>';
		}
	},
	/********** HEADERS **********/
	{
		class 		: 'zbldr-header',
		content 	: 'Your header goes here.  Click to edit.',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		name 		: 'Header',
		icon 		: 'fa fa-header',
		style : {
			desktop : {
				'font-size'	: '48px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: 'h1',
		type 		: 'header',
		tools 		: ['background', 'border', 'css', 'header', 'spacing', 'typography', 'text'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<' + elementObj.tag + ' class="' + this.class + ' ' + classID + '">' + elementObj.content + '</' + elementObj.tag + '>';
		},
	},
	/********** IMAGES **********/
	{
		attr : {
			src : '',
		},
		class 		: 'zbldr-image',
		content 	: '',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		name 		: 'Image',
		icon 		: 'fa fa-image',
		style : {
			desktop : {
				'width'	: '100%',
				img	: {
					'width' 		: '100%',
					'max-width'		: '100%',
				}
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: 'img',
		type 		: 'image',
		tools 		: ['alignment', 'background', 'border', 'css', 'image', 'link', 'image-sizing', 'spacing'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			if(elementObj.attr.src.length < 1){
				return '<div class="zbldr-image-wrapper ' + classID + '"><i class="fa-solid fa-image"></i></div>';
			} else {
				return '<div class="zbldr-image-wrapper ' + classID + '"><' + elementObj.tag + ' src="' + elementObj.attr.src + '"/></div>';
			}
		}
	},
	/********** TEXT **********/
	{
		class 		: 'zbldr-text',
		content 	: 'Your text goes here.  Click to edit.',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		name 		: 'Text',
		icon 		: 'fa fa-font',
		style : {
			desktop : {},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'text',
		tools 		: ['background', 'border', 'css', 'typography', 'content', 'spacing'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** SPACER **********/
	{
		class 		: 'zbldr-spacer',
		content 	: '',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		name 		: 'Spacer',
		icon 		: 'fa-solid fa-up-down',
		style : {
			desktop : {},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'spacer',
		tools 		: ['background', 'css', 'spacing'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '"></div>';
		}
	},
	/********** WOOCOMMERCE ORDER ID **********/
	{
		class 		: 'zbldr-woo-order-id',
		content 	: 'Order: #{Order ID}',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Order ID',
		style : {
			desktop : {
				'font-size'		: '18px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-order-id',
		tools 		: ['background', 'border', 'css', 'spacing', 'typography'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** WOOCOMMERCE ORDER DATE **********/
	{
		class 		: 'zbldr-woo-order-date',
		content 	: '{Order Date}',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Order Date',
		style : {
			desktop : {
				'font-size'		: '18px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-order-date',
		tools 		: ['background', 'border', 'css', 'spacing', 'typography'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** WOOCOMMERCE ORDER TALBE **********/
	{
		class 		: 'zbldr-woo-order-table',
		content 	: '<section class="woocommerce-order-details"><h2 class="woocommerce-order-details__title">Order details</h2><table style="width: 100%;"><thead><tr><th>product</th><th>total</th></tr></thead><tbody><tr><td><a href="#">{Product Title}</a> <strong> {Quantity}</strong></td><td><span><bdi><span>$</span>{Price}</bdi></span></td></tr><tr><td><a href="#">{Product Title}</a> <strong> {Quantity}</strong></td><td><span><bdi><span>$</span>{Price}</bdi></span></td></tr><tr><td><a href="#">{Product Title}</a> <strong> {Quantity}</strong></td><td><span><bdi><span>$</span>{Price}</bdi></span></td></tr></tbody><tfoot><tr><th scope="row">subtotal:</th><td><span><span>$</span>{Subtotal}</span></td></tr><tr><th scope="row">total:</th><td><span><span>$</span>{Total}</span></td></tr></tfoot></table></section>',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Order Details Table',
		style : {
			desktop : {
				'font-size'			: '18px',
				'background-color' 	: '#fff',
				'text-align'		: 'left',
				h2 : {
					'padding-top' 		: '20px',
					'padding-bottom' 	: '20px',
					'padding-left' 		: '20px',
					'padding-right' 	: '20px',
					'text-align'		: 'left',
					'font-size'			: '32px',
					'font-family'		: 'Arial',
					'font-weight'		: 'normal',
					'border-width'		: '0',
					'color'				: '#000',
				},
				table : {
					'border-collapse'	: 'collapse',
					'border-spacing'	: '0',
					'padding-top' 		: '0',
					'padding-bottom' 	: '0',
					'padding-left' 		: '0',
					'padding-right' 	: '0',
					'border-style'		: 'solid',
					'border-color'		: 'lightgray',
					'border-radius'		: '0',
					'border-width'		: '0',
					'background-color'  : 'transparent',
					'color'				: '#000',
					'width'				: '100%',
				},
				th : {
					'padding-top' 		: '20px',
					'padding-bottom' 	: '20px',
					'padding-left' 		: '20px',
					'padding-right' 	: '20px',
					'border-style'		: 'solid',
					'border-color'		: 'lightgray',
					'border-radius'		: '0',
					'border-width'		: '1px',
					'background-color'  : 'transparent',
					'color'				: '#000',
				},
				td : {
					'padding-top' 		: '20px',
					'padding-bottom' 	: '20px',
					'padding-left' 		: '20px',
					'padding-right' 	: '20px',
					'border-color'		: 'lightgray',
					'border-radius'		: '0',
					'border-style'		: 'solid',
					'border-width'		: '1px',
					'background-color'  : 'transparent',
					'color'				: '#000',
				},
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-order',
		tools 		: ['background', 'border', 'css', 'spacing', 'table'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="zbldr-text  ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** WOOCOMMERCE SHOP ADDRESS **********/
	{
		class 		: 'zbldr-woo-shop-address',
		content 	: '{Shop Address}',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Shop Address',
		style : {
			desktop : {
				'font-size'			: '18px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-shop-address',
		tools 		: ['background', 'border', 'css', 'spacing', 'typography'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** WOOCOMMERCE CUSTOMER BILLING ADDRESS **********/
	{
		class 		: 'zbldr-woo-customer-billing-address',
		content 	: '{Customer Billing Address}',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Customer Billing Address',
		style : {
			desktop : {
				'font-size'			: '18px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-customer-billing-address',
		tools 		: ['background', 'border', 'css', 'spacing', 'typography'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** WOOCOMMERCE CUSTOMER NOTE **********/
	{
		class 		: 'zbldr-woo-customer-note',
		content 	: '{Customer Note}',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: false,
		icon 		: 'fa fa-shopping-cart',
		name 		: 'Woo Customer Note',
		style : {
			desktop : {
				'font-size'			: '18px',
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: false,
		type 		: 'woo-customer-note',
		tools 		: ['background', 'border', 'css', 'spacing', 'typography'],
		render 		: function(elementObj){
			var classID = 'zbldr-element-' + elementObj.ID;
			return '<div class="' + this.class + ' ' + classID + '">' + elementObj.content + '</div>';
		},
	},
	/********** SOCIAL MEDIA ICONS **********/
	{
		attr : {
			href : null,
		},
		class 		: 'zbldr-social-icons',
		content 	: '',
		css : {
			desktop : '',
			tablet 	: '',
			mobile 	: '',
		},
		editable 	: true,
		name 		: 'Social Media Icons',
		icon 		: 'fa fa-share-alt',
		socialIcons : zbldrSocialIcons,
		style : {
			desktop : {
				'background-color'	: 'rgb(91, 91, 91)',
				'border-radius'		: '64px',
				'box-sizing'		: 'content-box',
				'color'				: '#fff',
				'display'			: 'inline-block',
				'font-size'			: 'inherit',
				'padding-top'		: '10px',
				'padding-bottom'	: '10px',
				'padding-left'		: '10px',
				'padding-right'		: '10px',
				'width'				: '32px',
				span : {
					'padding'			: '12px',
					'background-color'	: '#fff',
				}
			},
			tablet 	: {},
			mobile	: {}
		},
		tag 		: 'i',
		type 		: 'social-media-icons',
		tools 		: ['border', 'css', 'icon-design', 'social-media-icons', 'spacing'],
		render 		: function(elementObj){
			var elementHTML = '<div class="zbldr-social-media-icons-wrapper" style="text-align: ' + elementObj.style[zbldrData.view]['text-align'] + '">';
				
			for(i = 0; i < elementObj.socialIcons.length; i++) {
				if(elementObj.socialIcons[i].url.length > 0) {
					var classID = 'zbldr-element-' + elementObj.ID;
					var src = elementObj.style.desktop.color === '#fff' ? zbldrData.dir + 'svg/' + elementObj.socialIcons[i].name + '_icon_light.svg' :  zbldrData.dir + 'svg/' + elementObj.socialIcons[i].name + '_icon.svg';
					elementHTML += '<a class="' + classID + '" href="#" class="zbldr-social-icon"><img src="' + src + '"/></a>';
				}
			}

			elementHTML += '</div>';

			return elementHTML;
		}
	},
];



/*******************************************************************************************/
/***************************************** GENERAL ****************************************/
/******************************************************************************************/



function zbldrInlineAttr(attr){
	if(typeof attr === 'undefined'){
		return '';
	} else {
		var inlineAttributes = '';
		const keys = Object.keys(attr);
		keys.forEach((key, index) => {
			inlineAttributes += key + '="' + attr[key] + '" ';
		});
		return inlineAttributes;
	}
}

/*
* ajax doesn't save empty arrays so if no elements exist for certain rows, populate them with empty arrays
* also removes backslashes from escaped " and '
*/

function zbldrPopulateEmptyElements(){
	if(typeof zbldrPage.containers === 'undefined'){
		zbldrPage.containers = [];
	}
	if(zbldrPage.containers.length > 0){
		for(c=0; c<zbldrPage.containers.length; c++) {
			if(typeof zbldrPage.containers[c].rows === 'undefined' || zbldrPage.containers[c].hasOwnProperty('rows') == false) {
				zbldrPage.containers[c].rows = [];
			}
			for(r=0; r<zbldrPage.containers[c].rows.length; r++) {
				if(typeof zbldrPage.containers[c].rows[r].elements === 'undefined' || zbldrPage.containers[c].rows[r].hasOwnProperty('elements') == false){
					zbldrPage.containers[c].rows[r].elements = [];
				}
				for(e = 0; e < zbldrPage.containers[c].rows[r].elements.length; e++) {
					if(zbldrPage.containers[c].rows[r].elements[e].hasOwnProperty('content')){
						zbldrPage.containers[c].rows[r].elements[e].content = zbldrPage.containers[c].rows[r].elements[e].content.replace(/\\"/g, '"').replace(/\\'/g, "'");
					}
				}
			}
		}
	}
}

function zbldrReturnInputVal(selectedObj, tags = 'h1,p,span', styleType){
	var val = '';

	if(tags.indexOf(',') !== -1){	
		var tagsArray = tags.split(',');
	} else {
		var tagsArray = [tags];
	}

	for(t=0; t<tagsArray.length; t++){
		if(tagsArray[t] == 'this') {
			val = selectedObj.style[zbldrData.view][styleType];
		} else {
			if(selectedObj.style[zbldrData.view].hasOwnProperty(tagsArray[t])) {
				val = selectedObj.style[zbldrData.view][tagsArray[t]][styleType];
			}
		}
	}

	return val;
}

function zbldrPushStyles(selectedObj, tags, styleType, styleValue){
	if(tags.indexOf(',')){
		var tagsArray = tags.split(',');
	}

	var val = styleValue === 'auto' ? 'auto' : styleValue;

	if(tags !== 'this'){
		for(t=0; t<tagsArray.length; t++) {
			selectedObj.style[zbldrData.view][tagsArray[t]][styleType] = val;
		}
	} else {
		selectedObj.style[zbldrData.view][styleType] = val;
	}
}

function zbldrReturnElementModel(type){
	var result = zbldrElements.filter(obj => {
	  return obj.type === type
	});
	return result[0];
}

function zbldrUpdateHistory(){

	zbldrData.history.length = zbldrData.historyPos + 1;

	if(canPushHistory === true){
		zbldrData.history.push(JSON.parse(JSON.stringify(zbldrPage.containers)));
		zbldrData.historyPos = zbldrData.history.length - 1;
	}

	jQuery(document).ready(function(){
		zbldrHistoryButtonDisplayLogic();
	});

	canPushHistory = false;
}

// Assigns unique IDs to all containers, rows and elements in a page.  Used for data imports to preven ID conflicts.
function zbldrAssignUniqueIDs(zbldrPage) {
    for(c=0; c< zbldrPage.containers.length; c++){

        zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
        zbldrPage.containers[c].ID = zbldrData.IDCounter;

    	if(zbldrPage.containers[c].hasOwnProperty('rows') === false) {
    		zbldrPage.containers[c].rows = [];
    	}

        for(r=0; r<zbldrPage.containers[c].rows.length; r++) {

            zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
            zbldrPage.containers[c].rows[r].ID = zbldrData.IDCounter;

            for(e=0; e<zbldrPage.containers[c].rows[r].elements.length; e++) {
                zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
                zbldrPage.containers[c].rows[r].elements[e].ID = zbldrData.IDCounter;
            }

        }
    }
}

function zbldrAssignUniqueObjectIDs(selectedObj){

	if(selectedObj.hasOwnProperty('rows')) {
		var type = 'container';
	} else if(selectedObj.hasOwnProperty('elements')) {
		var type = 'row';
	} else {
		var type = 'element';
	}

	if(type === 'container') {

			zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
			selectedObj.ID = zbldrData.IDCounter;

			for(r = 0; r < selectedObj.rows.length; r++) {

				zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
				selectedObj.rows[r].ID = zbldrData.IDCounter;

				for(e = 0; e < selectedObj.rows[r].elements.length; e++) {

					zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
					selectedObj.rows[r].elements[e].ID = zbldrData.IDCounter;

				}
			}
		
	} else if(type === 'row') {

			zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
			selectedObj.ID = zbldrData.IDCounter;

			for(e = 0; e < selectedObj.elements.length; e++) {

				zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
				selectedObj.elements[e].ID = zbldrData.IDCounter;

			}

	} else if (type === 'element') {

		zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
		selectedObj.ID = zbldrData.IDCounter;

	}

	return selectedObj;

}

function zbldrReturnSelectedArray(type){
	var cID = zbldrData.selected.containerID;
	var rID = zbldrData.selected.rowID;
	var eID = zbldrData.selected.elemID;
	if(type == 'container'){
		return zbldrPage.containers;
	} else if(type == 'row'){
		return zbldrPage.containers[cID].rows;
	} else {
		return zbldrPage.containers[cID].rows[rID].elements;
	}
}

function zbldrReturnSelectedIndex(type){
	if(type == 'container'){
		return zbldrData.selected.containerID;
	} else if(type == 'row'){
		return zbldrData.selected.rowID;
	} else {
		return zbldrData.selected.elemID;;
	}
}

function zbldrClone(obj) {
	zbldrData.IDCounter = parseInt(zbldrData.IDCounter) + 1;
	var selectedIDs = zbldrReturnSelectedIDs(obj);
	zbldrUpdateSelectedIDs(selectedIDs);

	var toClone = JSON.parse( JSON.stringify( zbldrReturnSelected(selectedIDs.type) ) );
	toClone = zbldrAssignUniqueObjectIDs(toClone);
 
	var element = zbldrReturnSelectedArray(selectedIDs.type);

	element.splice( zbldrReturnSelectedIndex(selectedIDs.type), 0, toClone );
}

// clears all selection information from data object
function zbldrClearAllDataSelected(){
	zbldrData.selected.id = null;
	zbldrData.selected.type = null;
	zbldrData.selected.containerID = null;
	zbldrData.selected.elemID = null;
	zbldrData.selected.rowID = null;
}

// returns selected container, row or element object
function zbldrReturnSelected(type = 'container'){
	if(type == 'container') {
		var selected = zbldrPage.containers[zbldrData.selected.containerID];
	} else if(type == 'row'){
		var selected = zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID];
	} else if(type == 'element') {
		var selected = zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID].elements[zbldrData.selected.elemID];
	} else {
		selected = null;
	}

	return selected;
}

function zbldrReturnUnit(val){
    // set unit of measurement
    if(val.indexOf('px') != -1) {
       return 'px';
    } else if(val.indexOf('%') != -1){
        return '%';
    } else if(val.indexOf('rem') != -1 && zbldrPage.responsive === true) {
        return 'rem';
    } else if(val.indexOf('em') != -1 && zbldrPage.responsive === true) {
        return 'em';
    } else {
    	return 'px';
    }
}

function zbldrHasElementType($type) {
	for(c=0; c < zbldrPage.containers.length; c++) {
	  for(r=0; r < zbldrPage.containers[c].rows.length; r++) {
	    for(e=0; e < zbldrPage.containers[c].rows[r].elements.length; e++) {
	      if(zbldrPage.containers[c].rows[r].elements[e].type === $type){
	        return true;
	      }
	    }
	  }
	}
	return false;
}

function zbldrReturnSelectedIDs(selectedObj) {

	if(selectedObj.hasClass('zbldr-selectable')){
		var obj = selectedObj;
	} else if(selectedObj.hasClass('zbldr-empty-icon')) {
		var obj = selectedObj.parent();
	} else {
		var obj = selectedObj.parent().parent().parent();
	}

	var IDs = {
		containerID 	: obj.data('container-id'),
		rowID 			: obj.data('row-id'),
		columnID 		: obj.data('column-id'),
		elementID 		: obj.data('element-id'),
		type 			: obj.data('type'),
	}

	return IDs;
	
}

function zbldrUpdateSelectedIDs(selectedIDs){
	zbldrData.selected.type = selectedIDs.type;
	zbldrData.selected.containerID = selectedIDs.containerID;
	zbldrData.selected.rowID = selectedIDs.rowID;
	zbldrData.selected.colID = selectedIDs.columnID;
	zbldrData.selected.elemID = selectedIDs.elementID;
}



/*******************************************************************************************/
/***************************************** DISPLAY ****************************************/
/******************************************************************************************/



function zbldrHistoryButtonDisplayLogic(){
	/********** UNDO/REDO BUTTONS **********/

	if(zbldrData.history.length === zbldrData.historyPos + 1){
		jQuery('.zbldr-redo').css({
			'opacity'			: '0.5',
			'pointer-events'	: 'none',
		});
	} else if(zbldrData.historyPos < zbldrData.history.length - 1){
		jQuery('.zbldr-redo').css({
			'opacity'			: '1',
			'pointer-events'	: 'all',
		});
	}

	if(zbldrData.historyPos < 2){
		jQuery('.zbldr-undo').css({
			'opacity'			: '0.5',
			'pointer-events'	: 'none',
		});
	} else if(zbldrData.historyPos >= 2){
		jQuery('.zbldr-undo').css({
			'opacity'			: '1',
			'pointer-events'	: 'all',
		});
	}
}



/*******************************************************************************************/
/****************************************** CRUD ******************************************/
/******************************************************************************************/



// Containers

function zbldrAddContainer(containerID){

	if(zbldrPage.responsive === true) {
		var width = 'auto';
	} else {
		var width = '800px';
	}

	zbldrData.IDCounter = zbldrData.IDCounter + 1;

	var newContainer = JSON.parse(JSON.stringify(zbldrContainer));
	newContainer.ID = zbldrData.IDCounter;
	newContainer.style.desktop.width = width;

	zbldrPage.containers.splice(containerID + 1, 0, newContainer);

	zbldrClearAllDataSelected();
}

// Rows

function zbldrAddRow(containerID, rowID){

	zbldrData.IDCounter = zbldrData.IDCounter + 1;

	var newRow = JSON.parse(JSON.stringify(zbldrRow));
	newRow.ID = zbldrData.IDCounter;

	if(zbldrPage.responsive === true) {
		newRow.tools.push('columns');
	}

	zbldrPage.containers[containerID].rows.splice(parseInt(rowID) + 1, 0, newRow);
}

// Elements

function zbldrAddElement(containerID, rowID, elementID, elemType, elemPos = 0){
	zbldrData.IDCounter = zbldrData.IDCounter + 1;
	cID = parseInt(containerID);
	rID = parseInt(rowID);
	eID = parseInt(elementID);

	for(e=0; e<zbldrElements.length; e++) {
		if(elemType === zbldrElements[e].type) {
			var newElement = JSON.parse(JSON.stringify(zbldrElements[e]));
			newElement.ID = zbldrData.IDCounter;
			newElement.position = elemPos;

			// merge default styles with set styles
			let allStyling = {
				...zbldrDefaultElementStyles,
				...newElement.style.desktop
			};

			newElement.style.desktop = allStyling;
			
			if(zbldrPage.containers[cID].rows[rID].elements.length > 0){
				var newEID = eID + 1;
			} else {
				var newEID = 0;
			}

			zbldrPage.containers[cID].rows[rID].elements.splice(newEID, 0, newElement);
		}
	}
}

/*******************************************************************************************/
/************************************* MEDIA UPLOADER *************************************/
/******************************************************************************************/

jQuery(document).ready(function($){
	function zbldrBuilderMediaUploader(){
		var mediaUploader;
		jQuery(document).on("click", '.zbldr-add-image', function(e) {
			selectedObject = zbldrReturnSelected(zbldrData.selected.type);
			prop = $(this).attr('data-key');
			input = $(this).prev();
			preview = $(this).next().next();

			e.preventDefault();
			// If the uploader object has already been created, reopen the dialog
			  if (mediaUploader) {
			  mediaUploader.open();
			  return;
			}
			// Extend the wp.media object
			mediaUploader = wp.media.frames.file_frame = wp.media({
			  title: 'Choose Attachment',
			  button: {
			  text: 'Choose Attachment'
			}, multiple: false });
				mediaUploader.on('select', function() {
				
				attachment = mediaUploader.state().get('selection').first().toJSON();

				if(prop === 'background-image'){
					selectedObject.style[zbldrData.view][prop] = 'url(' + attachment.url + ')';
					preview.show();
					preview.css({
						'background-image' : 'url(' + attachment.url + ')',
					});
				} else if(prop === 'src') {
					selectedObject.attr.src = attachment.url;
				}

				input.val(attachment.url);

				$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
				zbldrUpdateHistory();

			});
			// Open the uploader dialog
			mediaUploader.open();
		});

	}

	zbldrBuilderMediaUploader();
});



/*******************************************************************************************/
/**************************************** SORTING *****************************************/
/******************************************************************************************/



jQuery(document).ready(function($){
	function zbldrSetMouseOver(type = 'element', selector = '.zbldr-element', notSelected = '.zbldr-grabbed-element', mouseX, mouseY){

		// get element that mouse is over
		var allElements = $(selector);

		$(allElements).not(notSelected).each(function(index){

			var thisElemOffset = $(this).offset();
			thisElemY = thisElemOffset.top;
			thisElemX = thisElemOffset.left;
			var thisElemH = $(this).height();
			var thisElemW = $(this).width();
			var thisElemRight = thisElemX + thisElemW;
			var thisElemBottom = thisElemH + thisElemY;
			var thisElemCenterY = (thisElemBottom + thisElemY) / 2;

			if(type === 'container' || type === 'row'){
				if(mouseY > thisElemY && mouseY < thisElemBottom) {
					var mouseIn = true;
				} else {
					var mouseIn = false;
				}
			} else {
				if(mouseY > thisElemY && mouseY < thisElemBottom && mouseX > thisElemX && mouseX < thisElemRight) {
					var mouseIn = true;
				} else {
					var mouseIn = false;
				}
			}
			

			if(mouseIn === true){
				thisID = parseInt($(this).attr('data-id'));

				if(type === 'container') {
					var length = zbldrPage.containers.length;
					zbldrData.mouseOver.containerID = thisID;
				} else if(type === 'row'){
					var length = zbldrPage.containers[zbldrData.mouseOver.containerID].rows.length;
					zbldrData.mouseOver.rowID = length === 0 ? null : thisID;
				} else if(type === 'column') {
					zbldrData.mouseOver.colID = thisID;
				} else if(type === 'element') {
					var length = zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements.length;
					zbldrData.mouseOver.elemID = length === 0 ? null : thisID;
				} 

				if(zbldrData.selected.grab === type){
					if(mouseY < thisElemCenterY) {
						zbldrData.mouseOver.top = true;
						zbldrData.mouseOver.bottom = false;
					} else {
						zbldrData.mouseOver.bottom = true;
						zbldrData.mouseOver.top = false;
					}

					if(length == 1){
						zbldrData.mouseOver.first = true;
						zbldrData.mouseOver.last = true;
					} else if(length - 1 == thisID){
						zbldrData.mouseOver.first = false;
						zbldrData.mouseOver.last = true;
					} else if(thisID == 0) {
						zbldrData.mouseOver.first = true;
						zbldrData.mouseOver.last = false;
					} 	
				}
						
				return false;
			} else {
				if(zbldrData.selected.grab === type){
					zbldrData.mouseOver.first = false;
					zbldrData.mouseOver.last = false;
				}
				if(type === 'container') {
					zbldrData.mouseOver.containerID = false;
				} else if(type === 'row'){
					zbldrData.mouseOver.rowID = false;
				} else if(type === 'column') {
					zbldrData.mouseOver.colID = false;
				} else if(type === 'element') {
					zbldrData.mouseOver.elemID = false;
				} 
			}
		});
	}

	// Sorting: sets grabbed element type and pushes element object to selected.data.element to be used during mousemove
	$(document).on('mousedown', '.zbldr-settings-icons .fa-grip-horizontal', function(e){
		var element = $(this).parent().parent().parent();
		
		zbldrData.selected.grab = element.attr('data-type');
		zbldrData.selected.grabbedID = element.data('id');
		element.addClass('zbldr-grabbed-' + zbldrData.selected.grab);
		zbldrData.selected.element = element;

		var selectedIDs = zbldrReturnSelectedIDs($(this));
		zbldrUpdateSelectedIDs(selectedIDs);

		$('.zbldr-floating-toolbar').hide();
		e.stopPropagation();
	});

	// push container, row, column and element IDs to data.mouseOver object.  Used for sorting.
	$(document).on('mousemove', '.zbldr-wrapper', function(e){

		// display bar to indicate where placement will be
		if(zbldrData.selected.grab !== false) {

			$('.zbldr-empty-block').remove();

			var mouseY = e.pageY;
			var mouseX = e.pageX;

			// set all data and push to data object which container, rows or elements mouse is over		
			zbldrSetMouseOver('container', '.zbldr-container', '.zbldr-grabbed-container', mouseX, mouseY);
			zbldrSetMouseOver('row', '.zbldr-row', '.zbldr-grabbed-row', mouseX, mouseY);
			zbldrSetMouseOver('column', '.zbldr-column', '.zbldr-grabbed-column', mouseX, mouseY);
			zbldrSetMouseOver('element', '.zbldr-element', '.zbldr-grabbed-element', mouseX, mouseY);
		
			if(zbldrData.selected.type === 'element') {
				var element = $(".zbldr-element[data-container-id=" + zbldrData.mouseOver.containerID + "][data-row-id=" + zbldrData.mouseOver.rowID + "][data-column-id=" + zbldrData.mouseOver.colID + "][data-element-id=" + zbldrData.mouseOver.elemID + "]");
			} else if(zbldrData.selected.type === 'row'){
				var element = $(".zbldr-row[data-container-id=" + zbldrData.mouseOver.containerID + "][data-row-id=" + zbldrData.mouseOver.rowID + "]");
			} else if(zbldrData.selected.type === 'container') {
				var element = $(".zbldr-container[data-container-id=" + zbldrData.mouseOver.containerID + "]");
			}

			if(zbldrData.mouseOver.top === true) {
				element.before('<div class="zbldr-empty-block"></div>');
			} else if(zbldrData.mouseOver.bottom === true) {
				element.after('<div class="zbldr-empty-block"></div>');
			}
		}

	});

	// place selected container, row or element after mouseup
	$(document).on('mouseup', '.zbldr-wrapper', function(e){

		$(document).css('cursor', 'auto');

		var mouseY = e.pageY;
		var mouseX = e.pageX;

		selectedObj = zbldrReturnSelected(zbldrData.selected.type);

		if(zbldrData.selected.grab != false) {
			zbldrData.selected.element.css({	
				'z-index'	: 1,
				'opacity'	: 1,
				'box-sizing'	: 'border-box',
				'-moz-box-sizing'	: 'border-box',
				'-webkit-box-sizing'	: 'border-box',

			});
		}
		
		if(zbldrData.selected.grab === 'container'){
			var toSplice = zbldrPage.containers;
			var toSpliceRemove = zbldrPage.containers;
			var selected = zbldrData.selected.containerID;
			var mouseOver = zbldrData.mouseOver.containerID;

			// var ID = data.mouseOver.top === true ? ID : ID + 1;

			toSpliceRemove.splice(selected, 1);
			toSplice.splice(mouseOver, 0, selectedObj);

			$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
			zbldrUpdateHistory();
		}

		if(zbldrData.selected.grab === 'row' && typeof zbldrPage.containers[zbldrData.mouseOver.containerID] !== 'undefined'){
			var toSplice = zbldrPage.containers[zbldrData.mouseOver.containerID].rows;
			var toSpliceRemove = zbldrPage.containers[zbldrData.selected.containerID].rows;
			var selected = zbldrData.selected.rowID;
			var ID = parseInt(zbldrData.mouseOver.rowID);

			if(zbldrData.mouseOver.containerID !== zbldrData.selected.containerID){
				var ID = zbldrData.mouseOver.last && zbldrData.mouseOver.bottom === true ? ID + 1 : ID;
			}

			toSpliceRemove.splice(selected, 1);
			toSplice.splice(ID, 0, selectedObj);

			$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
			zbldrUpdateHistory();
		}

		if(zbldrData.selected.grab === 'element' && zbldrData.mouseOver.containerID !== false && zbldrData.mouseOver.rowID !== false){
			var toSplice = zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements;
			var toSpliceRemove = zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID].elements;
			var selected = zbldrData.selected.elemID;
			var ID = zbldrData.mouseOver.elemID;

			// Need to increment when moving elements between different rows and containers.  Not exactly sure why...
			if(zbldrData.mouseOver.containerID !== zbldrData.selected.containerID || zbldrData.mouseOver.rowID !== zbldrData.selected.rowID){
				var ID = zbldrData.mouseOver.top === true ? ID : ID + 1;
			}

			if(zbldrData.mouseOver.colID != false && zbldrData.mouseOver.elemID != false){

				if(zbldrData.selected.containerID === zbldrData.mouseOver.containerID && zbldrData.selected.rowID === zbldrData.mouseOver.rowID){
					if(zbldrData.selected.colID < zbldrData.mouseOver.colID && zbldrData.mouseOver.top === true){
						ID = ID - 1;
					} else if(zbldrData.selected.colID > zbldrData.mouseOver.colID && zbldrData.mouseOver.bottom === true){
						ID = ID + 1;
					}
				}

				toSpliceRemove.splice(selected, 1);
				toSplice.splice(ID, 0, selectedObj);
				zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements[ID].position = zbldrData.mouseOver.colID;
			} else if( zbldrData.mouseOver.elemID == false){
				if(typeof zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements[ID] === 'undefined'){
					ID = 0;
				}
				// row has no elements
				toSpliceRemove.splice(selected, 1);
				toSplice.splice(ID, 0, selectedObj);
				zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements[ID].position = zbldrData.mouseOver.colID;
			} else {
				toSpliceRemove.splice(selected, 1);
				toSplice.splice(ID, 0, selectedObj);
				zbldrPage.containers[zbldrData.mouseOver.containerID].rows[zbldrData.mouseOver.rowID].elements[ID].position = zbldrData.mouseOver.colID;
			}

			$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
			zbldrUpdateHistory();
		}

		$('.zbldr-row').removeClass('zbldr-grabbed-row');

		zbldrData.selected.grab = false;
		zbldrData.selected.element = false;

	});

	// Sorting: grab and drag rows on Y axis and elements on x and y axis
	$(document).on('mousemove', document, function(e){
		 if(zbldrData.selected.grab !== false){

		 	$(document).css('cursor', 'move');

		    toSort = zbldrData.selected.element;

		    var screenW = $(document).width();

		    var type = zbldrData.selected.type;
			var w = toSort.width();
			var h = toSort.height();

			var offset = toSort.offset();
			var offsetY = offset.top;

			var pageWrapperOffset = $('.zbldr-wrapper').offset();
			var pageWrapperOffsetY = pageWrapperOffset.top;
			
			var mouseY = e.pageY - $(window).scrollTop();
			var mouseX = e.pageX;

			toSort.css({
				'z-index' : 9999,
				'opacity' : 0.7,
			});

			toSort.css({
				position 	: 'fixed',
				top 		: mouseY - 16 + 'px',
				width 		: w + 'px',
				height 		: h + 'px',
				'box-sizing'	: 'content-box',
				'-moz-box-sizing'	: 'content-box',
				'-webkit-box-sizing'	: 'content-box',
			});

			if(zbldrData.selected.type == 'element') {
				toSort.css({
					left 		: mouseX - w + zbldrData.pageOffset.left + 'px',
				});
			}

			if(zbldrData.selected.type == 'container') {
				toSort.css({
					left 		: ( ( (screenW) / 2 ) + (zbldrData.pageOffset.left / 2) - (w / 2) ) + 'px',
				});
			}
		 }
	});
});



jQuery(document).ready(function($){

	/*******************************************************************************************/
	/********************************** GRAB DATA FOR TOOLBAR **********************************/
	/*******************************************************************************************/

	function zbldrToggleTools(tabID){
		var type = zbldrData.selected.type;
		var selectedObj = zbldrReturnSelected(zbldrData.selected.type);
		var elementType = selectedObj.type;
		var elementModel = zbldrReturnElementModel(elementType);

		$('.zbldr-accordion-option-content, .zbldr-accordion-option-header').hide();

		$('.zbldr-accordion-option-header').children('i').removeClass('fa-angle-up');
		$('.zbldr-accordion-option-header').children('i').addClass('fa-angle-down');

		var showFirstContent = true;

		$('.zbldr-accordion-option-header').each(function(index){

			var thisType = $(this).data('view-property');
			var forTabID = $(this).data('tab-id');

			if(type === 'container'){
				var tools = zbldrContainer.tools;
			} else if(type === 'row') {
				var tools = zbldrRow.tools;
			} else {
				var tools = elementModel.tools;
			}

			if(tools.indexOf(thisType) !== -1 && forTabID === tabID){
				$(this).show();
				if(showFirstContent === true) {
					$(this).children('i').addClass('fa-angle-up');
					$(this).next().show();
					showFirstContent = false;
				}
			}
		});
	}

	function zbldrToolbarDisplayLogic(){
		var selectedObj = zbldrReturnSelected(zbldrData.selected.type);

		if(zbldrData.selected.grab === false){
			$('.zbldr-floating-toolbar').fadeIn();
		}

		/********** TABS **********/

		$('.zbldr-tool-tab').removeClass('zbldr-tools-tab-active').first().addClass('zbldr-tools-tab-active');

		/********** ALIGNMENT **********/

		var align = $('.zbldr-align');
		align.removeClass('zbldr-selected-button');

		align.each(function(index){
			if(selectedObj.hasOwnProperty('align')){
				if(selectedObj.align === $(this).val()){
					$(this).addClass('zbldr-selected-button');
				}
			}
		});

		/********** TEXT INPUTS **********/

		if(selectedObj.hasOwnProperty('content')){
			tinymce.get("zbldr-toolbar-textarea").setContent(selectedObj.content);
		}

		var textInputs = $('.zbldr-toolbar-text');

		$(textInputs).each(function(index){
			if($(this).data('type') == 'link'){
				$(this).val(selectedObj.link);
			} else if($(this).data('type') == 'text'){
				$(this).val(selectedObj.content);
			} else if ($(this).data('type') == 'social-url' && selectedObj.type == 'social-media-icons'){
				for(i = 0; i < selectedObj.socialIcons.length; i++) {
					if($(this).data('name') == selectedObj.socialIcons[i].name ) {
						$(this).val(selectedObj.socialIcons[i].url);
					}
				}
			} else {
				$(this).val(selectedObj[$(this).data('property')]);
			}
		});

		/********** RANGE SLIDERS **********/

		var rangeSliderInputs = $('.zbldr-range-input');

		$(rangeSliderInputs).each(function(key, val){
			var val = '';
			var prop = $(this).data('key');
			var elemType = $(this).attr('data-element');

			val = zbldrReturnInputVal(selectedObj, elemType, prop);

			if(typeof val != 'undefined') {

				intVal = val.replace(/[^\d.-]/g, '');

				var rangeSlider = $(this).prev();

				var unit = zbldrReturnUnit(val);
				$(this).attr('data-unit', unit);

				if(unit == '%') {
					rangeSlider.attr('max', 100);
				} else {
					rangeSlider.attr('max', (intVal * 2) + 10);
				}

				$(this).val(intVal + unit);
				rangeSlider.val(intVal);

			}

		});

		/********** MULTI SELCT BUTTONS **********/

		var buttons = $('.zbldr-button-select, .zbldr-button-toggle');

		$(buttons).each(function(index){
			var styleValue = $(this).val();
			var styleType = $(this).attr('data-key');
			var tags = $(this).attr('data-element');

			var val = zbldrReturnInputVal(selectedObj, tags, styleType);

			if(val == styleValue){
				$(this).addClass('zbldr-selected-button');
				$(this).attr('data-status', 'true');
			} else {
				$(this).removeClass('zbldr-selected-button');
				$(this).attr('data-status', 'false');
			}

		});

		// apply styling to selected html tag selection buttons
		var tagButtons = $('.zbldr-button-tag-select').each(function(index){

			var tag = $(this).attr('data-tag');

			if(selectedObj.tag == tag) {
				$(this).addClass('zbldr-selected-button');
			} else {
				$(this).removeClass('zbldr-selected-button');
			}

		});

		// set toolbar font select to same as selected element
		$('select[data-key="font-family"]').val(selectedObj.style[zbldrData.view]['font-family']);

		// set toolbar font size select to same as selected element
		$('select[data-key="font-size"]').val(selectedObj.style[zbldrData.view]['font-size']);

		/********** COLORS **********/

		var colors = $(".zbldr-color-field");

		$(colors).each(function(index){

			var prop = $(this).attr('data-key');
			var elemType = $(this).attr('data-element');

			val = zbldrReturnInputVal(selectedObj, elemType, prop);

			$(this).spectrum("set", val);				

		});

		/********** IMAGES **********/

		var imgInputs = $('.zbldr-img-url').each(function(){
			var key = $(this).attr('data-key');

			if(key === 'src'){
				if(selectedObj.hasOwnProperty('attr')) {
					$(this).val(selectedObj.attr.src);
				}
			} else if(key === 'background-image'){
				if(selectedObj.style[zbldrData.view]['background-image'].length > 0 && selectedObj.style[zbldrData.view]['background-image'] !== 'none' && selectedObj.style[zbldrData.view]['background-image'] !== ''){
					$('.zbldr-bg-img-preview').show();
					$('.zbldr-bg-img-preview').css('background-image', selectedObj.style[zbldrData.view]['background-image']);
					var cleanUrl = selectedObj.style[zbldrData.view]['background-image'].slice(0, -1);
					cleanUrl = cleanUrl.replace('url(', '');
					$(this).val(cleanUrl);
				} else {
					$('.zbldr-bg-img-preview').hide();
					$(this).val('');
				}

				
			}
		});	

		/********** NUMBERS **********/

		// push object properties to inputs
		var inputs = $('.zbldr-input-number');
		$(inputs).each(function(index){

			var val = '';
			var prop = $(this).attr('data-key');
			var elemType = $(this).attr('data-element');

			if(elemType.indexOf(',') !== -1){	
				var tagsArray = elemType.split(',');
			} else {
				var tagsArray = [elemType];
			}

			var val = zbldrReturnInputVal(selectedObj, elemType, prop);

			if(val == 'auto') {
				$(this).val('auto');
				$(this).data('unit', '');
			} else {
				var intVal = val.replace(/[^\d.-]/g, '');
				var unit = zbldrReturnUnit(val);	
				$(this).val(intVal + unit);
				$(this).data('unit', unit);
			}

		});

		/********** SELECTS **********/

		var inputs = $('.zbldr-select');
		$(inputs).each(function(index){
			var tags = $(this).data('element');
			var prop = $(this).attr('data-key');

			var val = zbldrReturnInputVal(selectedObj, tags, prop);
			$(this).val(val);
		});

		/********** CUSTOM CSS **********/

		iblize.setValue(selectedObj.css[zbldrData.view]);
		$('#zbldr-custom-css-id-label').html('.zbldr-' + zbldrData.selected.type + '-' + selectedObj.ID); // shows CSS ID of slected element
		
		/********** CUSTOM ID AND CLASS **********/

		$('#zbldr-css-id').val(selectedObj.css.id);
		$('#zbldr-css-class').val(selectedObj.css.class);

		/********** BACKGROUND IMAGE **********/

		$('.zbldr-bg-img-wrapper').css('background-image', selectedObj.style[zbldrData.view]['background-image']);

		/********** TOOL DISPLAY **********/

		zbldrToggleTools(0);

		$('.zbldr-element-type-toolbar').fadeOut();
	}



	/*******************************************************************************************/
	/******************************************* INIT ******************************************/
	/*******************************************************************************************/



	/********** TinyMCE Editor **********/

	tinymce.init({
	  selector: '#zbldr-toolbar-textarea',
	  height: 260,
	  plugins: 'link',
	  menubar: 'insert',
	  toolbar: 'undo redo | bold italic underline strikethrough | removeformat | link',
	  init_instance_callback: function (editor) {
	    editor.on('keyup click', function (e) {
	    	var type = zbldrData.selected.type;
			var selected = zbldrReturnSelected(type);
			var val = tinymce.activeEditor.getContent();
			var inputType = $(this).attr('data-type');
	      	selected.content = val;
	      	$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
	      	zbldrUpdateHistory();
	    });
	  }
	});

	/********** CSS CODE EDITOR **********/

	$('.zbldr-toolbar-css').height('420px');

	const iblize = new Iblize(".zbldr-toolbar-css", {
	    language: "css",
	});

	const iblizePageCSS = new Iblize("#zbldr-custom-page-css", {
	    language: "css",
	});

	iblizePageCSS.setValue(zbldrPage.css);

	$(".zbldr-floating-toolbar").draggable({
		containment	: "window",
		//handle 		: '.zbldr-floating-toolbar',
		cancel 		: '.zbldr-accordion-option-content',
	});

	$("#zbldr-css-modal .modal-content").draggable({
		containment: "window"
	});

	$('.zbldr-floating-toolbar').hide();



	/*******************************************************************************************/
	/****************************** PUSH DATA AND DISPLAY LOGIC *******************************/
	/******************************************************************************************/



	iblize.onUpdate((value) => {
	  	var type = zbldrData.selected.type;
		var selectedObj = zbldrReturnSelected(type);
		selectedObj.css.desktop = value;
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	iblizePageCSS.onUpdate((value) => {
	  	zbldrPage.css = value;
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$('.zbldr-css').click(function(){
		iblizePageCSS.setValue(zbldrPage.css);
	});

    $(document).on('keyup', '.zbldr-range-input', function(){

        value = $(this).val();
        intValue = value.replace(/[^\d.-]/g, '');
        unit = zbldrReturnUnit(value);
        textInput = $(this).prev();
        elemType = $(this).data('element');

        var unit = zbldrReturnUnit(value);
       $(this).attr('data-unit', unit);

        // set unit of measurement
        if(unit == '%') {
           textInput.attr('max', 100);
        } else {
        	textInput.attr( 'max', (intValue * 2) );
        }  

        var finalVal = intValue + unit;

        $(this).prev().val(intValue);
        textInput.val(finalVal);

        elem = zbldrReturnSelected(zbldrData.selected.type);
        styleType = $(this).data('key');

        zbldrPushStyles(elem, elemType, styleType, finalVal);

        $(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
        zbldrUpdateHistory();
        
    });

	$(document).on('input change', '.zbldr-range', function(){
        var val = $(this).val();
        var intValue = val.replace(/[^\d.-]/g, '');
        var unit = $(this).next().attr('data-unit');
        var tags = $(this).next().attr('data-element');

        var elem = zbldrReturnSelected(zbldrData.selected.type);
        var styleType = $(this).next().data('key');

        finalVal = intValue + unit;

      	zbldrPushStyles(elem, tags, styleType, finalVal);

        $(this).next().val(val + unit);

        $(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
        zbldrUpdateHistory();
        
    });

	$(document).on('click', '.zbldr-tool-tab', function(){
		var tabID = $(this).data('id');
		zbldrToggleTools(tabID);
		$('.zbldr-tool-tab').removeClass('zbldr-tools-tab-active');
		$(this).addClass('zbldr-tools-tab-active');
	});

	$(document).on('click', '.zbldr-accordion-option-header', function(){

		$('.zbldr-accordion-option-header').children('i').removeClass('fa-angle-up');
		$('.zbldr-accordion-option-header').children('i').addClass('fa-angle-down');
		$(this).children('i').addClass('fa-angle-up');

		$('.zbldr-accordion-option-content').hide();
		$(this).next().show();
		var height = $(this).next().height();
		
		$(this).next().css('height', 0);
		$(this).next().animate({
			'height'	: height + 40,
		}, 500, 'swing');

	});

	$('.zbldr-css, .zbldr-send, .zbldr-export-json, .zbldr-import-json').click(function(){
		$('.zbldr-floating-toolbar').fadeOut();
	});

	// modal content

	$('.zbldr-open-modal').click(function(){
		var clicked = $(this);
		var modalSize = $(this).data('modal-size');
		var clickedModalType = $(this).data('modal-type');

		$('.zbldr-modal-dialog').removeClass('modal-sm modal-md modal-lg modal-xl');
		$('.zbldr-modal-dialog').addClass(modalSize);

		var allModals = $('.zbldr-modal-content');
		allModals.each(function(){
			if($(this).data('modal-type') === clickedModalType){
				$(this).show();
				$('.zbldr-modal-title').html(clicked.attr('title'));
			} else {
				$(this).hide();
			}
		});
	});

	// dynamic text to textarea

	$('.zbldr-dynamic-text').click(function(){
		var val = $(this).val();
		var content = tinymce.activeEditor.getContent();
		tinymce.activeEditor.setContent(content + val);
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	// undo and redo

	$('.zbldr-undo').click(function(){

		if(zbldrData.history.length > 0) {

			if(zbldrData.historyPos !== null && zbldrData.historyPos > 1) {
				zbldrData.historyPos = zbldrData.historyPos - 1;
				zbldrPage.containers = JSON.parse(JSON.stringify(zbldrData.history[zbldrData.historyPos]));
			}
			
			$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
			zbldrHistoryButtonDisplayLogic();

		}
	});

	$('.zbldr-redo').click(function(){

		if(zbldrData.history.length > 0) {

			if(zbldrData.historyPos !== null && zbldrData.historyPos !== zbldrData.history.length - 1){
				zbldrData.historyPos = parseInt(zbldrData.historyPos) + 1;
				zbldrPage.containers = JSON.parse(JSON.stringify(zbldrData.history[zbldrData.historyPos]));
			}

			jQuery(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
			zbldrHistoryButtonDisplayLogic();

		}

	});

	$('.zbldr-phone').click(function(){
		$(zbldrData.selector).animate({
			width: phoneBreakPoint,
		});
		zbldrData.view = 'mobile';
		zbldrData.builderView = 'full';
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$('.zbldr-tablet').click(function(){
		$(zbldrData.selector).animate({
			width: tabletBreakPoint,
		});
		zbldrData.view = 'tablet';
		zbldrData.builderView = 'full';
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$('.zbldr-desktop').click(function(){
		$(zbldrData.selector).animate({
			width: '100%',
		});
		zbldrData.view = 'desktop';
		zbldrData.builderView = 'full';
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$('.zbldr-simple').click(function(){
		$(zbldrData.selector).css({
			width: '80%',
		});
		zbldrData.builderView = 'simple';
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$(".zbldr-color-field").spectrum({
	  type: "color",
	  showInput: true,
	  allowEmpty:true,
	  preferredFormat: "rgb",
	  change : function() {
	  	$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
	  	zbldrUpdateHistory();
	  },
	  move : function(color) {

	  		var type = zbldrData.selected.type;
	  		var styleType = $(this).attr('data-key');
	  		selectedObj = zbldrReturnSelected(type);
	  		var tags = jQuery(this).data('element');

	  		zbldrPushStyles(selectedObj, tags, styleType, color.toRgbString())
	  		
	  		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
	  		zbldrUpdateHistory();
	  		
	  	}
	});

	$('.zbldr-element-type-header .fa-times').click(function(){
		$(this).parent().parent().fadeOut();
		zbldrClearAllDataSelected();
	});

	$('.zbldr-delete-image-button').click(function(e){
			var preview = $(this).next();
			preview.hide();
			preview.css('background-image', 'none');

			var input = $(this).prev().prev();
			var key = input.data('key');
			input.val('');
			var type = zbldrData.selected.type;
	  		var selected = zbldrReturnSelected(type);
	  		if( key === 'src'){
				selected.attr.src = '';
	  		} else if( key === 'background-image') {
	  			selected.style[zbldrData.view]['background-image'] = '';
	  		}
	  		
	  		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
	  		zbldrUpdateHistory();
	  		
	  		e.preventDefault();
	});

	$(document).on('keyup', '#zbldr-css-class', function(){
		var type = zbldrData.selected.type;
		var selected = zbldrReturnSelected(type);
		var val = $(this).val();
		selected.css.class = val;
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$(document).on('keyup', '#zbldr-css-id', function(){
		var type = zbldrData.selected.type;
		var selected = zbldrReturnSelected(type);
		var val = $(this).val();
		
		selected.css.id = val;
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	$(document).on('keyup', '.zbldr-toolbar-text', function(){
		var type = zbldrData.selected.type;
		var selected = zbldrReturnSelected(type);
		var val = $(this).val();
		var inputType = $(this).attr('data-type');

		if(inputType == 'social-url') {
			for(i = 0; i < selected.socialIcons.length; i++) {
				if($(this).data('name') === selected.socialIcons[i].name){
					selected.socialIcons[i].url = val;
				}
			}
		} else {
			selected[$(this).data('property')] = val;
		}

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
	});

	$(document).on('keyup', '.zbldr-img-url', function(){
		var selectedObject = zbldrReturnSelected(zbldrData.selected.type);
		var key = $(this).data('key');
		var preview = $(this).siblings('.zbldr-bg-img-preview');

		if($(this).val() === ''){
			preview.hide();
			preview.css('background-image', 'none');
		} else {
			preview.show();
		}

		if( key === 'src'){
			selectedObject.attr.src = $(this).val();
  		} else if( key === 'background-image') {
  			selectedObject.style[zbldrData.view]['background-image'] = 'url(' + $(this).val() + ')';
  		}

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	/********** ALIGN **********/

	$('.zbldr-align').click(function(){
		var type = zbldrData.selected.type;
		var selected = zbldrReturnSelected(type);
		var val = $(this).val();
		var left = $('*[data-key="margin-left"]');
		var right = $('*[data-key="margin-right"]');

		$('.zbldr-align').removeClass('zbldr-selected-button');

		if(val === 'left') {
			selected.style[zbldrData.view]['margin-left'] = '0';
			selected.style[zbldrData.view]['margin-right'] = 'auto';
			selected.align = 'left';
			left.val('0');
			right.val('auto');
			$(this).addClass('zbldr-selected-button');
		} else if(val === 'center') {
			selected.style[zbldrData.view]['margin-left'] = 'auto';
			selected.style[zbldrData.view]['margin-right'] = 'auto';
			selected.align = 'center';
			left.val('auto');
			right.val('auto');
			$(this).addClass('zbldr-selected-button');
		} else if(val === 'right') {
			selected.style[zbldrData.view]['margin-left'] = 'auto';
			selected.style[zbldrData.view]['margin-right'] = '0';
			selected.align = 'right';
			left.val('auto');
			right.val('0');
			$(this).addClass('zbldr-selected-button');
		}

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();

	});

	/********** CLONE **********/

	$(document).on('click', '.zbldr-container-clone, .zbldr-row-clone, .zbldr-elem-clone', function(e){
		zbldrClone($(this).parent().parent().parent());
		$('.zbldr-element-type-toolbar').fadeOut();
		$('.zbldr-floating-toolbar').fadeOut();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		e.stopPropagation();
	});

	/********** TRASH **********/

	$('.zbldr-bg-tools .fa-trash').click(function(e){
		var element = $(this).parent().parent().parent();
		var prop = $(this).attr('data-key');
		var type = zbldrData.selected.type;
		var selected = zbldrReturnSelected(type);
		element.attr('style', '');
		selected.style[zbldrData.view][prop] = 'none';
		$('.zbldr-bg-img-wrapper').css('background-image', 'none');
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
		e.stopPropagation();
	});

	$(document).on('click', '.zbldr-container .fa-trash, .zbldr-row .fa-trash, .zbldr-element .fa-trash', function(e){
		var selectedIDs = zbldrReturnSelectedIDs($(this));
		zbldrUpdateSelectedIDs(selectedIDs);
		var selectedArray = zbldrReturnSelectedArray(selectedIDs.type);
		var index = zbldrReturnSelectedIndex(selectedIDs.type);
		selectedArray.splice(index, 1);
		zbldrClearAllDataSelected();

		$('.zbldr-element-type-toolbar').fadeOut();
		$('.zbldr-floating-toolbar').fadeOut();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
		e.stopPropagation();
	});

	/********** ADD **********/

	// add container, row or element for already populated c,r or e's.
	$(document).on('click', '.zbldr-settings-icons .fa-plus, .zbldr-empty-icon', function(e){
		zbldrData.IDCounter = zbldrData.IDCounter + 1;
		var selectedIDs = zbldrReturnSelectedIDs($(this));
		zbldrUpdateSelectedIDs(selectedIDs);

		if(selectedIDs.type === 'container') {
			zbldrAddContainer(selectedIDs.containerID);
		} else if(selectedIDs.type === 'row') {
			zbldrAddRow(selectedIDs.containerID, selectedIDs.rowID);
			zbldrData.selected.rowID = zbldrData.selected.rowID + 1;
			var pos = $(this).offset();

			$('.zbldr-column-type-toolbar').css({
				top : (pos.top) + 'px',
				left : pos.left - ($('.zbldr-column-type-toolbar').outerWidth() / 2 + 160) + 'px'
			});

			$('.zbldr-column-type-toolbar').fadeIn();
			$('.zbldr-floating-toolbar').fadeOut();

		} else if(selectedIDs.type === 'element') {
			var pos = $(this).offset();
			var w = $('.zbldr-element-type-toolbar').outerWidth();

			$('.zbldr-element-type-toolbar').css({
				top : pos.top + 'px',
				left : (pos.left - 164) - (w/2) + 'px'
			});
			//bldToolbarDisplayLogic();
			$('.zbldr-element-type-toolbar').fadeIn();
			$('.zbldr-floating-toolbar').fadeOut();
		}

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
		e.stopPropagation();
	});

	$('.zbldr-add-element').click(function(e){
		var mouseY = e.pageY;
		var mouseX = e.pageX;
		var toolbarCenterX = $('.zbldr-floating-toolbar').width() / 2;

		var cID = zbldrData.selected.containerID;
		var rID = zbldrData.selected.rowID;
		var colID = zbldrData.selected.colID;
		var eID = parseInt(zbldrData.selected.elemID);

		var elemType = $(this).val();

		zbldrAddElement(cID, rID, eID, elemType, colID);
		zbldrData.selected.elemID = parseInt(zbldrData.selected.elemID) + 1;
		zbldrToolbarDisplayLogic();
		$('.zbldr-element-type-toolbar').fadeOut();
		$('.zbldr-floating-toolbar').fadeIn();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
	});

	// column type selection

	$('.zbldr-column-button').click(function(e){
		var val = $(this).val();
		var array = val.split(',').map(Number);
		var selectedObj = zbldrReturnSelected('row');
		selectedObj.columns = array;
		// if an element is placed in a column position that is greater than columns that now exist from current selection, move to last column
		for(e=0; e<zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID].elements.length; e++){
			if((parseInt(zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID].elements[e].position) + 1) > array.length){
				zbldrPage.containers[zbldrData.selected.containerID].rows[zbldrData.selected.rowID].elements[e].position = array.length - 1;
			}
		}

		el = $(this).parent().parent().parent().fadeOut();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
		e.stopPropagation();
	});

	$(document).on('click', '.zbldr-row .fa-columns', function(e){
		zbldrData.selected.status = true;
		var selectedIDs = zbldrReturnSelectedIDs($(this));
		zbldrUpdateSelectedIDs(selectedIDs);

		var pos = $(this).offset();

		$('.zbldr-column-type-toolbar').css({
			top : (pos.top + 38) + 'px',
			left : pos.left - ($('.zbldr-column-type-toolbar').outerWidth() / 2 - 16) + 'px'
		});

		$('.zbldr-column-type-toolbar').fadeIn();

		$('.zbldr-floating-toolbar').fadeOut();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		e.stopPropagation();
	});

	$('.zbldr-toolbar-close').click(function(){
		$('.zbldr-floating-toolbar').fadeOut();
		zbldrClearAllDataSelected();
	});

	$(document).on('click', '.zbldr-selectable', function(e){
		var selectedIDs = zbldrReturnSelectedIDs($(this));
		zbldrUpdateSelectedIDs(selectedIDs);
		zbldrToolbarDisplayLogic();
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		e.stopPropagation();
	});

	$('.zbldr-button-select').click(function(){
		var type = zbldrData.selected.type;
		var styleType = $(this).attr('data-key');
		var val = $(this).val();
		var selected = zbldrReturnSelected(type);
		var tags = $(this).attr('data-element');

		zbldrPushStyles(selected, tags, styleType, val);

		$(this).siblings().removeClass('zbldr-selected-button');
		if($(this).hasClass('zbldr-selected-button') === false){
			$(this).toggleClass('zbldr-selected-button');
		}

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
	});

	$('.zbldr-button-tag-select').click(function(){
		var type = zbldrData.selected.type;
		var tag = $(this).attr('data-tag');
		var selectedObj = zbldrReturnSelected(type);
		selectedObj.tag = tag;
		$(this).siblings().removeClass('zbldr-selected-button');
		if($(this).hasClass('zbldr-selected-button') === false){
			$(this).toggleClass('zbldr-selected-button');
		}
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
	});

	$('.zbldr-select').change(function(){

		var styleType = $(this).attr('data-key');
		var type = zbldrData.selected.type;
		var obj = zbldrReturnSelected(type);
		var tags = $(this).attr('data-element');
		var styleValue = $(this).val();

		zbldrPushStyles(obj, tags, styleType, styleValue);

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();

	});

	$(document).on('keyup click', '.zbldr-input-number', function(){
		var val = $(this).val();
		intValue = val.replace(/[^\d.-]/g, '');
		var inputUnit = zbldrReturnUnit(val);

		if(inputUnit !== '') {
			$(this).attr('data-unit', inputUnit);
		}

		var finalVal = intValue + inputUnit;

		var styleType = $(this).attr('data-key');
		var tags = $(this).attr('data-element');
		var type = zbldrData.selected.type;
		var selectedObj = zbldrReturnSelected(type);

		zbldrPushStyles(selectedObj, tags, styleType, finalVal);

		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();
		
	});

	$('.zbldr-button-toggle').click(function(){

		var tags = $(this).attr('data-element');
		var styleType = $(this).attr('data-key');
		var styleValue = $(this).val();
		var type = zbldrData.selected.type;
		var selectedObj = zbldrReturnSelected(type);
		$(this).toggleClass('zbldr-selected-button');
    
		if($(this).attr('data-status') == 'false') {
			$(this).attr('data-status', true);
		} else {
			$(this).attr('data-status', false);
			styleValue = $(this).attr('data-false-val');
		}

		zbldrPushStyles(selectedObj, tags, styleType, styleValue);
		
		$(zbldrData.selector).html(zbldrRenderPage(zbldrPage.containers));
		zbldrUpdateHistory();

	});

});



/*******************************************************************************************/
/*************************************** RENDERING ****************************************/
/******************************************************************************************/



function zbldrRenderElementSelectToolbar(zbldrElements){
	var html = '<div class="zbldr-element-type-toolbar" style="display: none;">';
	html += '<h3 class="zbldr-element-type-header">Insert Element <i style="float:right;" class="fa fa-times"></i></h3>';
	html += '<div class="zbldr-element-type-toolbar-content">';

	for(e=0; e<zbldrElements.length; e++) {
		if(zbldrData.elements.indexOf(zbldrElements[e].type) !== -1){
			html += '<div class="zbldr-6">';
				html += '<button type="button" value="' + zbldrElements[e].type + '" class="zbldr-add-element"><i class="' + zbldrElements[e].icon + '"></i> ' + zbldrElements[e].name + '</button>';
			html += '</div>';
		}
	}
	return html;
}

function zbldrRenderColumnSelectButtons(zbldrColumns){
	var html = '<div class="zbldr-column-type-toolbar" style="display: none;">';
		html += '<h3 class="zbldr-element-type-header">Column Layout <i style="float:right;" class="fa fa-times"></i></h3>';
		html += '<div class="zbldr-column-type-content">';
		for(c=0; c<zbldrColumns.length; c++) {
			html += '<div class="zbldr-4"><button class="zbldr-column-button ' + zbldrColumns[c].class + '" type="button" value="' + zbldrColumns[c].columns.toString() + '"></button></div>';
		}
		html += '</div>';
		html += '</div>';
		return html;
}

function zbldrRenderUI(zbldrUI){
	var toolbar = '';
	for(i=0; i<zbldrUI.length; i++){
		for(t=0; t<zbldrUI[i].toolbars.length; t++) {
			var outerTag = zbldrUI[i].toolbars[t].tag;
			var outerAttributes = zbldrInlineAttr(zbldrUI[i].toolbars[t].attr);

			toolbar += zbldrUI[i].toolbars[t].before;

			toolbar += '<' + outerTag + ' ' + outerAttributes + '>';

				if(zbldrUI[i].toolbars[t].hasOwnProperty('tools')){
					for(tool=0; tool<zbldrUI[i].toolbars[t].tools.length; tool++){
						var tag = zbldrUI[i].toolbars[t].tools[tool].tag;
						var icon = zbldrUI[i].toolbars[t].tools[tool].icon;
						var attributes = zbldrInlineAttr(zbldrUI[i].toolbars[t].tools[tool].attr);

						if(zbldrPage.responsive == "false" && zbldrUI[i].toolbars[t].tools[tool].responsiveOnly !== true ) {
							if(tag === 'input'){
								toolbar += '<' + tag + ' ' + attributes + '/>';
							} else {
								toolbar += '<' + tag + ' ' + attributes + '><i class="' + icon + '"></i></' + tag + '>';
							}
						} 
					}
				}
				
			toolbar += '</' + outerTag + '>';

			toolbar += zbldrUI[i].toolbars[t].after;
		}
	}
	return toolbar;
}

function zbldrRenderTools(zbldrTools){
	var html = '<div class="zbldr-floating-toolbar">';
	html += '<ul class="zbldr-tools-tabs"><li class="zbldr-tool-tab zbldr-tools-tab zbldr-tools-tab-active" data-id="0">Content</li><li class="zbldr-tool-tab zbldr-tools-tab" data-id="1">Design</li></ul>';
	html += '<div class="zbldr-tools-accordion zbldr-tool-tab-content">';

	for(t=0; t<zbldrTools.length; t++){
		if(zbldrPage.responsive == "false" && zbldrTools[t].responsiveOnly === true ){

		} else {
			html += '<h3 class="zbldr-accordion-option-header" data-view-property="' + zbldrTools[t].type + '" data-tab-id="' + zbldrTools[t].tabID + '">' + zbldrTools[t].type.replaceAll('-', ' ') + '<i class="fa-solid fa-angle-up"></i></h3>';
			html += '<div class="zbldr-accordion-option-content" data-show="true" data-tab-id="' + zbldrTools[t].tabID + '">';

			for(o=0; o<zbldrTools[t].options.length; o++){ 

				if(zbldrPage.responsive == "false" && zbldrTools[t].options[o].responsiveOnly !== true ) {

					html += '<div class="zbldr-accordion-single-option">';

					if(typeof zbldrTools[t].options[o].label !== 'undefined') {
						html += '<label>' + zbldrTools[t].options[o].label + '</label><br>';				
					}

					html += zbldrTools[t].options[o].hasOwnProperty('before') === true ? zbldrTools[t].options[o].before : '';

					for(i=0; i<zbldrTools[t].options[o].inputs.length; i++) {
						var inputType = zbldrTools[t].options[o].inputs[i].tag;
						var attributes = zbldrInlineAttr(zbldrTools[t].options[o].inputs[i].attr);

						html += zbldrTools[t].options[o].inputs[i].hasOwnProperty('before') === true ? zbldrTools[t].options[o].inputs[i].before : '';

						if(inputType === 'select'){

							html += '<select ' + attributes + '>';

							if(zbldrTools[t].options[o].inputs[i].attr['data-key'] === 'font-family') {
								var options = zbldrData.fonts;
								for(option = 0; option < options.length; option++){
									var val = options[option];
									html += '<option style="font-family:' + val + ';" value="' + val + '">' + val + '</option>';
								}
							} else {
								options = zbldrTools[t].options[o].inputs[i].options;
								for(option = 0; option < options.length; option++){
									var val = options[option];
									html += '<option value="' + val + '">' + val + '</option>';
								}
							}
							
							html += '</select>';
						} else if(inputType === 'input') {
							html += '<input ' + attributes + '/>';
						} else if(inputType === 'button') {
							var icon = zbldrTools[t].options[o].inputs[i].hasOwnProperty('icon') === true ? '<i class="' + zbldrTools[t].options[o].inputs[i].icon + '"></i>' : '';
							var text = zbldrTools[t].options[o].inputs[i].text;
							html += '<button ' + attributes + '>' + icon + text + '</button>';
						} else {
							html += '<' + inputType + ' ' + attributes + '></' + inputType + '>';
						}

						html += zbldrTools[t].options[o].inputs[i].hasOwnProperty('after') === true ? zbldrTools[t].options[o].inputs[i].after : '';

					} // end for loop inputs

					html += zbldrTools[t].options[o].hasOwnProperty('after') === true ? zbldrTools[t].options[o].after : '';

					html += '</div>'; // single option	
				} // end if responsive single option
	
			} // end for loop options

			html += '</div>'; // option content
		} // end if responsive option

	}

	html += '</div>'; // tab content
	html += '<button type="button" class="zbldr-toolbar-save">Save</button><button type="button" class="zbldr-toolbar-close">Close</button>';
	html += '</div>'; // toolbar

	return html;

}

function zbldrRenderCSS(containers){
	// takes all style properties and custom css and prepares to include in <style> element in header
	css = '';
	for(c=0; c<containers.length; c++){
		css += '.zbldr-container-' + containers[c].ID + ' {';
			Object.keys(containers[c].style.desktop).forEach(
				el => css += el + ':' + containers[c].style.desktop[el] + ';'
			);
			css += containers[c].css.desktop;
		css += '} ';
		for(r=0; r<containers[c].rows.length; r++){
			css += '.zbldr-row-' + containers[c].rows[r].ID + ' {';
				Object.keys(containers[c].rows[r].style.desktop).forEach(
					el => css += el + ':' + containers[c].rows[r].style.desktop[el] + ';'
				);
				css += containers[c].css.desktop;
			css += '} ';
			for(e=0; e<containers[c].rows[r].elements.length; e++){

				var parentClass = '.zbldr-element-' + containers[c].rows[r].elements[e].ID;
				var cssParent = '';

				var cssChildren = '';
				const keys = Object.keys(containers[c].rows[r].elements[e].style.desktop);
				keys.forEach((key, index) => {
					if(typeof containers[c].rows[r].elements[e].style.desktop[key] != 'object'){ // css applied to element and NOT child elements
						cssParent += key + ':' + containers[c].rows[r].elements[e].style.desktop[key] + ';';
					} else { // css applied to child elements

						var parentKey = key;
						var childClass = '.zbldr-element-' + containers[c].rows[r].elements[e].ID + ' ' + parentKey;

						children = Object.keys(containers[c].rows[r].elements[e].style.desktop[key]);
						children.forEach((key, index) => {
							cssChildren += key + ':' + containers[c].rows[r].elements[e].style.desktop[parentKey][key] + ';';
						});

						css += childClass + '{ ' + cssChildren + '}';

						cssChildren = '';

					}
				});

				/*if(containers[c].rows[r].elements[e].type == 'image') {
					css += parentClass + ' img { width: ' + containers[c].rows[r].elements[e].style.desktop.width + ' }';
				}*/

				css += parentClass + '{ ' + cssParent + ' }';
				css += parentClass + '{ ' + containers[c].rows[r].elements[e].css.desktop + ' }'; // adds custom element CSS from code editor

			}
		}
	}

	css += zbldrPage.css; // custom css applied to whole page

	return css;

}

function zbldrRenderPage(containers, responsive = true){

	console.log(zbldrPage);

	var html = '<div class="zbldr-alert"></div>';

	if (typeof zbldrBeforeRenderPage == "function") { zbldrBeforeRenderPage(); }

	headerCSS = zbldrRenderCSS(zbldrPage.containers);

	html += '<div class="zbldr-wrapper">';

	if(zbldrData.builderView === 'full'){

		/********** FULL PAGE RENDERING **********/

		if(zbldrPage.containers.length === 0) {
			html += '<div class="zbldr-container-empty-icon" data-column-id="-1" data-type="container"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
		} else {

			/********** CONTAINERS **********/

			for(c=0; c<zbldrPage.containers.length; c++){

				var cID = 'zbldr-container-' + zbldrPage.containers[c].ID;
				var customClass = zbldrPage.containers[c].css.class;
				var customID = zbldrPage.containers[c].css.id;
				const outerContainerStyle = 'style="width: ' + zbldrPage.containers[c].style.desktop['width'] + '; max-width: ' + zbldrPage.containers[c].style.desktop['max-width'] + '; margin-top: ' + zbldrPage.containers[c].style.desktop['margin-top'] + '; margin-bottom: ' + zbldrPage.containers[c].style.desktop['margin-bottom'] + '; margin-left: ' + zbldrPage.containers[c].style.desktop['margin-left'] + '; margin-right: ' + zbldrPage.containers[c].style.desktop['margin-right'] + ';"'; 

				html += '<div ' + outerContainerStyle + ' data-id="' + c + '" data-container-id="' + c + '" data-type="container" class="zbldr-container zbldr-container-sortable' + zbldrPage.containers[c].class + ' zbldr-container zbldr-selectable"><div style="margin: 0; width: 100%; max-width: 100%" id="' + customID + '" class="zbldr-container-inner ' + cID + ' ' + customClass + '">';

				html += '<div class="zbldr-container-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-container-clone"></i><i class="fa fa-trash"></i></div>';

				if(zbldrPage.containers[c].rows.length === 0){
					html += '<div class="zbldr-row-empty-icon" data-container-id="' + c + '" data-row-id="-1" data-type="row"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
				}

				/********** ROWS **********/

				for(r=0; r < zbldrPage.containers[c].rows.length; r++){

					var rID = 'zbldr-row-' + zbldrPage.containers[c].rows[r].ID;
					var customClass = zbldrPage.containers[c].rows[r].css.class;
					var customID = zbldrPage.containers[c].rows[r].css.id;

					html += '<div class="zbldr-row zbldr-selectable zbldr-row-sortable" data-container-id="' + c + '" data-row-id="' + r + '" data-id="' + r + '" data-type="row" data-selected="' + zbldrPage.containers[c].rows.selected + '"><div id="' + customID + '" class="zbldr-row-inner ' + rID + ' ' + customClass + '">';
					html += '<div class="zbldr-row-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-columns" aria-hidden="true"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-row-clone"></i><i class="fa fa-trash"></i></div>';

					/********** COLUMNS **********/

					for(col=0; col<zbldrPage.containers[c].rows[r].columns.length; col++){
						if(zbldrPage.containers[c].rows[r].elements){

							var colClass = zbldrPage.responsive === true ? 'zbldr-' + zbldrPage.containers[c].rows[r].columns[col] : 'zbldr-td-' + zbldrPage.containers[c].rows[r].columns[col];
							html += '<div class="zbldr-column zbldr-column-' + col + ' ' + colClass + '" data-column-id="' + col + '"  data-id="' + col + '">';
							
							/********** ELEMENTS **********/

							for(e=0; e<zbldrPage.containers[c].rows[r].elements.length; e++){

								var elementModel = zbldrReturnElementModel(zbldrPage.containers[c].rows[r].elements[e].type);

								var customClass = zbldrPage.containers[c].rows[r].elements[e].css.class;
								var customID = zbldrPage.containers[c].rows[r].elements[e].css.id;

								if(col == zbldrPage.containers[c].rows[r].elements[e].position){

									var editableClass = zbldrPage.containers[c].rows[r].elements[e].editable == 'false' ? 'zbldr-not-editable' : 'zbldr-editable';
									
									html += '<div class="' + zbldrPage.containers[c].rows[r].elements[e].css.class + ' zbldr-element zbldr-selectable ' + editableClass + ' ' + '" data-container-id="' + c + '" data-row-id="' + r + '" data-column-id="' + col + '" data-element-id="' + e + '" data-id="' + e + '" data-type="element"><div id="' + customID + '" class="zbldr-element-inner' + ' ' + customClass + '">';
									html += '<div class="zbldr-element-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-elem-clone"></i><i class="fa fa-trash"></i></div>';
									
									html += '<div class="zbldr-element-content">';
									html += elementModel.render(zbldrPage.containers[c].rows[r].elements[e]);
									html += '</div>';
									
									html += '</div></div>'; // element
									
								}
							}

							/********** END ELEMENTS **********/

						}
						if(zbldrPage.containers[c].rows[r].elements.length === 0){
							var emptyElemID = -1;
						} else {
							var emptyElemID = zbldrPage.containers[c].rows[r].elements.length - 1;
						}
						html += '<div class="zbldr-element-empty-icon" data-container-id="' + c + '" data-row-id="' + r + '" data-column-id="' + col + '" data-element-id="' + emptyElemID + '"  data-id="' + col + '" data-type="element"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
						html += '</div>'; // column
					}

					/********** END COLUMNS **********/

					html += '</div></div>'; // row

				}

				/********** END ROWS **********/

				html += '</div></div>'; // container

			}

			/********** END CONTAINERS **********/

		}

	} else {

		/********** SIMPLE PAGE RENDERING **********/

		if(zbldrPage.containers.length === 0) {
			html += '<div class="zbldr-container-empty-icon" data-column-id="-1" data-type="container"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
		} else {

			/********** CONTAINERS **********/

			for(c=0; c<zbldrPage.containers.length; c++){

				html += '<div data-id="' + c + '" data-container-id="' + c + '" data-type="container" class="zbldr-container zbldr-container-simple zbldr-container-sortable' + zbldrPage.containers[c].class + ' zbldr-container zbldr-selectable"><div class="zbldr-container-inner">';

				html += '<div class="zbldr-container-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-container-clone"></i><i class="fa fa-trash"></i></div>';

				if(zbldrPage.containers[c].rows.length === 0){
					html += '<div class="zbldr-row-empty-icon" data-container-id="' + c + '" data-row-id="-1" data-type="row"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
				}

				/********** ROWS **********/

				for(r=0; r < zbldrPage.containers[c].rows.length; r++){

					html += '<div class="zbldr-row zbldr-row-simple zbldr-selectable zbldr-row-sortable" data-container-id="' + c + '" data-row-id="' + r + '" data-id="' + r + '" data-type="row" data-selected="' + zbldrPage.containers[c].rows.selected + '"><div class="zbldr-row-inner">';
					html += '<div class="zbldr-row-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-columns" aria-hidden="true"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-row-clone"></i><i class="fa fa-trash"></i></div>';

					/********** COLUMNS **********/

					for(col=0; col<zbldrPage.containers[c].rows[r].columns.length; col++){
						if(zbldrPage.containers[c].rows[r].elements){

							var colClass = 'zbldr-' + zbldrPage.containers[c].rows[r].columns[col];
							html += '<div class="zbldr-column zbldr-column-' + col + ' ' + colClass + '" data-column-id="' + col + '"  data-id="' + col + '">';
							
							/********** ELEMENTS **********/

							for(e=0; e<zbldrPage.containers[c].rows[r].elements.length; e++){

								if(col == zbldrPage.containers[c].rows[r].elements[e].position){

									var editableClass = zbldrPage.containers[c].rows[r].elements[e].editable == 'false' ? 'zbldr-not-editable' : 'zbldr-editable';
									
									html += '<div class="zbldr-element zbldr-element-simple zbldr-selectable ' + editableClass + ' ' + '" data-container-id="' + c + '" data-row-id="' + r + '" data-column-id="' + col + '" data-element-id="' + e + '" data-id="' + e + '" data-type="element"><div class="zbldr-element-inner">';
									html += '<div class="zbldr-element-settings-icons zbldr-settings-icons"><i class="fas fa-grip-horizontal"></i><i class="fa fa-cog"></i><i class="fa fa-plus"></i><i class="fa-regular fa-clone zbldr-elem-clone"></i><i class="fa fa-trash"></i></div>';
									
									html += '<div class="zbldr-element-content">';
									html += zbldrPage.containers[c].rows[r].elements[e].type;
									html += '</div>';
									
									html += '</div></div>'; // element
									
								}
							}

							/********** END ELEMENTS **********/

						}
						if(zbldrPage.containers[c].rows[r].elements.length === 0){
							var emptyElemID = -1;
						} else {
							var emptyElemID = zbldrPage.containers[c].rows[r].elements.length - 1;
						}
						html += '<div class="zbldr-element-empty-icon" data-container-id="' + c + '" data-row-id="' + r + '" data-column-id="' + col + '" data-element-id="' + emptyElemID + '"  data-id="' + col + '" data-type="element"><i class="fa fa-plus zbldr-empty-icon"></i></div>';
						html += '</div>'; // column
					}

					/********** END COLUMNS **********/

					html += '</div></div>'; // row

				}

				/********** END ROWS **********/

				html += '</div></div>'; // container

			}

			/********** END CONTAINERS **********/

		}
	}

	html += '</div>'; // wrapper

	jQuery('#zbldr-custom-css').html(headerCSS); // add custom CSS to header style tag

	if (typeof zbldrAfterRenderPage == "function") { bldAfterRenderPage(); }

	return html;

}



/*******************************************************************************************/
/************************************* INITIALIZATION *************************************/
/******************************************************************************************/

/*
settings = {
	dir 			: '../' // root directory of plugin/project
	exportDir 		: '/exports'
	responsive 		: true,
	selector 		: '#zbldr-builder-render',
	json 			: json,
	elements 		: ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo_order', 'woo_products', 'woo_order_date', 'woo_order_id', 'woo_customer_billing_address', 'woo_shop_address'], //<- Default Elements
	fonts 			: ['Andale Mono', 'Arial', 'Bodini', 'Calibri', 'Calisto MT', 'Cambria', 'Candara', 'Century Gothic', 'Consolas', 'Courier New', 'Ditot', 'Franklin Gothic', 'Georgia', 'Gill Sans', 'Helvetica', 'Impact', 'Optima', 'Palantino', 'Perpetua', 'Rockwell', 'Segoe UI', 'Tahoma', 'Trebuchet MS', 'Verdana'], //<- Default Fonts
	palette			: [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ],
	type 			: null,
	builderName 	: null,
	removeElements 	: ['woo-order-id', 'woo-order-date'],
}
*/

function zbldrBuilderInit(settings){

	var elements = settings.hasOwnProperty('fonts') ? settings.fonts : ['Arial', 'Calibri', 'Cambria', 'Candara', 'Consolas', 'Courier New', 'Franklin Gothic', 'Georgia', 'Helvetica', 'Impact', 'Segoe UI', 'Tahoma', 'Trebuchet MS', 'Verdana'];
	var fonts = settings.hasOwnProperty('elements') ? settings.elements : ['divider', 'spacer', 'header', 'text', 'image', 'social_icons', 'button', 'woo-order', 'woo-products', 'woo-order-date', 'woo-order-id', 'woo-customer-billing-address', 'woo-shop-address'];
	var palette = settings.hasOwnProperty('palette') ? settings.palette : [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ];
	var dir = settings.hasOwnProperty('dir') ? settings.dir : '../';
	var exportDir = settings.hasOwnProperty('exportDir') ? settings.exportDir : '/exports';
	var responsive = settings.hasOwnProperty('responsive') ? settings.responsive : true;
	var selector = settings.hasOwnProperty('selector') ? settings.selector : '#zbldr-builder-render';
	var type = settings.hasOwnProperty('type') ? settings.type : null;
	var json = settings.hasOwnProperty('json') ? settings.json : null;
	var builderName = settings.hasOwnProperty('builderName') ? settings.builderName : null;
	var removeElements = settings.hasOwnProperty('removeElements') ? settings.removeElements : [];

	zbldrData.exportDir = settings.exportDir;
	zbldrData.dir = settings.dir;
	zbldrData.elements = settings.elements;
	zbldrData.fonts = settings.fonts;
	zbldrData.palette = settings.palette;
	zbldrData.selector = settings.selector;
	zbldrData.type = settings.type;

	var containerWidth = responsive == true ? '100%' : '800px';

	if(json === null || typeof json == 'undefined' || json.hasOwnProperty('containers') == false) {
		zbldrPage = {
			responsive 	: responsive,
			attr 		: {},
			css 		: '',
			ID 			: null,
			type 		: type,
			builderName	: builderName,
			containers 	: [{
				ID 		: zbldrData.IDCounter,
				tools 	: ['background', 'border', 'css', 'sizing', 'spacing'],
				class 	: '',
				css 	: '',
				style 	: { 
					desktop : {
						'-webkit-box-sizing' 	: 'border-box',
						'box-sizing'			: 'border-box',
						'background-color'		: '#fff',
						'background-image'		: "none",
						'background-size'		: "auto",
						'padding-top'			: '40px',
						'padding-bottom'		: '40px',
						'padding-left'			: '40px',
						'padding-right'			: '40px',
						'margin-top'			: '0',
						'margin-bottom'			: '0',
						'margin-left'			: 'auto',
						'margin-right'			: 'auto',
						'border-color'			: 'none',
						'border-style'			: 'none',
						'border-width'			: '1px',
						'border-radius'			: '0',
						'max-width'				: '800px',
						'width'					: containerWidth,
					},
					tablet : {

					},
					mobile : {

					},
				},
				rows 	: [],
			}],
		}		
	} else {
		zbldrPage = json;
		zbldrPage.type = type;
	}

	zbldrPopulateEmptyElements();

	var content = zbldrRenderPage(zbldrPage.containers);

	jQuery(selector).before(zbldrRenderElementSelectToolbar(zbldrElements));
	jQuery(selector).before(zbldrRenderColumnSelectButtons(zbldrColumns));
	jQuery(selector).before(zbldrRenderTools(zbldrTools));
	jQuery(selector).before(zbldrRenderUI(zbldrUI));
	
	// show the content
	jQuery(selector).html(content);
}