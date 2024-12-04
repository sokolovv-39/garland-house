"use client";

import { useMutation } from "@tanstack/react-query";
import { AddCommentDto, addCommentRequest, ResultCommentDto } from "../../api";
import classes from "./Comments.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { DateFormatter, IDBContext } from "../../lib";
import { ProfileIcon } from "../ProfileIcon";
import { Spinner } from "../Spinner";
import { AxiosError } from "axios";

export function Comments({
  orderId,
  bottomY,
}: {
  orderId: number;
  bottomY: number;
}) {
  const [comments, setComments] = useState<ResultCommentDto[]>([]);
  const [message, setMessage] = useState("");
  const idb = useContext(IDBContext);
  const commentsRef = useRef<HTMLDivElement>(null);
  const {
    mutate: sendComment,
    isPending: isPendingComment,
    error: sendCommentError,
  } = useMutation<ResultCommentDto, AxiosError<string>>({
    mutationFn: async () => {
      const userId = (await idb!.users.getCurrentUser()).id;
      const body: AddCommentDto = {
        userId,
        orderId,
        text: message,
      };
      const data = await addCommentRequest(body);
      return data;
    },
    onSettled: async (data, error) => {
      console.error("onSettledError", error);
      if (error?.response?.data.includes("Такой заказ не существует")) return;
      if (error?.code === "ERR_NETWORK") return;
      const userFio = (await idb!.users.getCurrentUser()).fio;
      const comment: ResultCommentDto = {
        text: message,
        commentDateTime: data ? data.commentDateTime : "",
        writerFIO: userFio,
      };
      setComments([...comments, comment]);
      setMessage("");
      const order = await idb!.orders.get(orderId);
      await idb!.orders.update({
        ...order,
        comments: [...order.comments, comment],
      });
    },
  });

  function handleKeyTextarea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message) sendComment();
    }
  }

  useEffect(() => {
    (async function () {
      const comments = (await idb!.orders.get(orderId)).comments;
      setComments(comments);
    })();
  }, []);

  useEffect(() => {
    if (commentsRef.current) {
      const top = commentsRef.current.getBoundingClientRect().top;
      commentsRef.current.style.height = `${bottomY - top - 1}px`;
    }
  }, [bottomY]);

  useEffect(() => {
    if (commentsRef.current) {
      const { clientHeight, scrollHeight } = commentsRef.current;
      if (scrollHeight > clientHeight) {
        commentsRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
  }, [comments]);

  return (
    <div className={classes.wrapper}>
      <h3>Комментарии</h3>
      <div className={classes.comments} ref={commentsRef}>
        {comments.length ? (
          <>
            {comments.map((comment, i) => (
              <div className={classes.comment} key={i}>
                <ProfileIcon
                  name={comment.writerFIO}
                  customStyles={{
                    flexShrink: 0,
                  }}
                />
                <div className={classes.content}>
                  <div className={classes.nameDate}>
                    <span className={classes.name}>{comment.writerFIO}</span>
                    <span className={classes.date}>
                      {comment.commentDateTime
                        ? DateFormatter.toPrettyDate(comment.commentDateTime)
                        : ""}
                    </span>
                  </div>
                  <p className={classes.text}>{comment.text}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <span className={classes.empty}>Здесь пока что тихо</span>
        )}
        {sendCommentError?.response?.data.includes(
          "Такой заказ не существует"
        ) ? (
          <span className={classes.error}>
            Нельзя оставлять комментарии, пока заказ не сохранен
          </span>
        ) : sendCommentError?.code === "ERR_NETWORK" ? (
          <span className={classes.error}>
            Нельзя оставлять комментарии в оффлайн режиме
          </span>
        ) : (
          ""
        )}
      </div>
      <div className={classes.textareaWrapper}>
        <textarea
          onKeyDown={handleKeyTextarea}
          placeholder="Написать комментарий"
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
        <div
          style={{
            padding: isPendingComment ? 0 : "6px 14px",
          }}
          className={`${classes.sendSVGWrapper} ${
            message !== "" ? classes.send : ""
          }`}
          onClick={() => {
            if (message) sendComment();
          }}
        >
          {isPendingComment ? (
            <Spinner />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity={message !== "" ? "1" : "0.5"}>
                <path
                  d="M6.16641 5.26667L13.2414 2.90834C16.4164 1.85001 18.1414 3.58334 17.0914 6.75834L14.7331 13.8333C13.1497 18.5917 10.5497 18.5917 8.96641 13.8333L8.26641 11.7333L6.16641 11.0333C1.40807 9.45001 1.40807 6.85834 6.16641 5.26667Z"
                  stroke={message !== "" ? "white" : "#191919"}
                  strokeOpacity={message !== "" ? "1" : "0.76"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.4248 11.375L11.4081 8.38336"
                  stroke={message !== "" ? "white" : "#191919"}
                  strokeOpacity={message !== "" ? "1" : "0.76"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
