import { RotateCcw, Sparkles } from "lucide-react";
import { demoModes, setDemoMode, type DemoMode } from "./demoMode";
import { resetDemoData } from "./mockApi";

export default function DemoNotice() {
  const changeMode = (mode: DemoMode) => {
    setDemoMode(mode);
    window.location.reload();
  };

  const reset = () => {
    resetDemoData();
    setDemoMode("student");
    window.location.reload();
  };

  const selectedMode =
    demoModes.find((mode) => mode.value === localStorage.getItem("academic-vault-demo-mode"))
      ?.value ?? "student";

  return (
    <aside
      aria-label="Academic Vault demo controls"
      className="fixed bottom-4 right-4 z-[70] w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-blue-200 bg-white/95 p-3 text-gray-800 shadow-xl shadow-blue-950/10 backdrop-blur dark:border-blue-900 dark:bg-gray-900/95 dark:text-gray-100"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Interactive demo
          </p>
          <p className="text-[11px] leading-4 text-gray-500 dark:text-gray-400">
            Sample data stays in this browser.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-300"
          title="Restore the original sample data"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
        Viewing as
        <select
          aria-label="Switch demo role"
          value={selectedMode}
          onChange={(event) => changeMode(event.target.value as DemoMode)}
          className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          {demoModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
      </label>
    </aside>
  );
}
