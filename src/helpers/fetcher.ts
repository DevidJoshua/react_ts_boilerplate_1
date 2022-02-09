interface fetcherInterface extends RequestInit {
  token?: string;
}

const fetcher = async (url: string, { token, method, ...otherOptions }: fetcherInterface) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    ...otherOptions,
  });

  return response.json();
};

export default fetcher;
