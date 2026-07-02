

export const Calculater = (selling, mrp) => {
    return Math.ceil(((mrp - selling) / mrp) * 100)
}

export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};