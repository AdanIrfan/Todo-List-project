// index.js
import "./styles.css";
import { domController } from "./domController.js";
import { restoreProjects } from "./storage.js";

const dom = domController();
restoreProjects();
dom.initializeDom();
