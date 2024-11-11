/**
 * An abstraction for a list of functions to call when an event occurs,
 * with add/remove methods to add and remove functions from the list.
 *
 * This uses a doubly-linked list and a map to allow for O(1) add/remove
 * and O(n) iteration.
 */
export class Callbacks {
  /**
   * The head of the linked list of callbacks, or null if the list is empty
   */
  private head: CallbackNode | null;

  /**
   * The tail of the linked list of callbacks, or null if the list is empty
   */
  private tail: CallbackNode | null;

  /**
   * The map from callbacks to nodes in the linked list, to allow for
   * O(1) remove
   */
  private lookup: Map<() => void, CallbackNode>;

  /**
   * If call() is currently be executed, to prevent loops which are never
   * desirable performance-wise and also always avoidable
   */
  private calling: boolean;

  /**
   * Initializes an empty list of callbacks
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.lookup = new Map();
    this.calling = false;
  }

  /**
   * Adds the given callback to the list
   * @param callback the callback to add
   * @returns true if the callback was added, false if it was already in the list
   */
  add(callback: () => void): boolean {
    if (this.lookup.has(callback)) {
      return false;
    }

    const node = {
      callback,
      next: null,
      prev: this.tail,
    };

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }

    this.tail = node;
    this.lookup.set(callback, node);
    return true;
  }

  /**
   * Removes the given callback from the list, if it is in the list
   * @param callback the callback to remove
   * @returns true if the callback was removed, false if it was not in the list
   */
  remove(callback: () => void): boolean {
    const node = this.lookup.get(callback);
    if (node === undefined) {
      return false;
    }

    /* Case 1: node is the only node in the list */
    if (node.prev === null && node.next === null) {
      this.head = null;
      this.tail = null;
      this.lookup.delete(callback);
      return true;
    }

    /* Case 2: node is the head */
    if (node.prev === null) {
      if (this.head !== node || this.head.next === null) {
        throw new Error('Invariant violation');
      }

      this.head = this.head.next;
      this.head.prev = null;
      this.lookup.delete(callback);
      return true;
    }

    /* Case 3: node is the tail */
    if (node.next === null) {
      if (this.tail !== node || this.tail.prev === null) {
        throw new Error('Invariant violation');
      }

      this.tail = this.tail.prev;
      this.tail.next = null;
      this.lookup.delete(callback);
      return true;
    }

    /* Case 4: node is in the middle */
    const prev = node.prev;
    const nxt = node.next;

    prev.next = nxt;
    nxt.prev = prev;
    this.lookup.delete(callback);
    return true;
  }

  /**
   * Calls each callback in the list. If, while this is being done, callbacks
   * are added or removed, the changes will not be reflected in the iteration.
   *
   * Furthermore, if, while this is being done, call() gets called again
   * and error will be raised as such circular calls should and can be avoided.
   */
  call(): void {
    if (this.calling) {
      throw new Error('Cannot call call() while call() is already executing');
    }

    const callbacks = [];
    let node = this.head;
    while (node !== null) {
      callbacks.push(node.callback);
      node = node.next;
    }

    this.calling = true;
    let i = 0;
    while (i < callbacks.length) {
      callbacks[i]();
      i++;
    }
    this.calling = false;
  }

  /**
   * Removes all callbacks from the list
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.lookup.clear();
  }
}

type CallbackNode = {
  callback: () => void;
  next: CallbackNode | null;
  prev: CallbackNode | null;
};
