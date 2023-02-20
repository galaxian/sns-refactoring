export class Payload {
  private readonly _id: bigint;

  constructor(id: bigint) {
    this._id = id;
  }

  get id(): bigint {
    return this._id;
  }
}
