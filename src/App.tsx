import { AppTour } from "./components/AppTour.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppTour />
        <AppRoutes />
        <Toaster richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
