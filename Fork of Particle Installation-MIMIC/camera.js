var video = document.getElementById('video');
var videoCanvas = document.getElementById('video-canvas');
var ctx = videoCanvas.getContext('2d');
var net;

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  video.srcObject = stream;
  video.play();
  video.onloadeddata = (event) => {
    console.log("on loaded video data")
parent.postMessage(["console",JSON.stringify("on loaded video data")], "*");
    console.log("loading model...");
parent.postMessage(["console",JSON.stringify("loading model...")], "*");
    bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 4
    }).then((n)=> {
      net = n;
      console.log("loaded model");
parent.postMessage(["console",JSON.stringify("loaded model")], "*");
      drawCameraIntoCanvas();
    });
  };
});
}

function drawCameraIntoCanvas() {
 net.segmentPersonParts(video, {
  flipHorizontal: true,
  internalResolution: 'medium',
  segmentationThreshold: 0.7,
  maxDetections:1.0
}).then((segmentation)=> {
   let row = [];
   if(segmentation.allPoses[0]) {
     segmentation.allPoses[0].keypoints.forEach((pt)=> {
       row = row.concat([pt.position.x, pt.position.y, pt.score]);
     }); 
     //Add all skeleton points to dataset
     onNewSkeleton(row)       
   }
   //console.log(segmentation)
  const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
  const opacity = 1.0;
  const flipHorizontal = true;
  const maskBlurAmount = 0;
  bodyPix.drawMask(
      videoCanvas, video, coloredPartImage, opacity, maskBlurAmount,flipHorizontal);
  window.requestAnimationFrame(drawCameraIntoCanvas);
});

}