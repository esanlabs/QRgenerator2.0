function generarQR() {
    var urlInput = document.getElementById("urlInput").value;
    var qrCodeImg = document.getElementById("qrCodeImg");
    var qrContainer = document.getElementById("qrContainer");
    var reiniciarContainer = document.getElementById("reiniciarContainer");

    if (urlInput.trim() === "") {
        alert("Por favor, ingresa una URL válida.");
        return;
    }

    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(urlInput);
    qrCodeImg.src = qrUrl;
    qrCodeImg.crossOrigin = 'Anonymous';

    setTimeout(function() {
        qrContainer.style.display = "block";
        reiniciarContainer.style.display = "block";

        document.getElementById("urlInput").style.display = "none";
        document.getElementById("buttonGenerar").style.display = "none";
        document.getElementById("buttonDescargar").style.display = "block";
        document.getElementById("switcherContainer").style.display = "block";
        document.getElementById("frase").style.display = "none";
    }, 1500);
}

function loadImage(event) {
    var picCenter = document.getElementById("picCenter");
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        picCenter.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function toggleArbol() {
    var qrCodeImg = document.getElementById("qrCodeImg");
    var picCenter = document.getElementById("picCenter");
    var miCanvas = document.getElementById("miCanvas");
    var switcher = document.getElementById("switcher");
    var fileFormatInfo = document.getElementById("fileFormatInfo");

    if (switcher.checked) {
        document.getElementById("imageInput").style.display = "block"; // Mostrar el input para cargar la imagen
        qrCodeImg.style.display = "none";
        miCanvas.style.display = "block";
        agregarImagen();
        fileFormatInfo.style.display = "block"; // Mostrar el texto debajo
    } else {
        document.getElementById("imageInput").style.display = "none"; // Ocultar el input de carga de imagen
        qrCodeImg.style.display = "block";
        miCanvas.style.display = "none";
        picCenter.style.display = "none";
        fileFormatInfo.style.display = "none"; // Ocultar el texto
    }
}

function agregarImagen() {
    var qrCodeImg = document.getElementById("qrCodeImg");
    var picCenter = document.getElementById("picCenter");
    var miCanvas = document.getElementById("miCanvas");
    var contexto = miCanvas.getContext('2d');

    qrCodeImg.crossOrigin = 'Anonymous';
    picCenter.crossOrigin = 'Anonymous';

    qrCodeImg.onload = function() {
        picCenter.onload = function() {
            contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

            // Dibujar el QR en el canvas
            contexto.drawImage(qrCodeImg, 0, 0, miCanvas.width, miCanvas.height);

            // Dimensiones fijas para la imagen central
            var imageSize = miCanvas.width * 0.3; // 30% del tamaño del QR
            var x = (miCanvas.width - imageSize) / 2;
            var y = (miCanvas.height - imageSize) / 2;

            // Dibujar la imagen en el centro del QR sin transparencia y con tamaño fijo
            contexto.drawImage(picCenter, x, y, imageSize, imageSize);
        };
        picCenter.src = picCenter.src; // Forzar recarga de la imagen
    };
    qrCodeImg.src = qrCodeImg.src; // Forzar recarga del QR
}

function reiniciar() {
    location.reload();
}

function descargar(){
    var canvas = document.getElementById('miCanvas');
    var imagen = document.getElementById('qrCodeImg');
    var estadoDisplayI = window.getComputedStyle(imagen).display;

    if(estadoDisplayI == "none") {
        var enlace = document.createElement('a');
        enlace.href = canvas.toDataURL();
        enlace.download = 'codigo_qr.png';
        enlace.click();
    } else {
        imagen.crossOrigin = 'Anonymous';
        fetch(imagen.src).then(resp => resp.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "QRimage.png";
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(() => alert('Hubo un error.'));
    }
}
