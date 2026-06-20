import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Boxes, Github, HelpCircle, Sparkles, Gauge, Route, ShieldCheck, Globe } from 'lucide-react';
import { HarnessBuilder } from './components/HarnessBuilder';
import { ArtifactBuilder } from './components/ArtifactBuilder';
import { RepoImporter } from './components/RepoImporter';
import { VerifyPanel } from './components/VerifyPanel';
import { SegTabs } from './components/ui';
import { OnboardingModal, clearOnboardingDismissal } from './components/OnboardingModal';
import type { HarnessConfig } from './generator';

type Mode = 'repo' | 'gemini' | 'artifact' | 'verify';

export default function App() {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState<Mode>('gemini');

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'th' : 'en');
  };
  const [seed, setSeed] = useState<HarnessConfig | undefined>(undefined);
  // Bump to force-remount HarnessBuilder when a repo plan seeds a new config.
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
            href="https://github.com/ruvnet/zagents-generator"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-ink-600 hover:text-white"
          >
            <Github size={14} /> ruvnet/zagents-generator
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
              { id: 'gemini', label: t('app.tabs.gemini') },
              { id: 'artifact', label: t('app.tabs.artifact') },
              { id: 'verify', label: t('app.tabs.verify') },
            ]}
          />
        </div>
      </header>

      <main>
        {mode === 'repo' && <RepoImporter onUse={useRepoPlan} />}
        {mode === 'gemini' && <HarnessBuilder key={seedKey} seed={seed} />}
        {mode === 'artifact' && <ArtifactBuilder />}
        {mode === 'verify' && <VerifyPanel />}
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
