export function compressImageToDataURI(file, maxBytes = 2400) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = 96;
        let height = Math.round((img.height / img.width) * width);
        let quality = 0.7;
        let dataUrl = '';

        while (width >= 24) {
          canvas.width = width;
          canvas.height = height;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          dataUrl = canvas.toDataURL('image/webp', quality);

          if (dataUrl.length <= maxBytes) {
            return resolve({ dataUrl, size: dataUrl.length, width, height });
          }

          if (quality > 0.3) {
            quality -= 0.15;
          } else {
            width -= 12;
            height = Math.round((img.height / img.width) * width);
            quality = 0.6;
          }
        }
        resolve({ dataUrl, size: dataUrl.length, width, height, warning: true });
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}