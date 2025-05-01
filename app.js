let imgBox=document.getElementById("imgbox");
let QRImage=document.getElementById("QRImage");
let qrtext=document.getElementById("qrtext");

function generateQR(){
    
        if(qrtext.value.length==0){
            alert("Enter text or URL");
        }else{  
            QRImage.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrtext.value;
            imgBox.classList.add("show");
        }
    
}





