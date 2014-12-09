/* Share panel */

$(document).ready(function(){
	$(".open").click(function(e){
		e.preventDefault();
		$(".sharepanel").slideToggle('1000',"swing");	
	});	
  
  /* Sidebar */
  
	$(".matopen").click(function(e){
		e.preventDefault();
		$(this).next('.matter').slideToggle('1000',"swing");
	});
});

/* prettyPhoto Gallery */

jQuery(".prettyphoto").prettyPhoto({
   overlay_gallery: false, social_tools: false
});

/* Isotype */

// cache container
var $container = $('#portfolio,#portfolio-big');
// initialize isotope
$container.isotope();

// filter items when filter link is clicked
$('#filters a').click(function(){
	var selector = $(this).attr('data-filter');
	$container.isotope({ filter: selector });
	return false;
});               

/* Navigation (Select box) */

// Create the dropdown base
$("<select />").appendTo(".navis");

// Create default option "Go to..."
$("<option />", {
	"selected": "selected",
	"value"   : "",
	"text"    : "Menu"
}).appendTo(".navis select");

// Populate dropdown with menu items
$(".navi a").each(function() {
	var el = $(this);
	$("<option />", {
		"value"   : el.attr("href"),
		"text"    : el.text()
	}).appendTo(".navis select");
});

$(".navis select").change(function() {
	window.location = $(this).find("option:selected").val();
});

/* Drop down navigation */

ddlevelsmenu.setup("ddtopmenubar", "topbar");

/* Moving sidebar below in small screens. */

$('.sidey').clone().appendTo('.mobily');


/* Flex Slider */

$(window).load(function(){
  $('.flexslider').flexslider({
	easing: "easeInOutCubic",
	controlNav: false,
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
});
	

/* *************************************** */ 
/* Scroll to Top */
/* *************************************** */  
		
$(document).ready(function() {
	$(".totop").hide();
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 300) {
			$('.totop').fadeIn();
		} else {
			$('.totop').fadeOut();
		}
	});
	$(".totop a").click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
		
});
/* *************************************** */
    
