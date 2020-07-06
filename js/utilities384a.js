$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (this.name !== "submit" && this.name !== "exclude") {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        }
    });
    return o;
};

Inputmask.extendAliases({
	'customphone': {
		alias: "phone",
		allowPlus: false,
		allowMinus: true,
		rightAlign: false,
		mask: '(999)999-9999',
		placeholder: '(___)___-____',
	}
});

Inputmask.extendAliases({
	'customidcard': {
		alias: "idcard",
		allowPlus: false,
		allowMinus: true,
		rightAlign: false,
		mask: '999-9999999-9',
		placeholder: '___-_______-_',
	}
});

function OpenModalBox(header, inner, bottom, width, modalId){
	if (modalId == null)
		var modalId = "modalbox";
	var modalbox = $('#'+modalId);
	modalbox.find('.modal-title').html(header);
	modalbox.find('.modal-body').html(inner);
	modalbox.find('.modal-footer').html(bottom);
	modalbox.find('.modal-content').css("overflow", "auto");
	modalbox.find('.modal-lg').css("max-width", width);
	modalbox.find('.modal-content').css("width", width);
	modalbox.modal();
}

function handleApiCallErrors(data){
	if (data.ERROR) {
		var error_msg = data.ERROR_MESSAGE;
		if (data.ERROR_CODE == 102000){
			for(var j=0;j<data.VALIDATION_ERRORS.length;j++){
				error_msg+= "<br>- "+data.VALIDATION_ERRORS[j].ERROR_MESSAGE;
			}
		}
		OpenModalBox('Error del sistema', '<div class="alert alert-danger" role="alert" style=" overflow: auto;" >'+error_msg+'</div>', "");
	}
}

function scrollToTop() {
	$('html,body').animate({scrollTop:0},0);
}

function openFormEmpleos(id, title){
	$.get("formulario_vacante.cfm?vacante_id="+id+'&title='+title, function( data ) {
	 OpenModalBox('Formulario Vacante', data, "");
	});
}

function updateNavigationBar(title, subtitle, links) {
	$('.navigation-bar-title').text(title);
	$('.navigation-bar-subtitle').text(subtitle);

	let ls = new Array();
	ls = links.split(',');

	$(".navigation-bar-links").empty();
	$(".navigation-bar-links").append('<a href="index.cfm"><div class="botonNB"><i class="fa fa-home fa-md"></i></div></a>');

	for(let i = 0; i < ls.length; i++) {
		$(".navigation-bar-links").append('<div class="separatorMenu">&gt;</div>');

		if (ls[i + 1] === undefined || ls[i + 1] === "") {
			$(".navigation-bar-links").append('<div class="botonNBON">' + ls[i] + '</div>');
		} else {
			$(".navigation-bar-links").append('<div class="botonNBOFF">' + ls[i] + '</div>');
		}
	}
}

var winWidth = $(window).width();
var winHeight = $(window).height();

$(window).scroll(function() {
	posicionarMenu();
});

var contador = 1;
var logocontador = 0;

function navFuntion(){
	if (contador == 1){
		$('#nav_no_mostrar').slideDown("");
		$(window).scrollTop(0);
		contador = 0;
		logocontador = 1;
		$(".menuBar").css("display", "none");
		$(".logoBlanco").css("display", "block");

	} else {
		contador = 1;
		logocontador = 2;
		$('#nav_no_mostrar').slideUp("");
		$(".menuBar").css("display", "block");
		$(".logoBlanco").css("display", "none");
	};
};

function posicionarMenu() {
	if ($(window).scrollTop() >= 600 && winWidth < 991){
		contador = 1;
		logocontador = 0;
		$('#nav_no_mostrar').slideUp("");
		$('.menu_bar3').slideDown("");
		$(".menuBar").css("display", "none");
		$(".logoBlanco").css("display", "block");
		var $el = $('ul',this);
		$('#menuUL > li > ul').not($el).slideUp();
		$el.stop(true, true).slideToggle(400);
		return false;

	} else{
		$('.menu_bar3').slideUp("");
		if (logocontador == 2) {
			$(".menuBar").css("display", "block");
			$(".logoBlanco").css("display", "none");
		} else if (logocontador == 1) {
			$(".menuBar").css("display", "none");
			$(".logoBlanco").css("display", "block");
		} else if (logocontador == 0) {
			$(".menuBar").css("display", "block");
			$(".logoBlanco").css("display", "none");
		}
	 }
}

$(function() {
	$('#menuUL > li').click(function(e) {
		var $el = $('ul',this);
		$('#menuUL > li > ul').not($el).slideUp();
		$el.stop(true, true).slideToggle(400);
		return false;
	});
	$('#menuUL > li > ul > li').click(function(e) {
		e.stopPropagation();
	});
});

function openServiceDetails(id){
	$.get("detalles_de_servicio.cfm?service_id="+id, function( data ) {
	 OpenModalBox('Información del servicio', data, "");
	});
}

function openLoanDetails(id){
	$.get("detalles_de_prestamo.cfm?loan_id="+id, function( data ) {
	 OpenModalBox('Detalles del préstamo', data, "");
	});
}

function createDateRange(target, limit){
	var today = new Date();
		$(target).daterangepicker({
             "locale": {
		        "format": "DD/MM/YYYY",
		        "separator": " - ",
		        "applyLabel": "Aplicar",
		        "cancelLabel": "Cancelar",
		        "fromLabel": "From",
		        "toLabel": "To",
		        "customRangeLabel": "Custom",
		        "weekLabel": "W",
		        "daysOfWeek": [
		            "Do",
		            "Lu",
		            "Ma",
		            "Mi",
		            "Ju",
		            "Vi",
		            "Sa"
		        ],
		        "monthNames": [
		            "Enero",
		            "Febrero",
		            "Marzo",
		            "Abril",
		            "Mayo",
		            "Junio",
		            "Julio",
		            "Agosto",
		            "Septiembre",
		            "Octubre",
		            "Noviembre",
		            "Diciembre"
		        ],
		        "firstDay": 1
		    },
            minDate: '01/01/2011',
            maxDate: today,
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-danger',
            cancelClass: 'btn-inverse',
            dateLimit: {
                days: limit
            }
        });
}

function openPopUp(url, title, width, modalId, back_url, showClose){
	var bottom = "";

	if(modalId == null)
		var modalId = 'modalbox'

	if (showClose != null && showClose == true)
		bottom = back_url;
	$.get( url, function( data ) {
	  OpenModalBox(title, data, bottom, modalId, width);
	});
}

function activeAjaxLinks(){
	$('.ajax-link').on('click', function(e){
		if (e.isDefaultPrevented() == false) {
			e.preventDefault();
					
			var url = $(this).attr('href');
			
			if(location.protocol != 'http:'){
				document.location = 'http://'+applicationServer+'/adminn/home.cfm#'+url
			}else{
				window.location.hash = url;
				LoadAjaxContent(url);
				
				if($(this).hasClass( "menu-link" )){
					$('.ajax-link.active.menu-link').removeClass('active');
					$(this).addClass('active');
				}
			}
		}
	});
}
function showMessage(parent, boxClass, msg, time){
	$("#displayMsgBox").remove();
	var code = '<div id="displayMsgBox" class="alert alert-'+boxClass+'" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>	'+msg+'</div>';
	$("#"+parent).append(code);
	if(time > 0)
	setTimeout(function(){closeMessageBox()}, time);
}

function closeMessageBox(){
	$("#displayMsgBox").fadeOut()
}