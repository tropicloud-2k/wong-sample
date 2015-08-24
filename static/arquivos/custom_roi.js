var slider, homeSlider;

var resolution = "desktop";
var resolutions = {
  mobile : { min : 0, max : 480 },
  tablet : { min : 481, max : 1024 },
  desktop : { min : 1025, max : 0 }
};

var get_resolution_key = function() {
  var ww = window.innerWidth;
  $.each(resolutions, function(i, e) {
	if(e.min != 0 && ww < e.min) return true;
	if(e.max != 0 && ww > e.max) return true;
	resolution = i;
  });
  $("body").data({ resolution : resolution });
  return resolution;
}

$(document).ready(function() {

  var cookie_lightbox = $.cookie('cookie_true');

  // creación del lightbox
  $('#wong_cargar_lightbox').fancybox({
	onClosed : function() {
	  $.cookie('cookie_true', 'true');
	  $('.news-letter').removeAttr('id');
	  $('#fancybox-close-wong').hide();
	},
	modal : true,
	onComplete : function() {
	  $.cookie('cookie_true', 'true');
	}
  });
  //cookies Lightbox
  if(cookie_lightbox == null){
	$('.news-letter').attr('id', 'wong-lightbox');
	$('#wong_cargar_lightbox').trigger('click');
  }
  else{
	$('#fancybox-close-wong').hide();
  };

  $('#wong_cargar_lightbox').click(function(){
	$('#fancybox-outer').find('#fancybox-content').children('div').attr('id', 'cont_wong_lightbox');
  })

  // validaciones del formulario de registro al boletin
  $("#wong_form_reg").validate({
	  rules: {
		  CL_email: {
			  required: true,
			  email: true
		  },
		  CL_isNewsletterOptIn: {
			  required: true
		  }
	  },
	  messages: { 
		  CL_email: "Por favor, ingresa un correo electr&oacute;nico v&aacute;lido",
		  CL_isNewsletterOptIn: "Debes aceptar los Términos y Condiciones y Políticas de Privacidad",
	  },
	  submitHandler: function(form) {
		if ($('#wong_form_reg').valid()){
		  $('.wong-newsletters').hide();
		  $('.wong-thanks').show(500);
		  setTimeout(function() {
			form.submit();
		  }, 2500);
		  $('#fancybox-close-wong').hide();
		  return false;
		};
	  },
  });
  
  $('.wong-button').click(function() {
	$("#wong_form_reg").validate();
  });

  //menu 
  $('.wong-nav-second').hide();
  $('.wong-nav > ul > li').mouseover(function(){
  		if(get_resolution_key() == "desktop") {
			$('.wong-bg-all').addClass('wong-bg-all-hover');
			$(this).find('.wong-nav-second').show();
		}
  });
  $('.wong-nav > ul > li').mouseout(function(){
  		if(get_resolution_key() == "desktop") {
			$('.wong-bg-all').removeClass('wong-bg-all-hover');
			$(this).find('.wong-nav-second').hide();
		}
  });


  $('.wong-data-fixed-links > a').on('click',function(){
	var strAncla1=$(this).attr('href');
	$('body,html').stop(true,true).animate({
	  scrollTop: $(strAncla1).offset().top
	},1000);
  });
  $('.productDescription > a').on('click',function(){
	var strAncla2=$(this).attr('href');
	$('body,html').stop(true,true).animate({
	  scrollTop: $(strAncla2).offset().top
	},1000);
  });
  $('.product-description > .calificacion-producto > a').on('click',function(){
	  $('#lnkPubliqueResenha')[0].click();
  });
  $('#goto-evaluation-rate > strong').on('click',function(){
	  $('#lnkPubliqueResenha')[0].click();
  });



   
	//console.log("custom_roi.js last modified: 10-12-2014");
  newsletterRadioButtons();


  $('.vertical-banners .flexslider').flexslider({
	animation: "slide"
  });

  $('.banner-intermedio .flexslider').flexslider({ 
   animation: "slide"
  });

  $('form').find("#notifymeClientName").each(function(ev)
	  {
		if(!$(this).val()) { 
		$(this).attr("placeholder", "Digite su nombre...");
	  }
  });
  
  $('form').find("#notifymeClientEmail").each(function(ev)
	  {
		if(!$(this).val()) { 
		$(this).attr("placeholder", "Digite su e-mail...");
	  }
  });  
	
	
	// Se definen la funciones que llamará vtexSmartResearch cuando la libreria cargue o modifique los productos sea por filtros o scrolldown
	if($('body').hasClass('categoria')){
		$("#departmentNavigator input[type='checkbox']").vtexSmartResearch({	  
			
			// La funcion shelfCallback es la que la libreria vtex-smartResearch llama tan pronto cargo los nuevos productos resultado de los filtros
			// La funcion ajaxCallback es la que la libreria vtex-smartResearch llama tan pronto cargo products del scrollinfinito
			ajaxCallback : function(){
				setTimeout(function(){
					tb_init("a.thickbox, area.thickbox, input.thickbox");
				}, 1000);
			},
			callback : function(){
				setTimeout(function(){
					tb_init("a.thickbox, area.thickbox, input.thickbox");
				}, 1000);
			},
			shelfCallback:function(){
				setTimeout(function(){
					tb_init("a.thickbox, area.thickbox, input.thickbox");
				}, 1000);
			}
		});
	}

  // The slider being synced must be initialized first
 $('#carousel.carousel-departamento').flexslider({
	animation: "slide",
	controlNav: false,
	animationLoop: false,
	slideshow: false,
	itemWidth: 210,
	itemMargin: 5,
	asNavFor: '#slider'
  });
   
  $('#slider.slider-departamento').flexslider({
	animation: "slide",
	controlNav: false,
	animationLoop: false,
	slideshow: false,
	slideshowSpeed: 0,
	sync: "#carousel"
  });

	if(get_resolution_key() != "desktop") {
		$('.collectionWrap.carruseles-productos .prateleira ul [id^=helper]').remove();
		$('.collectionWrap.carruseles-productos-producto .prateleira ul [id^=helper]').remove();
		slider = $('.collectionWrap.carruseles-productos .prateleira ul').bxSlider({
			infiniteLoop: true,
		});
		$('.banner-intermedio-principal-mobile .slides').bxSlider({
			infiniteLoop: true,
			auto: true,
			stop : 3000,
			controls: false
		});
		if(!$("body").hasClass("departamento") && !$("body").hasClass("categoria")){
			homeSlider = $('.collectionWrap.carruseles-productos-producto .prateleira ul').bxSlider({
				infiniteLoop: true,
			});
		}
		$(".fulltext-search-box").val("Buscar").focus(function(){
			$(this).val("");
		}).blur(function(){
			if($(this).val() == "")	$(this).val("Buscar")
		});
	}
	else {
		$('.principal.flexslider').flexslider({
			animation: "slide"
		});
		slider = $('.collectionWrap.carruseles-productos .prateleira ul').bxSlider({
			minSlides: 1,
			maxSlides: 4,
			slideWidth: 220,
			// slideMargin: 5,
			infiniteLoop: true,

		});
		homeSlider = $('.collectionWrap.carruseles-productos-producto .prateleira ul').bxSlider({
			minSlides: 4,
			maxSlides: 4,
			slideWidth: 240,
			slideMargin: 20,
			infiniteLoop: true,
		});
	}


  $(".back-to-top a").click(function(){
	var body = $("html, body");
	body.animate({scrollTop:0}, '500', 'swing', function() { 
	   //alert("Finished animating");
	});
  });

  /*$('.calificacion-producto').click(function() {
	$('body').animate({scrollTop: 1200},1100);
  });*/

  


  var e = jQuery(".economia-de .economia").text().replace('S/.', '');
	if(parseInt(e) <= 9.99){
	  jQuery(".economia-de").hide();
  }

	

  $('#productDescription h4:first-child').addClass('active');
	
  $('.categoria .uncheck-marked a').click(function(){

   $('.categoria .filtro_marca label').each(function() {
	  if($(this).hasClass("sr_selected") == true){
		$(this).click();
	  }    
	});

   $('.categoria .refino label').each(function() {
	  if($(this).hasClass("sr_selected") == true){
		$(this).click();
	  }    
	});
  }); 

  $("#thumbs-departamento a").click(function(){
   var h = $(this).attr('href');
   window.location = h;
  });

   $(".slider-departamento .slides a").click(function(){
   var h = $(this).attr('href');
   window.location = h;
  });



  $('#productDescription h4').click(function(){
	$('h4').removeClass("active");
	$(this).addClass("active");
  });

  $('#sideBar h3').click(function(){
	if ($(this).hasClass("active")) {
	  $(this).removeClass("active");
	}else{
	  $('h3').removeClass("active");
	 $(this).addClass("active"); 
	}
  });


  $('.departamento #sideBar h4').click(function(){
	 if ($(this).hasClass("active")) {
		$(this).removeClass("active");
	  }else{
		$('h4').removeClass("active");
	   $(this).addClass("active"); 
	  }
 });


  ///Script menu superior
	var menu = $('#menu');
	var contenedor = $('#menu-contenedor');
	var menu_offset = menu.offset();
	var animspeed = 100;
	var lastScrollTop = 0;


  $('.evaluation-vitrine- p').html(function (index, text) {this.innerHTML = text.replace(10, "<img src='http://www.foreigndesign.co/fuentes-granpanda/wong/extb_stars-10.png'>")});
  $('.evaluation-vitrine- p').html(function (index, text) {this.innerHTML = text.replace(20, "<img src='http://www.foreigndesign.co/fuentes-granpanda/wong/extb_stars-20.png'>")});
  $('.evaluation-vitrine- p').html(function (index, text) {this.innerHTML = text.replace(30, "<img src='http://www.foreigndesign.co/fuentes-granpanda/wong/extb_stars-30.png'>")});
  $('.evaluation-vitrine- p').html(function (index, text) {this.innerHTML = text.replace(40, "<img src='http://www.foreigndesign.co/fuentes-granpanda/wong/extb_stars-40.png'>")});
  $('.evaluation-vitrine- p').html(function (index, text) {this.innerHTML = text.replace(50, "<img src='http://www.foreigndesign.co/fuentes-granpanda/wong/extb_stars-50.png'>")}); 


/*$(function(){

	$('#goto-evaluation-rate').click(function() {

	 if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		 && location.hostname == this.hostname) {

			 var $target = $(this.hash);

			 $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

			 if ($target.length) {

				 var targetOffset = $target.offset().top;

				 $('html,body').animate({scrollTop: targetOffset}, 1000);

				 return false;

			}

	   }

   });

});*/

  
   

  // $( ".content-newsletters #newsletter-h" ).click(function() {
  //   $(".content-newsletters #newsletterButtonOK").click();
  //  });

  // $( ".content-newsletters #newsletter-m" ).click(function() {
  //   $(".content-newsletters #newsletterButtonOK").click();
  // });

	/*FIZZ START*/

	//selectors
	$(document).on("click", "button.selector", function(){
		var t = $(this);
		var showFx = t.data("fx");
		var time = t.data("timing") != undefined ? t.data("timing") : 250;
		var options = t.find(".options");

		t.addClass("active");

		switch(showFx) {
			case "slide":
				options.slideDown(time);
				break;
			case "fade":
				options.fadeIn(time);
				break;
			default: 
				options.show();
		}
	}).on("mouseleave", "button.selector", function(){
		var t = $(this);
		var showFx = t.data("fx");
		var options = t.find(".options");

		t.removeClass("active");

		switch(showFx) {
			case "slide":
				options.slideUp(time);
				break;
			case "fade":
				options.fadeOut(time);
				break;
			default: 
				options.hide();
		}
	}).on("click", "button.selector .op", function(){
		var t = $(this);
		var selector = t.closest(".selector");

		t.addClass("active").siblings().removeClass("active");
		selector.find(".placeholder span").text(t.text());

		if(selector.hasClass("city-selector")){
			window.location.href = t.data("value");
		}
	});


	
	//check if res mobile
	if(get_resolution_key() == "mobile") {
		// Menu categories
		$(".contenedor_links_menu > li > a").click(function(event) {
			var t = $(this);
			t.parent().siblings().find("a").removeClass("active").siblings(".wong-nav-second").slideUp(250);
			if(!t.hasClass("active")) {
				event.preventDefault();
				t.addClass("active");
				t.siblings(".wong-nav-second").slideDown(250, function(){
					if(t.parents(".category-menu").length > 0){
						$('html, body').animate({scrollTop: $(t).offset().top - $(".header").height()}, 500);
					}
				});
			}

		});

		//menu categories header 
		$(".content-header .icn.hamburger").click(function(){
			if(!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(".header-content-general #menu").fadeIn(250);
			}
			else {
				$(this).removeClass("active");
				$(".header-content-general #menu").fadeOut(250);
			}
		});

		$(".content_footer h2").click(function() {
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(".content_footer ul").slideUp(250);
			}
			else {
				$(".content_footer h2").removeClass("active");
				$(this).addClass("active");
				$(".content_footer ul").slideUp(250);
				$(this).next().slideDown(250);
			}
		});

		//Product hide open specifications
		if($("#caracteristicas h4.active").length > 0){
			$("#caracteristicas h4.active").removeClass("active");
		}

		$(".search-single-navigator h4, .search-multiple-navigator h4").click(function(event){
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			}else {
				event.preventDefault();
				$(this).addClass("active").siblings().removeClass("active");
			}
		});
		$(".search-multiple-navigator h5").click(function(){
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			}else {
				$(this).addClass("active").parent().siblings("fieldset").find("h5").removeClass("active");
			}
		});

		$(document).on("click", "#caracteristicas h4", function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: $(this).offset().top - $(".header").height()}, 500);
			if($(this).hasClass("open")){
				$(this).removeClass("open");
			}
			else {
				$(this).addClass("open");
			}
		});

		$("#caracteristicas h4").each(function(i,e){
			if($(e).hasClass('Especificaciones')) {
				$(e).text("Descripción");
			}
			if($(e).hasClass('Especificaciones-Tecnicas')) {
				$(e).text("Especificaciones");
			}
		});

	}
	//go to cart when mobile
	$(window).on("productAddedToCart", function() {
		if(get_resolution_key() == "mobile") window.location.href = "/checkout";
	});

});


