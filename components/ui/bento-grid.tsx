import { cn } from "../../utils/cn";
import { clampText, isUserPoster } from "../../utils/helpers";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  id,
  completed,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: string | number;
  completed?: boolean;
}) => {
  const goToCourse = (id: string | number) => () => {
    window.location.replace("/course/" + id);
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      style={{ background: "#2A2A2A" }}
    >
      <div
        onClick={goToCourse(id)}
        className="cursor-pointer h-40 inline-block"
      >
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col gap-2">
        {/* <div className="justify-self-start">{renderStatus()}</div> */}
        <div className="justify-self-end">
          <div className="font-sans font-bold text-neutral-300 mb-2 mt-2">
            {clampText(title, 32)}
          </div>
          <div className="font-sans font-normal text-xs text-neutral-300">
            {clampText(description, 450)}
          </div>
        </div>
      </div>
    </div>
  );
};
