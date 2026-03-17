import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { Laptop, Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

const modes: Array<{ id: ThemeMode; label: string; icon: typeof Sun }> = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Laptop },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border/70 bg-background p-1 shadow-sm",
        className
      )}
      role="group"
      aria-label="Theme switcher"
    >
      {modes.map((mode) => {
        const Icon = mode.icon;
        const active = theme === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => setTheme(mode.id)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
            aria-label={`Switch to ${mode.label.toLowerCase()} mode`}
            title={mode.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
