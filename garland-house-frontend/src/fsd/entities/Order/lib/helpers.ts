import { IndexedDB } from "@/fsd/features";

export async function markOrderAsEdited(idb: IndexedDB, numberOfOrder: number) {
  const order = await idb.orders.get(numberOfOrder);
  await idb.orders.update({
    ...order,
    isEdited: true,
  });
}

export async function deleteLocalOrder(numberOfOrder: number, idb: IndexedDB) {
  const orderId = (await idb.orders.get(numberOfOrder)).id;
  await idb.orders.delete(orderId);
  const measures = await idb.measures.getOwn(numberOfOrder);
  await Promise.all(
    measures.map(async (measure) => {
      await idb.measures.delete(measure.id);
      const objects = await idb.objects.getOwn(measure.id);
      await Promise.all(
        objects.map(async (object) => {
          await idb.objects.delete(object.id);
          const items = await idb.items.getOwn(object.id);
          await Promise.all(
            items.map(async (item) => {
              await idb.items.delete(item.id);
            })
          );
        })
      );
    })
  );
}
