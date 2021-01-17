/**
 *
 * @param {Object} prevPayload
 * @param {Object} currentPayload
 * @param {Array<Function>} subscribers
 */
function maybeBroadcastDataChange(prevPayload, currentPayload, subscribers) {
  if (prevPayload !== currentPayload) {
    if (subscribers) {
      subscribers.forEach((subscriber) => {
        subscriber(currentPayload);
      });
    }
  }
}

class StateStore {
  /**
   *
   */
  constructor() {
    this.store = {};
    this.subscribers = {};
  }

  set(key, value) {
    const prevValue = this.store[key];
    this.store[key] = value;
    maybeBroadcastDataChange(prevValue, value, this.subscribers[key]);
  }

  get(key, defaultValue) {
    return this.store[key] || defaultValue;
  }

  removeData(key) {
    if (this.store[key]) {
      this.store[key] = null;
      maybeBroadcastDataChange({}, null, this.subscribers[key]);
    }
  }

  clear() {
    this.store = {};
  }

  /**
   *
   * @param {String} key
   * @param {Function} func
   */
  subscribe(key, func) {
    if (!this.subscribers[key]) this.subscribers[key] = [];
    this.subscribers[key].push(func);
    return () => {
      this.unsubscribe(key, func);
    };
  }

  unsubscribe(key, func) {
    this.removeData(key);
    if (!this.subscribers[key]) {
      throw new Error("Trying to unsubscribe when you have not subscribed");
    }
    const subscribers = this.subscribers[key].filter(
      (subscriber) => subscriber !== func
    );
    this.subscribers[key] = subscribers;
  }

  maybeInitializeKey(key, defaultValue) {
    if (!this.store[key]) {
      this.store[key] = defaultValue;
    }
  }
}

export default new StateStore();
