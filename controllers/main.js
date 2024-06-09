jQuery( document ).ready(function() {
    console.log( "ready!" );
    var roleUser;
});

function getUserRolForMenu(userRol){
	if(userRol == 'Profesional'){
		document.getElementById("liCalendar").style.display = "none";
		document.getElementById("liProfesionals").style.display = "none";
		document.getElementById("liServices").style.display = "none";
		document.getElementById("liUsers").style.display = "none";
		document.getElementById("liReports").style.display = "none";
		roleUser = 'Profesional';
	}else if(userRol == 'Recepcionista'){
		document.getElementById("liConsults").style.display = "none";
		document.getElementById("liProfesionals").style.display = "none";
		document.getElementById("liServices").style.display = "none";
		document.getElementById("liUsers").style.display = "none";
		document.getElementById("liReports").style.display = "none";
		roleUser = 'Recepcionista';
	}else if(userRol == 'Administrador'){
		roleUser = 'Administrador';
	}
}

// document.addEventListener("DOMContentLoaded", () => {
// 	const $resultados = document.querySelector("#resultado");
// 	Quagga.init({
// 		inputStream: {
// 			constraints: {
// 				width: 1920,
// 				height: 1080,
// 			},
// 			name: "Live",
// 			type: "LiveStream",
// 			target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
// 		},
// 		decoder: {
// 			readers: ["code_128_reader",
//                         "ean_reader",
//                         "ean_8_reader",
//                         "code_39_reader",
//                         "code_39_vin_reader",
//                         "codabar_reader",
//                         "upc_reader",
//                         "upc_e_reader",
//                         "i2of5_reader"]
// 		}
// 	}, function (err) {
// 		if (err) {
// 			console.log(err);
// 			return
// 		}
// 		console.log("Iniciado correctamente");
// 		Quagga.start();
// 	});

// 	Quagga.onDetected((data) => {
// 		$resultados.textContent = data.codeResult.code;
// 		// Imprimimos todo el data para que puedas depurar
// 		console.log(data);
// 	});

// 	Quagga.onProcessed(function (result) {
// 		var drawingCtx = Quagga.canvas.ctx.overlay,
// 			drawingCanvas = Quagga.canvas.dom.overlay;

// 		if (result) {
// 			if (result.boxes) {
// 				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
// 				result.boxes.filter(function (box) {
// 					return box !== result.box;
// 				}).forEach(function (box) {
// 					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
// 				});
// 			}

// 			if (result.box) {
// 				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
// 			}

// 			if (result.codeResult && result.codeResult.code) {
// 				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
// 			}
// 		}
// 	});
// });