import express from 'express';
import {getrelationships,deleterelationship,addrelationship} from '../controllers/relationship.js';

const router=express.Router();

router.get('/',getrelationships)
router.post('/',addrelationship)
router.delete('/',deleterelationship)


export default router;