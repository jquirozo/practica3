//alertas del dispositivo

function pgAlert(mess){
	var title=$('title').text();
	var btnName='Aceptar';
	function error(){
		alert(mess);
	}
	navigator.notification.alert(mess, error, title, btnName);
}


//Lectura de archivos
function readFiles(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile('log.txt', null, function(archivo){
			archivo.file(function(archivo){
				var lector = new FileReader();				
				lector.onloadend = function(e){
					pgAlert('Lectura de archivo');					
				}
				$('#fileContent').text(lector.readAsText(archivo));
				alert(lector.readAsText(archivo));
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});
		},
		function(err){
			pgAlert("No se pudo acceder al sistema de archivos 1");
		});
	},
	function(err){
		pgAlert("No se pudo acceder al sistema de archivos 2");
	});
}
//Escritura de archivos
function writeFiles(){
	var content = $('#fileContent').val();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile('log.txt', { create: true }, function(archivo){
			archivo.createWriter(function(escritor){
				escritor.onwrite = function(e){
					pgAlert("El archivo fue escrito Correctamente!");
				};
				escritor.write(content);
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});
		}, function(err){
			pgAlert("No se pudo acceder al sistema de archivos 1");
		});
	}, function(err){
		pgAlert("No se pudo acceder al sistema de archivos 2");
	});
}
//escribe comentario de pausa
function writeFilesPausa(){
	var content = 'La Aplicacion se ha Pausado';
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile('log.txt', { create: true }, function(archivo){
			archivo.createWriter(function(escritor){
				escritor.onwrite = function(e){
					//pgAlert("El archivo fue escrito Correctamente!");
					
					archivo.file(function(archivo){
				var lector = new FileReader();				
				lector.onloadend = function(e){
					//pgAlert('Lectura de archivo');					
				}
				$('#fileContent').text(lector.readAsText(archivo));
				//alert(lector.readAsText(archivo));
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});											
					
					
				};
				escritor.write(content+lector.readAsText(archivo));
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});
		}, function(err){
			pgAlert("No se pudo acceder al sistema de archivos 1");
		});
	}, function(err){
		pgAlert("No se pudo acceder al sistema de archivos 2");
	});
}



$(document).ready(function(){
	document.addEventListener("deviceready",function(){
		//Información del dispositivo
		$('#devic table td').eq(1).text(device.name);
		$('#devic table td').eq(3).text(device.cordova);
		$('#devic table td').eq(5).text(device.platform);
		$('#devic table td').eq(7).text(device.version);
		$('#devic table td').eq(9).text(device.uuid);
		//Historial Eventos
		document.addEventListener("pause", function(){//Al pausar la aplicación
			//eventHistory('La aplicaci&oacute;n se paus&oacute;');
			//escribimos en el archivo
			//writeFilesPausa();
			pgAlert(pausa);
		}, false);
		document.addEventListener("resume", function(){//Al volver a la aplicación
			pgAlert(reanuda);
			//eventHistory('La aplicaci&oacute;n se reinici&oacute;');
			//escribimos n el archivo
			/*navigator.notification.confirm('¿que desea hacer?', function(boton){ 
			switch(boton){
				case '0':
					//navigator.notification.beep(1);
					break;
				case '1':
					navigator.notification.vibrate(500);
					break;
				case '2':
					navigator.notification.alert("Plataforma", function(){ },"Practica 3","Aceptar");
					break;
				}
		},"Práctica 1","Cancelar,Vibrar,Plataforma");*/
		}, false);		
		
		//Acciones de formularios
			$('.sendForm').click(function(){
				switch($(this).parents('ul').attr('id')){					
					case 'playFiles':
						writeFiles();
						break;
				}
				
			});
	}, false);
});
function eventHistory(action){
	$('#eventsHistory').append('<li>'+action+'</li>');
}