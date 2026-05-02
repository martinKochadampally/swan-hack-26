import express from "express";

import studentsRouter from "./students.routes";
import classesRouter from "./classes.routes";
import accommodationsRouter from "./accommodations.routes";
import professorStatusRouter from "./professorStatus.routes";
import dbTestRouter from "./dbTest.routes";
const router = express.Router();

router.use("/students", studentsRouter);
router.use("/classes", classesRouter);
router.use("/accommodations", accommodationsRouter);
router.use("/professor-status", professorStatusRouter);
router.use("/db-test", dbTestRouter);

export default router;