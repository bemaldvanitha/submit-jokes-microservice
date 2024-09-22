const express = require("express");

const { submitJoke, deleteModeratedJoke, getNonModeratedJoke, changeStatus } =
    require("../controllers/jokesController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /joke:
 *   post:
 *     summary: Submit a new joke
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               joke:
 *                 type: string
 *                 example: "A funny joke"
 *               type:
 *                 type: string
 *                 example: "general"
 *     responses:
 *       201:
 *         description: Successfully submitted a new joke
 *       400:
 *         description: Bad request
 */
router.post('/', submitJoke);

/**
 * @swagger
 * /joke/{id}:
 *   delete:
 *     summary: Delete a moderated joke
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the joke to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the joke
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Joke not found
 */
router.delete('/:id', authMiddleware, deleteModeratedJoke);

/**
 * @swagger
 * /joke/non-moderated:
 *   get:
 *     summary: Get a non-moderated joke
 *     responses:
 *       200:
 *         description: Successfully retrieved a non-moderated joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: object
 *                   properties:
 *                     joke:
 *                       type: string
 *                       example: "Why do data analysts make terrible comedians? Their jokes always fall flat—too much correlation, not enough causation!"
 *                     type:
 *                       type: string
 *                       example: "dad jokes"
 *                     status:
 *                       type: string
 *                       example: "Accepted"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-21T02:44:27.375Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-21T02:50:20.123Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: No pending jokes found
 *       500:
 *         description: Server error
 */
router.get('/non-moderated', authMiddleware, getNonModeratedJoke);

/**
 * @swagger
 * /joke/{id}:
 *   patch:
 *     summary: Change the moderation status of a joke
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the joke to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Moderated"
 *     responses:
 *       200:
 *         description: Successfully changed the status of the joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: object
 *                   properties:
 *                     joke:
 *                       type: string
 *                       example: "Why do data analysts make terrible comedians? Their jokes always fall flat—too much correlation, not enough causation!"
 *                     type:
 *                       type: string
 *                       example: "dad jokes"
 *                     status:
 *                       type: string
 *                       example: "Moderated"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-21T02:44:27.375Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-21T02:50:20.123Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Bad request
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', authMiddleware, changeStatus);

module.exports = router;