import Video from "../interfaces/video";
import fs from "fs";
import path from "path";
import config from "../config";
import utils from "./utils";
import mime from "mime";

class Node {
  value: Video;
  next: Node | null;

  constructor(value: Video) {
    this.value = value;
    this.next = null;
  }
}

class VideoQueueManager {
  static instance: VideoQueueManager;
  front: Node | null;
  rear: Node | null;
  length: number;

  private constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
    this.fillListFromInputFolder();
  }

  static getInstance() {
    if (!VideoQueueManager.instance) {
      VideoQueueManager.instance = new VideoQueueManager();
    }

    return VideoQueueManager.instance;
  }

  // Add an element to the end of the queue
  enqueue(value: Video) {
    const newNode = new Node(value);
    if (!this.rear) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.length++;
  }

  // Remove an element from the front of the queue
  dequeue(): Video | string {
    if (!this.front) {
      return "Queue is empty";
    }
    const value = this.front.value;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.length--;
    return value;
  }

  remove(video: Video): boolean {
    if (!this.front) {
      return false; // Queue is empty
    }

    // If the node to be removed is the front node
    if (this.front.value === video) {
      this.dequeue();
      return true;
    }

    let current: Node | null = this.front;
    let previous: Node | null = null;

    while (current && current.value !== video) {
      previous = current;
      current = current.next;
    }

    if (current) {
      if (previous) {
        previous.next = current.next;
      }
      if (current === this.rear) {
        this.rear = previous;
      }
      this.length--;
      return true; // Video found and removed
    }

    return false; // Video not found
  }

  // View the front element of the queue
  peek(): Video | string {
    if (!this.front) {
      return "Queue is empty";
    }
    return this.front.value;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.length;
  }

  // Clear the queue
  clear() {
    this.front = this.rear = null;
    this.length = 0;
  }

  // Method to get a list of elements in the queue
  getList(): Video[] {
    let current = this.front;
    const list: Video[] = [];
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }

  fillListFromInputFolder() {
    try {
      const { video } = config;
      const files = fs.readdirSync(
        `${utils.getAbsulutePathForProject()}/${video.inputAbsolutePath}`
      );
      const filesWithMimeTypes = files.map((file) => {
        const filePath = path.join(video.inputAbsolutePath, file);
        const mimeType = mime.getType(filePath) ?? "";
        return { name: file, mimeType };
      });

      if (filesWithMimeTypes.length > 0) {
        filesWithMimeTypes.forEach((item: Video) => this.enqueue(item));
      }
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }
}

export default VideoQueueManager;
