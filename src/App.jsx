import { useCallback, useEffect, useMemo, useState } from 'react';
import { Layers, Palette } from 'lucide-react';
import { buildQRPayload, getContrastRatio } from './utils/payloadBuilder';
import { compressImageToDataURI } from './utils/imageCompressor';
import { PAYLOAD_TABS, INITIAL_PAYLOAD, INITIAL_STYLE, HISTORY_KEY } from './lib/options';
import { NavBar } from './components/NavBar';
import { FormatTabs } from './components/FormatTabs';
import { ContentPanel } from './components/ContentPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { HistoryDrawer } from './components/HistoryDrawer';
import { StylePanel } from './components/StylePanel';
import { FORMAT_CARDS } from './components/Formats';
import { useQRCode } from './hooks/useQRCode';

const GRADE_KEY = 'qrforge_grade';

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function App() {
  const [grade, setGrade] = useState(() => localStorage.getItem(GRADE_KEY) || 'light');
  const [activeTab, setActiveTab] = useState('url');
  const [configTab, setConfigTab] = useState('content');
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [exportSize, setExportSize] = useState(1024);
  const [payloadData, setPayloadData] = useState(INITIAL_PAYLOAD);
  const [styleOptions, setStyleOptions] = useState(INITIAL_STYLE);
  const [history, setHistory] = useState(readHistory);

  const darkMode = grade === 'dark';

  useEffect(() => {
    document.documentElement.dataset.grade = grade;
    localStorage.setItem(GRADE_KEY, grade);
  }, [grade]);

  const { hostRef, instanceRef } = useQRCode({ activeTab, payloadData, styleOptions });

  const payloadLength = useMemo(
    () => buildQRPayload(activeTab, payloadData).length,
    [activeTab, payloadData],
  );
  const payloadTooLarge = payloadLength > 2600;
  const contrastRatio = getContrastRatio(styleOptions.fgColor, styleOptions.bgColor);
  const lowContrast = contrastRatio < 3;
  const formatLabel = PAYLOAD_TABS.find((tab) => tab.id === activeTab)?.label ?? 'Tautan';

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const result = await compressImageToDataURI(file, 2300);
    setPayloadData((prev) => ({ ...prev, imageDataUrl: result.dataUrl, imageMeta: result }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setStyleOptions((prev) => ({ ...prev, logoUrl: reader.result, errorCorrectionLevel: 'H' }));
    reader.readAsDataURL(file);
  };

  const saveToHistory = useCallback(() => {
    const raw = buildQRPayload(activeTab, payloadData);
    const entry = {
      id: Date.now(),
      type: activeTab,
      preview: raw.slice(0, 45),
      payloadData,
      styleOptions,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory((prev) => {
      const next = [entry, ...prev.filter((item) => item.preview !== entry.preview)].slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, [activeTab, payloadData, styleOptions]);

  const handleDownload = async (extension) => {
    const instance = instanceRef.current;
    if (!instance) return;
    saveToHistory();
    instance.update({ width: exportSize, height: exportSize });
    await instance.download({ name: `qrforge-${activeTab}-${Date.now()}`, extension });
    instance.update({ width: 280, height: 280 });
  };

  const handleCopyClipboard = async () => {
    const instance = instanceRef.current;
    if (!instance) return;
    saveToHistory();
    instance.update({ width: exportSize, height: exportSize });
    const blob = await instance.getRawData('png');
    instance.update({ width: 280, height: 280 });
    if (!blob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const pickHistoryEntry = (entry) => {
    setActiveTab(entry.type);
    setPayloadData(entry.payloadData);
    setStyleOptions(entry.styleOptions);
    setHistoryOpen(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const scrollToForge = () => {
    document.getElementById('forge')?.scrollIntoView({ block: 'start' });
  };

  return (
    <>
      <NavBar
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
        darkMode={darkMode}
        onToggleTheme={() => setGrade(darkMode ? 'light' : 'dark')}
      />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <p className="hero__eyebrow">
              <span className="hero__dot" aria-hidden="true" />
              Diproses di browser, tanpa unggah
            </p>

            <div className="hero__head">
              <h1 id="hero-title" className="hero__title">
                Kode QR yang dibuat di perangkat Anda
              </h1>

              <div className="hero__side">
                <p className="hero__lead t-lead">
                  Lima jenis isi dalam satu workbench. Atur warna, bentuk modul, dan logo, lalu ekspor
                  PNG atau SVG sampai 2048 piksel.
                </p>

                <div className="hero__cta">
                  <button type="button" className="btn btn--primary" onClick={scrollToForge}>
                    Mulai buat kode
                  </button>
                  <a className="btn btn--secondary" href="#format">
                    Lihat lima format
                  </a>
                </div>

                <dl className="hero__facts">
                  <div>
                    <dt>Format isi</dt>
                    <dd>5</dd>
                  </div>
                  <div>
                    <dt>Resolusi ekspor</dt>
                    <dd>2048 px</dd>
                  </div>
                  <div>
                    <dt>Data terkirim</dt>
                    <dd>0 byte</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="hero__bottom">
              <FormatTabs activeTab={activeTab} onChange={setActiveTab} />
              <p className="hero__bottom-note">Pilih jenis isi, lalu isi detailnya di workbench.</p>
            </div>
          </div>
        </section>

        <section className="section" id="forge" aria-labelledby="forge-title">
          <div className="wrap">
            <div className="fmt-head">
              <h2 id="forge-title">Workbench</h2>
              <p>
                Isi di kiri, pratinjau di kanan. Setiap perubahan langsung terlihat sebelum Anda
                mengunduh berkasnya.
              </p>
            </div>

            <div className="bench">
              <div className="bench__controls">
                <div className="tabs" role="tablist" aria-label="Jenis pengaturan">
                  <button
                    type="button"
                    className="tab"
                    role="tab"
                    id="tab-content"
                    aria-selected={configTab === 'content'}
                    aria-controls="panel-content"
                    onClick={() => setConfigTab('content')}
                  >
                    <Layers aria-hidden="true" />
                    <span>Isi</span>
                  </button>
                  <button
                    type="button"
                    className="tab"
                    role="tab"
                    id="tab-style"
                    aria-selected={configTab === 'style'}
                    aria-controls="panel-style"
                    onClick={() => setConfigTab('style')}
                  >
                    <Palette aria-hidden="true" />
                    <span>Tampilan</span>
                  </button>
                </div>

                <div
                  className="panel"
                  id={configTab === 'content' ? 'panel-content' : 'panel-style'}
                  role="tabpanel"
                  aria-labelledby={configTab === 'content' ? 'tab-content' : 'tab-style'}
                >
                  {configTab === 'content' ? (
                    <ContentPanel
                      activeTab={activeTab}
                      data={payloadData}
                      onChange={setPayloadData}
                      onImageUpload={handleImageUpload}
                      payloadLength={payloadLength}
                      payloadTooLarge={payloadTooLarge}
                    />
                  ) : (
                    <StylePanel
                      style={styleOptions}
                      onChange={setStyleOptions}
                      contrastRatio={contrastRatio}
                      lowContrast={lowContrast}
                      onLogoUpload={handleLogoUpload}
                      onLogoClear={() =>
                        setStyleOptions((prev) => ({ ...prev, logoUrl: '', errorCorrectionLevel: 'M' }))
                      }
                    />
                  )}
                </div>
              </div>

              <PreviewPanel
                hostRef={hostRef}
                exportSize={exportSize}
                onSizeChange={setExportSize}
                onDownload={handleDownload}
                onCopy={handleCopyClipboard}
                copied={copied}
                formatLabel={formatLabel}
                payloadLength={payloadLength}
                onGoForge={() => setConfigTab('content')}
              />
            </div>
          </div>
        </section>

        <section className="section" id="format" aria-labelledby="format-title">
          <div className="wrap">
            <div className="fmt-head">
              <h2 id="format-title">Lima bentuk isi</h2>
              <p>
                Setiap format memakai skema yang dikenali pemindai bawaan iOS dan Android, bukan
                tautan perantara milik layanan pihak ketiga.
              </p>
            </div>

            <div className="fmt-grid">
              {FORMAT_CARDS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.id} className={item.wide ? 'fmt fmt--wide' : 'fmt'}>
                    <span className="fmt__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <span className="fmt__code">{item.code}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="wrap">
            <div className="foot__top">
              <p className="foot__word">QRForge</p>
              <p className="foot__note">
                Pembuat kode QR untuk tautan, teks, Wi-Fi, kontak, dan gambar kecil. Dibuka di browser
                apa pun, tanpa akun.
              </p>
            </div>
            <div className="foot__legal">
              <span>© {new Date().getFullYear()} QRForge</span>
              <nav aria-label="Tautan kaki halaman">
                <a href="#forge">Workbench</a>
                <a href="#format">Format</a>
                <a href="#top">Ke atas</a>
              </nav>
            </div>
          </div>
        </footer>
      </main>

      <HistoryDrawer
        open={historyOpen}
        entries={history}
        onClose={() => setHistoryOpen(false)}
        onPick={pickHistoryEntry}
        onClear={clearHistory}
      />
    </>
  );
}
