<?php
  $data = json_decode(file_get_contents("php://input"));
  $nombre = $data->{"nombre"};
  $apellido = $data->{"apellido"};
  $user = $data->{"user"};
  $pass = $data->{"pass"};
  $ci = $data->{"ci"};
  $telefono = $data->{"telefono"};
  $idService = $data->{"idService"};

  include("../conect.php");

  $sql = "insert into Usuarios (idUsuario, Nombres, Apellidos,User,Pass,Roles_idRol, Ci, Telefono,empresa_id) 
  values (null, '$nombre', '$apellido', '$user','$pass','2', '$ci', '$telefono', '$idService')";
  $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Profesional registrado correctamente!";
    }

  $con->close();
?>