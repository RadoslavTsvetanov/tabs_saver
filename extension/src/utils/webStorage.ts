
 class ChromeStorage {
  static async get_value(key: string) {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }

   static async set_value<V>(key: string, value: V) {
      await chrome.storage.local.set({ [key]: value })
  }

}



export class UserStorage{
    static async  get_username() {
        const res = await ChromeStorage.get_value("username")
        return res;
    }

    static async set_username(username: string) {
        const res = await ChromeStorage.set_value("username", username)
        console.log(res)
    }
}