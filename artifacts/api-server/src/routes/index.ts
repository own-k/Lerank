import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import consultantsRouter from "./consultants.js";
import applicationsRouter from "./applications.js";
import milestonesRouter from "./milestones.js";
import dashboardRouter from "./dashboard.js";
import transactionsRouter from "./transactions.js";
import adminRouter from "./admin.js";
import companyRouter from "./company.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/consultants", consultantsRouter);
router.use("/applications", applicationsRouter);
router.use("/milestones", milestonesRouter);
router.use("/applications", milestonesRouter);
router.use("/dashboard", dashboardRouter);
router.use("/transactions", transactionsRouter);
router.use("/admin", adminRouter);
router.use("/company", companyRouter);

export default router;
