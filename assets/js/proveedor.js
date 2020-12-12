$(document).ready(function () {

	/**
	 *
	 * Función para añadir un Proveedor al detalle
	 *
	 */

	//DataTable marcas añadidas
	$("#tableProveedor").DataTable({
		language: {
			searchPlaceholder: "Estoy buscando...",
			url: "../assets/plugins/datatables/Spanish.lang",
		},
		bInfo: false,
		bFilter: false,
		bPaginate: false,
		dom: "Bfrtip",

		buttons: [
			{
				text: "<i class='fas fa-plus'></i> Añadir marca",
				className: "btn btn-success",

				action: function (e, dt, node, config) {
					$("#modalañadirMarca").modal("show");
				},
			},
		],
	});

	//DataTable del modal listado para añadir marcas
	$("#tableMarca").DataTable({
		language: {
			searchPlaceholder: "Estoy buscando...",
			url: "../assets/plugins/datatables/Spanish.lang",
		},
		bInfo: false,
	});




	/**
	 *
	 * Función Añadir al detalle de la Compra
	 */

	$("#tableMarca tbody").on("click", ".btnMarca", function () {
		var idMarca = $(this).closest("tr").find("td:eq(0)").text();
		var descripcion = $(this).closest("tr").find("td:eq(1)").text();
		var el = $(this);
		el.closest("tr").addClass("selected");
		$(el, ".btnMarca").prop("disabled", true).css("color", "#8a8a8a");

		var table = $("#tableProveedor").DataTable();

		table.row
		
			.add([
				idMarca,
				descripcion,
				"<button class='eliminarMarca btn btn-danger btn-sm'><i class='fas fa-minus-circle'></i> Quitar </button>",
			])

		.draw();
	});



	/**
	 *
	 * Función registrar proveedor y detalle
	 */


	//Reglas de validacion


	//Add reglas manuales
	jQuery.validator.addMethod("noSpace", function (value, element) {
		return value.indexOf(" ") < 0 && value != "";
	});



	jQuery.validator.addMethod("noCharacters", function(value, element) { 
		return this.optional(element) || /^[a-z, 0-9 ]+$/i.test(value); 
	}); 

	var validar_form_proveedor = $("#form_proveedor").validate({
        ignore: [],
        rules: {
			tipoDocumento: {required: true},
			documento: {
			 required: true,
			 noSpace : true,
			 noCharacters: true,

			 remote: {
				url:"/tienda/proveedor/documento_exist",
				type: "post",
 
			
			},
			},
			nombre: { required: true },
			celular: { required: true },
			nombreContacto: { required: true },
			diaVisita: { required: true },
			correo: {email : true}
		},
		
        onfocusout: false,
        onkeyup: false,
        onclick: false,

        messages: {
            tipoDocumento: "El campo tipo documento es obligatorio. ",
			documento:{
				required:"El campo documento es obligatorio.",
				noSpace: "El campo documento sólo puede contener caracteres alfanuméricos",
				noCharacters: "El campo documento sólo puede contener caracteres alfanuméricos.",
				remote: function() { return $.validator.format("El documento ya se encuentra registrado.")},
			},
			nombre: "El campo nombre es obligatorio. ",
			celular: "El campo celular es obligatorio. ",
			nombreContacto: "El campo nombre es obligatorio. ",
			diaVisita: "El campo número dia visita es obligatorio. ",
			correo : "Ingrese un correo valido."

			
        },
        errorElement: 'p',

        errorPlacement: function(error, element) {
            $(element).parents('.form-group').append(error);
        }

    });
	
	$("#registroProveedor").click(function(ev) {
        ev.preventDefault();

        var idTipodocumento = $("#idTipodocumento").val();
        var documentoProveedor = $("#documentoProveedor").val();
        var nombreP = $("#nombreP").val();
        var telefonoP = $("#telefonoP").val();
		var celularP = $("#celularP").val();
		var direccionP = $("#direccionP").val();
        var correoP = $("#correoP").val();
		var nombreContactoP = $("#nombreContactoP").val();
		var diaVisitaP = $("#diaVisitaP").val();
        var observacionesP = $("#observacionesP").val();
        
        var tabladetalleMarca = $("#tableProveedor").DataTable();

        if (validar_form_proveedor.form()) {
          
            if (tabladetalleMarca.rows().count() > 0) {
                Swal.fire({
                    title: "¡Atención!",
                    text: "¿Está seguro que desea registrar este proveedor?",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#28a745",
                    cancelButtonColor: "#28a745",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                }).then((result) => {
                    if (result.value) {
                        $.ajax({
                            type: "POST",
                            url: "/tienda/proveedor/registroProveedor/",
                            data: {
                                idTipodocumento: idTipodocumento,
                                documentoProveedor: documentoProveedor,
                                nombreP: nombreP,
                                telefonoP: telefonoP,
                                celularP: celularP,
								direccionP: direccionP,
								correoP: correoP,
                                nombreContactoP: nombreContactoP,
								diaVisitaP: diaVisitaP,
								observacionesP:observacionesP
                            },
                            success: function() {
                               
                                //CODIGO PARA REGISTRAR EL DETALLE
                                $("#tableProveedor tbody tr").each(function() {
                     
                                    var idMarca = $(this).children().eq(0).text();
                                                            
                                    $.ajax({
                                        type: "POST",
                                        url: "/tienda/proveedor/detalleMarca/",
                                        data: {
                                            idMarca: idMarca,
                                            documentoProveedor: documentoProveedor,
                                        },

                                        success: function() {
                                            Swal.fire({
                                                title: "¡Proceso completado!",
                                                text: "El proveedor se ha registrado exitosamente.",
                                                type: "success",
                                                confirmButtonColor: "#28a745",
                                            }).then(function() {
                                                window.location =
                                                    "http://localhost:8888/tienda/proveedor/";
                                            });
                                        },

                                        error: function() {
                                            Swal.fire({
                                                title: "¡Proceso no completado!",
                                                text: "La compra no se pudo registrar.",
                                                type: "warning",
                                                confirmButtonColor: "#28a745",
                                            });
                                        },
                                        statusCode: {
                                            400: function(data) {
                                                var json = JSON.parse(data.responseText);
                                                Swal.fire("¡Error!", json.msg, "error");
                                            },
                                        },
                                    });
                                });
                            },
                            error: function() {
                              
                            },
                        });
                      
                    }
                });
            } else {
                Swal.fire({
                    title: "¡Proceso no completado!",
                    text: "No se puede registrar por que no hay una marca en la tabla",
                    type: "warning",
                    confirmButtonColor: "#28a745",
                });
            }
        }
    });




	/**
	 *
	 * Contador del campo observaciones text area.
	 *
	 */


		var max_chars = 0;

		$(".contadorP").hide();

		$("#observacionesP").keyup(function () {
			$(".contadorP").show();
			var chars = $(this).val().length;
			var diff = max_chars + chars;
			$("#contadorP").html(diff);
		});

   
	/**
	 *
	 * Función quitar detalle de la compra
	 *
	 */

	$("#tableProveedor").on("click", ".eliminarMarca", function () {
		var table = $("#tableProveedor").DataTable();
		let $tr = $(this).closest("tr");
		var idMarca = $($tr).children().eq(0).text();

		// Le pedimos al DataTable que borre la fila

		$("#tableMarca tbody tr").each(function () {
			var idMarca1 = $(this).children().eq(0).text();

			if (idMarca1 == idMarca) {
				$(this).closest("tr").removeClass("selected");
				$(this)
					.find(".btnMarca")
					.removeAttr("disabled")
					.css("color", "#5CB85C");
			}
		});

		table.row($tr).remove().draw(false);
	});

	




	/**
	 *
	 * Función para deshabilitar un proveedor
	 */

	$("#tablaListadoProveedores").on(
		"click",
		".deshabilitarProveedor",
		function (ev) {
			ev.preventDefault();

			Swal.fire({
				title: "¡Atención!",
				text: "¿Está seguro que desea deshabilitar este proveedor?",
				type: "question",
				showCancelButton: true,
				confirmButtonColor: "#28a745",
				cancelButtonColor: "#28a745",
				confirmButtonText: "Si",
				cancelButtonText: "No",
			}).then((result) => {
				if (result.value) {
					var documento = $(this).attr("data-documentoP");

					var estado = 0;
					$.ajax({
						type: "POST",
						url: "/tienda/proveedor/estado_proveedor",
						data: {
							documento: documento,
							estado: estado,
						},
						success: function () {
							Swal.fire({
								title: "¡Proceso completado!",
								text: "El proveedor ha sido deshabilitado exitosamente.",
								type: "success",
								confirmButtonColor: "#28a745",
							});
							$("#estadoProveedor" + documento).replaceWith(
								"<span class='badge badge-danger' id='estadoProveedor" +
									documento +
									"'>Deshabilitado</span>"
							);

							$("#deshabilitarProveedor" + documento).replaceWith(
								" <button style='width:41%'  class='habilitarProveedor btn btn-success btn-sm'  data-documentoP='" +
									documento +
									"' id='habilitarProveedor" +
									documento +
									"'><i class='fas fa-check-circle'></i> Habilitar</button>"
							);

							$("#editarProveedor" + documento).addClass("isDisabled");
						},

						error: function () {
							Swal.fire({
								title: "¡Proceso no completado!",
								text: "Ha sucedido un error al deshabilitar el proveedor",
								type: "warning",
								confirmButtonColor: "#28a745",
							});
						},
						statusCode: {
							400: function (data) {
								var json = JSON.parse(data.responseText);
								Swal.fire("¡Error!", json.msg, "error");
							},
						},
					});
				}
			});
		}
	);

	/**
	 *
	 * Función para habilitar un proveedor
	 */

	$("#tablaListadoProveedores").on("click", ".habilitarProveedor", function (ev) {
		ev.preventDefault();

		var documento = $(this).attr("data-documentoP");
		var estado = 1;

		Swal.fire({
			title: "¡Atención!",
			text: "¿Está seguro que desea habilitar este proveedor?",
			type: "question",
			showCancelButton: true,
			confirmButtonColor: "#28a745",
			cancelButtonColor: "#28a745",
			confirmButtonText: "Si",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.value) {
				$.ajax({
					type: "POST",
					url: "/tienda/proveedor/estado_proveedor",
					data: {
						documento: documento,
						estado: estado,
					},
					success: function () {
						Swal.fire({
							title: "¡Proceso completado!",
							text: "El proveedor ha sido habilitado exitosamente.",
							type: "success",
							confirmButtonColor: "#28a745",
						});
						$("#estadoProveedor" + documento).replaceWith(
							"<span class='badge badge-success' id='estadoProveedor" +
								documento +
								"'>Habilitado</span>"
						);
						$("#habilitarProveedor" + documento).replaceWith(
							" <button style='width:41%'  class='deshabilitarProveedor btn btn-danger btn-sm'  data-documentoP='" +
								documento +
								"' id='deshabilitarProveedor" +
								documento +
								"'><i class='fas fa-ban'></i> Deshabilitar</button>"
						);

						$("#editarProveedor" + documento).removeClass("isDisabled");
					},

					error: function () {
						Swal.fire({
							title: "¡Proceso no completado!",
							text: "Ha sucedido un error al habilitar el proveedor",
							type: "warning",
							confirmButtonColor: "#28a745",
						});
					},
					statusCode: {
						400: function (data) {
							var json = JSON.parse(data.responseText);
							Swal.fire("¡Error!", json.msg, "error");
						},
					},
				});
			}
		});
	});





	/**
	 *
	 * Función para ver el detalle de un proveedor y sus marcas
	 */

	//Inicializar el DataTable.

	var documentoP = $("#documentoProveedorD").val();

	$("#tableDetalleMarca").DataTable({

		language: {
			url: "../../assets/plugins/datatables/Spanish.lang",
		},
	
		bInfo: false,
		bFilter: false,
		bPaginate: false,
		dom: "frtip",

		ajax: {
			type: "POST",
			url: "/tienda/proveedor/llenardetalleProveedor/",
			data: {
				documento: documentoP,
			},
		},

		columns: [
			{ data: "idMarca"},
			 
			{ data: "descripcionMarca"},
			{
				className: "text-center",
				render: function (data, type, row) {
					
					if (row.estado == 1) {
						
						return "<span  class='badge badge-success'>Habilitada</span>";
					} else {
						return "<span  class='badge badge-danger'>Deshabilitada</span>";
					}
				},
			},
		],
	});


		








	var documento = $("#documentoAP").val();
	 
	var tablaActualizar = $("#Tabla_actualizar_marca").DataTable({
		responsive: true,
		bInfo: false,
		bFilter: false,
		bPaginate: false,
		dom: "Bfrtip",

		ajax: {
			type: "POST",
			url: "/tienda/proveedor/llenardetalleProveedor/",
			data: {
				documento: documento,
			},
		},

		buttons: [
			{
				text: "<i class='fas fa-plus'></i> Añadir marca",
				className: "btn btn-success",

				action: function (e, dt, node, config) {
					$("#modalActualizarMarca").modal("show");
			

				},
			},
		],

		columns: [
			{ data: "idMarca" },
			{ data: "descripcionMarca" },
	
		
			{
				render: function (data, type, row) {
					if (row.estadoMarca == 1) {
						return "<span  class='badge badge-success'>Habilitada</span>";
					} else {
						return "<span  class='badge badge-danger'>Deshabilitada</span>";
					}
				},
			},

			{
				render: function (data, type, row) {
					if (row.estadoMarca == 1) {
						return (

							"<button data-toggle='tooltip'  title='Deshabilitar' class='DeshabilitarMarca btn btn-danger btn-sm'><i class='fas fa-ban'></i></button>"
						);
					} else {
						return (
				
							"<button data-toggle='tooltip'  title='Habilitar' class='HabilitarMarca btn btn-success btn-sm'><i class='fas fa-check-circle'></i></button>"
						);
					}
				},
			},
		],
	});



	/**
	 *
	 * Función para deshabiliotar una mascota
	 */

	//Deshabilitar una mascota
	$("#Tabla_actualizar_marca").on(
		"click",
		".DeshabilitarMarca",
		function (ev) {
			ev.preventDefault();
		
				var idMarca = $(this).parents("tr").find("td:eq(0)").text();
				var estado = 0;

				Swal.fire({
					title: "¡Atención!",
					text:"¿Está seguro que desea deshabilitar esta marca",
					type: "question",
					showCancelButton: true,
					confirmButtonColor: "#28a745",
					cancelButtonColor: "#28a745",
					confirmButtonText: "Si",
					cancelButtonText: "No",
				}).then((result) => {
					if (result.value) {
						$.ajax({
							type: "POST",
							url: "/tienda/proveedor/estado_marca",
							data: {
								idMarca: idMarca,
								estado: estado,
							},

							success: function () {
								Swal.fire({
									title: "¡Proceso completado!",
									text:"La mascota se ha deshabilitado exitosamente.",
									type: "success",
									confirmButtonColor: "#28a745",
								});
								$("#Tabla_actualizar_marca").DataTable().ajax.reload();
							},
							error: function () {
								Swal.fire({
									title: "¡Proceso no completado!",
									text:
										"La marca no se puede deshabilitar porque está asociada a otro proceso.",
									type: "warning",
									confirmButtonColor: "#28a745",
								});
							},
							statusCode: {
								400: function (data) {
									var json = JSON.parse(data.responseText);
									Swal.fire("¡Error!", json.msg, "error");
								},
							},
						});
					}
				});
			
		}
	);


	
	/**
	 *
	 * Función para habilitar una marca
	 */

	//Deshabilitar una marca
	$("#Tabla_actualizar_marca").on(
		"click",
		".HabilitarMarca",
		function (ev) {
			ev.preventDefault();
		
				var idMarca = $(this).parents("tr").find("td:eq(0)").text();
				var estado = 1;

				Swal.fire({
					title: "¡Atención!",
					text:"¿Está seguro que desea habilitar esta marca",
					type: "question",
					showCancelButton: true,
					confirmButtonColor: "#28a745",
					cancelButtonColor: "#28a745",
					confirmButtonText: "Si",
					cancelButtonText: "No",
				}).then((result) => {
					if (result.value) {
						$.ajax({
							type: "POST",
							url: "/tienda/proveedor/estado_marca",
							data: {
								idMarca: idMarca,
								estado: estado,
							},

							success: function () {
								Swal.fire({
									title: "¡Proceso completado!",
									text:"La mascota se ha habilitado exitosamente.",
									type: "success",
									confirmButtonColor: "#28a745",
								});
								$("#Tabla_actualizar_marca").DataTable().ajax.reload();
							},
							error: function () {
								Swal.fire({
									title: "¡Proceso no completado!",
									text:
										"La marca no se puede deshabilitar porque está asociada a otro proceso.",
									type: "warning",
									confirmButtonColor: "#28a745",
								});
							},
							statusCode: {
								400: function (data) {
									var json = JSON.parse(data.responseText);
									Swal.fire("¡Error!", json.msg, "error");
								},
							},
						});
					}
				});
			
		}
	);


	/**
	 *
	 * Función Añadir al detalle de la Compra
	 */


	 
	//DataTable del modal listado para añadir marcas
	$("#tableMarcaActualizar").DataTable({
		language: {
			searchPlaceholder: "Estoy buscando...",
			url: "../assets/plugins/datatables/Spanish.lang",
		},
		bInfo: false,
	});

	



	$("#tableMarcaActualizar tbody").on("click", ".btnActualizarMarca", function () {
		var idMarca = $(this).closest("tr").find("td:eq(0)").text();
		var documentoProveedor = $('#documentoAP').val();
		var el = $(this);
		
			$.ajax({
				type: "POST",
				url: "/tienda/proveedor/consulta_Exis_id",
				data: {
					idMarca: idMarca,
				},
				dataType: "JSON",
				success: function (data) {
					$.each(data, function (i, item) {

						console.log(item);
						console.log("solo "+idMarca);

						//if (data[0].existencia) {
						if(item != 1){

							Swal.fire({
								title: "¡Atención!",
								text: "¿Está seguro que desea añadir esta nueva marca?",
								type: "question",
								showCancelButton: true,
								confirmButtonColor: "#28a745",
								cancelButtonColor: "#28a745",
								confirmButtonText: "Si",
								cancelButtonText: "No",
							}).then((result) => {
								if (result.value) {
				
									$.ajax({
										type: "POST",
										url: "/tienda/proveedor/detalleMarca/",
										data: {
							
											idMarca: idMarca,
											documentoProveedor,documentoProveedor
							
										},
										success: function() {
											Swal.fire({
												title: "¡Proceso completado!",
												text: "La marca se ha añadido exitosamente.",
												type: "success",
												confirmButtonColor: "#28a745",
											});
				
											$("#Tabla_actualizar_marca").DataTable().ajax.reload();
							
										}
							
									});
				
								}
				
							})


						}else{

							alert("No se puede compa");
						}
				

					});
				}
			});			
		   /*$("#Tabla_actualizar_marca tbody tr").each(function() {

            var idMarca2 = $(this).closest("tr").find("td:eq(0)").text();
         

            if (idMarca == idMarca2) {
              
                v = false;
            } else {
                v = true;
            }
        	});*/

	
		//if(!v){

			
			//var el = $(this);
			//el.closest("tr").addClass("selected");
			//$(el, ".btnMarca").prop("disabled", true).css("color", "#8a8a8a");
		


		/*}else{

			Swal.fire({
                title: "¡Atención!",
                html: "La marca ya esta añadida.",
                type: "warning",
                confirmButtonColor: "#28a745",
            });
		}*/



	});



	var validar_ActualizarProveedor = $("#form_actualizar_proveedor").validate({
		ignore: [],
		
		onfocusout: false,
        onkeyup: false,
		onclick: false,
		
        rules:{
			nombreAP: { required: true },
			celularAP: { required: true },
			nombreCompletaAP: { required: true },
			diaVisitaAP: { required: true },
			correoAP: {email : true}
		},
		

        messages: {
			nombreAP: "El campo nombre es obligatorio. ",
			celularAP: "El campo celular es obligatorio. ",
			nombreCompletaAP: "El campo nombre es obligatorio. ",
			diaVisitaAP: "El campo número dia visita es obligatorio. ",
			correoAP : "Ingrese un correo valido."
        },
        errorElement: 'p',

        errorPlacement: function(error, element) {
            $(element).parents('.form-group').append(error);
        }

    });

	$("#botonActualizarProveedor").click(function (ev) {
		ev.preventDefault();

		var idTipodocumento = $("#tipoDocumentoAP").val();
		var documentoProveedor = $("#documentoAP").val();
		var nombreP = $("#nombreAP").val();
		var telefonoP = $("#telefonoAP").val();
		var celularP = $("#celularAP").val();
		var direccionP = $("#direccionAP").val();
		var correoP = $("#correoAP").val();
		var nombreContactoP = $("#nombreCompletaAP").val();
		var diaVisitaP = $("#diaVisitaAP").val();
		var observacionesP = $("#observacionesAP").val();


		if (validar_ActualizarProveedor.form()) {

			Swal.fire({
				title: "¡Atención!",
				text: "¿Está seguro que desea actualizar este proveedor?",
				type: "question",
				showCancelButton: true,
				confirmButtonColor: "#28a745",
				cancelButtonColor: "#28a745",
				confirmButtonText: "Si",
				cancelButtonText: "No",
			}).then((result) => {
				if (result.value) {
					$.ajax({
						type: "POST",
						url: "/tienda/proveedor/actualizarProveedor/",
						data: {
							idTipodocumento: idTipodocumento,
							documentoProveedor: documentoProveedor,
							nombreP: nombreP,
							telefonoP: telefonoP,
							celularP: celularP,
							direccionP: direccionP,
							correoP: correoP,
							nombreContactoP: nombreContactoP,
							diaVisitaP: diaVisitaP,
							observacionesP: observacionesP,
						},
	
						success: function () {
							Swal.fire({
								title: "¡Proceso completado!",
								text: "El proveedor se ha actualizado exitosamente.",
								type: "success",
								confirmButtonColor: "#28a745",
							}).then(function () {
								window.location = "http://localhost:8888/tienda/proveedor/";
							});
						},
					});
				}
			});

		}

	});
});
