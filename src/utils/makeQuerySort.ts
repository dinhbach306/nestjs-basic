export function makeQuerySort(sortParams: string[] | string) {
  try {
    if (typeof sortParams === 'string') {
      sortParams = sortParams.split(',');
    }

    if (sortParams) {
      const sortClauses: Record<string, 'ASC' | 'DESC'>[] = [];
      sortParams?.forEach((condition) => {
        const [field, order] = condition.split(',');
        console.log('field', field);
        console.log('order', order);
        if (field && order) {
          const normalizedField = field.trim();
          const normalizedOrder = order.trim().toUpperCase() as 'ASC' | 'DESC';
          const fields = normalizedField.split('.');

          sortClauses.push(makeNestedField(fields, normalizedOrder));
        }
      });

      return sortClauses;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

function makeNestedField(arr: string[], value: string) {
  if (arr.length === 0) {
    return value;
  }
  const key = arr[0];
  const rest = arr.slice(1);
  return { [key]: makeNestedField(rest, value) };
}
