export const isVideoPath = (path?: string | null) => {
  return /\.(mp4|mpeg|mov|webm|ogg)$/i.test(path || "");
};

export const getMediaUrl = (baseUrl: string | undefined, path?: string | null) => {
  if (!path) {
    return "";
  }

  return `${baseUrl || ""}${path}`;
};
