const cleanDuplicateData = (data: string[] | number[]) => {
  const result = [...new Set(data.map(val => JSON.stringify(val)))].map(val => {
    const response: string | number = JSON.parse(val);
    return response;
  });
  return result;
};

export default cleanDuplicateData;
