import { PrismaClient } from "@prisma/client";
import { response } from "express";

const prisma = new PrismaClient();

export const getAllbarang = async (req, res) => {
  try {
    const response = await prisma.databarang.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBarangById = async (req, res) => {
  try {
    const response = await prisma.databarang.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBarang = async (req, res) => {
  const { id, nama, harga, stok } = req.body;
  try {
    const response = await prisma.databarang.create({
      data: {
        id,
        nama,
        harga,
        stok,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBarang = async (req, res) => {
  const { id, nama, harga, stok } = req.body;
  try {
    const response = await prisma.databarang.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        id,
        nama,
        harga,
        stok,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBarang = async (req, res) => {
  try {
    const response = await prisma.databarang.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
