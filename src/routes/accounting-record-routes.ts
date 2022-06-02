import express from 'express';
import {
    countAccountingRecords,
    createAccountingRecord,
    getAccountingRecord,
    getAccountingRecords,
    getAccountingRecordsByFilter,
    updateAccountingRecord,
    deleteAccountingRecord
} from '../controllers/accounting-record-controller';

const router = express.Router();

router.get('/count', countAccountingRecords);
router.post('/create', createAccountingRecord);
router.delete('/:id', deleteAccountingRecord);
router.get('/all', getAccountingRecords);
router.get('/:id', getAccountingRecord);
router.get('/filter', getAccountingRecordsByFilter);
router.put('/:id', updateAccountingRecord);

export default router;