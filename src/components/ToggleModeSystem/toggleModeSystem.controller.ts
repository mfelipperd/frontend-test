import { useState } from "react";
import { useTheme } from "../theme-provider";

export const useToggleModeSystemController = () => {
  const { setTheme } = useTheme();
  const [openEmails, setOpenEmails] = useState<boolean>(false);

  const handleControlModalEmails = () => {
    setOpenEmails((prev) => !prev);
  };
  return {
    setTheme,
    openEmails,
    handleControlModalEmails,
  };
};
