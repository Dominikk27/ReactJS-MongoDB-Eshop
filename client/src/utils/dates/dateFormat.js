export function formDate(dateInput) {
  if (!dateInput) return "";

  const date = (dateInput instanceof Date) ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Wrong Date Format:", dateInput);
    return "Wrong Format";
  }

  return date.toLocaleDateString('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}