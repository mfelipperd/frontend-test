import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    return () => setVisible(false);
  }, []);

  return (
    <div
      className={clsx(
        "transition-opacity duration-500 p-6 max-w-[1920px] mx-auto",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}
