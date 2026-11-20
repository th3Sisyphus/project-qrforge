import { Image as ImageIcon } from 'lucide-react';

export function ImageFields({ data, onUpload }) {
  return (
    <>
      <label className="drop" htmlFor="qr-image">
        <ImageIcon aria-hidden="true" />
        <span className="drop__title">Pilih gambar untuk ditanam</span>
        <span className="field__hint">
          Dikompres otomatis ke WebP data URI di bawah 2,4 KB agar muat di kapasitas kode QR.
        </span>
        <input id="qr-image" type="file" accept="image/*" className="sr-only" onChange={onUpload} />
      </label>

      {data.imageMeta ? (
        <div className="meta-row">
          <span>
            <strong>
              {data.imageMeta.width}×{data.imageMeta.height} px
            </strong>
          </span>
          <span>{data.imageMeta.size} karakter</span>
        </div>
      ) : (
        <p className="field__hint">Belum ada gambar. Kode memakai tautan contoh sampai gambar dipilih.</p>
      )}
    </>
  );
}
