import { History, Moon, Sun } from 'lucide-react';
import { Mark } from './Mark';

export function NavBar({ historyCount, onOpenHistory, darkMode, onToggleTheme }) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top" aria-label="QRForge, ke atas halaman">
          <Mark />
          <span>QRForge</span>
          <span className="nav__tag" aria-hidden="true">
            v1
          </span>
        </a>

        <nav className="nav__links" aria-label="Bagian halaman">
          <a href="#forge">Workbench</a>
          <a href="#format">Format</a>
          <a href="#pasang">Pasang</a>
        </nav>

        <div className="nav__actions">
          <button type="button" className="btn btn--secondary btn--sm" onClick={onOpenHistory}>
            <History aria-hidden="true" />
            <span>Riwayat</span>
            <span className="mono" aria-hidden="true">
              {historyCount}
            </span>
            <span className="sr-only">{historyCount} entri tersimpan</span>
          </button>
          <button
            type="button"
            className="btn btn--secondary btn--sm btn--icon"
            onClick={onToggleTheme}
            aria-pressed={darkMode}
            aria-label={darkMode ? 'Matikan mode gelap' : 'Nyalakan mode gelap'}
          >
            {darkMode ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
