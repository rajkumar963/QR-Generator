let imgBox = document.getElementById("imgbox");
        let QRImage = document.getElementById("QRImage");
        let qrtext = document.getElementById("qrtext");
        let shareContainer = document.getElementById("shareContainer");
        let qrCodeUrl = "";
        let qrValue = "";
        
        function generateQR(){
            if(qrtext.value.length == 0){
                alert("Enter text or URL");
            } else {  
                qrValue = qrtext.value;
                qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrValue);
                QRImage.src = qrCodeUrl;
                imgBox.classList.add("show");
                shareContainer.classList.add("show");
            }
        }
        
        function downloadQR() {
            if (qrCodeUrl) {
                fetch(qrCodeUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const blobUrl = URL.createObjectURL(blob);
                        const downloadLink = document.createElement('a');
                        downloadLink.href = blobUrl;
                        downloadLink.download = 'qrcode.png';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(blobUrl);
                    })
                    .catch(error => {
                        console.error('Download failed:', error);
                        alert('Failed to download QR code. Please try again.');
                    });
            }
        }
        
        function shareQR(){
            try {
                // Create a download link for the QR code image
                const downloadLink = document.createElement('a');
                downloadLink.href = qrCodeUrl;
                downloadLink.download = 'qrcode.png';
                
                // Try to use the Web Share API if the context is secure (HTTPS)
                if (navigator.share && window.isSecureContext) {
                    navigator.share({
                        title: 'QR Code',
                        text: 'Check out this QR code!',
                        url: qrCodeUrl
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => {
                        console.log('Error sharing:', error);
                        // Fallback if share API fails
                        copyToClipboard();
                    });
                } else {
                    // For browsers that don't support Web Share API
                    copyToClipboard();
                }
            } catch (error) {
                console.error('Share failed:', error);
                copyToClipboard();
            }
        }
        
        function copyToClipboard() {
            const tempInput = document.createElement("input");
            document.body.appendChild(tempInput);
            tempInput.value = qrCodeUrl;
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            alert("QR code URL copied to clipboard!");
        }