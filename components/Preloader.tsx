import CircularProgress, {CircularProgressProps} from "@mui/material/CircularProgress";
import {DetailedHTMLProps, HTMLAttributes} from "react";

export type PreloaderLoadingType = boolean;
export type PreloaderPositionType = null | undefined | "absolute" | "fixed";

export const Preloader = ({
  loading = true,
  position,
  overlayProps,
  overrideOverlayProps,
  progressProps,
}: {
  loading?: boolean;
  position?: PreloaderPositionType;
  overlayProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  overrideOverlayProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  progressProps?: CircularProgressProps;
}) => {
  if (!loading) return null;

  return (
    <div
      {...overlayProps}
      style={
        overrideOverlayProps
          ? overrideOverlayProps
          : {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(!position
                ? {}
                : {
                    position,
                    backdropFilter: "blur(5px)",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 2,
                  }),
              ...overlayProps?.style,
            }
      }
    >
      <CircularProgress style={{margin: "16px auto"}} {...progressProps} />
    </div>
  );
};
