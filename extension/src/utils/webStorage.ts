
 class ChromeStorage {
  static async get_value(key: string) {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }

   static async set_value<V>(key: string, value: V) {
      await chrome.storage.local.set({ [key]: value })
  }

}

type StorageFunctions<V ,T extends Record<string, V | undefined>> = {
  [K in keyof T]: {
    get: () => Promise<T[K]>;
    set: (value: T[K]) => Promise<void>;
  };
};

function StorageBuilder<V,T extends Record<string, V>>(
  schema: T
): StorageFunctions<V,T> {
  const storageFunctions = {} as StorageFunctions<V,T>;

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      storageFunctions[key] = {
        get: async () => await ChromeStorage.get_value(key),
        set: async (value: T[keyof T]) =>
          await ChromeStorage.set_value<T[keyof T]>(key, value),
      };
    }
  }

  return storageFunctions;
}

// Helper function to infer the type of schema


/**
 * 
 * @param {schema} schema - this is how your storage would look like (the vars) in it {username:""}
 * @returns
 */
function createStorage<S extends Record<string, string>>(schema: S) {
  return StorageBuilder(schema);
}

export const storageFunctions = createStorage({
  username: "",
  current_session: "",
});




storageFunctions.current_session.get()