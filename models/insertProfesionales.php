<?php
  $data = json_decode(file_get_contents("php://input"));
  $nombre = $data->{"nombre"};
  $apellido = $data->{"apellido"};
  $user = $data->{"user"};
  $pass = $data->{"pass"};
  $ci = $data->{"ci"};
  $telefono = $data->{"telefono"};


  include("../conect.php");

  $sql = "insert into Usuarios (idUsuario, Nombres, Apellidos,User,Pass,Roles_idRol, Ci, Telefono) values (null, '$nombre', '$apellido', '$user','$pass','2', '$ci', '$telefono')";
  $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Profesional registrado correctamente!";
    }

  $con->close();
?>