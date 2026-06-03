import galleryIcon from "@/assets/gallery_icon.svg";
import { IMAGE_BASE_URL } from "@/constants";

const isVideoPath = (path?: string) => {
  return /\.(mp4|mpeg|mov|webm|ogg)$/i.test(path || "");
};

const MediaPreview = ({ path }: { path: string }) => {
  if (isVideoPath(path)) {
    return (
      <div className="relative h-full w-full p-[1rem]">
        <video
          src={`${IMAGE_BASE_URL}${path}`}
          className="h-full w-full object-contain"
          controls
        />
      </div>
    );
  }

  return (
    <img
      src={`${IMAGE_BASE_URL}${path}`}
      alt="Gallery media"
      className="object-contain h-full w-full p-[1rem]"
    />
  );
};

export default function ImageInputUIComponent({
  type,
  image,
  error,
}: {
  type: string;
  image?: string;
  error: string | undefined;
}) {
  return (
    <>
      <div
        className={`h-[180px] border border-[#C9CBD1] rounded-[6px] flex items-center justify-center ${
          type === "small" ? "w-[147px] " : "w-[307px]"
        }`}
      >
        {image !== undefined && image !== "" ? (
          isVideoPath(image) ? (
            <video
              src={`${IMAGE_BASE_URL}${image}`}
              className="object-contain w-[307px] h-[140px]"
              controls
            />
          ) : (
            <img
              src={`${IMAGE_BASE_URL}${image}`}
              alt="Gallery Icon"
              className="object-contain w-[307px] h-[140px]"
            />
          )
        ) : (
          <img src={galleryIcon} alt="Gallery Icon" />
        )}
      </div>
      {type === "large" && (
        <p className="font-[400] text-[0.75rem] text-start mt-[2px] text-[#626c78]">
          {"Allowed JPG, GIF, PNG or MP4 files."}
        </p>
      )}
      {error && (
        <span className="input-error">
          {typeof error === "string" ? error : error.message}
        </span>
      )}
    </>
  );
}

export const MultipleImageInputUI = ({
  images,
  imageIndex,
}: {
  images: string | Array<string | { img_url: string }>;
  imageIndex: number;
}) => {
  const currentMedia =
    Array.isArray(images) && images.length > 0
      ? typeof images[imageIndex] === "string"
        ? images[imageIndex]
        : images[imageIndex].img_url
      : typeof images === "string"
        ? images
        : "";

  return (
    <div
      className={`h-[10rem] w-[25rem] border border-dashed border-[#C9CBD1] rounded-[6px] flex items-center justify-center `}
    >
      {Array.isArray(images) && images.length > 0 ? (
        <div>
          <div className="h-[10rem] w-[25rem]">
            <MediaPreview path={currentMedia} />
          </div>
        </div>
      ) : typeof images === "string" ? (
        <MediaPreview path={images} />
      ) : (
        <img
          src={galleryIcon}
          alt="Gallery Icon"
          className="h-[3rem] w-[5rem]"
        />
      )}
    </div>
  );
};
