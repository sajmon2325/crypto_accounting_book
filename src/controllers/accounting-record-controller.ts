import { Request, Response } from 'express';
import logger from '../loggers/logger';
import { AccountingRecord, AccountingRecordAttributes } from '../model/accounting-record-model';
import { AccountingRecordRepository } from '../repository/accounting-record-repositoty';
import { AccrountingRecordFilterOptions } from '../repository/base-repository-operations';

const recordRepository = new AccountingRecordRepository();

export const countAccountingRecords = async (req: Request, res: Response) => {
    const allRecords = await recordRepository.countRecordsInCollection();
    if (!allRecords) {
        logger.error(`Failed to count all accounting records: ${allRecords}`);
        return res.status(500).json({ message: 'Error when counting accounting records' });
    }

    logger.info(`Number of all accounting records in db: ${allRecords}`);
    return res.status(200).json({ count: allRecords, message: 'Successfully feteched count of all accounting records' });
};

export const createAccountingRecord = async ( req: Request, res: Response ) => {
    const recordToCreate: AccountingRecordAttributes = req.body.accountingRecord; 

    const createdRecord: AccountingRecord = await recordRepository.createRecord(recordToCreate);
    if (!createdRecord) {
        logger.error('Failed to create new accounting record');
        return res.status(500).json({ message: 'Failed to create new accounting record' });
    }

    logger.info('Successfully created new accounting record');
    return res.status(200).json({ createdRecord: createdRecord, message: 'Successfully created new accounting record' });
};

export const getAccountingRecord = async ( req: Request, res: Response ) => {
    const accountingRecords: AccountingRecord[] = await recordRepository.findAllRecords();

    if (!accountingRecords) {
        logger.error('Failed to fetch all accounting records');
        return res.status(500).json({ message: 'Failed to fetch all accounting records' });
    }

    logger.info('Successfully fetched all accounting records');
    return res.status(200).json({ accountingRecords: accountingRecords, message: 'Successfully fetched all accounting records' });
};

export const getAccountingRecords = async ( req: Request, res: Response ) => {
    const recordId = req.body.recordId;

    const record: AccountingRecord = await recordRepository.findOneRecord(recordId);
    if (!record) {
        logger.error(`Failed to fetch accounting record with id: ${recordId}`);
        return res.status(500).json(`Failed to fetch accounting record with id: ${recordId}`);
    }

    logger.info(`Successfully fetched accounting record with id: ${record.id}`);
    return res.status(200).json({ accountingRecord: record, message: `Successfully fetched accounting record with id: ${record.id}` });
};

export const getAccountingRecordsByFilter = async ( req: Request, res: Response ) => {
    const filter: AccrountingRecordFilterOptions = req.body.filter;

    const accountingRecords: AccountingRecord[] = await recordRepository.findRecordsByFilter(filter);
    if (!accountingRecords) {
        logger.error('Failed to fetch accounting records by specified filter');
        return res.status(500).json({ message: 'Failed to fetch accounting records by specified filter' });
    }

    logger.info('Successfully fetched accounting record by specified filter');
    return res.status(200).json({ accountingRecords: accountingRecords, message: 'Successfully fetched accounting record by specified filter' });
};

export const updateAccountingRecord = async ( req: Request, res: Response ) => {
    const recordId = req.body.recordId;
    const update: AccountingRecord = req.body.record;

    const updatedRecord: AccountingRecord = await recordRepository.updateRecord(recordId, update);
    if (!updatedRecord) {
        logger.error('Failed to update accounting record');
        return res.status(500).json({ message: 'Failed to update accounting record' });
    }

    logger.info(`Successfully updated accounting record with id: ${updatedRecord.id}`);
    return res.status(200).json({ updatedRecord: updatedRecord, message: `Successfully updated accounting record with id: ${updatedRecord.id}` });
};

export const deleteAccountingRecord = async ( req: Request, res: Response ) => {
    const recordId = req.body.recordId;

    const deletedRecordId = await recordRepository.delete(recordId);
    if (!deletedRecordId) {
        logger.error(`Failed to delete accounting record with id: ${recordId}`);
        return res.status(500).json({ message: 'Failed to delete accounting record' });
    }

    logger.info(`Successfully deleted accounting record with id: ${deletedRecordId}`);
    return res.status(200).json({ recordId: deletedRecordId, message: 'Successfully deleted accounting record' });
};