$(window).on('scroll', function() {

	if ($(this).scrollTop() > 110) {
		 $('.main-menu').addClass('menu-fijo');
	} else {
		 $('.main-menu').removeClass('menu-fijo');
	};

	if ($(this).scrollTop() > 350) {
		 $('.wong-data-fixed').addClass('wong-data-fixed-show');
		 $('#wong_ver_mas').addClass('wong-height-120');
	} else {
		 $('.wong-data-fixed').removeClass('wong-data-fixed-show');
		 $('#wong_ver_mas').removeClass('wong-height-120');
	};


  // Static Menu




	var btn_subir = $(window).scrollTop();
	  if(btn_subir == 0){
		  $(".back-to-top").hide();
	  }else{
		  $(".back-to-top").show();
	  }

	if((btn_subir > 800) && (btn_subir < 900) ){
		var flag = true;
		if(flag){
		//console.log("agregamos");

		  if(!$(".prateleira ul").hasClass("thumbnails")){
			 //console.log("test");
			 $( ".prateleira ul" ).addClass( "thumbnails" );
			
			}
			flag = false;
		}
	};

});/// On scroll event end

function newsButtonClickValidation(id){
  // validar seleccion de hombre o mujer
  var divNewsLetter = $(".module-news .news-letter .newsletter");
  var inputRadioH = divNewsLetter.find("#newsletter-h");
  var inputRadioM = divNewsLetter.find("#newsletter-m");
  
  if( !inputRadioH.is(':checked') && !inputRadioM.is(':checked') ){
	alert("Por favor seleccione su genero");
  }
  else{
	newsButtonClick(id);
  }
}

