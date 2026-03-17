import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { Lang } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

const langs: { id: Lang; label: string; full: string }[] = [
  { id: "en", label: "EN", full: "English" },
  { id: "ru", label: "RU", full: "Русский" },
  { id: "uz", label: "UZ", full: "O'zbek" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  const current = langs.find((l) => l.id === lang)!;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs font-bold text-foreground shadow-sm transition-colors hover:bg-muted/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[7rem] overflow-hidden rounded-xl border border-border/70 bg-background shadow-lg">
          {langs.map((l) => (
            <button
              key={l.id}
              type="button"
              role="option"
              aria-selected={lang === l.id}
              onClick={() => { setLang(l.id); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-muted/60",
                lang === l.id ? "font-bold text-primary" : "text-foreground"
              )}
            >
              <span className="w-6 text-xs font-bold">{l.label}</span>
              <span className="text-muted-foreground">{l.full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
