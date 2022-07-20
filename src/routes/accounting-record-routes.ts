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
import { reqAccountingRecordIdValidation } from '../validation/accounting-record-id-validation';
import { idSchemaValidation } from '../validation/schemas/id-schema';
import { accountingRecordFilterSchemaValidation } from '../validation/schemas/accounting-record-filter-schema';
import { reqAccountingRecordFilterValidation } from '../validation/accounting-record-filter-validation';
import { reqAccountingRecordUpdateValidation } from '../validation/accounting-record-update-validation';

const router = express.Router();

router.get('/count', countAccountingRecords);
router.post('/create', reqAccountingRecordValidation(accountingRecordSchemaValidation), createAccountingRecord);
router.delete('/:recordId', reqAccountingRecordIdValidation(idSchemaValidation), deleteAccountingRecord);
router.get('/all', getAllAccountingRecords); 
router.get('/:recordId', reqAccountingRecordIdValidation(idSchemaValidation), getAccountingRecord);
router.post('/filter', reqAccountingRecordFilterValidation(accountingRecordFilterSchemaValidation), getAccountingRecordsByFilter);
router.put('/:recordId', reqAccountingRecordIdValidation(idSchemaValidation), reqAccountingRecordUpdateValidation(accountingRecordSchemaValidation), updateAccountingRecord);

export default router;