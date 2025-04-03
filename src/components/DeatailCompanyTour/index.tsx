import { useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

interface Props {
  isEditing: boolean;
}

export function ModalCompanyTour({ isEditing }: Props) {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".modal-company-data",
      content: "Aqui está a empresa que foi cadastrada.",
      disableBeacon: true,
    },
    {
      target: ".modal-edit-button",
      content: "Clique aqui para editar as informações da empresa.",
      disableBeacon: true,
    },
    ...(isEditing
      ? [
          {
            target: ".modal-data-edit",
            content: "Altere os dados da empresa aqui.",
            disableBeacon: true,
          },
          {
            target: ".modal-save-button",
            content: "Depois de editar, clique aqui para salvar.",
            disableBeacon: true,
          },
        ]
      : []),
  ];

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(
        status as "skipped" | "finished"
      )
    ) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      scrollToFirstStep
      showProgress
      callback={handleCallback}
      styles={{
        options: {
          zIndex: 9999,
        },
      }}
    />
  );
}
