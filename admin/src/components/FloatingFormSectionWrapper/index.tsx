import { ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

interface FloatingFormSectionWrapperProps {
  children: ReactNode;
  title: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
  buttonTitle?: string;
  onButtonClick?: () => void;
  hasButton?: boolean;
  textSize?: string;
}

const COLLAPSED_HEIGHT = 20;

const FloatingFormSectionWrapper = ({
  title,
  children,
  defaultOpen = true,
  className,
  contentClassName,
  buttonTitle,
  onButtonClick,
  hasButton,
  textSize,
}: FloatingFormSectionWrapperProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : COLLAPSED_HEIGHT,
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (open) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 250);
      return () => clearTimeout(timer);
    }

    setHeight(contentRef.current.scrollHeight);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setHeight(COLLAPSED_HEIGHT));
    });
  }, [open]);

  return (
    <div
      className={`relative border border-[#D3D3D3] rounded-[4px] px-5 overflow-visible ${className ?? ""}`}
    >
      <div className="absolute -top-[12px] left-[20px] z-10 inline-flex items-center gap-[26px] bg-white px-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <span
            className={`text-[14px] font-medium text-[#111111] ${textSize}`}
          >
            {title}
          </span>
          <ChevronDown
            className="h-4 w-4 text-[#111111] transition-transform duration-300 ease-in-out"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          />
        </button>
        {hasButton && (
          <button
            type="button"
            className="px-[7.5px] py-[7px] text-xs bg-primaryColor text-white rounded-[5px] flex items-center gap-2"
            onClick={onButtonClick}
          >
            <Plus className="h-4 w-4" />
            {buttonTitle}
          </button>
        )}
      </div>

      <div
        ref={contentRef}
        style={{
          height: height === undefined ? "auto" : `${height}px`,
          overflow: "hidden",
          transition: "height 250ms ease",
        }}
      >
        <div className={`pt-9 pb-6 w-full ${contentClassName ?? ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FloatingFormSectionWrapper;
