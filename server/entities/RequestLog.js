import { EntitySchema } from '@mikro-orm/core';

export class RequestLog {
  constructor() {
    this.createdAt = new Date();
  }
}

export const RequestLogSchema = new EntitySchema({
  class: RequestLog,
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    method: { type: 'string' },
    url: { type: 'string' },
    body: { type: 'string', nullable: true },
    response: { type: 'text' },
    createdAt: { type: 'Date', onCreate: () => new Date() },
  },
});