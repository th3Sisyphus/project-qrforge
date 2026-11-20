export const PAYLOAD_TABS = [
  { id: 'url', label: 'Tautan' },
  { id: 'text', label: 'Teks' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'vcard', label: 'Kontak' },
  { id: 'image', label: 'Gambar' },
];

export const DOT_TYPES = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'];
export const CORNER_SQUARE_TYPES = ['square', 'extra-rounded', 'dot'];
export const CORNER_DOT_TYPES = ['square', 'dot'];
export const EXPORT_SIZES = [512, 1024, 2048];

export const DOT_LABELS = {
  square: 'Kotak',
  rounded: 'Membulat',
  dots: 'Titik',
  classy: 'Klasik',
  'classy-rounded': 'Klasik membulat',
  'extra-rounded': 'Sangat membulat',
};

export const CORNER_FRAME_LABELS = { square: 'Kotak', 'extra-rounded': 'Membulat', dot: 'Titik' };

export const INITIAL_PAYLOAD = {
  url: 'https://yehezkieldarren.vercel.app',
  text: '',
  ssid: '',
  password: '',
  encryption: 'WPA',
  hidden: false,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  org: '',
  imageDataUrl: '',
  imageMeta: null,
};

export const INITIAL_STYLE = {
  fgColor: '#26251e',
  bgColor: '#ffffff',
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  logoUrl: '',
  logoSize: 0.35,
  errorCorrectionLevel: 'M',
  margin: 12,
};

export const HISTORY_KEY = 'qrforge_history';
