import { AlertTriangle } from 'lucide-react';
import { UrlFields, TextFields } from './fields/UrlText';
import { WifiFields } from './fields/Wifi';
import { VCardFields } from './fields/VCard';
import { ImageFields } from './fields/ImageField';

export function ContentPanel({ activeTab, data, onChange, onImageUpload, payloadLength, payloadTooLarge }) {
  return (
    <>
      {activeTab === 'url' && <UrlFields data={data} onChange={onChange} />}
      {activeTab === 'text' && <TextFields data={data} onChange={onChange} />}
      {activeTab === 'wifi' && <WifiFields data={data} onChange={onChange} />}
      {activeTab === 'vcard' && <VCardFields data={data} onChange={onChange} />}
      {activeTab === 'image' && <ImageFields data={data} onUpload={onImageUpload} />}

      <div className="meta-row">
        <span>
          Ukuran isi <strong>{payloadLength}</strong> karakter
        </span>
        {payloadTooLarge && (
          <span className="warn">
            <AlertTriangle aria-hidden="true" />
            Isi terlalu padat, sebagian pemindai gagal membaca.
          </span>
        )}
      </div>
    </>
  );
}
