import {makeAutoObservable} from "mobx";

export default class CounterStore {
  title = "Counter Store";
  count = 0;
  events: string[] = [
    `Initial count is ${this.count}`
  ]

  constructor() {
    makeAutoObservable(this);
  }

  increment = () => {
    this.count += 1;
    this.events.push(`Increment: count is ${this.count}`);
  }

  decrement = () => {
    this.count -= 1;
    this.events.push(`Decrement: count is ${this.count}`);
  }

  get eventCount() {
    return this.events.length;
  }
}
