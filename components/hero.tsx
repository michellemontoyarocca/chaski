import { ArrowDownRight, ArrowUpRight, HeartPulse, Hand, Stethoscope } from "lucide-react";
import { LEXICON_SIZE, SIGN_COUNT } from "@/lib/translate-service";

const audiences = [
  { icon: Stethoscope, title: "Personal de salud", detail: "Una ayuda clara durante la consulta rural." },
  { icon: HeartPulse, title: "Pacientes quechuahablantes", detail: "Indicaciones en una lengua familiar." },
  { icon: Hand, title: "Personas sordas", detail: "Un espacio para explorar la comunicación en LSP." },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#092d31] text-[#f9f3e8]">
      <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-16 -top-24 h-[400px] w-[400px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-2 -top-9 h-[270px] w-[270px] rounded-full border border-white/10" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-[#f4b567]"><span className="h-1.5 w-1.5 rounded-full bg-[#f4b567]" /> Tecnología para una salud inclusiva</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-.055em] sm:text-7xl">Entenderse también es <em className="font-serif font-normal text-[#f4b567]">cuidar.</em></h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#d1e0dc] sm:text-lg">Chaski acerca el español, el quechua y la Lengua de Señas Peruana al momento de atención. Una herramienta experimental para explorar consultas con menos barreras.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#traductor" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f4b567] px-6 text-sm font-bold text-[#092d31] transition hover:bg-[#ffd49a]">Probar el traductor <ArrowDownRight size={17} /></a>
            <a href="https://github.com/michellemontoyarocca/LSP-a-QUECHUA" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Ver investigación LSP <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-[0_25px_90px_rgba(0,0,0,.16)] backdrop-blur sm:p-7">
          <div className="flex items-center justify-between border-b border-white/20 pb-5 text-xs uppercase tracking-[.17em] text-[#d1e0dc]"><span>Puentes de comunicación</span><span>01 / 03</span></div>
          <div className="py-9 text-center">
            <div className="flex items-center justify-center gap-4 text-5xl font-semibold tracking-tight sm:text-6xl"><span>ES</span><span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f4b567] text-2xl text-[#f4b567]">↔</span><span>QU</span></div>
            <p className="mt-5 text-sm text-[#d1e0dc]">Palabras que ayudan a encontrarse</p>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-white/20 pt-5 text-center"><div><strong className="block text-2xl text-[#f4b567]">{LEXICON_SIZE.toLocaleString("es-PE")}</strong><span className="text-xs text-[#d1e0dc]">pares léxicos</span></div><div><strong className="block text-2xl text-[#f4b567]">{SIGN_COUNT}</strong><span className="text-xs text-[#d1e0dc]">señas en catálogo demo</span></div></div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#08272b]"><div className="mx-auto grid max-w-6xl gap-5 px-5 py-6 sm:grid-cols-3 sm:px-8">{audiences.map((item) => <div key={item.title} className="flex gap-3"><item.icon className="mt-0.5 shrink-0 text-[#f4b567]" size={19} /><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-xs leading-5 text-[#b9cfca]">{item.detail}</p></div></div>)}</div></div>
    </section>
  );
}
