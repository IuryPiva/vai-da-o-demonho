#!/usr/bin/env node
// @ts-check
import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import process from "process";

const currentDir = path.parse(import.meta.url.replace("file://", "")).dir;
const audioPath = path.join(currentDir, "./vai-da-o-demonho");

const callback = error => error && console.log(error);

export default function play() {
  switch (process.platform) {
    case "linux":
      exec(`paplay ${audioPath}.ogg`, callback);
      break;
    case "win32":
      exec(
        `${path.join(currentDir, "./forWindows.vbs")} ${audioPath}.mp3`,
        callback,
      );
      break;
    case "darwin":
      exec(`afplay ${audioPath}.mp3`, callback);
      break;
    default:
      console.log("VAI DA O DEMONHÔOOOO PA PA PARARARA PAPAPAPA");
      break;
  }
}

function stripExt(name) {
  const extension = path.extname(name);
  if (!extension) {
    return name;
  }

  return name.slice(0, -extension.length);
}

function isMain(meta) {
  const modulePath = fileURLToPath(meta.url);

  const scriptPath = process.argv[1];
  const extension = path.extname(scriptPath);
  if (extension) {
    return modulePath === scriptPath;
  }

  return stripExt(modulePath) === scriptPath;
}

if (isMain(import.meta)) play();
