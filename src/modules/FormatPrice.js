export default function FormatPrice (value) {
  return Number(value).toFixed(2).replace('.',',')
}