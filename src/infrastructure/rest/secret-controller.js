const express = require('express');
const SaveSecretCommand = require('../../application/save_secret/save-secret-command');
const FindSecretCommand = require('../../application/find_secret/find-secret-command');
const DeleteSecretCommand = require('../../application/delete_secret/delete-secret-command');
const container = require('../../container');

const router = express.Router();

router.post('/', async (req, res) => {
    const { secret: text } = req.body;
    
    try {
        const command = new SaveSecretCommand({ text });
        const saveSecret = container.resolve('saveSecret');
        const response = await saveSecret.save(command);
        res.status(200).json({ ...response });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { authorization: token } = req.headers;

    try {

        const command = new FindSecretCommand({ id, token });
        const findSecret = container.resolve('findSecret');
        const response = await findSecret.find(command);

        const deleteSecret = container.resolve('deleteSecret');
        await deleteSecret.delete({ id, token });

        res.status(200).json({ ...response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.toString() });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { authorization: token } = req.headers;

    try {
        const command = new DeleteSecretCommand({ id, token });
        const deleteSecret = container.resolve('deleteSecret');
        await deleteSecret.delete(command);

        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.toString() });
    }
});

module.exports = router;


