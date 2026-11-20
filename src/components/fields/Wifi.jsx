import { Field } from '../Field';

export function WifiFields({ data, onChange }) {
  return (
    <>
      <Field id="qr-ssid" label="Nama jaringan (SSID)">
        <input
          id="qr-ssid"
          className="input mono"
          type="text"
          autoComplete="off"
          spellCheck="false"
          value={data.ssid}
          placeholder="nama-jaringan"
          onChange={(event) => onChange({ ...data, ssid: event.target.value })}
        />
      </Field>

      <div className="field__row">
        <Field id="qr-pass" label="Sandi">
          <input
            id="qr-pass"
            className="input mono"
            type="text"
            autoComplete="off"
            spellCheck="false"
            value={data.password}
            placeholder="sandi jaringan"
            onChange={(event) => onChange({ ...data, password: event.target.value })}
          />
        </Field>
        <Field id="qr-enc" label="Enkripsi">
          <select
            id="qr-enc"
            className="select"
            value={data.encryption}
            onChange={(event) => onChange({ ...data, encryption: event.target.value })}
          >
            <option value="WPA">WPA/WPA2/WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Terbuka</option>
          </select>
        </Field>
      </div>

      <label className="check" htmlFor="qr-hidden">
        <input
          id="qr-hidden"
          type="checkbox"
          checked={data.hidden}
          onChange={(event) => onChange({ ...data, hidden: event.target.checked })}
        />
        <span>Jaringan tersembunyi</span>
      </label>
    </>
  );
}
