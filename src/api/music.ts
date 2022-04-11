const search = async (term: string, types: string[]) => {
  const instance = MusicKit.getInstance();
  const params = new URLSearchParams({
    term,
    types: types.toString(),
  });

  const response = await (instance.api as any).music(
    `/v1/catalog/${instance.storefrontId}/search?${params.toString()}`,
  );

  return response;
};

export const music = {
  search,
};
