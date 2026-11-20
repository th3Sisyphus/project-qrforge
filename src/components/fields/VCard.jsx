import { Field } from '../Field';

export function VCardFields({ data, onChange }) {
  const set = (key) => (event) => onChange({ ...data, [key]: event.target.value });

  return (
    <>
      <div className="field__row">
        <Field id="qr-first" label="Nama depan">
          <input
            id="qr-first"
            className="input"
            type="text"
            autoComplete="given-name"
            value={data.firstName}
            onChange={set('firstName')}
          />
        </Field>
        <Field id="qr-last" label="Nama belakang">
          <input
            id="qr-last"
            className="input"
            type="text"
            autoComplete="family-name"
            value={data.lastName}
            onChange={set('lastName')}
          />
        </Field>
      </div>

      <div className="field__row">
        <Field id="qr-phone" label="Telepon">
          <input
            id="qr-phone"
            className="input mono"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={set('phone')}
          />
        </Field>
        <Field id="qr-email" label="Email">
          <input
            id="qr-email"
            className="input mono"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={data.email}
            onChange={set('email')}
          />
        </Field>
      </div>

      <Field id="qr-org" label="Organisasi">
        <input
          id="qr-org"
          className="input"
          type="text"
          autoComplete="organization"
          value={data.org}
          onChange={set('org')}
        />
      </Field>
    </>
  );
}
