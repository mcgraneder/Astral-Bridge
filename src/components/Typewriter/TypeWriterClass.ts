type QueueItem = () => Promise<void>;

export default class Typewriter {
  private queue: QueueItem[] = [];
  private element: HTMLElement | null = null;
  private cursorElement: HTMLElement | null = null;
  private loop: boolean = false;
  private typingSpeed: number = 10;
  private backSpeed: number = 10;

  constructor(
    parent: HTMLElement | null,
    { loop = false, typingSpeed = 100, backSpeed = 50 } = {}
  ) {
    if (!parent) return;
    this.element = document.createElement("span");
    this.cursorElement = this.createCursorElement();
    parent.append(this.element);
    parent.append(this.cursorElement);
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.backSpeed = backSpeed;
  }

  private createCursorElement() {
    const cursorElement = document.createElement("span");
    cursorElement.classList.add("typed-cursor");
    cursorElement.innerText = "";
    return cursorElement;
  }

  private addCursorBlinkClass() {
    this.cursorElement?.classList.add("typed-cursor__blink");
  }

  private removeCursorBlinkClass() {
    this.cursorElement?.classList.remove("typed-cursor__blink");
  }

  private typedCursorBlink() {
    this.addCursorBlinkClass();
    setTimeout(() => {
      this.removeCursorBlinkClass();
    }, 500);
  }

  typeString(string: string) {
    this.addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (!this.element) return;
        this.element.append(string[i]!);
        i++;
        if (i >= string.length) {
          this.typedCursorBlink();
          clearInterval(interval);
          resolve();
        }
      }, this.typingSpeed);
    });

    return this;
  }

  deleteChars(number: number) {
    this.addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (!this.element) return;
        this.element.innerText = this.element.innerText.substring(
          0,
          this.element.innerText.length - 1
        );
        i++;
        if (i >= number) {
          clearInterval(interval);
          resolve();
        }
      }, this.backSpeed);
    });

    return this;
  }

  deleteAll(deleteSpeed = this.backSpeed) {
    this.addToQueue((resolve) => {
      const interval = setInterval(() => {
        if (!this.element) return;
        this.element.innerText = this.element.innerText.substring(
          0,
          this.element.innerText.length - 1
        );
        if (this.element.innerText.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, deleteSpeed);
    });

    return this;
  }

  pauseFor(duration: number) {
    this.addToQueue((resolve) => {
      setTimeout(resolve, duration);
    });

    return this;
  }

  async start() {
    let cb = this.queue.shift();
    while (cb != null) {
      await cb();
      if (this.loop) this.queue.push(cb);
      cb = this.queue.shift();
    }

    return this;
  }

  destroy() {
    this.element?.remove();
    this.cursorElement?.remove();
  }

  private addToQueue(cb: (resolve: () => void) => void) {
    this.queue.push(() => new Promise(cb));
  }
}
