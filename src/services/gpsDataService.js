import { differenceInMinutes } from "date-fns";

export const identifyStoppages = (gpsData, threshold) => {
  let stoppages = [];
  let startStoppage = null;

  for (let i = 1; i < gpsData.length; i++) {
    const prev = gpsData[i - 1];
    const curr = gpsData[i];

    if (prev.speed === 0 && curr.speed === 0) {
      if (!startStoppage) {
        startStoppage = prev;
      }
    } else {
      if (startStoppage) {
        const duration = differenceInMinutes(
          new Date(curr.eventGeneratedTime),
          new Date(startStoppage.eventGeneratedTime)
        );
        if (duration >= threshold) {
          stoppages.push({
            latitude: startStoppage.latitude,
            longitude: startStoppage.longitude,
            reachTime: startStoppage.eventGeneratedTime,
            endTime: curr.eventGeneratedTime,
            duration,
          });
        }
        startStoppage = null;
      }
    }
  }
  console.log(stoppages);
  return stoppages;
};
