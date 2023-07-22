export const dateToLocaleString = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate: string = date.toLocaleString('en-US', options);
  return formattedDate;
};

export const getTimeframeDate = (offset: number): number => {
  const currentTime = Date.now();
  const targetDate = new Date(currentTime);
  targetDate.setDate(targetDate.getDate() - offset);
  return targetDate.getTime() / 1000;
};

export type Timeframe =
  | 'Past year'
  | 'Past 6 months'
  | 'Past 90 days'
  | 'Past 30 days'
  | 'This week';

export const isWithinSelectedTimeframe = (
  timeStamp: string,
  selectedTimeframe: Timeframe,
): boolean => {
  const timeframes: Record<Timeframe, number> = {
    'Past year': getTimeframeDate(365),
    'Past 6 months': getTimeframeDate(6 * 30),
    'Past 90 days': getTimeframeDate(90),
    'Past 30 days': getTimeframeDate(30),
    'This week': getTimeframeDate(7),
  };

  const selectedTimestamp = timeframes[selectedTimeframe];

  if (selectedTimestamp === undefined) {
    throw new Error('Invalid timeframe selected.');
  }

  return Number(timeStamp) >= selectedTimestamp;
};
