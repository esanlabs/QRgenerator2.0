function generarQR() {
    var urlInput = document.getElementById("urlInput").value;
    var qrCodeImg = document.getElementById("qrCodeImg");
    var qrContainer = document.getElementById("qrContainer");
    var reiniciarContainer = document.getElementById("reiniciarContainer");
 
    if (urlInput.trim() === "") {
        alert("Por favor, ingresa una URL válida.");
        return;
    }
 
    // Mostrar contenedor del QR y el botón de reiniciar
    qrContainer.style.display = "block";
    reiniciarContainer.style.display = "block";
 
    // Generar el código QR
    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(urlInput);
    qrCodeImg.src = qrUrl;
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
        agregarArbol();
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
 
function reiniciar() {
    location.reload();
}
 
 
 