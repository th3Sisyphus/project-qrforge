import { Field } from './Field';
import { DOT_LABELS, CORNER_FRAME_LABELS, DOT_TYPES, CORNER_SQUARE_TYPES, CORNER_DOT_TYPES } from '../lib/options';

export function StylePanel({ style, onChange, contrastRatio, lowContrast, onLogoUpload, onLogoClear }) {
  const set = (key) => (event) => onChange({ ...style, [key]: event.target.value });

  return (
    <>
      <div className="field__row">
        <Field id="qr-fg" label="Warna modul">
          <div className="swatch-field">
            <input
              id="qr-fg"
              type="color"
              value={style.fgColor}
              onChange={set('fgColor')}
              aria-label="Pilih warna modul"
            />
            <input
              className="input"
              type="text"
              spellCheck="false"
              value={style.fgColor}
              onChange={set('fgColor')}
              aria-label="Kode warna modul"
            />
          </div>
        </Field>

        <Field id="qr-bg" label="Warna latar">
          <div className="swatch-field">
            <input
              id="qr-bg"
              type="color"
              value={style.bgColor}
              onChange={set('bgColor')}
              aria-label="Pilih warna latar"
            />
            <input
              className="input"
              type="text"
              spellCheck="false"
              value={style.bgColor}
              onChange={set('bgColor')}
              aria-label="Kode warna latar"
            />
          </div>
        </Field>
      </div>

      {lowContrast && (
        <p className="warn" role="status">
          Kontras {contrastRatio.toFixed(1)}:1. Di bawah 3:1, kamera sering gagal membaca kode.
        </p>
      )}

      <div className="field__row">
        <Field id="qr-dots" label="Bentuk modul">
          <select id="qr-dots" className="select" value={style.dotType} onChange={set('dotType')}>
            {DOT_TYPES.map((type) => (
              <option key={type} value={type}>
                {DOT_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field id="qr-corner" label="Bingkai sudut">
          <select
            id="qr-corner"
            className="select"
            value={style.cornerSquareType}
            onChange={set('cornerSquareType')}
          >
            {CORNER_SQUARE_TYPES.map((type) => (
              <option key={type} value={type}>
                {CORNER_FRAME_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="field__row">
        <Field id="qr-cornerdot" label="Titik sudut">
          <select
            id="qr-cornerdot"
            className="select"
            value={style.cornerDotType}
            onChange={set('cornerDotType')}
          >
            {CORNER_DOT_TYPES.map((type) => (
              <option key={type} value={type}>
                {CORNER_FRAME_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field id="qr-margin" label="Margin">
          <select
            id="qr-margin"
            className="select"
            value={String(style.margin)}
            onChange={(event) => onChange({ ...style, margin: Number(event.target.value) })}
          >
            <option value="0">Tanpa margin</option>
            <option value="8">Tipis</option>
            <option value="12">Sedang</option>
            <option value="24">Lebar</option>
          </select>
        </Field>
      </div>

      <div className="field">
        <span className="field__label" id="qr-logo-label">
          Logo tengah
        </span>
        <div className="row-between">
          <label className="btn btn--secondary btn--sm" aria-describedby="qr-logo-label">
            Pilih logo
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              aria-describedby="qr-logo-label"
              onChange={onLogoUpload}
            />
          </label>
          {style.logoUrl ? (
            <button type="button" className="btn btn--secondary btn--sm" onClick={onLogoClear}>
              Hapus logo
            </button>
          ) : (
            <span className="field__hint">Koreksi galat naik ke H saat logo terpasang.</span>
          )}
        </div>
      </div>
    </>
  );
}
