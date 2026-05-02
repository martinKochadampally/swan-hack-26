import express from "express";

import studentsRouter from "./students.routes";
import classesRouter from "./classes.routes";
import accommodationsRouter from "./accommodations.routes";
import professorStatusRouter from "./professorStatus.routes";

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/classes", classesRouter);
router.use("/accommodations", accommodationsRouter);
router.use("/professor-status", professorStatusRouter);

export default router;