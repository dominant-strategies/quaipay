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
