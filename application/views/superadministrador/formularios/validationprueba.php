<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>
<script src="<?php echo base_url(); ?>assets/js/micodigo.js"></script>
<style>
body {
  margin: 20px 0;
  font-family: 'Lato';
  font-weight: 300;
  font-size: 1.25rem;
  width: 300px;
}

form, p {
  margin: 20px;
}

p.note {
  font-size: 1rem;
  color: red;
}

input {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 4px;
  font-family: 'Lato';
  width: 300px;
  margin-top: 10px;
}

label {
  width: 300px;
  font-weight: bold;
  display: inline-block;
  margin-top: 20px;
}

label span {
  font-size: 1rem;
}

label.error {
    color: red;
    font-size: 1rem;
    display: block;
    margin-top: 5px;
}

input.error {
    border: 1px dashed red;
    font-weight: 300;
    color: red;
}

[type="submit"], [type="reset"], button, html [type="button"] {
    margin-left: 0;
    border-radius: 0;
    background: black;
    color: white;
    border: none;
    font-weight: 300;
    padding: 10px 0;
    line-height: 1;
}
</style>
</head>
<body>
    
<form id="basic-form" action="" method="post">
    <p>
      <label for="name">Name <span>(required, at least 3 characters)</span></label>
      <input id="name" name="name" minlength="3" type="text" required>
    </p>
    <p>
      <label for="email">E-Mail <span>(required)</span></label>
      <input id="email" type="email" name="email" required>
    </p>
    <p>
    <input class="submit" type="submit" value="SUBMIT">
    </p>
</form>

</body>
</html>