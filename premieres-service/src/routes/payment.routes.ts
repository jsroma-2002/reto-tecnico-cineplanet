import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Simular pago con PayU
 *     description: Recibe datos de tarjeta y monto, retorna una transacción simulada aprobada
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardNumber
 *               - cvv
 *               - expiration
 *               - amount
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 example: "4111111111111111"
 *               cvv:
 *                 type: string
 *                 example: "123"
 *               expiration:
 *                 type: string
 *                 example: "12/28"
 *               amount:
 *                 type: number
 *                 example: 42
 *     responses:
 *       200:
 *         description: Transacción aprobada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionId:
 *                   type: string
 *                 operationDate:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Datos de pago inválidos
 */
router.post("/payments", (req: Request, res: Response) => {
  const { cardNumber, cvv, expiration, amount } = req.body;

  if (!cardNumber || !cvv || !expiration || amount == null) {
    res.status(400).json({ error: "Missing required payment fields" });
    return;
  }

  // Simular respuesta de PayU
  const transactionId = `PAYU-${Date.now()}`;
  const operationDate = new Date().toISOString().replace("Z", "");

  res.json({
    transactionId,
    operationDate,
    status: "APPROVED",
  });
});

export default router;
