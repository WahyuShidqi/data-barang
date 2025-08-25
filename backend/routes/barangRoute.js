import express from "express";
import {
  createBarang,
  deleteBarang,
  getAllbarang,
  getBarangById,
  updateBarang,
} from "../controllers/barangController.js";
const router = express.Router();

router.get("/barang", getAllbarang);
router.get("/barang/:id", getBarangById);
router.post("/barang", createBarang);
router.put("/barang/:id", updateBarang);
router.delete("/barang/:id", deleteBarang);

export default router;
