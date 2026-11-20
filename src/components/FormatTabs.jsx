import { PAYLOAD_TABS } from '../lib/options';

export function FormatTabs({ activeTab, onChange }) {
  return (
    <div className="format-row" role="group" aria-label="Jenis isi kode QR">
      {PAYLOAD_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="format-chip"
          aria-pressed={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
