import { IndexedDB } from "@/fsd/features";
import { makeAutoObservable, observable } from "mobx";

type OfflineModeType = {
  isOfflineMode: boolean;
};

const defaultOfflineMode: OfflineModeType = {
  isOfflineMode: true,
};

class OfflineStore {
  offlineMode: OfflineModeType = defaultOfflineMode;

  constructor() {
    makeAutoObservable(this);
  }

  setOfflineMode(offlineMode: OfflineModeType) {
    this.offlineMode = offlineMode;
  }
}

type ValidationDetailsType = {
  isManager: boolean;
  isExecutor: boolean;
};

const defaultValidationDetails: ValidationDetailsType = {
  isManager: true,
  isExecutor: true,
};

class ValidateStore {
  validationDetails: ValidationDetailsType = defaultValidationDetails;

  constructor() {
    makeAutoObservable(this);
  }

  async validate(idb: IndexedDB, orderId: number) {
    const order = await idb.orders.get(orderId);
    const updates: Partial<ValidationDetailsType> = {};
    if (!~order.managerId || !order.managerId) {
      updates.isManager = false;
    }
    if (!~order.executorId || !order.executorId) {
      updates.isExecutor = false;
    }

    this.updateValidationDetails(updates);

    return Object.values(updates).every((value) => value);
  }

  updateValidationDetails(updates: Partial<ValidationDetailsType>) {
    Object.assign(this.validationDetails, updates);
  }

  resetValidationDetails() {
    this.validationDetails = defaultValidationDetails;
  }
}

export const offlineStore = new OfflineStore();
export const validateStore = new ValidateStore();
