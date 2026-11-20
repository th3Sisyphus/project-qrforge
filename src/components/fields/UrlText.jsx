import { Field } from '../Field';

export function UrlFields({ data, onChange }) {
  return (
    <Field id="qr-url" label="Alamat tautan" hint="Sertakan https:// supaya pemindai langsung membuka browser.">
      <input
        id="qr-url"
        className="input mono"
        type="url"
        inputMode="url"
        autoComplete="url"
        spellCheck="false"
        value={data.url}
        placeholder="https://contoh.id/halaman"
        aria-describedby="qr-url-hint"
        onChange={(event) => onChange({ ...data, url: event.target.value })}
      />
    </Field>
  );
}

export function TextFields({ data, onChange }) {
  return (
    <Field id="qr-text" label="Isi teks" hint="Sekitar 2.000 karakter masih nyaman dipindai kamera ponsel.">
      <textarea
        id="qr-text"
        className="textarea mono"
        value={data.text}
        placeholder="Tulis teks yang ingin ditampilkan"
        aria-describedby="qr-text-hint"
        onChange={(event) => onChange({ ...data, text: event.target.value })}
      />
    </Field>
  );
}