function newsButtonClickValidation(id){
  // validar seleccion de hombre o mujer
  var divNewsLetter = $(".module-news .news-letter .newsletter");
  var inputRadioH = divNewsLetter.find("#newsletter-h");
  var inputRadioM = divNewsLetter.find("#newsletter-m");
  
  if( !inputRadioH.is(':checked') && !inputRadioM.is(':checked') ){
	alert("Por favor seleccione su genero");
  }
  else{
	newsButtonClick(id);
  }
}

function newsletterRadioButtons(){
  
  var divNewsLetter = $(".module-news .news-letter .newsletter");
  var h1Out = $("h1");  
  var inputClientName = divNewsLetter.find("#newsletterClientName");
  
  var inputButtonOk = divNewsLetter.find("#newsletterButtonOK");
  inputButtonOk.attr('onclick', function(i, v){
	return v.replace("newsButtonClick", "newsButtonClickValidation");
  }); 
  
	
  var inputRadioH = "<input type='radio' name='sexo-newsletter' id='newsletter-h' value='Hombre'>";
  var inputLabelH = "<label for='newsletter-h' id='label-newsletter-h'>Hombre</label>";
  var inputRadioM = "<input type='radio' name='sexo-newsletter' id='newsletter-m' value='Mujer'>";
  var inputLabelM = "<label for='newsletter-m' id='label-newsletter-m'>Mujer</label>";
  
  // Deja como valor default Hombre
  inputClientName.after(inputLabelM);
  inputClientName.after(inputRadioM);
  inputClientName.after(inputLabelH);
  inputClientName.after(inputRadioH);
  
  inputRadioH = divNewsLetter.find("#newsletter-h");
  inputRadioM = divNewsLetter.find("#newsletter-m");
  
  inputClientName.val(inputRadioH.val());
  
  inputRadioH.on("click",function() {
	inputClientName.val(inputRadioH.val());
  });
  
  inputRadioM.on("click",function() {
	inputClientName.val(inputRadioM.val());
  });
}

$(window).load(function(){
	if(get_resolution_key() != "desktop") {
		var mainSlider = $('.principal.flexslider .slides').bxSlider({
			responsive: true,
			slideWidth: 490,
			auto : true
		});
	}
})