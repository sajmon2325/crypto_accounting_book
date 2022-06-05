import express from 'express';
import {
    countAccountingRecords,
    createAccountingRecord,
    getAllAccountingRecords,
    getAccountingRecord,
    getAccountingRecordsByFilter,
    updateAccountingRecord,
    deleteAccountingRecord
} from '../controllers/accounting-record-controller';

const router = express.Router();

router.get('/count', countAccountingRecords);
router.post('/create', createAccountingRecord);
router.delete('/:recordId', deleteAccountingRecord);
router.get('/all', getAllAccountingRecords); 
router.get('/:recordId', getAccountingRecord);
router.post('/filter', getAccountingRecordsByFilter);
router.put('/:recordId', updateAccountingRecord);

export default router;