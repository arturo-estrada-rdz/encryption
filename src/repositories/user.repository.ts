import { AppError } from '../error/error';
import { DocumentStore, Entity } from '../libs/document-store';
import { User } from '../models/user.model';

interface IUserRepository {
  create(document: Entity<User>): Promise<Entity<User>>;
  read(id: string): Promise<Entity<User> | null>;
  list?(): Promise<Entity<User>[]>;
  readByUsername?(username: string): Promise<Entity<User> | null>;
  update(id: string, document: Entity<User>): Promise<Entity<User>>;
  delete(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  userStore: DocumentStore<User>;

  constructor() {
    this.userStore = new DocumentStore<User>('users');
    this.userStore.load().catch((error) => {
      console.error('Failed to load user store:', error);
    });
  }

  async create(document: Entity<User>): Promise<Entity<User>> {
    return this.userStore.create(document);
  }

  async read(id: string): Promise<Entity<User> | null> {
    const user = await this.userStore.read(id);

    if (!user) {
      const error = new AppError('User not found');
      error.status = 404;
      throw error;
    }

    return user;
  }

  async list(): Promise<Entity<User>[]> {
    return this.userStore.readAll();
  }

  async readByUsername(username: string): Promise<Entity<User> | null> {
    const users = await this.userStore.readByField('username', username);
    return users.length > 0 ? users[0] : null;
  }

  async update(id: string, document: Entity<User>): Promise<Entity<User>> {
    return this.userStore.update(id, document);
  }

  async delete(id: string): Promise<void> {
    return this.userStore.delete(id);
  }
}

export const userRepository = new UserRepository();
