import { useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";

export function EmailManagerTour() {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".email-manager-title",
      content: "Aqui você visualiza os e-mails cadastrados.",
      disableBeacon: true,
    },
    {
      target: ".email-add-button",
      content: "Clique aqui para adicionar um novo e-mail.",
      disableBeacon: true,
    },
    {
      target: ".email-disable-button",
      content: "desative o e-mail clicando aqui.",
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(
        status as "finished" | "skipped"
      )
    ) {
      setRun(false);
    }
  };

  return (
    <Joyride
      run={run}
      steps={steps}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      scrollToFirstStep
      styles={{
        options: {
          zIndex: 9999,
        },
      }}
    />
  );
}
