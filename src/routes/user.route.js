import { Router } from "express";
import {registerUser, test} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registerUser
);
// user.route.js mein ise change karo:
// router.post("/register", registerUser); // Bina upload middleware ke
// router.get("/test", (req, res) => {
//   res.send("route working");
// });

// router.post("/register", (req, res) => {
//   res.send("direct route works");
// });
export default router;

