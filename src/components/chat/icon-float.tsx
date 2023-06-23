import React, { FC, useEffect, useState } from "react";
import { Theme } from "@mui/material/styles";
import { useClasses } from "../../core/hooks";
import laikaGPTIcon from "../../core/laika-profile.svg";
import classNames from "classnames";

const useStyles = (theme: Theme) => ({
  content: {
    position: "fixed",
    cursor: "pointer",
    borderRadius: "50%",
    maxWidth: 250,
    height: 100,
    display: "flex",
    flexDirection: "row",
  },
  leftBottom: {
    left: "2%",
    bottom: "2%",
  },
  rightBottom: {
    right: "2%",
    bottom: "2%",
  },
  leftTop: {
    left: "2%",
    top: "2%",
  },
  rightTop: {
    right: "2%",
    top: "2%",
  },
  red: {
    // boxShadow: "4px 2px 6px 2px rgba(245, 66, 66, 0.5)",
  },
  green: {
    // boxShadow: "4px 2px 6px 2px rgba(66, 245, 108, 0.5)",
  },
  icon: {
    display: "inline-block",
    height: 90,
  },
  contentTitle: {
    width: 0,
    borderRadius: 40,
    backgroundColor: "#FFF",
    boxShadow: "0px 0px 24.1131px rgba(39, 25, 56, 0.3)",
    padding: "5px 0 5px 0",
    height: 40,
    marginTop: 15,
    marginRight: "-50px",
    transitionProperty: "width",
    transitionDuration: "1s",
  },
  contentTitleShow: {
    width: 230,
    padding: "5px 35px 5px 15px",
  },
  title: {
    width: 162,
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
    margin: 4,
    transitionProperty: "opacity",
    transitionDuration: "2s",
    opacity: 0,
    userSelect: "none",
  },
  titleShow: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
    margin: 4,
    opacity: 1,
  },
});

type Props = {
  float: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wsConnected: boolean;
  title?: string;
};

const IconFloat: FC<Props> = ({ float, open, setOpen, wsConnected, title }) => {
  const classes = useClasses(useStyles);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (open) {
      setShowTitle(false);
    }
  }, [open]);

  useEffect(() => {
    if (wsConnected) {
      setShowTitle(true);
    }
  }, [wsConnected]);

  return (
    <div
      className={classNames(classes.content, {
        [classes.leftBottom]: float === "left-bottom",
        [classes.rightBottom]: float === "right-bottom",
        [classes.leftTop]: float === "left-top",
        [classes.rightTop]: float === "right-top",
        [classes.red]: !wsConnected,
        [classes.green]: wsConnected,
      })}
      onClick={() => wsConnected && setOpen(true)}
    >
      <div
        className={classNames(classes.contentTitle, {
          [classes.contentTitleShow]: showTitle,
        })}
      >
        <p
          className={classNames(classes.title, {
            [classes.titleShow]: showTitle,
          })}
        >
          {title || "Hola, ¿cómo podemos ayudarte?"}
        </p>
      </div>
      <img src={laikaGPTIcon} className={classes.icon} alt="LaikaGPT" />
    </div>
  );
};

export default IconFloat;
