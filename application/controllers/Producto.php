<?php

class Producto extends CI_controller
{


	public function __construct()
	{

		/*************************************************************/
		// **Aqui se cargan todas las librerias que vamos a utilizar // **
		/*************************************************************/
		parent::__construct();
		$this->load->model('Model_producto');
		$this->load->database();
		$this->load->helper("url");
		$this->load->library('form_validation');
		$this->load->library('session');




		$this->form_validation->set_rules('codigo', 'código', 'required|is_unique[producto.idProducto]|alpha_dash');
		$this->form_validation->set_rules('nombre', 'nombre', 'required');
		$this->form_validation->set_rules('categoria', 'categoría', 'required');
		$this->form_validation->set_rules('marca', 'marca', 'required');
		$this->form_validation->set_rules('existencia', 'existencia', 'required');
		$this->form_validation->set_rules('unidadDeMedida', 'unidad de medida', 'required');
		$this->form_validation->set_rules('valorDeMedida', 'valor de medida', 'required');
		$this->form_validation->set_rules('presentacion', 'presentación', 'required');
		$this->form_validation->set_rules('tipoespecie', 'tipo especie', 'required');
		$this->form_validation->set_rules('valorDeMedida', 'valor de medida', 'required');
		$this->form_validation->set_rules('presentacion', 'presentación', 'required');
		$this->form_validation->set_rules('precioVenta', 'precio de venta', 'required');

		/*$this->form_validation->set_rules('indicaciones', 'indicaciones', 'required');
		$this->form_validation->set_rules('contraIndicaciones', 'contraindicaciones', 'required');
		$this->form_validation->set_rules('edad', 'edad', 'required');
		$this->form_validation->set_rules('unidadTiempo', 'unidad de tiempo', 'required');*/
	

	


	}

	public function index($page=1)
	{
		
		$page_size=2;
		$offset=0* $page_size;


		  $buscar = $this->input->get("buscar");
		  //$resultado = $this->Model_producto->buscarDatosProducto($idProducto);

		 


		  //$datosProveedor['resultado'] = $this->Model_proveedor->BuscarTodosProveedor();
	   
		   $datosProducto['resultado'] = $this->Model_producto->BuscarDatos($buscar);
		   
		   //$paginacion = $this->Model_proveedor->paginacion($page_size,$offset);
		  // $datosProveedor['resultado']=  $paginacion;

	   
		  $this->load->view('layouts/superadministrador/header');
		  $this->load->view('layouts/superadministrador/aside');
		  $this->load->view('superadministrador/general/listadoProductos_view', $datosProducto);
		  $this->load->view('layouts/footer');
	   
	}


	public function registro()
	{

		    $datosCarga["idProducto"] = $datosCarga["nombreProducto"] = $datosCarga["descripcionProducto"] = $datosCarga["idCategoria"] =
			$datosCarga["marca"] = $datosCarga["idPresentacion"] = $datosCarga["valorMedida"] = $datosCarga["idUnidadMedida"] =
			$datosCarga["existencia"] = $datosCarga["idEspecieProducto"] = $datosCarga["indicaciones"] = $datosCarga["contradindicaciones"] = 
			$datosCarga["edadAplicacion"] = $datosCarga["precio"] = "";

			
			//Arreglo para recorrer y buscar los select "Tablas fuertes"
			$datosCarga['categorias'] = $this->Model_producto->buscarTodasCategorias();
			$datosCarga['marcas'] = $this->Model_producto->buscarTodasMarcas();
			$datosCarga['unidadesmedidas'] = $this->Model_producto->buscarUnidadesMedidas();
			$datosCarga['presentaciones'] = $this->Model_producto->buscarPresentaciones();
			$datosCarga['especieproductos'] = $this->Model_producto->buscarTodasEspecies();
			
			//Datos carga en general
			$datosCarga["idProducto"] = $this->input->post("codigo");
			$datosCarga["nombreProducto"] = $this->input->post("nombre");
			$datosCarga["descripcionProducto"] = $this->input->post("descripcion");
			$datosCarga["categoria"] = $this->input->post("categoria");
			$datosCarga["marca"] = $this->input->post("marca");
			$datosCarga["unidadMedida"] = $this->input->post("unidadDeMedida");
			$datosCarga["valorMedida"] = $this->input->post("valorDeMedida");
			$datosCarga["presentacion"] = $this->input->post("presentacion");
			$datosCarga["existencia"] = $this->input->post("existencia");
			$datosCarga["especieproducto"] = $this->input->post("tipoespecie");
			$datosCarga["precio"] = $this->input->post("precioVenta");

			//Datos carga del select Vacuna
			$datosCarga["indicaciones"] = $this->input->post("indicaciones");
			$datosCarga["contradindicaciones"] = $this->input->post("contraIndicaciones");
			$datosCarga["edad"] = $this->input->post("edad");
			$datosCarga["edadAplicacion"] = $this->input->post("unidadTiempo");

			
			//var_dump($datosCarga["edadAplicacion"],$datosCarga["edad"]);

			/*************************************************************/
			// **			Validaciónn de los campos					**// 
			/*************************************************************/

			if ($this->form_validation->run()) {

				$datosProducto["idProducto"] = $this->input->post("codigo");
				$datosProducto["nombreProducto"] = $this->input->post("nombre");
				$datosProducto["descripcionProducto"] = $this->input->post("descripcion");
				$datosProducto["idCategoria"] = $this->input->post("categoria");
				$datosProducto["marca"] = $this->input->post("marca");
				$datosProducto["idPresentacion"] = $this->input->post("presentacion");
				$datosProducto["valorMedida"] = $this->input->post("valorDeMedida");
				$datosProducto["idUnidadMedida"] = $this->input->post("unidadDeMedida");
				$datosProducto["existencia"] = $this->input->post("existencia");
				$datosProducto["idEspecieProducto"] = $this->input->post("tipoespecie");
				$datosProducto["indicaciones"] = $this->input->post("indicaciones");
				$datosProducto["contradindicaciones"] = $this->input->post("contraIndicaciones");
				//Se concatena edad con unidad de tiempo
				$Unidadtiempo = $this->input->post("unidadTiempo");
				//
				$datosProducto["edadAplicacion"] = $this->input->post("edad").' '.$Unidadtiempo; 
				$datosProducto["precio"] = $this->input->post("precioVenta");


				$this->Model_producto->insertarProducto($datosProducto);
				$this->session->set_flashdata('message', 'El producto ' .$datosCarga["nombreProducto"].' se ha registrado correctamente.');
				redirect("Producto");

			}else{


				$this->load->view('layouts/superadministrador/header');
				$this->load->view('layouts/superadministrador/aside');
				$this->load->view('superadministrador/formularios/registroProducto_view', $datosCarga );
				$this->load->view('layouts/footer');

			}

			


			//Campos del formulario 
			/*if ($this->input->server("REQUEST_METHOD") == "POST") {

			Arreglos para guardar informacion en las dos tabla: Producto
			solo se sutiliza un arreglo por que solo es una roducto
			*/
			
			
			/*//Cargar la imagen 
			$mi_archivo = 'cargaimagenproducto';
			$config['upload_path'] = "assets/img/productos";
			//$config['file_name'] = "Nombre_File";
			$config['allowed_types'] = "jpg|png|jpeg";
			$config['max_size'] = "5000";
			$config['max_width'] = "2000";
			$config['max_height'] = "2000";
	
			$this->load->library('upload', $config);
			
			$this->upload->do_upload($mi_archivo);
	

			$file_data = $this->upload->data();

			if($file_data['file_name']=="")
			{
				
				$rutaImagen = $datosProducto["imagen"] = base_url() . "assets/img/productos/" . $file_data['file_name'];
				$datosCarga["img"] = $rutaImagen;
	
			}

			else
			{
				
			}*/

			//Cargar la ruta al arreglo de datos que se va insertar en la base de datos
			//$datosProducto["imagen"] = base_url()."assets/img/productos/".$file_data['file_name'];


			//Se mantienen los datos al hacer una validación//

	
	
	}

