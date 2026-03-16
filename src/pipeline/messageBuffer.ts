export class MessageBuffer<T> {
  private buffer: T[] = [];
  constructor(
    private readonly maxSize: number,
    private readonly flushFn: (data: T[]) => Promise<void>
  ) {}
  push(item: T) {
    this.buffer.push(item);
    if (this.buffer.length >= this.maxSize) {
      this.flush();
    }
  }

  async flush() {
    if (!this.buffer.length) return;
    const data = [...this.buffer];
    this.buffer = [];
    await this.flushFn(data);
  }
}