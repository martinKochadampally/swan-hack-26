import express from "express";
import { supabase } from "../db/supabase";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .limit(5);

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.json({
    message: "Database connected",
    data,
  });
});

router.post("/student", async (req, res) => {
  const { clerk_user_id, name, email } = req.body;

  const { data, error } = await supabase
    .from("students")
    .insert({
      clerk_user_id,
      name,
      email,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.status(201).json({
    message: "Student inserted",
    data,
  });
});
export default router;