	public function actualizar($idProducto = "")
	{

		if($this->form_validation->run())
		{


			$datosProducto["idProducto"] = $this->input->post("codigo");
			$datosProducto["nombreProducto"] = $this->input->post("nombre");
			$datosProducto["descripcionProducto"] = $this->input->post("descripcion");
			$datosProducto["idCategoria"] = $this->input->post("categoria");
			$datosProducto["marca"] = $this->input->post("marca");
			$datosProducto["idPresentacion"] = $this->input->post("presentacion");
			$datosProducto["valorMedida"] = $this->input->post("valorDeMedida");
			$datosProducto["idUnidadMedida"] = $this->input->post("unidadDeMedida");
			$datosProducto["existencia"] = $this->input->post("existencia");
			$datosProducto["idEspecieProducto"] = $this->input->post("tipoespecie");
			$datosProducto["indicaciones"] = $this->input->post("indicaciones");
			$datosProducto["contradindicaciones"] = $this->input->post("contraIndicaciones");
			$Unidadtiempo = $this->input->post("unidadTiempo");
			$datosProducto["edadAplicacion"] = $this->input->post("edad").' '.$Unidadtiempo; 
			$datosProducto["precio"] = $this->input->post("precioVenta");


			$this->Model_producto->actualizarProducto($idProducto, $datosProducto);

			$this->session->set_flashdata('actualizar', 'El producto ' .$datosProducto["nombreProducto"].' se ha actualizado correctamente.');

			redirect("producto");
		}
		else
		{
			

  			$datosProducto1 = $this->Model_producto->buscarDatosProducto($idProducto);
			 //Esta es la vista que carga los datos de los input
			 $data['clave']= $datosProducto1;
/*
			 //Arreglo para recorrer y buscar los select "Tablas fuertes"
			 $data['categorias'] = $this->Model_producto->buscarTodasCategorias();
			 $data['marcas'] = $this->Model_producto->buscarTodasMarcas();
			 $data['unidadesmedidas'] = $this->Model_producto->buscarUnidadesMedidas();
			 $data['presentaciones'] = $this->Model_producto->buscarPresentaciones();
			 $data['especieproductos'] = $this->Model_producto->buscarTodasEspecies();
*/	 
			 

			 $this->load->view('layouts/superadministrador/header');
			 $this->load->view('layouts/superadministrador/aside');
			 $this->load->view('superadministrador/formularios/actualizarProducto_view',$data);
			 $this->load->view('layouts/footer');
			 
		}


	}



	public function detalle($idProducto = "")
	{

		if (isset($idProducto)) {

			$resultado = $this->Model_producto->buscarDatosProducto($idProducto);

			$data['clave']= $resultado;


			if (isset($resultado)) {

				$this->load->view('layouts/superadministrador/header');
				$this->load->view('layouts/superadministrador/aside');
				$this->load->view('superadministrador/formularios/verDetalleProducto_view', $data);
				$this->load->view('layouts/footer');
			}
		}
	}

	public function delete(){

		$_idProducto= $this->input->post('idProducto',true);
		if(empty($_idProducto)){
			$this->output
			->set_status_header(400)
			->set_output(json_encode(array ('msg'=>'El código no puede ser vacío')));
		}
		else
		{
			$this->Model_producto->borrar($_idProducto);
			$this->output
			->set_status_header(200);
			
		}
	}	

}

?>
