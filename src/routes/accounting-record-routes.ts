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
import { reqAccountingRecordValidation } from '../validation/accounting-record-validation';
import { accountingRecordSchemaValidation } from '../validation/schemas/accounting-record-schema';

const router = express.Router();

router.get('/count', countAccountingRecords);
router.post('/create', reqAccountingRecordValidation(accountingRecordSchemaValidation), createAccountingRecord);
router.delete('/:recordId', deleteAccountingRecord);
router.get('/all', getAllAccountingRecords); 
router.get('/:recordId', getAccountingRecord);
router.post('/filter', getAccountingRecordsByFilter);
router.put('/:recordId', reqAccountingRecordValidation(accountingRecordSchemaValidation), updateAccountingRecord);

export default router;