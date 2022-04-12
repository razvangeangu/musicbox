const search = async (term: string, types: string[]) => {
  const instance = MusicKit.getInstance();

  const response = await (instance.api as any).music(
    `/v1/catalog/${instance.storefrontId}/search`,
    {
      term,
      types: types.toString(),
    },
  );

  return response;
};

const addToLibrary = async (id: string) => {
  const instance = MusicKit.getInstance();

  const response = await (instance.api as any).music(
    '/v1/me/library',
    {
      'ids[songs]': id,
    },
    {
      fetchOptions: {
        method: 'POST',
      },
    },
  );

  return response;
};

export const music = {
  search,
  addToLibrary,
};
