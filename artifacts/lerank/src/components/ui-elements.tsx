import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// --- BUTTON ---
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger" | "link";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
      outline: "border-2 border-primary/50 text-primary hover:bg-primary/10",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      danger:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
      link: "text-primary underline-offset-4 hover:underline",
    };
    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg",
      default: "h-11 px-6 rounded-xl",
      lg: "h-13 px-8 text-base rounded-2xl",
      icon: "h-11 w-11 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-[background-color,border-color,color,opacity,transform] duration-200 ease-out active:scale-[0.98]",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

// --- INPUT ---
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-black/[0.12] dark:border-white/[0.08] bg-card dark:bg-[#141C12] px-4 py-3 text-sm text-foreground placeholder:text-[#9AA098] dark:placeholder:text-[#5A7058] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[#1E3D28] focus-visible:shadow-[0_0_0_3px_rgba(30,61,40,0.08)] dark:focus-visible:border-[#D4B96A] dark:focus-visible:shadow-[0_0_0_3px_rgba(212,185,106,0.10)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// --- CARD ---
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight font-display",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

// --- BADGE ---
export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}) {
  const variants = {
    default: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground",
    success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

// --- LABEL ---
export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";
