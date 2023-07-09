<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha1 = $data->{"fecha1"};
    $fecha2 = $data->{"fecha2"};

    include("../conect.php");

    $sql ="select Servicios.Nombre as Servicio_nombre, Servicios.Costo as Servicio_costo, Profesionales.Nombres as Profesional_nombre, Profesionales.Apellidos as Profesional_apellido, Consultas.Motivo from Consultas inner join Servicios on Consultas.Servicios_idServicio=Servicios.idServicio inner join Profesionales on Consultas.Profesionales_idProfesionale=Profesionales.idProfesionale order by Consultas.Fecha desc";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $con->close();

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>