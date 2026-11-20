import { useEffect, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';

export function HistoryDrawer({ open, entries, onClose, onPick, onClear }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-title"
      >
        <div className="drawer__head">
          <h2 id="history-title">Riwayat di perangkat ini</h2>
          <button
            type="button"
            className="btn btn--secondary btn--sm btn--icon"
            onClick={onClose}
            ref={closeRef}
            aria-label="Tutup riwayat"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="drawer__body">
          {entries.length === 0 ? (
            <p className="empty">Belum ada kode tersimpan. Ekspor satu kode, riwayat muncul di sini.</p>
          ) : (
            entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="hist"
                onClick={() => onPick(entry)}
              >
                <span className="hist__top">
                  <span>{entry.type}</span>
                  <span>{entry.timestamp}</span>
                </span>
                <span className="hist__preview">{entry.preview}</span>
              </button>
            ))
          )}
        </div>

        {entries.length > 0 && (
          <div className="drawer__foot">
            <button type="button" className="btn btn--secondary" onClick={onClear} style={{ width: '100%' }}>
              <Trash2 aria-hidden="true" />
              <span>Hapus semua riwayat</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
