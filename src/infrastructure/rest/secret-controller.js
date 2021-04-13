const express = require('express');
const SaveSecretCommand = require('../../application/save_secret/save-secret-command');
const FindSecretCommand = require('../../application/find_secret/find-secret-command');
const DeleteSecretCommand = require('../../application/delete_secret/delete-secret-command');
const container = require('../../container')

const isTokenPresent = require('./middleware/token-is-present');

const router = express.Router();

router.post('/', async (req, res) => {
    const { secret: text } = req.body
    try {
        const command = new SaveSecretCommand({ text })
        const saveSecret = container.resolve('saveSecret');
        const response = await saveSecret.save(command)

        res.status(200).json({...response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()})
    }
})

router.get('/:id/:secretKey', async (req,res) => {
    const { id, secretKey } = req.params;
  
    try {
        const command = new FindSecretCommand({id,secretKey})
        const findSecret =  container.resolve('findSecret');
        const response = await findSecret.find(command);

        res.status(200).json({...response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()})        
    }
})

router.delete('/:id', isTokenPresent,  async (req,res) => {
    const { id } = req.params;
    const { token } = req

    try {
        const commandDelete = new DeleteSecretCommand({id,token})
        const deleteSecret =  container.resolve('deleteSecret');
        await deleteSecret.delete(commandDelete)

        res.status(204).json({})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()})        
    }
})

module.exports = router;

