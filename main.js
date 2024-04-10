class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null);
    this.size = 0;
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];

    if (!currentNode) {
      this.buckets[index] = new Node(key, value);
      this.size++;
      this.checkCapacity();
      return;
    }

    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
      if (!currentNode.next) break;
      currentNode = currentNode.next;
    }

    currentNode.next = new Node(key, value);
    this.size++;
    this.checkCapacity();
  }

  get(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let currentNode = this.buckets[index];
    let prevNode = null;

    while (currentNode) {
      if (currentNode.key === key) {
        if (prevNode) {
          prevNode.next = currentNode.next;
        } else {
          this.buckets[index] = currentNode.next;
        }
        this.size--;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        keysArray.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        valuesArray.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        entriesArray.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.next;
      }
    }
    return entriesArray;
  }

  checkCapacity() {
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null);

    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        const newIndex = this.hash(currentNode.key);
        if (!newBuckets[newIndex]) {
          newBuckets[newIndex] = new Node(currentNode.key, currentNode.value);
        } else {
          let newCurrentNode = newBuckets[newIndex];
          while (newCurrentNode.next) {
            newCurrentNode = newCurrentNode.next;
          }
          newCurrentNode.next = new Node(currentNode.key, currentNode.value);
        }
        currentNode = currentNode.next;
      }
    }

    this.buckets = newBuckets;
    this.capacity = newCapacity;
  }
}

const hashMap = new HashMap();

hashMap.set("name", "John");
hashMap.set("age", 30);
hashMap.set("city", "New York");

console.log(hashMap.get("name"));
console.log(hashMap.get("age"));

console.log(hashMap.has("name"));
console.log(hashMap.has("occupation"));

console.log(hashMap.remove("city"));

console.log(hashMap.length());

console.log(hashMap.keys());

console.log(hashMap.values());

console.log(hashMap.entries());
