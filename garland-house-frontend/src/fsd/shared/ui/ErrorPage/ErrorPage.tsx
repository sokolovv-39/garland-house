import Image from "next/image";
import classes from "./ErrorPage.module.scss";
import Red_Cross from "./assets/red cross.png";

export function ErrorPage({ text }: { text?: string }) {
  const error = text || "Неизвестная ошибка";

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <p>{error}</p>
        <Image src={Red_Cross} alt="" width={300} height={300} />
      </div>
    </div>
  );
}
