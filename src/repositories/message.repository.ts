import { DocumentStore, Entity } from '../libs/document-store';
import { Message } from '../models/message.model';

export interface IMessageRepository {
  create(document: Entity<Message>): Promise<Entity<Message>>;
  read(id: string): Promise<Entity<Message> | null>;
  readAll(): Promise<Entity<Message>[]>;
  readByField(field: keyof Message, value: unknown): Promise<Entity<Message>[]>;
  update(id: string, document: Entity<Message>): Promise<Entity<Message>>;
  delete(id: string): Promise<void>;
}

export class MessageRepository implements IMessageRepository {
  private messageStore: DocumentStore<Message>;

  constructor() {
    this.messageStore = new DocumentStore<Message>('messages');
    this.messageStore.load().catch((error) => {
      console.error('Failed to load message store:', error);
    });
  }

  async create(document: Entity<Message>): Promise<Entity<Message>> {
    return this.messageStore.create(document);
  }

  async read(id: string): Promise<Entity<Message> | null> {
    return this.messageStore.read(id);
  }

  async readAll(): Promise<Entity<Message>[]> {
    return this.messageStore.readAll();
  }

  async readByField(
    field: keyof Message,
    value: unknown
  ): Promise<Entity<Message>[]> {
    return this.messageStore.readByField(field, value);
  }

  async update(
    id: string,
    document: Entity<Message>
  ): Promise<Entity<Message>> {
    return this.messageStore.update(id, document);
  }

  async delete(id: string): Promise<void> {
    return this.messageStore.delete(id);
  }
}

export const messageRepository = new MessageRepository();
