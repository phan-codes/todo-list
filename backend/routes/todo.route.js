import { Router } from "express";
import { createTodo, deleteTodo, todoIndex, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", todoIndex);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
