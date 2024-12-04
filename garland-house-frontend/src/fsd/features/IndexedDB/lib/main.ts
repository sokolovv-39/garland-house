import {
  ItemType,
  MeasureType,
  OrderType,
  ObjectType,
  CommonItemType,
  AllItemsTypes,
  UserType,
} from "@/fsd/entities";
import { IndexType, ObjectStoreType } from "./types";

export class IndexedDB {
  db: IDBDatabase | null;
  measures;
  objects;
  items;
  orders;
  users;

  constructor() {
    this.db = null;
    this.users = {
      deleteCurrentUser: async () => {
        await this.users.clear();
      },
      getCurrentUser: async () => {
        const user = (await this.transactionHandler(
          "currentUser",
          "readonly",
          this.cursorHandler,
          undefined
        )) as UserType;
        return user;
      },
      setCurrentUser: async (user: UserType) => {
        await this.transactionHandler(
          "currentUser",
          "readwrite",
          this.clearHandler,
          undefined
        );
        const userKey = await this.transactionHandler(
          "currentUser",
          "readwrite",
          this.addHandler,
          user
        );
        return userKey as IDBValidKey;
      },
      getUsers: async (range?: IDBKeyRange) => {
        const allUsers = (await this.transactionHandler(
          "allUsers",
          "readonly",
          this.getAllHandler,
          range
        )) as UserType[];
        return allUsers;
      },
      add: async (user: UserType) => {
        const key = await this.transactionHandler(
          "allUsers",
          "readwrite",
          this.addHandler,
          user
        );
        return key as IDBValidKey;
      },
      rewrite: async (users: UserType[]) => {
        await this.users.clear();
        await Promise.all(
          users.map(async (user) => {
            await this.users.add(user);
          })
        );
      },
      clear: async () => {
        await this.transactionHandler(
          "allUsers",
          "readwrite",
          this.clearHandler,
          undefined
        );
      },
    };
    this.orders = {
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "orders",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newOrders: OrderType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.orders
            .clear()
            .then(() => {
              if (!newOrders.length) resolve();
              newOrders.forEach(async (order, index) => {
                await this.orders.add(order);
                if (index === newOrders.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      delete: (idsRange: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "orders",
            "readwrite",
            this.deleteHandler,
            idsRange
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<OrderType[]>((resolve, reject) => {
          this.transactionHandler(
            "orders",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((orders) => {
              resolve(orders as OrderType[]);
            })
            .catch((err) => reject(err));
        });
      },
      add: (order: OrderType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("orders", "readwrite", this.addHandler, order)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      get: (numberOfOrder: IDBValidKey) => {
        return new Promise<OrderType>((resolve, reject) => {
          this.getInIndex("orders", "numberOfOrder_idx", numberOfOrder)
            .then((orders) => {
              resolve((orders as OrderType[])[0]);
            })
            .catch((err) => reject(err));
        });
      },
      update: (order: OrderType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("orders", "readwrite", this.putHandler, order)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
    };
    this.measures = {
      get: (id: IDBValidKey) => {
        return new Promise<MeasureType>((resolve, reject) => {
          this.transactionHandler("measures", "readonly", this.getHandler, id)
            .then((measure) => {
              resolve(measure as MeasureType);
            })
            .catch((err) => reject(err));
        });
      },
      add: (measure: MeasureType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.addHandler,
            measure
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<MeasureType[]>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((measures) => {
              resolve(measures as MeasureType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newMeasures: MeasureType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.measures
            .clear()
            .then(() => {
              if (!newMeasures.length) resolve();
              newMeasures.forEach(async (measure, index) => {
                await this.measures.add(measure);
                if (index === newMeasures.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      getOwn: (id: IDBValidKey) => {
        return new Promise<MeasureType[]>((resolve, reject) => {
          this.getInIndex("measures", "orders_idx", id)
            .then((measures) => {
              resolve(measures as MeasureType[]);
            })
            .catch((err) => reject(err));
        });
      },
      update: (measure: MeasureType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "measures",
            "readwrite",
            this.putHandler,
            measure
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
    };
    this.objects = {
      get: (id: IDBValidKey) => {
        return new Promise<ObjectType>((resolve, reject) => {
          this.transactionHandler("objects", "readonly", this.getHandler, id)
            .then((object) => {
              resolve(object as ObjectType);
            })
            .catch((err) => reject(err));
        });
      },
      update: (object: ObjectType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.putHandler,
            object
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      add: (object: ObjectType) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.addHandler,
            object
          )
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<ObjectType[]>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((objects) => {
              resolve(objects as ObjectType[]);
            })
            .catch((err) => reject(err));
        });
      },
      getOwn: (range: IDBValidKey) => {
        return new Promise<ObjectType[]>((resolve, reject) => {
          this.getInIndex("objects", "measure_idx", range)
            .then((objects) => {
              resolve(objects as ObjectType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "objects",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newObjects: ObjectType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.objects
            .clear()
            .then(() => {
              if (!newObjects.length) resolve();
              newObjects.forEach(async (object, index) => {
                await this.objects.add(object);
                if (index === newObjects.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    };
    this.items = {
      add: <T extends AllItemsTypes>(item: ItemType<T>) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("items", "readwrite", this.addHandler, item)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getOwn: (range: IDBValidKey) => {
        return new Promise<CommonItemType[]>((resolve, reject) => {
          this.getInIndex("items", "objects_idx", range)
            .then((items) => {
              resolve(items as CommonItemType[]);
            })
            .catch((err) => reject(err));
        });
      },
      delete: (range: IDBKeyRange | IDBValidKey) => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readwrite",
            this.deleteHandler,
            range
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      clear: () => {
        return new Promise<undefined>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readwrite",
            this.clearHandler,
            undefined
          )
            .then((data) => {
              resolve(data as undefined);
            })
            .catch((err) => reject(err));
        });
      },
      rewrite: (newItems: CommonItemType[]) => {
        return new Promise<void>((resolve, reject) => {
          this.items
            .clear()
            .then(() => {
              if (!newItems.length) resolve();
              newItems.forEach(async (item, index) => {
                await this.items.add<AllItemsTypes>(item);
                if (index === newItems.length - 1) {
                  resolve();
                }
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      update: <T extends AllItemsTypes>(item: ItemType<T>) => {
        return new Promise<IDBValidKey>((resolve, reject) => {
          this.transactionHandler("items", "readwrite", this.putHandler, item)
            .then((key) => {
              resolve(key as IDBValidKey);
            })
            .catch((err) => reject(err));
        });
      },
      getAll: (range?: IDBKeyRange) => {
        return new Promise<CommonItemType[]>((resolve, reject) => {
          this.transactionHandler(
            "items",
            "readonly",
            this.getAllHandler,
            range
          )
            .then((items) => {
              resolve(items as CommonItemType[]);
            })
            .catch((err) => reject(err));
        });
      },
      get: <T extends AllItemsTypes>(key: IDBValidKey) => {
        return new Promise<ItemType<T>>((resolve, reject) => {
          this.transactionHandler("items", "readonly", this.getHandler, key)
            .then((item) => {
              resolve(item as ItemType<T>);
            })
            .catch((err) => reject(err));
        });
      },
    };
  }

  idbInit() {
    return new Promise<void>((resolve, reject) => {
      let openRequest = indexedDB.open("garland_house", 1);

      openRequest.onupgradeneeded = () => {
        this.db = openRequest.result;

        if (!this.db.objectStoreNames.contains("measures")) {
          let measures = this.db.createObjectStore("measures", {
            keyPath: "id",
            autoIncrement: false,
          });
          measures.createIndex("orders_idx", "ownOrder");
        }
        if (!this.db.objectStoreNames.contains("objects")) {
          let objects = this.db.createObjectStore("objects", {
            keyPath: "id",
            autoIncrement: false,
          });
          objects.createIndex("measure_idx", "measureId");
        }

        if (!this.db.objectStoreNames.contains("items")) {
          let items = this.db.createObjectStore("items", {
            keyPath: "id",
            autoIncrement: false,
          });
          items.createIndex("objects_idx", "objectId");
        }

        if (!this.db.objectStoreNames.contains("orders")) {
          let orders = this.db.createObjectStore("orders", {
            keyPath: "id",
            autoIncrement: false,
          });
          orders.createIndex("numberOfOrder_idx", "numberOfOrder");
        }

        if (!this.db.objectStoreNames.contains("currentUser")) {
          this.db.createObjectStore("currentUser", {
            keyPath: "id",
            autoIncrement: false,
          });
        }

        if (!this.db.objectStoreNames.contains("allUsers")) {
          this.db.createObjectStore("allUsers", {
            keyPath: "id",
            autoIncrement: false,
          });
        }

        if (this.db.objectStoreNames.contains("user")) {
          this.db.deleteObjectStore("user");
        }
      };
      openRequest.onerror = function () {
        reject(openRequest.error);
      };

      openRequest.onsuccess = () => {
        if (!this.db) this.db = openRequest.result;

        this.db.onversionchange = () => {
          this.db?.close();
          alert(
            "Ваша база данных устарела. Пожалуйста, закройте все вкладки приложения и перезайдите"
          );
        };
        resolve();
      };

      openRequest.onblocked = () => {
        alert(
          "Ваша база данных устарела. Пожалуйста, закройте все вкладки приложения и перезайдите"
        );
      };
    });
  }

  idbDelete() {
    return new Promise<void>((resolve, reject) => {
      this.db?.close();

      let deleteRequest = indexedDB.deleteDatabase("garland_house");

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = (err) => {
        reject(err);
      };
    });
  }

  transactionHandler(
    objectStore: ObjectStoreType,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore, payload: any) => Promise<any>,
    payload: any
  ) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let transaction = this.db.transaction(objectStore, mode);
        let store = transaction.objectStore(objectStore);
        callback(store, payload)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject("База данных не инициализирована");
      }
    });
  }

  getInIndex(
    objectStore: ObjectStoreType,
    index: IndexType,
    range: IDBValidKey
  ) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        let transaction = this.db.transaction(objectStore, "readonly");
        let store = transaction.objectStore(objectStore);
        let indexStore = store.index(index);

        let request = indexStore.getAll(range);

        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error);
        };
      }
    });
  }

  addHandler(store: IDBObjectStore, object: any) {
    return new Promise((resolve, reject) => {
      let request = store.add(object);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  getAllHandler(store: IDBObjectStore, range?: IDBKeyRange) {
    return new Promise((resolve, reject) => {
      let request = null;

      if (range) {
        request = store.getAll(range);
      } else {
        request = store.getAll();
      }

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  deleteHandler(store: IDBObjectStore, range: IDBKeyRange) {
    return new Promise<undefined>((resolve, reject) => {
      let request = store.delete(range);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  clearHandler(store: IDBObjectStore) {
    return new Promise((resolve, reject) => {
      let request = store.clear();

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  putHandler(store: IDBObjectStore, object: any) {
    return new Promise<IDBValidKey>((resolve, reject) => {
      let request = store.put(object);

      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });
  }
  getHandler(store: IDBObjectStore, key: IDBValidKey) {
    return new Promise((resolve, reject) => {
      let request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  cursorHandler(store: IDBObjectStore) {
    return new Promise((resolve, reject) => {
      let request = store.openCursor();

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          resolve(cursor.value);
        } else reject("No current user");
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
