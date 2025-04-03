import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

export function AppTour() {
  const [run, setRun] = useState(() => {
    return localStorage.getItem("tourSeen") !== "true";
  });

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tourSeen") === "true";

    if (!tutorialSeen) {
      setTimeout(() => {
        setRun(true);
      }, 500);
    }
  }, []);

  const steps = [
    {
      target: ".new-company-button",
      content: "Clique aqui para adicionar uma nova empresa ao sistema.",
    },
    {
      target: ".view-company-button",
      content: "Clique aqui para visualizar os detalhes completos da empresa.",
    },
    {
      target: ".delete-company-button",
      content: "Atenção! Este botão remove permanentemente a empresa.",
    },
    {
      target: ".favorite-company-button",
      content: "Use esta estrela para marcar a empresa como favorita.",
    },
    {
      target: ".favorite-carousel",
      content: "Empresas favoritedas aparecerão aqui neste carrossel.",
    },
    {
      target: ".company-table",
      content: "Essa tabela lista todas as empresas registradas no sistema.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(
        status as "skipped" | "finished"
      )
    ) {
      localStorage.setItem("tourSeen", "true");
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 9999,
          primaryColor: "#4f46e5",
          textColor: "#111",
        },
      }}
    />
  );
}
