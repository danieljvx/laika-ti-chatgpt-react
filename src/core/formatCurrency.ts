const formatCurrency = (money: number) => {
  return new Intl.NumberFormat(
    "es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(money);
};

export default formatCurrency;
