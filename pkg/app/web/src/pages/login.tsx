import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";
import { FC, memo, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { LoginForm } from "~/components/login-form";
import { PAGE_PATH_APPLICATIONS, PAGE_PATH_LOGIN } from "~/constants/path";
import { useMe } from "~/modules/me";

const CONTENT_WIDTH = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    width: CONTENT_WIDTH,
    textAlign: "center",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(4),
  },
  loginError: {
    width: CONTENT_WIDTH,
    marginBottom: theme.spacing(2),
  },
}));

export const LoginPage: FC = memo(function LoginPage() {
  const classes = useStyles();
  const me = useMe();
  const [name, setName] = useState<string>("");
  const [cookies, , removeCookie] = useCookies(["error"]);
  const { projectName } = useParams<{ projectName?: string }>();
  const history = useHistory();

  const handleCloseErrorAlert = (): void => {
    removeCookie("error");
  };

  const handleOnContinue = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    history.push(`${PAGE_PATH_LOGIN}/${name}`);
  };

  return (
    <div className={classes.root}>
      {me && me.isLogin && <Redirect to={PAGE_PATH_APPLICATIONS} />}
      {cookies.error && (
        <MuiAlert
          severity="error"
          className={classes.loginError}
          onClose={handleCloseErrorAlert}
        >
          {cookies.error}
        </MuiAlert>
      )}
      <Card className={classes.content}>
        {projectName ? (
          <LoginForm projectName={projectName} />
        ) : (
          <form onSubmit={handleOnContinue}>
            <Typography variant="h4">Sign in to your project</Typography>
            <div className={classes.fields}>
              <TextField
                id="project-name"
                name="project-name"
                label="Project Name"
                variant="outlined"
                margin="dense"
                required
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className={classes.buttons}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<ArrowRightAltIcon />}
                component={Link}
                disabled={name === ""}
                to={`${PAGE_PATH_LOGIN}/${name}`}
              >
                CONTINUE
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
});
