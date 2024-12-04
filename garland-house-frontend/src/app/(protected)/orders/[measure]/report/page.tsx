import { Report } from "@/fsd/widgets";
import classes from "./page.module.scss";

export default function ReportPage({
  params,
}: {
  params: {
    measure: string;
  };
}) {
  return (
    <div className={classes.wrapper}>
      <Report orderId={+params.measure} />
    </div>
  );
}
