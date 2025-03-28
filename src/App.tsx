import { AppTour } from "./components/AppTour.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <AppTour />
      <AppRoutes />
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
