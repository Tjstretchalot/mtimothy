import { ValueWithCallbacks } from '../callbacks/ValueWithCallbacks';
import { WritableValueWithCallbacks } from '../callbacks/WritableValueWithCallbacks';

/**
 * Describes some process that progresses through until an end state. Almost
 * always a state should be of the form `{ type: string enum }` where one of the
 * values is `released`, though enforcing this requires a lot of boilerplate for
 * no benefit in practice.
 *
 * It is generally easiest to write tasks and use cancelables via `waitForValue`
 * on the corresponding state.
 */
export type Task<State, Message> = {
  /** The current state of the machine */
  state: ValueWithCallbacks<State>;

  /**
   * The message value that can be used to communicate with the task.
   * Only the task can set this value when it is not null, and the
   * task cannot set this value when it is null.
   *
   * When the task is released the message value should not be set.
   *
   * Use the `sendMessage` and `receiveMessage` cancelables to facilitate
   * this behavior.
   */
  message: WritableValueWithCallbacks<Message | null>;
};
