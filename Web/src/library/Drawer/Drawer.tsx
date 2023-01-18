import { Drawer, ModalProps } from "@mui/material";
import React, {
  FunctionComponent,
  useRef,
  useEffect,
  useCallback,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Drawer.scss";

export enum Anchor {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export enum Size {
  Medium = "medium",
  Large = "large",
}

export enum Variant {
  Perm = "permanent",
  Persist = "persistent",
  Temp = "temporary",
}

export type DrawerBaseProps = {
  open: boolean;
  title: string | JSX.Element;
  ariaTitle?: string;
  footer?: React.ReactNode;
  anchor: Anchor;
  variant?: Variant;
  onClose: () => void;
  className?: string;
  size?: Size;
  children?: React.ReactNode;
  ModalProps?: Partial<ModalProps>;
  subTitle?: null | JSX.Element;
  closeButtonLabel?: string;
  customAriaLive?: "polite" | "assertive";
  ariaHidden?: boolean;
};

const DrawerBase: FunctionComponent<DrawerBaseProps> = (
  props: DrawerBaseProps
) => {
  const {
    anchor,
    title,
    ariaTitle,
    ariaHidden,
    footer,
    className,
    children,
    onClose,
    subTitle,
    closeButtonLabel,
    ...otherProps
  } = props;
  const closeButtonEl = useRef<HTMLButtonElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isOpen = props.open;

  const handleResize = useCallback((event: any) => {
    if (contentContainerRef.current) {
      if (footerRef.current) {
        footerRef.current.style.maxWidth =
          contentContainerRef.current.offsetWidth.toString() + "px";
      }
    }
  }, []);

  useEffect(() => {
    // shift focus to first interactive element after mount
    const timeout = setTimeout(() => {
      if (isOpen) {
        handleResize(undefined);
        closeButtonEl?.current?.focus();
      }
    }, 100);
    // re-shift focus to first element when title change

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen, title, ariaTitle, handleResize]);

  const handleOnClose = () => {
    let activeElement: Element | null = document.activeElement;
    //if focus is on a select element, don't close drawer.
    if (
      activeElement?.id.startsWith("react-select") &&
      activeElement.hasAttribute("aria-activedescendant")
    ) {
      return;
    }
    onClose();
  };

  // fix issues related to zooming in from 100% -> 400%
  // and poition fixed not getting the right width
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <Drawer
      classes={{
        paper: `drawerPaper ${props.size}`,
        root: `custom-drawer ${className}`,
      }}
      ModalProps={{
        disableAutoFocus: true,
      }}
      anchor={anchor}
      onClose={handleOnClose}
      {...otherProps}
    >
      <div
        className="drawer-content-container"
        ref={contentContainerRef}
        role="dialog"
        aria-hidden={ariaHidden}
        aria-describedby="card-title-id"
      >
        <div className="drawer-content-header">
          <h2
            className={
              subTitle ? "card-title card-title-subtile" : "card-title"
            }
            id="card-title-id"
          >
            {title}
          </h2>
          {subTitle && (
            <div className="card-subtitle" id="card-subtitle-id">
              {subTitle}
            </div>
          )}
          <button
            aria-label={closeButtonLabel || `Close`}
            className="header-close-icon"
            ref={closeButtonEl}
            onClick={handleOnClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-content">{children}</div>
        {footer && (
          <div className="drawer-footer" ref={footerRef}>
            {footer}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default DrawerBase;
