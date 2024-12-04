"use client";

import { CloseSVG, IDBContext } from "@/fsd/shared";
import classes from "./SelectedObject.module.scss";
import {
  Fringe,
  ItemType,
  PickItem,
  MediaControl,
  defaultFringe,
  CommonItemType,
  FringeType,
  Neon,
  ItemTitleType,
  ThreadType,
  defaultThread,
  Thread,
  BeltLightType,
  beltLightDefault,
  BeltLight,
  CurtainType,
  curtainDefault,
  AllItemsTypes,
  Curtain,
  RopeType,
  ropeDefault,
  Rope,
  PVSType,
  pvsDefault,
  PVS,
  CorrugationType,
  corrugationDefault,
  CorrugationPVS,
  BoxPVSType,
  boxPvsDefault,
  BoxPVS,
  SolderBoxType,
  solderBoxDefault,
  SolderBox,
  RelaysSwitchesType,
  relaysSwitchesDefault,
  RelaysSwitches,
  VagiType,
  vagiDefault,
  Vagi,
  Screed_480_500_Type,
  screed_480_500_default,
  Screed_480_500,
  Screed_200_Type,
  screed_200_default,
  Screed_200,
  getPVSLength,
  getAllVagi,
  getSolderBoxPieces,
  getEsRope,
  get_Screeds_480_500_packs,
  get_screeds_200_packs,
  MontageType,
  montageDefault,
  Montage,
  ElectricShieldType,
  electricShieldDefault,
  ElectricShield,
  getFirstVagi,
  MediaTypeEnum,
  markOrderAsEdited,
  FileTypeEnum,
} from "@/fsd/entities";
import { useState, useContext, useEffect } from "react";
import { ObjectType } from "../../model";
import { nanoid } from "nanoid";
import { defaultNeon, NeonType } from "@/fsd/entities/Neon/model";

