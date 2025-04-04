import dayjs from "dayjs";

export const dateFormatter = (isoDate: string): string => {
  return dayjs(isoDate).format("DD/MM/YYYY HH:mm");
};
