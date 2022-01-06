export const formatHelper = {
  price: (price: number) => {
    return price.toLocaleString("nl-BE", {style: "currency", currency: "EUR"});
  }
}