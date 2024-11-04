document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoUrls = [
        'c2.mp4',
        'c3.mp4',
        'c4.mp4',
        'c5.mp4'
    ];

    let currentVideoIndex = 0;

    // Función para reproducir el siguiente video
    const playNextVideo = () => {
        videoPlayer.src = videoUrls[currentVideoIndex];
        videoPlayer.play().catch(error => console.log("Error al reproducir video:", error));
        currentVideoIndex = (currentVideoIndex + 1) % videoUrls.length; // Actualiza el índice
    };

    // Inicia reproduciendo el primer video
    playNextVideo();

    // Cambiar al siguiente video cuando termine el actual
    videoPlayer.addEventListener('ended', playNextVideo);
});
