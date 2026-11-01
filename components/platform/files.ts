// Report attachments are kept in IndexedDB, in the same database the prototype always used.

let db: Promise<IDBDatabase> | null = null;

function fileDB() {
  db ??= new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(Error("Archivio file non disponibile."));
    const request = indexedDB.open("sg_platform_files_v1", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return db;
}

export async function putFile(key: string, file: File) {
  const store = await fileDB();
  return new Promise<void>((resolve, reject) => {
    const tx = store.transaction("files", "readwrite");
    tx.objectStore("files").put(file, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function fetchFile(key: string) {
  const store = await fileDB();
  return new Promise<Blob | undefined>((resolve, reject) => {
    const req = store.transaction("files", "readonly").objectStore("files").get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Downloads a stored attachment; resolves to false if this browser doesn't have it. */
export async function downloadFile(key: string, name: string) {
  try {
    const file = await fetchFile(key);
    if (!file) return false;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = name || "documento";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 8000);
    return true;
  } catch {
    return false;
  }
}
