<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El rincón de la mascota - Restablecer contraseña</title>
    <link rel="icon" href="<?php echo base_url();?>assets/img/iconos/icons8-mascotas-16.png" sizes="32x32" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/estilorestablecer2.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">

</head>

<body>
    <div class="login-dark">
        <form action="<?php echo base_url();?>login/preguntaSeguridad" method="post">
            <h2 class="sr-only">Restablecer contraseña</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class="form-group">
            <select class="form-control" type="text" name="pregunta"
                    placeholder="-Seleccione una pregunta de seguridad-">

                    <?php if ($pregunta != "") : ?>
                    <?php foreach ($informacion as $clave => $valor) : ?>
                    <?php if ($pregunta== $valor->idPreguntaSeguridad) : ?>

                    <option hidden value=" <?php echo  $valor->idPreguntaSeguridad; ?>" selected>
                        <?php

                        echo  $valor->pregunta; ?></option>
                    <?php
			            foreach ($informacion as $clave => $valor) : ?>


                    <option value=" <?php echo  $valor->idPreguntaSeguridad; ?>">
                        <?php echo  $valor->pregunta; ?></option>

                    <?php endforeach; ?>

                    <?php endif;  ?>
                    <?php endforeach; ?>
                    <?php else :
					foreach ($informacion as $clave => $valor) : ?>
                    <option value="" selected hidden>--Seleccione una pregunta de seguridad--</option>;
                    <option value=" <?php echo  $valor->idPreguntaSeguridad; ?>">
                        <?php echo  $valor->pregunta; ?></option>

                    <?php endforeach; ?>
                    <?php endif ?>

                </select>
                <?php echo form_error('pregunta', '<p class="text-danger">', '</p>'); ?>
            </div>
          
            <div class="form-group">

                <input autofocus class="form-control" type="text" name="respuestaSeguridad" placeholder="Ingrese la respuesta">
                <?php echo form_error('respuestaSeguridad', '<p class="text-danger">', '</p>'); ?>
            </div>
         


            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit"><i class="fas fa-save"></i>
                            Registrar</button>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <a class="btn btn-primary btn-block" href="<?php echo base_url();?>login"><i
                                class="fas fa-times-circle"></i> Cancelar</a>
                    </div>
                </div>
            </div>

            <div class="form-group"><input type="hidden" name="idUsuario" value="<?= $idUsuario; ?>"></div>
            <div class="form-group"><input type="hidden" name="nombre" value="<?= $nombre; ?>">
            <input type="hidden" name="nombreUsuario" value="<?= $nombreUsuario; ?>"></div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">
            </script>
            <link href="<?php echo base_url();?>assets/plugins/plugins/sweetalert2/sweetalert2.min.css"
                rel="stylesheet">

            <script src="<?php echo base_url(); ?>assets/plugins/plugins/toaster/toaster.js"></script>

            <!-- Plugin Sweet Alert 2: mensajes animados y popper: Este plugin se debe cargar siempre antes de ejecutarse por eso lo pusimos en el header-->
            <script src="<?php echo base_url(); ?>assets/plugins/plugins/sweetalert2/sweetalert2.all.min.js"></script>

            <?php if ($this->session->flashdata('errorrespuesta')) { ?>
            <script>
            $.toaster({
                settings: {
                    'timeout': 3500,


                }
            });
            $.toaster({
                message: '<?php echo $this->session->flashdata('errorrespuesta') ?>',
                title: 'Error',
                priority: 'danger',

            });;
            </script>

            <?php } ?>

</body>

</html>