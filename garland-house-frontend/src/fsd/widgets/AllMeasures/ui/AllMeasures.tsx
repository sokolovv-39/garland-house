"use client";

import {
  AllItemsTypes,
  CommonItemType,
  ItemType,
  markOrderAsEdited,
  Measure,
  MeasureType,
  ObjectType,
} from "@/fsd/entities";
import classes from "./AllMeasures.module.scss";
import { useContext, useEffect, useState } from "react";
import { IDBContext } from "@/fsd/shared";
import { nanoid } from "nanoid";

export function AllMeasures({ numberOfOrder }: { numberOfOrder: number }) {
  const idb = useContext(IDBContext);
  const [measures, setMeasures] = useState<MeasureType[]>([]);

  function getMeasures() {
    return new Promise<void>((resolve, reject) => {
      idb?.measures
        .getOwn(numberOfOrder)
        .then((data) => {
          function orderIdSort(obj1: MeasureType, obj2: MeasureType) {
            if (obj1.order > obj2.order) return 1;
            if (obj1.order < obj2.order) return -1;
            return 0;
          }
          const newMeasures = data.sort(orderIdSort);
          setMeasures(newMeasures);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function deleteMeasure(id: string) {
    let newMeasures = measures.filter((measure) => measure.id !== id);
    newMeasures = newMeasures.map((measure, index) => {
      return {
        ...measure,
        orderId: index + 1,
      };
    });
    const favMeasure = newMeasures.findIndex((measure) => measure.isFavourite);

    if (newMeasures.length) {
      if (favMeasure === -1) newMeasures[0].isFavourite = true;
    }

    await idb?.measures.rewrite(newMeasures);
    await markOrderAsEdited(idb!, numberOfOrder);
    getMeasures();
  }

  function addMeasure() {
    const order = measures.length ? measures[measures.length - 1].order + 1 : 1;

    const newMeasure: MeasureType = {
      id: nanoid(),
      order,
      isFavourite: order === 1,
      ownOrder: numberOfOrder,
    };

    idb?.measures
      .add(newMeasure)
      .then(async () => {
        await markOrderAsEdited(idb!, numberOfOrder);
        getMeasures();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function copyMeasure(measure: MeasureType) {
    const newMeasure: MeasureType = {
      id: nanoid(),
      order: measures[measures.length - 1].order + 1,
      isFavourite: false,
      ownOrder: numberOfOrder,
    };
    await idb?.measures.add(newMeasure);
    const objects = await idb?.objects.getOwn(measure.id);
    await Promise.all(
      objects!.map(async (obj) => {
        const newObj: ObjectType = {
          ...obj,
          id: nanoid(),
          measureId: newMeasure.id,
        };
        await idb?.objects.add(newObj);
        const items = await idb!.items.getOwn(obj.id);
        await Promise.all(
          items.map(async (item) => {
            const newItem: CommonItemType = {
              ...item,
              id: nanoid(),
              objectId: newObj.id,
            };
            await idb!.items.add(newItem);
          })
        );
      })
    );
    await markOrderAsEdited(idb!, numberOfOrder);
    getMeasures();
  }

  function addToFav(id: string) {
    idb?.measures
      .getOwn(numberOfOrder)
      .then((measures) => {
        return new Promise<void>((resolve, reject) => {
          measures.forEach(async (measure, index) => {
            try {
              await idb.measures.update({
                ...measure,
                isFavourite: measure.id === id,
              });
              if (index === measures.length - 1) resolve();
            } catch (err) {
              reject(err);
            }
          });
        })
          .then(async () => {
            await markOrderAsEdited(idb!, numberOfOrder);
            getMeasures();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMeasures();
  }, []);

  return (
    <div className={classes.wrapper}>
      {measures.map((measure) => (
        <Measure
          orderId={numberOfOrder}
          addToFav={() => addToFav(measure.id)}
          measure={measure}
          isFavourite={measure.isFavourite}
          key={measure.id}
          deleteMeasure={() => deleteMeasure(measure.id)}
          copyMeasure={copyMeasure}
        />
      ))}
      <div className={classes.addMeasure} onClick={() => addMeasure()}>
        <span>Добавить вариант замера</span>
      </div>
    </div>
  );
}