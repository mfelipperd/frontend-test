import { ModeToggle } from "@/components/ToggleModeSystem";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className=" border-b py-4 bg-card ">
      <div className=" flex justify-between items-center w-full max-w-[1920px] px-10">
        <div className="flex items-center gap-4">
          <a href="/">
            <img src="/logo.png" alt="logo" className="w-8" />
          </a>
          <h1 className="text-xl font-bold">Gerenciador de Empresas</h1>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("tourSeen");
            location.reload();
          }}
        >
          Ver tutorial novamente
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
