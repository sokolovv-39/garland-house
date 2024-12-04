"use client";

import { Color, PDFDocument, PDFPage, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import robotoFontUrl from "./fonts/Roboto-Regular.ttf";
import { IndexedDB } from "../../IndexedDB";
import {
  beltLightRfp,
  electricShieldRfp,
  ElectricShieldType,
  extraCorrBoxRfp,
  getRFPExtensions,
  MediaTypeEnum,
  montageRfp,
  MontageType,
  neonPaintingRfp,
  neonRfp,
  PVSColorEnum,
  pvsRfp,
  PVSType,
  RelaysSwitchesType,
  ropeRfp,
  RopeType,
  Screed_200_Type,
  Screed_480_500_Type,
  SolderBoxType,
  switchesRfp,
  threadBracingRFP,
  threadGlowMode,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  threadOnTreeRFP,
  threadRfp,
  ThreadType,
  VagiType,
} from "@/fsd/entities";
import { NeonType } from "@/fsd/entities/Neon/model";
import {
  api,
  getOrderRequest,
  localOrderToApi,
  saveOrderRequest,
  splitPrice,
} from "@/fsd/shared";
import {
  FringeGlowModeEnum,
  FringeGlowShadeEnum,
  FringeLedEnum,
  fringeRfp,
} from "@/fsd/entities/Fringe";
import demoPDF from "./assets/demo.pdf";
import pdfIntro from "./assets/pdf_intro.png";
import ghLogo from "./assets/GH_logo.png";
import visBackground from "./assets/visBackground.png";
import { LineType } from "../model";
import { curtainRfp } from "@/fsd/entities/Curtain/lib/rfpAlgs";

type PositionsType = Array<{
  name: string;
  items: Array<LineType>;
}>;

export async function generateRFP(
  idb: IndexedDB,
  measureId: string,
  download: boolean = true
) {
  const positions: PositionsType = [];

  await getPositions(measureId);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Подключаем шрифт
  const robotoFontBytes = await fetch(robotoFontUrl).then((res) =>
    res.arrayBuffer()
  );
  const robotoFont = await pdfDoc.embedFont(robotoFontBytes);

  const pageWidth = 540; // ширина A4
  const pageHeight = 720; // высота A4
  const margin = 22.36;
  const lineHeight = 8;
  const dividerHeight = 1; // Толщина разделителя
  const orderId_width = 34.1572;
  const desc_width = 256.179;
  const unit_width = 34.1572;
  const quantity_width = 34.1572;
  const price_width = 68.3144;
  const cost_width = 68.3144;
  const verticalTablePadding = 10;
  const horizontalTablePadding = 6;
  const fontSize = 7;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  drawPageBackground(
    currentPage,
    pageWidth,
    pageHeight,
    rgb(0.9804, 0.9725, 0.9569)
  );

  const introImgBytes = await fetch(pdfIntro.src).then((res) =>
    res.arrayBuffer()
  );
  const introImg = await pdfDoc.embedPng(introImgBytes);
  currentPage.drawImage(introImg, {
    x: 0,
    y: pageHeight - 360,
    width: pageWidth,
    height: 360,
  });
  const measure = await idb.measures.get(measureId);
  const order = await idb.orders.get(measure.ownOrder);

  const titleFontSize = 19;
  let text = `Адрес: ${order.address}`;

  let textLines = splitTextIntoLines(
    text,
    robotoFont,
    titleFontSize,
    pageWidth - 2 * margin
  );

  let yLocalOffset = 230;
  const textPadding = 24;

  textLines.lines.forEach((line) => {
    currentPage.drawText(line, {
      x: margin,
      y: yLocalOffset,
      size: titleFontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });
    yLocalOffset -= textPadding;
  });

  yLocalOffset -= 13;

  text = `Заказчик: ${order.customer} ${order.customerPhone}`;

  textLines = splitTextIntoLines(
    text,
    robotoFont,
    titleFontSize,
    pageWidth - 2 * margin
  );

  textLines.lines.forEach((line) => {
    currentPage.drawText(line, {
      x: margin,
      y: yLocalOffset,
      size: titleFontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });
    yLocalOffset -= textPadding;
  });

  if (download) {
    const objects = await idb.objects.getOwn(measureId);

    for (const object of objects) {
      for (const [_, mediaObj] of object.media.entries()) {
        if (mediaObj.typeEnum === MediaTypeEnum.Vizualization) {
          try {
            const photoRes = await api.get(mediaObj.path, {
              responseType: "arraybuffer",
            });
            const contentType = photoRes.headers["content-type"];
            const binary = photoRes.data;

            const blob = new Blob([binary]);
            const imageURL = URL.createObjectURL(blob);

            const img = new Image();
            img.src = imageURL;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });

            const imageHeightPx = img.height;
            const imageWidthPx = img.width;

            const aspectRatio = imageWidthPx / imageHeightPx;
            const scaledHeight = pageWidth / aspectRatio;
            let photo = null;

            switch (contentType) {
              case "image/jpeg":
                photo = await pdfDoc.embedJpg(binary);
                break;
              case "image/png":
                photo = await pdfDoc.embedPng(binary);
                break;
              default:
                break;
            }

            const currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            const { width, height } = currentPage.getSize();

            drawPageBackground(
              currentPage,
              width,
              height,
              rgb(0.10196, 0.0902, 0.1725)
            );

            const visBackgroundBytes = await fetch(visBackground.src).then(
              (res) => res.arrayBuffer()
            );
            const visBackgroundImg = await pdfDoc.embedPng(visBackgroundBytes);

            const visAspectRatio =
              visBackgroundImg.width / visBackgroundImg.height;
            const visScaledHeight = pageWidth / visAspectRatio;

            currentPage.drawImage(visBackgroundImg, {
              x: 0,
              y: pageHeight - visScaledHeight,
              width: pageWidth,
              height: visScaledHeight,
            });

            const { maxWidthLine: objectWidth } = splitTextIntoLines(
              object.title,
              robotoFont,
              titleFontSize,
              pageWidth - 2 * margin
            );

            const visText = "Визуализация";
            const { maxWidthLine: visWidth } = splitTextIntoLines(
              visText,
              robotoFont,
              titleFontSize,
              pageWidth - 2 * margin
            );

            const textHeight =
              2 * robotoFont.heightAtSize(titleFontSize) + textPadding;

            let y = pageHeight - visScaledHeight / 2 + 6;

            currentPage.drawText(visText, {
              x: (pageWidth - visWidth) / 2,
              y,
              size: titleFontSize,
              font: robotoFont,
              color: rgb(1, 1, 1),
            });

            y -= textPadding;

            currentPage.drawText(object.title, {
              x: (pageWidth - objectWidth) / 2,
              y,
              size: titleFontSize,
              font: robotoFont,
              color: rgb(1, 1, 1),
            });

            let adaptiveWidth = pageWidth;
            let adaptiveHeight = scaledHeight;
            let boundary = pageHeight - visScaledHeight - scaledHeight;
            while (boundary < 0) {
              adaptiveHeight--;
              boundary++;
              adaptiveWidth = aspectRatio * adaptiveHeight;
            }

            if (photo) {
              currentPage.drawImage(photo, {
                x: (pageWidth - adaptiveWidth) / 2,
                y: boundary,
                width: adaptiveWidth,
                height: adaptiveHeight,
              });
            }

            URL.revokeObjectURL(imageURL);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  }

  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  const { width, height } = currentPage.getSize();
  drawPageBackground(currentPage, width, height, rgb(0.9804, 0.9725, 0.9569));
  let yPosition = pageHeight - margin;
  let xPosition = margin;

  const table_header: LineType = {
    id: "Номер п/п",
    desc: "Наименование оборудования",
    unit: "Ед. изм.",
    quantity: "Кол-во",
    price: "Цена",
    cost: "Стоимость",
  };

  const currentMeasure = await idb.measures.get(measureId);
  const currentOrder = await idb.orders.get(currentMeasure.ownOrder);

  const ghLogoBytes = await fetch(ghLogo.src).then((res) => res.arrayBuffer());
  const ghLogoImg = await pdfDoc.embedPng(ghLogoBytes);
  const aspectRatio = ghLogoImg.height / ghLogoImg.width;
  const scaledWidth = 200;
  const scaledHeight = scaledWidth * aspectRatio;

  currentPage.drawImage(ghLogoImg, {
    x: (pageWidth - scaledWidth) / 2,
    y: yPosition - scaledHeight,
    width: scaledWidth,
    height: scaledHeight,
  });

  yPosition -= scaledHeight + 20;

  const clientText = `Заказчик: ${currentOrder.customer} ${currentOrder.customerPhone}`;
  const addressText = `Адрес объекта: ${currentOrder.address}`;

  let { lines } = splitTextIntoLines(
    clientText,
    robotoFont,
    fontSize,
    pageWidth - 2 * margin
  );

  lines.forEach((el) => {
    currentPage.drawText(el, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 10;
  });

  lines = splitTextIntoLines(
    addressText,
    robotoFont,
    fontSize,
    pageWidth - 2 * margin
  ).lines;
  lines.forEach((el) => {
    currentPage.drawText(el, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 10;
  });

  let yOffset = 0;

  yOffset = writeRow(table_header);

  positions.forEach((pos) => {
    xPosition = margin;
    yPosition -= yOffset;
    const boundary = margin + 40;

    if (yPosition <= boundary) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width, height } = currentPage.getSize();
      drawPageBackground(
        currentPage,
        width,
        height,
        rgb(0.9804, 0.9725, 0.9569)
      );
      yPosition = pageHeight - margin;
    }
    yOffset = writeObjectType(pos.name);
    console.log("items", pos.items);
    pos.items.forEach((item) => {
      yPosition -= yOffset;
      xPosition = margin;
      if (yPosition <= boundary) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = currentPage.getSize();
        drawPageBackground(
          currentPage,
          width,
          height,
          rgb(0.9804, 0.9725, 0.9569)
        );
        yPosition = pageHeight - margin;
      }
      console.log("item price", item.price);
      const splittedItem: LineType = {
        ...item,
        price: splitPrice(item.price),
        cost: splitPrice(item.cost),
      };
      if (item.id) {
        yOffset = writeRow(splittedItem);
      } else {
        yOffset = writeOverall(splittedItem, "Итого");
      }
    });
  });

  yPosition -= yOffset;
  xPosition = margin;

  const overall = getTotal();

  yOffset = writeOverall(
    {
      id: "",
      desc: "",
      unit: "",
      quantity: "",
      price: "",
      cost: splitPrice(overall.toString()),
    },
    "Всего"
  );

  yPosition -= yOffset;
  xPosition = margin;

  const discount = await getDiscount();

  if (discount) {
    yOffset = writeOverall(
      {
        id: "",
        desc: "",
        unit: "",
        quantity: "",
        price: "",
        cost: splitPrice((await getDiscount()).toString()),
      },
      "Цена со скидкой"
    );
  }

  yPosition -= 20;

  /* text = `Срок реализации проекта:`;
  currentPage.drawText(text, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: robotoFont,
    color: rgb(0, 0, 0),
  });

  text = `Дата выставления КП: ${order.measureDate}`;
  currentPage.drawText(text, {
    x: pageWidth - margin - robotoFont.widthOfTextAtSize(text, fontSize),
    y: yPosition,
    size: fontSize,
    font: robotoFont,
    color: rgb(0, 0, 0),
  }); */

  if (download) {
    const demoPdfBytes = await fetch(demoPDF).then((res) => res.arrayBuffer());
    const demoDoc = await PDFDocument.load(demoPdfBytes);
    const demoPages = demoDoc.getPages();
    const totalDemoPages = demoPages.length;
    const lastPages = await pdfDoc.copyPages(demoDoc, [
      totalDemoPages - 3,
      totalDemoPages - 2,
      totalDemoPages - 1,
    ]);
    lastPages.forEach((page) => pdfDoc.addPage(page));
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    const aEl = document.createElement("a");
    aEl.href = pdfDataUri;
    aEl.download = `КП_${order.customer}_${order.customerPhone}`;
    aEl.click();
  } else {
    return getTotal();
  }

  function getTotal() {
    let overall = 0;

    if (!positions.length) return overall;

    positions.forEach((pos) => {
      pos.items.forEach((item) => {
        if (parseInt(item.id)) {
          overall += parseInt(item.cost);
        }
      });
    });
    return overall;
  }

  async function getDiscount() {
    const measure = (await idb.measures.getAll()).find(
      (measure) => measure.id === measureId
    );
    return (await idb.orders.get(measure!.ownOrder)).priceWithDiscount;
  }

  function writeRow(row: LineType) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const { lines: orderIdLines, maxWidthLine: maxLineOrderId } =
      splitTextIntoLines(row.id, robotoFont, fontSize, orderId_width);
    const { lines: descLines, maxWidthLine: maxLineDesc } = splitTextIntoLines(
      row.desc,
      robotoFont,
      fontSize,
      desc_width
    );
    const { lines: unitLines, maxWidthLine: maxLineUnit } = splitTextIntoLines(
      row.unit,
      robotoFont,
      fontSize,
      unit_width
    );
    const { lines: quantityLines, maxWidthLine: maxLineQuantity } =
      splitTextIntoLines(row.quantity, robotoFont, fontSize, quantity_width);
    const { lines: priceLines, maxWidthLine: maxLinePrice } =
      splitTextIntoLines(row.price, robotoFont, fontSize, price_width);
    const { lines: costLines, maxWidthLine: maxLineCost } = splitTextIntoLines(
      row.cost,
      robotoFont,
      fontSize,
      cost_width
    );

    const maxHeightText = Math.max(
      orderIdLines.length * lineHeight,
      descLines.length * lineHeight,
      unitLines.length * lineHeight,
      quantityLines.length * lineHeight,
      priceLines.length * lineHeight,
      costLines.length * lineHeight
    );

    const bottomLineY = yPosition - 2 * verticalTablePadding - maxHeightText;

    drawDivider(margin, pageWidth - margin, bottomLineY, bottomLineY);

    let xVertical = xPosition;
    for (let i = 0; i < 7; i++) {
      drawDivider(xVertical, xVertical, yPosition, bottomLineY);
      switch (i) {
        case 0:
          xVertical += orderId_width;
          break;
        case 1:
          xVertical += desc_width;
          break;
        case 2:
          xVertical += unit_width;
          break;
        case 3:
          xVertical += quantity_width;
          break;
        case 4:
          xVertical += price_width;
          break;
        case 5:
          xVertical += cost_width;
          break;
        default:
          break;
      }
    }

    const cellHeight = Math.abs(bottomLineY - yPosition);

    drawCell(
      orderIdLines,
      xPosition,
      maxLineOrderId,
      orderId_width,
      orderIdLines.length * lineHeight,
      cellHeight
    );
    xPosition += orderId_width;

    drawCell(
      descLines,
      xPosition,
      maxLineDesc,
      desc_width,
      descLines.length * lineHeight,
      cellHeight
    );
    xPosition += desc_width;

    drawCell(
      unitLines,
      xPosition,
      maxLineUnit,
      unit_width,
      unitLines.length * lineHeight,
      cellHeight
    );
    xPosition += unit_width;

    drawCell(
      quantityLines,
      xPosition,
      maxLineQuantity,
      quantity_width,
      quantityLines.length * lineHeight,
      cellHeight
    );
    xPosition += quantity_width;

    drawCell(
      priceLines,
      xPosition,
      maxLinePrice,
      price_width,
      priceLines.length * lineHeight,
      cellHeight
    );
    xPosition += price_width;

    drawCell(
      costLines,
      xPosition,
      maxLineCost,
      cost_width,
      costLines.length * lineHeight,
      cellHeight
    );

    return cellHeight;
  }

  function writeObjectType(name: string) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const { lines: nameLines, maxWidthLine: nameTextWidth } =
      splitTextIntoLines(name, robotoFont, fontSize, pageWidth - 2 * margin);

    const nameHeight = nameLines.length * lineHeight;

    const bottomLineY = yPosition - 2 * verticalTablePadding - nameHeight;

    drawDivider(margin, pageWidth - margin, bottomLineY, bottomLineY);

    drawDivider(margin, margin, yPosition, bottomLineY);
    drawDivider(pageWidth - margin, pageWidth - margin, yPosition, bottomLineY);

    const cellHeight = Math.abs(bottomLineY - yPosition);

    drawCell(
      nameLines,
      xPosition,
      nameTextWidth,
      pageWidth - 2 * margin,
      nameHeight,
      cellHeight
    );
    return cellHeight;
  }

  function writeOverall(overall: LineType, text: string) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const yBottom = yPosition - 2 * verticalTablePadding - lineHeight;

    drawDivider(margin, pageWidth - margin, yBottom, yBottom);

    const dividerX = pageWidth - margin - cost_width;

    drawDivider(dividerX, dividerX, yPosition, yBottom);
    drawDivider(margin, margin, yPosition, yBottom);
    drawDivider(pageWidth - margin, pageWidth - margin, yPosition, yBottom);

    const textWidth = robotoFont.widthOfTextAtSize(text, fontSize);

    const cellHeight = Math.abs(yBottom - yPosition);

    const yTextPos = yPosition + (lineHeight - cellHeight) / 2 - fontSize;
    const xTextPos = dividerX - textWidth - horizontalTablePadding;

    currentPage.drawText(text, {
      x: xTextPos,
      y: yTextPos,
      size: fontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });

    const { lines, maxWidthLine } = splitTextIntoLines(
      overall.cost,
      robotoFont,
      fontSize,
      cost_width
    );

    xPosition = pageWidth - margin - cost_width;
    drawCell(
      [`${overall.cost}`],
      xPosition,
      maxWidthLine,
      cost_width,
      lines.length * lineHeight,
      cellHeight
    );

    return cellHeight;
  }

  function drawDivider(x1: number, x2: number, y1: number, y2: number) {
    currentPage.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: dividerHeight,
      color: rgb(0.5, 0.5, 0.5), // серая линия
    });
  }

  function drawCell(
    lines: string[],
    xPosition: number,
    textWidth: number,
    cellWidth: number,
    textHeight: number,
    cellHeight: number
  ) {
    let yTextPos = yPosition + (textHeight - cellHeight) / 2 - fontSize;
    let xTextPos = xPosition + (cellWidth - textWidth) / 2;

    lines.forEach((line) => {
      currentPage.drawText(line, {
        x: xTextPos,
        y: yTextPos,
        size: fontSize,
        font: robotoFont,
        color: rgb(0, 0, 0),
      });
      yTextPos -= lineHeight;
    });
  }

  function splitTextIntoLines(
    text: string,
    font: any,
    fontSize: number,
    maxWidth: number
  ): {
    lines: string[];
    maxWidthLine: number;
  } {
    const words = text.split(" ");
    let lines: string[] = [];
    let currentLine = "";
    let maxWidthLine = 0;
    const paddingMaxWidth = maxWidth - horizontalTablePadding * 2;

    words.forEach((word) => {
      const lineWithWord = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = font.widthOfTextAtSize(lineWithWord, fontSize);

      if (lineWidth < paddingMaxWidth) {
        currentLine = lineWithWord;
      } else {
        lines.push(currentLine);
        const lineWidth = font.widthOfTextAtSize(currentLine, fontSize);
        if (lineWidth > maxWidthLine) maxWidthLine = lineWidth;
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine); // Добавляем последнюю строку
      const lineWidth = font.widthOfTextAtSize(currentLine, fontSize);
      if (lineWidth > maxWidthLine) maxWidthLine = lineWidth;
    }

    lines = lines.filter((line) => line);

    return {
      lines: lines,
      maxWidthLine,
    };
  }

  function drawPageBackground(
    page: PDFPage,
    width: number,
    height: number,
    color: Color
  ) {
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color,
    });
  }

  async function getPositions(measureId: string) {
    const measure = await idb.measures.get(measureId);

    if (measure) {
      const objects = await idb.objects.getOwn(measure.id);

      objects.sort((a, b) => {
        if (a.order > b.order) return 1;
        else if (a.order < b.order) return -1;
        else return 0;
      });

      if (!objects.length) return;

      await new Promise<void>((resolve) => {
        objects.forEach(async (object, index) => {
          const items = await idb.items.getOwn(object.id);
          const i =
            positions.push({
              name: object.title,
              items: [],
            }) - 1;

          let startId = 1;

          fringeRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          threadRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          threadOnTreeRFP(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          beltLightRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          neonRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          curtainRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          electricShieldRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          let consumables = 6500 + getRFPExtensions(items);

          positions[i].items.push({
            id: startId.toString(),
            desc: `Расходные материалы для монтажа  (стяжки, блоки питания для бахромы или сетевые шнуры для неона, выключатель 1/2кл, кабель ПВС до 20 метров в кабель-канале или гофре, распаячная коробка, термоусадка в местах соединения)`,
            unit: "шт",
            quantity: "1",
            price: consumables.toString(),
            cost: consumables.toString(),
          });
          startId++;

          pvsRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          extraCorrBoxRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          switchesRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          montageRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          ropeRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          neonPaintingRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          const cost = positions[i].items.reduce(
            (sum, item) => (sum += parseFloat(item.cost)),
            0
          );
          positions[i].items.push({
            id: "",
            desc: "Итого",
            unit: "",
            quantity: `0`,
            price: `0`,
            cost: `${cost} Р`,
          });
          if (objects.length - 1 === index) {
            resolve();
          }
        });
      });
    }
  }
}
