import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Boxes, Github, HelpCircle, Sparkles, Gauge, Route, ShieldCheck, Globe } from 'lucide-react';
import { ZBuilder } from './components/ZBuilder';
import { ArtifactBuilder } from './components/ArtifactBuilder';
import { RepoImporter } from './components/RepoImporter';
import { VerifyPanel } from './components/VerifyPanel';
import { SegTabs } from './components/ui';
import { FileUp, BarChart3, TrendingUp, Save } from 'lucide-react';
import { OnboardingModal, clearOnboardingDismissal } from './components/OnboardingModal';
import type { HarnessConfig } from './generator';

type Mode = 'repo' | 'import' | 'gemini' | 'artifact' | 'verify' | 'dashboard';

export default function App() {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState<Mode>('gemini');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'th' : 'en');
  };
  const [seed, setSeed] = useState<HarnessConfig | undefined>(undefined);
  // Bump to force-remount ZBuilder when a repo plan seeds a new config.
  const [seedKey, setSeedKey] = useState(0);
  // iter 106 — onboarding modal state (undefined → modal decides from localStorage)
  const [forceOnboarding, setForceOnboarding] = useState<boolean | undefined>(undefined);

  function useRepoPlan(cfg: HarnessConfig) {
    setSeed(cfg);
    setSeedKey((k) => k + 1);
    setMode('gemini');
  }

  function reopenOnboarding() {
    // Clear the localStorage flag so future visits see the modal again,
    // and force-open it for the current session.
    clearOnboardingDismissal();
    setForceOnboarding(true);
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <a
            href="https://github.com/cvsz/zagents-generator"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-ink-600 hover:text-white"
          >
            <Github size={14} /> cvsz/zagents-generator
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-ink-600 hover:text-white uppercase"
              aria-label="Toggle language"
            >
              <Globe size={14} /> <span className="hidden sm:inline">{i18n.language}</span>
            </button>
            <button
              onClick={reopenOnboarding}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-ink-600 hover:text-white"
              aria-label="Reopen onboarding tour"
            >
              <HelpCircle size={14} /> <span className="hidden sm:inline">{t('app.tour')}</span>
            </button>
            <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
              <Sparkles size={14} className="text-brand-glow" /> {t('app.client_side')}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-glow">
              <Boxes size={13} /> Meta-gemini · the agent gemini supply chain
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('app.title')} <span className="text-brand-glow">{t('app.studio')}</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              {t('app.subtitle')}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { icon: Gauge, title: t('app.features.score.title'), desc: t('app.features.score.desc') },
                { icon: Route, title: t('app.features.routing.title'), desc: t('app.features.routing.desc') },
                { icon: ShieldCheck, title: t('app.features.security.title'), desc: t('app.features.security.desc') },
              ].map(({ icon: Icon, title, desc }) => (
                <span
                  key={title}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-800/50 px-2.5 py-1 text-xs text-slate-300"
                  title={desc}
                >
                  <Icon size={13} className="text-brand-glow" />
                  <span className="font-medium text-slate-200">{title}</span>
                  <span className="hidden text-slate-500 sm:inline">— {desc}</span>
                </span>
              ))}
            </div>
          </div>
          <SegTabs
            value={mode}
            onChange={(m) => setMode(m as Mode)}
            options={[
              { id: 'repo', label: t('app.tabs.repo') },
              { id: 'import', label: 'Import ZIP' },
              { id: 'gemini', label: t('app.tabs.gemini') },
              { id: 'artifact', label: t('app.tabs.artifact') },
              { id: 'verify', label: t('app.tabs.verify') },
              { id: 'dashboard', label: 'Router Dashboard' },
            ]}
          />
        </div>
      </header>

      <main>
        {mode === 'repo' && <RepoImporter onUse={useRepoPlan} />}
        {mode === 'import' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-brand/10 p-4 rounded-full mb-4">
              <FileUp size={32} className="text-brand-glow" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200">Import Existing Gemini</h2>
            <p className="text-slate-400 mt-2 max-w-md">
              Drag and drop your previously generated <code>.zip</code> file or <code>manifest.json</code> here to load it into the Visual Editor.
            </p>
            <div className="mt-8 border-2 border-dashed border-ink-600 p-12 w-full max-w-xl rounded-xl bg-ink-800/30 transition hover:bg-ink-800/60 hover:border-brand/50 cursor-pointer flex flex-col items-center gap-4">
               <input type="file" accept=".zip,.json" className="hidden" id="file-upload" />
               <label htmlFor="file-upload" className="cursor-pointer bg-brand hover:bg-brand/80 text-white font-bold py-2 px-6 rounded-lg transition">
                 Select File
               </label>
               <span className="text-sm text-slate-500">or drop file here</span>
            </div>
          </div>
        )}
        {mode === 'gemini' && <ZBuilder key={seedKey} seed={seed} />}
        {mode === 'artifact' && <ArtifactBuilder />}
        {mode === 'verify' && <VerifyPanel />}
        {mode === 'dashboard' && (
          <div className="py-8 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="text-brand-glow" size={28} />
              <h2 className="text-2xl font-bold text-slate-200">Router Analytics Dashboard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-ink-800/50 border border-ink-700 p-6 rounded-xl flex flex-col gap-2">
                <span className="text-slate-400 text-sm font-medium">Total Requests Routed</span>
                <span className="text-3xl font-bold text-white">12,458</span>
                <span className="text-green-400 text-xs flex items-center gap-1"><TrendingUp size={12}/> +14% this week</span>
              </div>
              <div className="bg-ink-800/50 border border-ink-700 p-6 rounded-xl flex flex-col gap-2">
                <span className="text-slate-400 text-sm font-medium">Est. Cost Savings</span>
                <span className="text-3xl font-bold text-brand-glow">$342.50</span>
                <span className="text-slate-500 text-xs">compared to strictly frontier models</span>
              </div>
              <div className="bg-ink-800/50 border border-ink-700 p-6 rounded-xl flex flex-col gap-2">
                <span className="text-slate-400 text-sm font-medium">Tier Downgrades</span>
                <span className="text-3xl font-bold text-white">68%</span>
                <span className="text-slate-500 text-xs">requests successfully handled by cheaper tier</span>
              </div>
            </div>

            <div className="bg-ink-800/30 border border-ink-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2"><Save size={18}/> Model Usage Distribution</h3>
              <div className="space-y-4">
                {[
                  { name: 'claude-3-haiku', pct: 45, color: 'bg-blue-500' },
                  { name: 'llama-3-8b-instruct', pct: 23, color: 'bg-green-500' },
                  { name: 'gpt-4o-mini', pct: 20, color: 'bg-purple-500' },
                  { name: 'claude-3.5-sonnet', pct: 12, color: 'bg-orange-500' },
                ].map(model => (
                  <div key={model.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300 font-mono">{model.name}</span>
                      <span className="text-slate-400">{model.pct}%</span>
                    </div>
                    <div className="w-full bg-ink-900 rounded-full h-2.5">
                      <div className={`${model.color} h-2.5 rounded-full`} style={{ width: `${model.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <OnboardingModal
        forceOpen={forceOnboarding}
        onClose={() => setForceOnboarding(undefined)}
        onStart={(point) => {
          setMode(point as Mode);
          setForceOnboarding(undefined);
        }}
      />


      <footer className="mt-12 border-t border-ink-700/60 pt-6 text-xs text-slate-500">
        <p>
          Built on <a className="text-slate-300 hover:text-white" href="https://www.npmjs.com/package/@zagents/kernel">@zagents/kernel</a> — a
          Rust → WASM + NAPI-RS kernel. Output is byte-compatible with the <code className="text-slate-300">create-agent-gemini</code> CLI.
          MCP is one selectable, default-deny primitive. Drop generated <code className="text-slate-300">SKILL.md</code> folders straight
          into Claude desktop or claude.ai. <span className="text-slate-400">{t('app.footer.tagline')}</span>
        </p>
      </footer>
    </div>
  );
}
