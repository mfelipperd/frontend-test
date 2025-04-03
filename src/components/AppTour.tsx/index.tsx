import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

export function AppTour() {
  const [run, setRun] = useState(false);
  const [tourLoaded, setTourLoaded] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tourSeen") === "true";

    if (!tutorialSeen) {
      setTimeout(() => {
        setRun(true);
        setTourLoaded(true);
      }, 500);
    } else {
      setTourLoaded(true);
    }
  }, []);

  const steps = [
    {
      target: ".company-table",
      content: "Essa tabela lista todas as empresas registradas no sistema.",
      disableBeacon: true,
    },
    {
      target: ".new-company-button",
      content: "Clique aqui para adicionar uma nova empresa ao sistema.",
      disableBeacon: true,
    },
    {
      target: ".view-company-button",
      content: "Clique aqui para visualizar os detalhes completos da empresa.",
      disableBeacon: true,
    },
    {
      target: ".view-edit-button",
      content: "Clique para editar os dados da empresa",
      disableBeacon: true,
    },
    {
      target: ".delete-company-button",
      content: "Atenção! Este botão remove permanentemente a empresa.",
      disableBeacon: true,
    },
    {
      target: ".favorite-company-button",
      content: "Use esta estrela para marcar a empresa como favorita.",
      disableBeacon: true,
    },
    {
      target: ".config-system-options",
      content:
        "Aqui você pode gerenciar os emails, tema da aplicação e ver mais uma vez o tutorial.",
      disableBeacon: true,
    },
    {
      target: ".email-manager",
      content: "Clique aqui para gerenciar os emails que serão notificados.",
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
    <>
      {tourLoaded && (
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
      )}
    </>
  );
}
