import React, { useRef, useEffect } from 'react';
import LungImage from './lungs1.png';

const HeartFill = ({ percentage, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = LungImage;
    image.onload = () => {
      const { width, height } = image;
      const scaleFactor = 300 / Math.max(width, height);

      const scaledWidth = width * scaleFactor;
      const scaledHeight = height * scaleFactor;

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      // Draw the scaled lung image
      ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

      // Calculate the height of the filled area based on the percentage
      const filledHeight = (percentage / 100) * scaledHeight;

      // Fill the lung image with the specified color
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = color;
      ctx.fillRect(0, scaledHeight - filledHeight, scaledWidth, filledHeight);
    };
  }, [percentage, color]);

  return (
    <canvas
      ref={canvasRef}
      className="h-60 w-20"
      style={{ width: '100px', height: '100px' }}
    />
  );
};

export default HeartFill;
