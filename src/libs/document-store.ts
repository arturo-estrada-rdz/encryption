import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  conflictError,
  internalServerError,
  notFoundError,
} from '../error/error';

/**
 * Represents an entity stored in the DocumentStore.
 * Adds optional `id`, `createdAt`, and `updatedAt` fields to the base type.
 */
export type Entity<T> = T & { id?: string; createdAt?: Date; updatedAt?: Date };

/**
 * Represents the in-memory store as a record of entities indexed by ID.
 */
export type Store<T> = Record<string, Entity<T>>;

/**
 * A simple file-based document store for storing, retrieving, updating, and deleting entities.
 * Data is persisted as JSON in the `data/` directory at the project root.
 *
 * @template T - The base type of the entity to store.
 */
export class DocumentStore<T> {
  store: Store<T>;
  filePath: string;

  /**
   * Creates a new DocumentStore instance.
   * @param {string} fileName - The base name for the JSON file (without extension).
   */
  constructor(fileName: string) {
    this.store = {};
    this.filePath = path.join(process.cwd(), 'data', `${fileName}.json`);
  }

  /**
   * Loads the store from the JSON file. Initializes an empty store if the file does not exist.
   * @returns {Promise<void>}
   */
  async load(): Promise<void> {
    const dir = path.dirname(this.filePath);
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      this.store = JSON.parse(data);
    } catch (error) {
      if ((error as { code: string }).code === 'ENOENT') {
        console.info('File not found, starting with an empty store.');
        this.store = {};
        try {
          await fs.promises.mkdir(dir, { recursive: true });
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(this.store, null, 2),
            'utf8'
          );
          console.info('Initialized empty document store.');
        } catch (mkdirOrWriteErr) {
          console.error(mkdirOrWriteErr);
          throw internalServerError('Failed to initialize the document store');
        }
      } else {
        console.error(error);
        throw internalServerError('Failed to load the document store');
      }
    }
  }

  /**
   * Saves the current store to the JSON file.
   * @returns {Promise<void>}
   */
  async save(): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.store, null, 2),
        'utf8'
      );
    } catch {
      throw internalServerError('Failed to save the document store');
    }
  }

  /**
   * Creates a new entity in the store.
   * @param {Entity<T>} document - The entity to create.
   * @returns {Promise<Entity<T>>} The created entity with assigned `id` and `createdAt`.
   * @throws {AppError} If a document with the generated ID already exists.
   */
  async create(document: Entity<T>): Promise<Entity<T>> {
    const id = uuidv4(); // Generate a unique ID for the document
    const createdAt = new Date();

    if (this.store[id]) {
      throw conflictError(`Document with ID ${id} already exists.`);
    }

    const item: Entity<T> = {
      ...document,
      id,
      createdAt,
    };

    this.store[id] = item;

    await this.save();

    return item;
  }

  /**
   * Reads an entity by its ID.
   * @param {string} id - The ID of the entity to read.
   * @returns {Promise<Entity<T> | null>} The entity if found, or null if not found.
   */
  async read(id: string): Promise<Entity<T> | null> {
    const item = this.store[id] || null;
    return Promise.resolve(item);
  }

  /**
   * Reads all entities in the store, optionally filtered by criteria.
   * @param {Partial<Entity<T>>} [criteria] - Optional criteria to filter entities.
   * @returns {Promise<Entity<T>[]>} An array of entities matching the criteria.
   */
  async readAll(criteria?: Partial<Entity<T>>): Promise<Entity<T>[]> {
    const allEntities = Object.values(this.store);

    if (!criteria) {
      return allEntities;
    }

    return allEntities.filter((entity) => {
      return Object.entries(criteria).every(([key, value]) => {
        return entity[key as keyof Entity<T>] === value;
      });
    });
  }

  /**
   * Reads entities by a specific field and value.
   * @param {keyof T} field - The field to filter by.
   * @param {unknown} value - The value to match against the field.
   * @returns {Promise<Entity<T>[]>} An array of entities matching the field and value.
   */
  async readByField(field: keyof T, value: unknown): Promise<Entity<T>[]> {
    const results = Object.values(this.store).filter(
      (item) => item[field] === value
    );
    return Promise.resolve(results);
  }

  /**
   * Updates an existing entity by its ID.
   * @param {string} id - The ID of the entity to update.
   * @param {Entity<T>} document - The updated entity data.
   * @returns {Promise<Entity<T>>} The updated entity.
   * @throws {AppError} If the document with the specified ID does not exist.
   */
  async update(id: string, document: Entity<T>): Promise<Entity<T>> {
    if (!this.store[id]) {
      throw notFoundError('Document with this ID does not exist');
    }
    this.store[id] = { ...this.store[id], ...document, updatedAt: new Date() };
    await this.save();
    return this.store[id];
  }

  /**
   * Deletes an entity by its ID.
   * @param {string} id - The ID of the entity to delete.
   * @returns {Promise<void>}
   * @throws {AppError} If the document with the specified ID does not exist.
   */
  async delete(id: string): Promise<void> {
    if (!this.store[id]) {
      throw notFoundError('Document with this ID does not exist');
    }
    delete this.store[id];
    await this.save();
  }
}
