
const locale = "nl-BE";

export const formatHelper = {
  price: (price: number) => {
    return price.toLocaleString(locale, {style: "currency", currency: "EUR"});
  },
  dateTime(timestamp) {
    const date = new Date(timestamp);

    return `${date.toLocaleString(locale)}`;
  }
}