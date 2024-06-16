import React, { useRef, useEffect } from 'react';

function ImageWithCircles({ imageUrl, circleCoordinates }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Draw circles
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
      const offsetX = (canvas.width - image.width * scale) / 2;
      const offsetY = (canvas.height - image.height * scale) / 2;

      ctx.drawImage(image, offsetX, offsetY, image.width * scale, image.height * scale);
      ctx.strokeStyle = 'red'; // Set outline color to red
    ctx.lineWidth = 2; // Set outline width
    circleCoordinates.forEach(coord => {
      const x = coord.x;
      const y = coord.y;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.stroke(); // Draw only the outline
    });
    };
  }, [imageUrl, circleCoordinates]);

  return <canvas ref={canvasRef}/>;
}

export default ImageWithCircles;
