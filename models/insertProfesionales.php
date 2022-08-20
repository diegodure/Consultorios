<?php
  $data = json_decode(file_get_contents("php://input"));
  $nombre = $data->{"nombre"};
  $apellido = $data->{"apellido"};
  $ci = $data->{"ci"};
  $telefono = $data->{"telefono"};
    
  $costo = $data->{"costo"};

  include("../conect.php");

  $sql = "insert into Profesionales (idProfesionale, Nombres, Apellidos, Ci, Telefono, Active) values (null, '$nombre', '$apellido', '$ci', '$telefono', 0)";
  $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Profesional registrado correctamente!";
    }

  $con->close();
?>