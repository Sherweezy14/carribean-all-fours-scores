export function formatDateMDHM(date: string) {
  return new Date(date).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateHM(date: string) {
  return new Date(date).toLocaleString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
