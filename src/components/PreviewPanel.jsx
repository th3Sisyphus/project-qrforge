import { Download, Copy, Check } from 'lucide-react';
import { EXPORT_SIZES } from '../lib/options';

export function PreviewPanel({
  hostRef,
  exportSize,
  onSizeChange,
  onDownload,
  onCopy,
  copied,
  formatLabel,
  payloadLength,
  onGoForge,
}) {
  return (
    <div className="bench__preview">
      <div className="preview__stage">
        <div className="preview__qr" ref={hostRef} role="img" aria-label={`Pratinjau kode QR format ${formatLabel}`} />
      </div>

      <div className="preview__foot">
        <span>
          Format <strong>{formatLabel}</strong> · {payloadLength} karakter
        </span>
        <div className="seg" role="group" aria-label="Resolusi ekspor">
          {EXPORT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={exportSize === size}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="export">
        <button type="button" className="btn btn--primary" onClick={() => onDownload('png')}>
          <Download aria-hidden="true" />
          <span>Unduh PNG</span>
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => onDownload('svg')}>
          <Download aria-hidden="true" />
          <span>Unduh SVG</span>
        </button>
        <button type="button" className="btn btn--secondary btn--wide" onClick={onCopy}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span>{copied ? 'Tersalin ke papan klip' : 'Salin gambar'}</span>
        </button>
      </div>

      <p className="field__hint" style={{ textAlign: 'center' }}>
        Diproses di perangkat Anda. Tidak ada data yang dikirim ke server.
      </p>
    </div>
  );
}
