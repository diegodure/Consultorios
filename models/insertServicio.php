<?php
  $data = json_decode(file_get_contents("php://input"));
  $nombre = $data->{"nombre"};
  if(!empty($data->{"descripcion"})){
    $descripcion = $data->{"descripcion"};
  }else{
    $descripcion = "";
  }
  $costo = $data->{"costo"};

  include("../conect.php");

  $sql = "insert into Servicios (idServicio, Nombre, Descripcion, Costo, Active) values (null, '$nombre', '$descripcion', '$costo', 0)";
  $results = $con->query($sql);

  if(!$results){ 
      echo "error";
    }
    else{
      echo "Servicio registrado correctamente!";
    }

  $con->close();
?>