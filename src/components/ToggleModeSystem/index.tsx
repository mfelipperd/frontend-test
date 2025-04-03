import { Moon, Settings, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { ModalEmails } from "../ModalEmail";
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [openEmails, setOpenEmails] = useState<boolean>(false);

  const handleControlModalEmails = () => {
    setOpenEmails((prev) => !prev);
  };

  return (
    <DropdownMenu>
      <div className="flex items-center gap-4 mr-10">
        <div className="relative -right-14 -top-2.5 cursor-pointer">
          <Sun
            onClick={() => setTheme("dark")}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            onClick={() => setTheme("light")}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </div>
        <DropdownMenuTrigger asChild>
          <Settings />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("tourSeen");
            location.reload();
          }}
        >
          Ver tutorial
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleControlModalEmails()}>
          Configurar Emails
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ModalEmails onClose={handleControlModalEmails} open={openEmails} />
    </DropdownMenu>
  );
}
