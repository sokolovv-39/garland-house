"use client";

import Filter from "./images/filter.svg";
import classes from "./OrdersTable.module.scss";
import { OrderStatusType } from "../../model";
import Link from "next/link";
import {
  DateFormatter,
  splitPrice,
  StatusTab,
  getUsersRequest,
  getOrdersTable,
  IDBContext,
  offlineStore,
  saveOrderRequest,
} from "@/fsd/shared";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CheckboxFilter } from "@/fsd/features";
import Arrow from "./images/arrow.svg";
import { useRouter } from "nextjs-toploader/app";
import { useQuery } from "@tanstack/react-query";
import { ResultTableOrderDto } from "@/fsd/shared/api/apiTypes";
import {
  apiToEnumLocal,
  enumToApi,
  RemoteEnumsType,
} from "@/fsd/shared/api/helpers/apiLocalEnumTransfer";
import { UserRoleEnum, UserType } from "@/fsd/entities/User";

export function OrdersTable({ searchVal }: { searchVal: string }) {
  const idb = useContext(IDBContext);
  const { data, error, isError } = useQuery({
    queryKey: ["getOrdersTable"],
    queryFn: async () => {
      const orders = (await idb?.orders.getAll()) || [];
      await Promise.all(
        orders?.map(async (order) => {
          await saveOrderRequest(order.numberOfOrder, idb!);
        })
      );
      const data = await getOrdersTable(idb!);
      return data;
    },
    retry: false,
  });
  const router = useRouter();
  const [filtOrders, setFiltOrders] = useState<ResultTableOrderDto[]>([]);
  const [statusFilter, setStatusFilter] = useState<{
    isOpen: boolean;
    value: string[];
  }>({
    isOpen: false,
    value: [],
  });
  const [managerFilter, setManagerFilter] = useState<{
    isOpen: boolean;
    ids: number[];
  }>({
    isOpen: false,
    ids: [],
  });
  const [executorFilter, setExecutorFilter] = useState<{
    isOpen: boolean;
    ids: number[];
  }>({
    isOpen: false,
    ids: [],
  });
  const [idSort, setIdSort] = useState(false);
  const [createSort, setCreateSort] = useState(false);
  const [budgetSort, setBudgetSort] = useState(false);
  const [users, setUsers] = useState<{
    managers: UserType[];
    executors: UserType[];
  }>({
    managers: [],
    executors: [],
  });

  /*   async function getLocalOrders() {
    let newOrders = await idb!.orders.getAll();

    newOrders = await Promise.all(
      newOrders.map(async (order) => {
        const rfpFork = await getRfpFork(order);
        return {
          ...order,
          rfpFork,
        };
      })
    );

    function orderIdSort(obj1: OrderType, obj2: OrderType) {
      if (obj1.numberOfOrder > obj2.numberOfOrder) return 1;
      if (obj1.numberOfOrder < obj2.numberOfOrder) return -1;
      return 0;
    }

    newOrders.sort(orderIdSort);

    newOrders = newOrders.filter((order) => !order.deleted);

    setOrders(newOrders);
    setFiltOrders(newOrders);

    return newOrders;
  } */

  function sortByStatus(status: string, checked: boolean) {
    if (checked) {
      setStatusFilter((prev) => {
        return {
          ...prev,
          value: [...prev.value, status],
        };
      });
    } else {
      setStatusFilter((prev) => {
        return {
          ...prev,
          value: prev.value.filter((val) => val !== status),
        };
      });
    }
  }

  function sortByManager(id: number, checked: boolean) {
    if (checked) {
      setManagerFilter((prev) => {
        return {
          ...prev,
          ids: [...prev.ids, id],
        };
      });
    } else {
      setManagerFilter((prev) => {
        return {
          ...prev,
          ids: prev.ids.filter((val) => val !== id),
        };
      });
    }
  }

  function sortByExecutor(executor: number, checked: boolean) {
    if (checked) {
      setExecutorFilter((prev) => {
        return {
          ...prev,
          ids: [...prev.ids, executor],
        };
      });
    } else {
      setExecutorFilter((prev) => {
        return {
          ...prev,
          ids: prev.ids.filter((val) => val !== executor),
        };
      });
    }
  }

  function sortByBudget() {
    const newArr = filtOrders;

    function sortASC(order1: ResultTableOrderDto, order2: ResultTableOrderDto) {
      if (order1.maxBudget > order2.maxBudget) return 1;
      if (order1.maxBudget < order2.maxBudget) return -1;
      else return 0;
    }

    function sortDESC(
      order1: ResultTableOrderDto,
      order2: ResultTableOrderDto
    ) {
      if (order1.maxBudget > order2.maxBudget) return -1;
      if (order1.maxBudget < order2.maxBudget) return 1;
      else return 0;
    }

    if (budgetSort) newArr.sort(sortASC);
    else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setBudgetSort(!budgetSort);
  }

  function sortById() {
    const newArr = filtOrders;

    function sortASC(order1: ResultTableOrderDto, order2: ResultTableOrderDto) {
      if (order1.id > order2.id) return 1;
      if (order1.id < order2.id) return -1;
      else return 0;
    }

    function sortDESC(
      order1: ResultTableOrderDto,
      order2: ResultTableOrderDto
    ) {
      if (order1.id > order2.id) return -1;
      if (order1.id < order2.id) return 1;
      else return 0;
    }

    if (idSort) newArr.sort(sortASC);
    else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setIdSort(!idSort);
  }

  function sortByDate() {
    const newArr = filtOrders;

    function sortASC(order1: ResultTableOrderDto, order2: ResultTableOrderDto) {
      let dmy = new DateFormatter(new Date(order1.createdDate)).dateToDMY();
      const order_1_time = new DateFormatter().DMY_to_ms(dmy);
      dmy = new DateFormatter(new Date(order2.createdDate)).dateToDMY();
      const order_2_time = new DateFormatter().DMY_to_ms(dmy);

      if (order_1_time > order_2_time) return 1;
      if (order_1_time < order_2_time) return -1;
      return 0;
    }

    function sortDESC(
      order1: ResultTableOrderDto,
      order2: ResultTableOrderDto
    ) {
      let dmy = new DateFormatter(new Date(order1.createdDate)).dateToDMY();
      const order_1_time = new DateFormatter().DMY_to_ms(dmy);
      dmy = new DateFormatter(new Date(order2.createdDate)).dateToDMY();
      const order_2_time = new DateFormatter().DMY_to_ms(dmy);

      if (order_1_time > order_2_time) return -1;
      if (order_1_time < order_2_time) return 1;
      return 0;
    }

    if (createSort) {
      newArr.sort(sortASC);
    } else newArr.sort(sortDESC);

    setFiltOrders(newArr);
    setCreateSort(!createSort);
  }

  /*   async function getRfpFork(order: OrderType): Promise<{
    maxRfpPrice: number;
    minRfpPrice: number;
    noData: boolean;
  }> {
    const measures = await idb!.measures.getOwn(order.numberOfOrder);
    let maxCost = 0;
    let minCost = Infinity;
    await Promise.all(
      measures.map(async (measure) => {
        const cost = await generateRFP(idb!, measure.id, false);
        if (cost! > maxCost) maxCost = cost!;
        if (cost! < minCost) minCost = cost!;
      })
    );

    if (maxCost === 0 || minCost === Infinity) {
      return {
        noData: true,
        maxRfpPrice: 0,
        minRfpPrice: 0,
      };
    } else {
      return {
        noData: false,
        maxRfpPrice: maxCost,
        minRfpPrice: minCost,
      };
    }
  } */

  function renderBudget(order: ResultTableOrderDto) {
    if (!order.minBudget && !order.maxBudget) {
      return (
        <span
          style={{
            justifyContent: "center",
          }}
        >
          н/д
        </span>
      );
    } else if (order.maxBudget === order.minBudget) {
      return (
        <span
          style={{
            justifyContent: "center",
          }}
        >
          {splitPrice(order.maxBudget.toString())}
        </span>
      );
    } else {
      return (
        <div className={classes.centerBudget}>
          <div>
            <span>
              <span className={classes.forkText}>от </span>
              {splitPrice(order.minBudget.toString())}
            </span>
            <span>
              <span className={classes.forkText}>до </span>
              {splitPrice(order.maxBudget.toString())}
            </span>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    if (data) {
      let filteredArr = data;

      filteredArr = data.filter((order) => {
        if (
          order.customerPhone
            .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase())
        )
          return true;
        else if (
          order.address
            .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase())
        )
          return true;
        else if (
          order.customerFIO
            .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase())
        )
          return true;
        else return false;
      });

      if (statusFilter.value.length) {
        filteredArr = filteredArr.filter((order) => {
          if (
            statusFilter.value.includes(
              apiToEnumLocal(order.status as RemoteEnumsType)
            )
          )
            return true;
          else return false;
        });
      }

      if (managerFilter.ids.length) {
        filteredArr = filteredArr.filter((order) => {
          return managerFilter.ids.includes(order.managerId);
        });
      }

      if (executorFilter.ids.length) {
        filteredArr = filteredArr.filter((order) =>
          executorFilter.ids.includes(order.executorId)
        );
      }
      setFiltOrders(filteredArr);
    }
  }, [searchVal, statusFilter, managerFilter, executorFilter, data]);

  useEffect(() => {
    (async function () {
      if (isError) {
        if (error.message === "Offline") {
          const localOrders = await idb!.orders.getAll();
          const orders: ResultTableOrderDto[] = [];
          localOrders.forEach((order) => {
            orders.push({
              id: order.numberOfOrder,
              status: enumToApi(order.status),
              customerFIO: order.customer,
              customerPhone: order.customerPhone,
              address: order.address,
              linkToAmoCRM: order.amoCRMLink,
              managerId: order.managerId,
              executorId: order.executorId,
              createdDate: new DateFormatter().DMY_to_Iso(order.measureDate),
              minBudget: 0,
              maxBudget: 0,
            });
          });
          setFiltOrders(orders);
          offlineStore.setOfflineMode({
            isOfflineMode: true,
          });
        }
      } else if (data) {
        offlineStore.setOfflineMode({
          isOfflineMode: false,
        });
        await idb?.orders.clear();
        await idb?.measures.clear();
        await idb?.objects.clear();
        await idb?.items.clear();
      }
    })();
  }, [isError, error, data]);

  useEffect(() => {
    (async function () {
      const allUsers = await idb!.users.getUsers();
      const managers = allUsers.filter(
        (user) => user.role === UserRoleEnum.Manager
      );
      const executors = allUsers.filter(
        (user) => user.role === UserRoleEnum.Executor
      );
      setUsers({
        managers,
        executors,
      });
    })();
  }, []);

  /* useEffect(() => {
    async function runRfpFork() {
      const newOrders: OrderType[] = [];
      await Promise.all(
        orders.map(async (order) => {
          const rfpFork = await getRfpFork(order);
          newOrders.push({
            ...order,
            rfpFork,
          });
        })
      );
      setOrders(newOrders);
    }

    runRfpFork();
  }, [orders]); */

  return (
    <table className={classes.wrapper}>
      <thead>
        <tr>
          <th>
            <div className={classes.headers} onClick={sortById}>
              <span>№</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: idSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
          <th>
            <div className={classes.headers}>
              <span>Заказчик</span>
            </div>
          </th>
          <th>
            <div className={classes.headers}>
              <span>Адрес</span>
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setStatusFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Статус</span>
              <Image src={Filter} alt="" />
              {statusFilter.isOpen && (
                <CheckboxFilter
                  checkeds={statusFilter.value}
                  onChange={sortByStatus}
                  closeFilter={() =>
                    setStatusFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="status"
                />
              )}
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setManagerFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Менеджер</span>
              <Image src={Filter} alt="" />
              {managerFilter.isOpen && (
                <CheckboxFilter
                  workers={users.managers}
                  checkeds={managerFilter.ids}
                  onChange={sortByManager}
                  closeFilter={() =>
                    setManagerFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="workers"
                />
              )}
            </div>
          </th>
          <th>
            <div
              className={`${classes.relative} ${classes.headers}`}
              onClick={(e) => {
                e.stopPropagation();
                setExecutorFilter((prev) => {
                  return {
                    ...prev,
                    isOpen: !prev.isOpen,
                  };
                });
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>Исполнитель</span>
              <Image src={Filter} alt="" />
              {executorFilter.isOpen && (
                <CheckboxFilter
                  workers={users.executors}
                  checkeds={executorFilter.ids}
                  onChange={sortByExecutor}
                  closeFilter={() =>
                    setExecutorFilter((prev) => {
                      return {
                        ...prev,
                        isOpen: false,
                      };
                    })
                  }
                  type="workers"
                />
              )}
            </div>
          </th>
          <th>
            <div className={classes.headers} onClick={sortByDate}>
              <span>Создан</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: createSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
          <th>
            <span>AmoCRM</span>
          </th>
          <th>
            <div className={classes.headers} onClick={sortByBudget}>
              <span>Бюджет</span>
              <Image
                src={Arrow}
                alt=""
                style={{
                  transform: budgetSort ? "rotate(180deg)" : "",
                }}
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filtOrders.map((order) => (
          <tr
            key={order.id}
            onClick={() => router.push(`orders/${order.id}/basic`)}
            style={{ cursor: "pointer" }}
          >
            <td>
              {isError && error.message === "Offline"
                ? `Л-${order.id}`
                : order.id}
            </td>
            <td className={classes.customer}>
              <span>{order.customerFIO}</span>
              <span>{order.customerPhone}</span>
            </td>
            <td>
              <span>{order.address}</span>
            </td>
            <td>
              <StatusTab
                customStyles={{
                  padding: "4px 0",
                }}
                status={
                  apiToEnumLocal(
                    order.status as RemoteEnumsType
                  ) as OrderStatusType
                }
              />
            </td>
            <td>
              {users.managers.find((user) => user.id === order.managerId)?.fio}
            </td>
            <td>
              {
                users.executors.find((user) => user.id === order.executorId)
                  ?.fio
              }
            </td>
            <td>
              {new DateFormatter(new Date(order.createdDate)).dateToDMY()}
            </td>
            <td>
              <a
                href={order.linkToAmoCRM}
                className={classes.amoCRM}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {order.linkToAmoCRM}
              </a>
            </td>
            <td className={classes.budget}>{renderBudget(order)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
