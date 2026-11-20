export function buildQRPayload(type, data) {
  switch (type) {
    case 'url':
      return data.url?.trim() || 'https://yehezkieldarren.vercel.app';
    case 'text':
      return data.text || 'Hello World';
    case 'wifi': {
      const { ssid = '', password = '', encryption = 'WPA', hidden = false } = data;
      const esc = (str) => str.replace(/([\\;,:"])/g, '\\$1');
      return `WIFI:T:${encryption};S:${esc(ssid)};P:${esc(password)};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const { firstName = '', lastName = '', phone = '', email = '', org = '', url = '' } = data;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${firstName} ${lastName}`.trim(),
        org ? `ORG:${org}` : '',
        phone ? `TEL;TYPE=CELL:${phone}` : '',
        email ? `EMAIL:${email}` : '',
        url ? `URL:${url}` : '',
        'END:VCARD',
      ].filter(Boolean).join('\n');
    }
    case 'image':
      return data.imageDataUrl || 'https://yehezkieldarren.vercel.app';
    default:
      return 'https://yehezkieldarren.vercel.app';
  }
}

export function getContrastRatio(hex1, hex2) {
  const lum = (hex) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return 1;
    const rgb = [0, 2, 4].map((i) => {
      const c = parseInt(clean.substring(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = lum(hex1);
  const l2 = lum(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}