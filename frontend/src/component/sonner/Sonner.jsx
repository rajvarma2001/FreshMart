import { Toaster as Sonner } from "sonner";
// remove next-themes if not using it

const Toaster = (props) => {
  return (
    <Sonner
      theme="light" // or "dark"
      className="toaster"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };