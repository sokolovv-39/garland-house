"use client";

import "./VideoPlayer.scss";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface ExtendedPlayer extends Player {
  controlBar: {
    show: () => void;
    hide: () => void;
    options_: {
      children: string[];
    };
    [key: string]: any;
  };
}

interface Props {
  src: string;
  mediaWidth: number;
  mediaHeight: number;
}

export function VideoPlayer({ src, mediaHeight, mediaWidth }: Props) {
  const videoNode = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoNode.current) {
      const player = videojs(videoNode.current, {
        controls: true,
        preload: "auto",
        width: mediaWidth,
        height: mediaHeight,
        controlBar: {
          fullscreenToggle: true, // Кнопка полноэкранного режима
          playToggle: true, // Кнопка воспроизведения
        },
        sources: [
          {
            src,
            type: "video/quicktime",
          },
          {
            src,
            type: "video/mp4",
          },
          {
            src,
            type: "video/ogg",
          },
          {
            src,
            type: "video/webm",
          },
        ],
      }) as ExtendedPlayer;

      // Обработчик для переключения полноэкранного режима
      const handleFullscreenChange = () => {
        if (player.isFullscreen()) {
          // Показать все элементы в полноэкранном режиме
          player.controlBar.show();
          player.controlBar.options_.children.forEach((control: string) => {
            if (typeof player.controlBar[control] !== "undefined") {
              player.controlBar[control].show?.();
            }
          });
        } else {
          // Скрыть ненужные элементы, кроме play и fullscreen
          player.controlBar.options_.children.forEach((control: string) => {
            if (
              control !== "fullscreenToggle" &&
              control !== "playToggle" &&
              control !== "pictureInPictureToggle"
            ) {
              player.controlBar[control]?.hide?.();
            }
          });
        }
      };

      // Скрываем ненужные контролы при первой загрузке
      player.controlBar.options_.children.forEach((control: string) => {
        if (
          control !== "fullscreenToggle" &&
          control !== "playToggle" &&
          control !== "pictureInPictureToggle"
        ) {
          player.controlBar[control]?.hide?.();
        }
      });

      player.on("fullscreenchange", handleFullscreenChange);

      return () => {
        player.off("fullscreenchange", handleFullscreenChange);
        player.dispose();
      };
    }
  }, [src, mediaHeight, mediaWidth]);

  return (
    <div
      data-vjs-player
      style={{
        width: mediaWidth,
        height: mediaHeight,
      }}
    >
      <video
        width={mediaWidth}
        height={mediaHeight}
        className="video-js vjs-default-skin vjs-big-play-centered"
        ref={videoNode}
      ></video>
    </div>
  );
}
