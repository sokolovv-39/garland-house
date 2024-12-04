import { Spinner } from "../Spinner";
import classes from "./LoadingPage.module.scss";

export function LoadingPage({ desc }: { desc?: string }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.spinnerText}>
        <Spinner color="rgb(197, 155, 104)" width={92} height={92} />
        <p>{desc}</p>
      </div>
    </div>
  );
}
