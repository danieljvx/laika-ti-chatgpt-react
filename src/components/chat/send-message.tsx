import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Theme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Send } from "@mui/icons-material";
import { IRoom } from "../../core/types";
import { useClasses } from "../../core/hooks";

const useStyles = (theme: Theme) => ({
  message: {
    backgraundColor: "#FFFFFF",
  },
  messageDark: {
    backgroundColor: "#653F90",
  },
  messageDarkLeft: {
    backgroundColor: "#653F90",
  },
  messageDarkRight: {
    backgroundColor: "#653F90",
  },
});

type Props = {
  room: IRoom | null;
  roomLoading: boolean;
  sendMessage: (message: string) => void;
  open: boolean;
};

const SendMessage: FC<Props> = ({ room, roomLoading, sendMessage, open }) => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useClasses(useStyles);
  const [text, setText] = useState("");

  const onInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onSendMessage = () => {
    sendMessage(text);
    setText("");
  };

  const onSubmitText = (e: FormEvent) => {
    e.preventDefault();
    onSendMessage();
    return false;
  };

  useEffect(() => {
    console.log("ref.current", ref.current);
    if (open && ref.current) {
      const input = ref.current.querySelector("input");
      input && input.focus();
    }
  }, [open]);

  return (
    <Grid container style={{ padding: 0 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        className={classes.message}
        onSubmit={onSubmitText}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <AddIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          ref={ref}
          autoFocus
          value={text}
          onChange={onInputText}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Escribe un mensaje aquí"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <PhotoCameraIcon />
        </IconButton>
        <IconButton
          onClick={onSendMessage}
          disabled={text === ""}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <Send />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default SendMessage;
