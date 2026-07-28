tailwind.config = {
  theme: {
    extend: {
      colors: {
        ieee: {
          50: "#eff9ff",
          100: "#d8f0ff",
          200: "#b1e0ff",
          300: "#7bcaff",
          400: "#39abf8",
          500: "#1086d6",
          600: "#00629b",
          700: "#004c79",
          800: "#083b5b",
          900: "#0a2a40"
        },
        sfsu: {
          50: "#f7f1fa",
          100: "#eee0f5",
          200: "#dcc0eb",
          300: "#c39bdc",
          400: "#a26dc5",
          500: "#8449a7",
          600: "#6c307d",
          700: "#542461",
          800: "#3d1846",
          900: "#29102f"
        },
        signal: {
          50: "#fff8e6",
          100: "#fdeebe",
          200: "#f9dc82",
          300: "#efc948",
          400: "#c99700",
          500: "#9c7400",
          600: "#725400"
        }
      },
      boxShadow: {
        panel: "0 30px 80px -34px rgba(2, 6, 23, 0.72)",
        glow: "0 0 0 1px rgba(125, 211, 252, 0.12), 0 28px 80px -34px rgba(16, 134, 214, 0.42)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(16, 134, 214, 0.18), transparent 28%), radial-gradient(circle at 82% 12%, rgba(108, 48, 125, 0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(201, 151, 0, 0.16), transparent 28%)"
      }
    }
  }
};