export function SelectedObject({
  object,
  deleteObject,
  updateCost,
  updateObject,
  orderId,
}: {
  object: ObjectType;
  deleteObject: () => void;
  updateCost: () => void;
  updateObject: (obj: ObjectType) => void;
  orderId: number;
}) {
  const [items, setItems] = useState<CommonItemType[]>([]);
  const idb = useContext(IDBContext);
  const [objName, setObjName] = useState(object.title);
  const [openedId, setOpenedId] = useState("");
  const [solderBoxes, setSolderBoxes] = useState(0);

  function getItems() {
    return new Promise<CommonItemType[]>((resolve, reject) => {
      idb?.items
        .getOwn(object.id)
        .then((data) => {
          function orderSort(obj1: CommonItemType, obj2: CommonItemType) {
            if (obj1.order > obj2.order) return 1;
            if (obj1.order < obj2.order) return -1;
            return 0;
          }
          const newItems = data.sort(orderSort);
          setItems(newItems);
          resolve(newItems);
        })
        .catch((err) => reject(err));
    });
  }

  function deleteItem(id: string) {
    getItems()
      .then(async (items) => {
        let newItems = items.filter((item) => item.id !== id);
        newItems = newItems.map((item, index) => {
          return {
            ...item,
            order: index + 1,
          };
        });
        newItems.sort((a, b) => {
          if (a.order > b.order) return 1;
          else if (a.order < b.order) return -1;
          else return 0;
        });
        setItems(newItems);
        await Promise.all(
          newItems.map(async (item) => {
            idb?.items.update(item);
          })
        );
        await idb?.items.delete(id);
        await markOrderAsEdited(idb!, orderId);
        updateCost();
      })
      .catch((err) => console.error(err));
  }

  function addItem(itemTitle: string) {
    const order = items.length ? items[items.length - 1].order + 1 : 1;

    const typedItemTitle = itemTitle as ItemTitleType;

    switch (typedItemTitle) {
      case "Бахрома": {
        const newItem: ItemType<FringeType> = {
          id: nanoid(),
          order,
          itemTitle: "Бахрома",
          objectId: object.id,
          item: defaultFringe,
        };
        addToDB<FringeType>(newItem);
        break;
      }
      case "Гибкий неон": {
        const newItem: ItemType<NeonType> = {
          id: nanoid(),
          order,
          itemTitle: "Гибкий неон",
          objectId: object.id,
          item: defaultNeon,
        };
        addToDB<NeonType>(newItem);
        break;
      }
      case "Нить": {
        const newItem: ItemType<ThreadType> = {
          id: nanoid(),
          order,
          itemTitle: "Нить",
          objectId: object.id,
          item: defaultThread,
        };
        addToDB<ThreadType>(newItem);
        break;
      }
      case "Белт-лайт": {
        const newItem: ItemType<BeltLightType> = {
          id: nanoid(),
          order,
          itemTitle: "Белт-лайт",
          objectId: object.id,
          item: beltLightDefault,
        };
        addToDB<BeltLightType>(newItem);
        break;
      }
      case "Занавес": {
        const newItem: ItemType<CurtainType> = {
          id: nanoid(),
          order,
          itemTitle: "Занавес",
          objectId: object.id,
          item: curtainDefault,
        };
        addToDB<CurtainType>(newItem);
        break;
      }
      case "Трос": {
        const newItem: ItemType<RopeType> = {
          id: nanoid(),
          order,
          itemTitle: "Трос",
          objectId: object.id,
          item: ropeDefault,
        };
        addToDB<RopeType>(newItem);
        break;
      }
      case "Кабель ПВС": {
        const newItem: ItemType<PVSType> = {
          id: nanoid(),
          order,
          itemTitle: "Кабель ПВС",
          objectId: object.id,
          item: pvsDefault,
        };
        addToDB<PVSType>(newItem);
        break;
      }
      case "Гофра для кабеля ПВС": {
        const newItem: ItemType<CorrugationType> = {
          id: nanoid(),
          order,
          itemTitle: "Гофра для кабеля ПВС",
          objectId: object.id,
          item: corrugationDefault,
        };
        addToDB<CorrugationType>(newItem);
        break;
      }
      case "Кабель-канал (короб) для кабеля ПВС": {
        const newItem: ItemType<BoxPVSType> = {
          id: nanoid(),
          order,
          itemTitle: "Кабель-канал (короб) для кабеля ПВС",
          objectId: object.id,
          item: boxPvsDefault,
        };
        addToDB<BoxPVSType>(newItem);
        break;
      }
      case "Реле и выключатели": {
        const newItem: ItemType<RelaysSwitchesType> = {
          id: nanoid(),
          order,
          itemTitle: "Реле и выключатели",
          objectId: object.id,
          item: relaysSwitchesDefault,
        };
        addToDB<RelaysSwitchesType>(newItem);
        break;
      }
      case "Распаячная коробка": {
        const newItem: ItemType<SolderBoxType> = {
          id: nanoid(),
          order,
          itemTitle: "Распаячная коробка",
          objectId: object.id,
          item: solderBoxDefault,
        };
        addToDB<SolderBoxType>(newItem);
        break;
      }
      case "Ваги (клемма)": {
        const newItem: ItemType<VagiType> = {
          id: nanoid(),
          order,
          itemTitle: "Ваги (клемма)",
          objectId: object.id,
          item: vagiDefault,
        };
        addToDB<VagiType>(newItem);
        break;
      }
      case "Стяжка 480-500мм": {
        const newItem: ItemType<Screed_480_500_Type> = {
          id: nanoid(),
          order,
          itemTitle: "Стяжка 480-500мм",
          objectId: object.id,
          item: screed_480_500_default,
        };
        addToDB<Screed_480_500_Type>(newItem);
        break;
      }
      case "Стяжка 200мм": {
        const newItem: ItemType<Screed_200_Type> = {
          id: nanoid(),
          order,
          itemTitle: "Стяжка 200мм",
          objectId: object.id,
          item: screed_200_default,
        };
        addToDB<Screed_200_Type>(newItem);
        break;
      }
      case "Монтаж и логистика": {
        const newItem: ItemType<MontageType> = {
          id: nanoid(),
          order,
          itemTitle: "Монтаж и логистика",
          objectId: object.id,
          item: montageDefault,
        };
        addToDB<MontageType>(newItem);
        break;
      }
      case "Электрический щиток": {
        const newItem: ItemType<ElectricShieldType> = {
          id: nanoid(),
          order,
          itemTitle: "Электрический щиток",
          objectId: object.id,
          item: electricShieldDefault,
        };
        addToDB<ElectricShieldType>(newItem);
        break;
      }
      default:
        break;
    }

    function addToDB<T extends AllItemsTypes>(newItem: ItemType<T>) {
      setOpenedId(newItem.id);
      idb?.items
        .add<T>(newItem!)
        .then(async () => {
          markOrderAsEdited(idb!, orderId);
          getItems();
        })
        .catch();
    }
  }

  useEffect(() => {
    getItems();
  }, [openedId]);

  useEffect(() => {
    setSolderBoxes(parseInt(getSolderBoxPieces(items).keyValue));

    /*  let quantity_480_500 = 0;
    get_Screeds_480_500_packs(items).forEach((el) => {
      quantity_480_500 += parseInt(el.keyValue);
    });
    set_screeds_480_500(quantity_480_500); */

    /* let quantity_screed_200 = 0;
    get_screeds_200_packs(items).forEach((el) => {
      quantity_screed_200 += parseInt(el.keyValue);
    });
    setScreeds_200(quantity_screed_200); */

    let ropeLegth = 0;
    getEsRope(items).forEach((el) => {
      ropeLegth += Math.ceil(parseFloat(el.keyValue));
    });
  }, [items]);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.header}
        style={{
          marginBottom: `${items.length === 0 ? "16px" : "0"}`,
        }}
      >
        <input
          className={classes.titleInput}
          type="text"
          value={objName}
          onChange={(e) => {
            setObjName(e.currentTarget.value);
            updateObject({
              ...object,
              title: e.currentTarget.value,
            });
          }}
        />
        {/* <h3 className={classes.object}>{object.title}</h3> */}
        <CloseSVG onClick={() => deleteObject()} />
      </div>
      <div
        className={classes.items}
        style={{
          margin: `${items.length === 0 ? "0" : "16px 0"}`,
        }}
      >
        {items.map((itemObj, i) => {
          switch (itemObj.itemTitle) {
            case "Бахрома": {
              return (
                <Fringe
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                  itemObj={itemObj as ItemType<FringeType>}
                />
              );
            }
            case "Гибкий неон":
              return (
                <Neon
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<NeonType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Нить":
              return (
                <Thread
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<ThreadType>}
                  key={i}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Белт-лайт":
              return (
                <BeltLight
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  key={i}
                  getItems={() => getItems()}
                  itemObj={itemObj as ItemType<BeltLightType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Занавес":
              return (
                <Curtain
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CurtainType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Трос":
              return (
                <Rope
                  numberOfOrder={orderId}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RopeType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                  updateCost={updateCost}
                />
              );
            case "Кабель ПВС":
              return (
                <PVS
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<PVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                  numberOfOrder={orderId}
                />
              );
            case "Гофра для кабеля ПВС":
              return (
                <CorrugationPVS
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<CorrugationType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Кабель-канал (короб) для кабеля ПВС":
              return (
                <BoxPVS
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<BoxPVSType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Реле и выключатели":
              return (
                <RelaysSwitches
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<RelaysSwitchesType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Распаячная коробка": {
              return (
                <SolderBox
                  numberOfOrder={orderId}
                  quantity={solderBoxes}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<SolderBoxType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            }
            case "Ваги (клемма)":
              return (
                <Vagi
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<VagiType>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 480-500мм":
              return (
                <Screed_480_500
                  numberOfOrder={orderId}
                  openedId={openedId}
                  updateCost={updateCost}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_480_500_Type>}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Стяжка 200мм":
              return (
                <Screed_200
                  numberOfOrder={orderId}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<Screed_200_Type>}
                  updateCost={updateCost}
                  deleteItem={() => deleteItem(itemObj.id)}
                />
              );
            case "Монтаж и логистика":
              return (
                <Montage
                  numberOfOrder={orderId}
                  deleteItem={() => deleteItem(itemObj.id)}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<MontageType>}
                  updateCost={updateCost}
                />
              );
            case "Электрический щиток":
              return (
                <ElectricShield
                  numberOfOrder={orderId}
                  deleteItem={() => deleteItem(itemObj.id)}
                  openedId={openedId}
                  getItems={() => getItems()}
                  key={i}
                  itemObj={itemObj as ItemType<ElectricShieldType>}
                  updateCost={updateCost}
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
      <div className={classes.pickers}>
        <PickItem addItem={(item) => addItem(item)} />
        <MediaControl
          type={MediaTypeEnum.Photo}
          objectId={object.id}
          orderId={orderId}
        />
        <MediaControl
          type={MediaTypeEnum.Video}
          objectId={object.id}
          orderId={orderId}
        />
        <MediaControl
          type={MediaTypeEnum.Vizualization}
          objectId={object.id}
          orderId={orderId}
        />
      </div>
    </div>
  );
}
