export const formatTimeLeft = (endDate: string) => {
  const diff = new Date(endDate).getTime() - Date.now();

  if (diff <= 0) return "Ended";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return `${d}D ${h}H ${m}M`;
};