export default function ArrayFilter(
  array: readonly string[],
  formData: FormData
) {
  const newArray = [];
  for (const element of array) {
    if (formData.get(element)) {
      newArray.push(element);
    }
  }
  return newArray;
}
