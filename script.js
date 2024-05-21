function generarQR() {
    var urlInput = document.getElementById("urlInput").value;
    var qrCodeImg = document.getElementById("qrCodeImg");
    var qrContainer = document.getElementById("qrContainer");
    var reiniciarContainer = document.getElementById("reiniciarContainer");
 
    if (urlInput.trim() === "") {
        alert("Por favor, ingresa una URL válida.");
        return;
    }
 
    
 
    // Generar el código QR
    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(urlInput);
    
    qrCodeImg.src = qrUrl;
    qrCodeImg.crossOrigin = 'Anonymous';

    setTimeout(function() {

        // Mostrar contenedor del QR y el botón de reiniciar
        qrContainer.style.display = "block";
        reiniciarContainer.style.display = "block";
        // Ahora preparo
        var inputURL = document.getElementById("urlInput");
        var bGenerar = document.getElementById("buttonGenerar");
        var bDescargar = document.getElementById("buttonDescargar");    
        var switcher = document.getElementById("switcherContainer");
        var f = document.getElementById("frase")

        inputURL.style.display = "none";
        bGenerar.style.display = "none";
        bDescargar.style.display = "block";
        switcher.style.display = "block";
        f.style.display = "none";
    }, 1500); // 2000 milisegundos = 2 segundos
    /*
    //Ahora preparo.
    var inputURL = document.getElementById("urlInput");
    var bGenerar = document.getElementById("buttonGenerar");
    var bDescargar = document.getElementById("buttonDescargar");    
    var switcher = document.getElementById("switcherContainer");

    inputURL.style.display = "none";
    bGenerar.style.display = "none";
    bDescargar.style.display = "block";
    switcher.style.display = "block"
    */
    
}
 
function toggleArbol() {
    var qrCodeImg = document.getElementById("qrCodeImg");
    var picCenter = document.getElementById("picCenter");
    var miCanvas = document.getElementById("miCanvas");
    var switcher = document.getElementById("switcher");
 
    if (switcher.checked) {
        qrCodeImg.style.display = "none";
        miCanvas.style.display = "block";
        picCenter.style.display = "block";
        agregarArbol2();
    } else {
        qrCodeImg.style.display = "block";
        miCanvas.style.display = "none";
        picCenter.style.display = "none";
    }
}
 
function agregarArbol() {
    var qrCodeImg = document.getElementById("qrCodeImg");
    var picCenter = document.getElementById("picCenter");
    var miCanvas = document.getElementById("miCanvas");
    var contexto = miCanvas.getContext('2d');
 
    picCenter.style.display = "block";
 
    contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);
    contexto.drawImage(qrCodeImg, 0, 0, miCanvas.width, miCanvas.height);
    var x = (miCanvas.width - picCenter.width) / 2;
    var y = (miCanvas.height - picCenter.height) / 2;
    contexto.drawImage(picCenter, x, y);
}
function agregarArbol2() {
    var qrCodeImg = document.getElementById("qrCodeImg");
    var picCenter = document.getElementById("picCenter");
    var miCanvas = document.getElementById("miCanvas");
    var contexto = miCanvas.getContext('2d');
                
    // Habilitar CORS en las imágenes
    qrCodeImg.crossOrigin = 'Anonymous';
    picCenter.crossOrigin = 'Anonymous';
                
    // Asegurarse de que las imágenes se hayan cargado antes de dibujarlas
    qrCodeImg.onload = function() {
        picCenter.onload = function() {
            picCenter.style.display = "block";
                                
            contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);
            contexto.drawImage(qrCodeImg, 0, 0, miCanvas.width, miCanvas.height);
                                
            var x = (miCanvas.width - picCenter.width) / 2;
            var y = (miCanvas.height - picCenter.height) / 2;
            contexto.drawImage(picCenter, x, y);
        };
        // Forzar recarga de la imagen picCenter para aplicar CORS
        picCenter.src = picCenter.src;
    };
    // Forzar recarga de la imagen qrCodeImg para aplicar CORS
    qrCodeImg.src = qrCodeImg.src;
}

function reiniciar() {
    location.reload();
}
 
function descargar(){
    var canvas = document.getElementById('miCanvas');
    var imagen = document.getElementById('qrCodeImg');

    var estadoDisplayI = window.getComputedStyle(imagen).display;
    
    if( estadoDisplayI == "none"){
        var enlace = document.createElement('a');
        enlace.href = canvas.toDataURL();
        // Asignar un nombre al archivo a descargar
        enlace.download = 'codigo_qr.png';
        // Simular el clic en el enlace para iniciar la descarga
        enlace.click();
    }else{
        imagen.crossOrigin = 'Anonymous';
        var url = imagen.src;
        fetch(url).then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a  = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = "QRimage.png"
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

        }).catch(() => alert('Hubo un error. '))
            

    }

    
}
 
 