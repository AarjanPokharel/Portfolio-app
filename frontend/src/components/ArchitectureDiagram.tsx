import { GitHubIcon } from "./Icons";

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${color}`}>
      {children}
    </span>
  );
}

function Box({
  title,
  subtitle,
  icon,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`min-w-0 flex-1 rounded-xl border ${accent} bg-slate-950/60 p-3`}>
      <div className="flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

function ArrowDown({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1">
      <div className="h-4 w-px bg-slate-700" />
      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">{label}</span>
      <div className="h-4 w-px bg-slate-700" />
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-slate-600">
        <path d="M4 6L0 0h8L4 6z" fill="currentColor" />
      </svg>
    </div>
  );
}

function ArrowRight({ label }: { label?: string }) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center justify-center gap-0.5">
      {label && <span className="text-xs text-slate-600">{label}</span>}
      <div className="flex items-center gap-0.5">
        <div className="h-px w-6 bg-slate-700" />
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="text-slate-600">
          <path d="M6 4L0 0v8L6 4z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 text-sm sm:p-5">

      {/* ── Row 1: Developer → GitHub ───────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Developer */}
        <Box
          title="VS Code"
          subtitle="Local development"
          accent="border-violet-700/50"
          icon={
            <svg className="h-5 w-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.986V4.014a1.5 1.5 0 0 0-.85-1.427zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
            </svg>
          }
        />

        <ArrowRight label="git push" />

        {/* GitHub */}
        <Box
          title="GitHub"
          subtitle="AarjanPokharel/Portfolio-app"
          accent="border-slate-600/50"
          icon={<GitHubIcon className="h-5 w-5 text-slate-300" />}
        />
      </div>

      {/* Arrow down */}
      <div className="ml-6">
        <ArrowDown label="git pull" />
      </div>

      {/* ── EC2 Instance box ─────────────────────────────────────── */}
      <div className="rounded-xl border border-orange-700/40 bg-orange-950/10 p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* AWS icon */}
            <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 6.65a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 5.77c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.063-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .407-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.574-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
            </svg>
            <p className="text-sm font-semibold text-orange-300">AWS EC2</p>
          </div>
          <div className="flex gap-2">
            <Badge color="bg-orange-950/60 text-orange-400 ring-orange-700/30">t3.small</Badge>
            <Badge color="bg-slate-900 text-slate-400 ring-slate-700/30">Linux</Badge>
          </div>
        </div>

        {/* Docker Compose box */}
        <div className="rounded-lg border border-blue-700/40 bg-blue-950/10 p-3">
          <div className="mb-3 flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.184.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.483 2.41 3.138 1.18.725 3.1 1.139 5.275 1.139.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
            </svg>
            <p className="text-xs font-semibold text-blue-300">Docker Compose</p>
          </div>

          {/* Nginx */}
          <div className="mb-2 rounded-lg border border-emerald-700/40 bg-emerald-950/20 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <p className="text-xs font-semibold text-emerald-300">Nginx</p>
              </div>
              <div className="flex gap-1">
                <Badge color="bg-emerald-950/60 text-emerald-400 ring-emerald-700/30">:80</Badge>
                <Badge color="bg-emerald-950/60 text-emerald-400 ring-emerald-700/30">:443</Badge>
                <Badge color="bg-slate-900 text-cyan-400 ring-cyan-700/30">SSL ✓</Badge>
              </div>
            </div>
          </div>

          {/* Arrow down + split */}
          <div className="mb-2 flex items-start gap-2 pl-4">
            <div className="mt-1 flex flex-col items-center">
              <div className="h-2 w-px bg-slate-700" />
              <div className="flex items-end gap-6">
                <div className="h-3 w-px bg-slate-700" />
                <div className="h-3 w-px bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Frontend + Backend side by side */}
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-violet-700/40 bg-violet-950/20 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                <p className="text-xs font-semibold text-violet-300">Next.js</p>
              </div>
              <p className="mt-1 text-xs text-slate-500">Frontend</p>
            </div>

            <div className="rounded-lg border border-cyan-700/40 bg-cyan-950/20 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <p className="text-xs font-semibold text-cyan-300">Django</p>
              </div>
              <p className="mt-1 text-xs text-slate-500">Backend API</p>
            </div>
          </div>

          {/* Arrow down from backend */}
          <div className="mb-2 flex justify-end pr-8">
            <div className="flex flex-col items-center">
              <div className="h-2 w-px bg-slate-700" />
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-slate-600">
                <path d="M4 6L0 0h8L4 6z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* PostgreSQL */}
          <div className="flex justify-end">
            <div className="w-1/2 rounded-lg border border-sky-700/40 bg-sky-950/20 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <p className="text-xs font-semibold text-sky-300">PostgreSQL</p>
              </div>
              <p className="mt-1 text-xs text-slate-500">Database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow up — internet */}
      <div className="ml-6 flex flex-col items-center gap-0.5 py-1">
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="rotate-180 text-slate-600">
          <path d="M4 6L0 0h8L4 6z" fill="currentColor" />
        </svg>
        <div className="h-4 w-px bg-slate-700" />
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">HTTPS</span>
        <div className="h-4 w-px bg-slate-700" />
      </div>

      {/* Domain */}
      <div className="rounded-xl border border-cyan-700/40 bg-cyan-950/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <p className="text-sm font-semibold text-cyan-300">workwithaarjan.dev</p>
          </div>
          <div className="flex gap-2">
            <Badge color="bg-cyan-950/60 text-cyan-400 ring-cyan-700/30">DNS A Record</Badge>
            <Badge color="bg-emerald-950/60 text-emerald-400 ring-emerald-700/30">Let&apos;s Encrypt SSL</Badge>
          </div>
        </div>
      </div>

    </div>
  );
}
