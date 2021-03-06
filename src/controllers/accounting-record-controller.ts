import { Request, Response } from 'express';
import logger from '../loggers/logger';
import { AccountingRecord, AccountingRecordAttributes } from '../model/accounting-record-model';
import { AccountingRecordRepository } from '../repository/accounting-record-repositoty';
import { AccrountingRecordFilterOptions } from '../repository/base-repository-operations';

const recordRepository = new AccountingRecordRepository();

export const countAccountingRecords = async (req: Request, res: Response) => {
    const allRecords = await recordRepository.countRecordsInCollection();
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

export const getAllAccountingRecords = async ( req: Request, res: Response ) => {
    const accountingRecords: AccountingRecord[] = await recordRepository.findAllRecords();

    if (!accountingRecords) {
        logger.error('Failed to fetch all accounting records');
        return res.status(404).json({ message: 'Failed to fetch all accounting records' });
    }

    logger.info('Successfully fetched all accounting records');
    return res.status(200).json({ accountingRecords: accountingRecords, message: 'Successfully fetched all accounting records' });
};

export const getAccountingRecord = async ( req: Request, res: Response ) => {
    const recordId = req.params.recordId;

    const record: AccountingRecord = await recordRepository.findOneRecord(recordId);
    if (!record) {
        logger.error(`Failed to fetch accounting record with id: ${recordId}`);
        return res.status(404).json(`Failed to fetch accounting record with id: ${recordId}`);
    }
    
    if (Object.keys(record).length === 0) {
        logger.error(`Accounting record with recordId: ${recordId} was not found`);
        return res.status(404).json({ message: `Accounting Record with recordId: ${recordId} was not found` });
    }

    logger.info(`Successfully fetched accounting record with id: ${recordId}`);
    return res.status(200).json({ accountingRecord: record, message: `Successfully fetched accounting record with id: ${recordId}` });
};

export const getAccountingRecordsByFilter = async ( req: Request, res: Response ) => {
    const filter: AccrountingRecordFilterOptions = req.body.filter;
    logger.debug(`filter: ${JSON.stringify(filter)}`);

    const accountingRecords: AccountingRecord[] = await recordRepository.findRecordsByFilter(filter);
    logger.debug(`accountingRecords: ${JSON.stringify(accountingRecords)}`);
    if (!accountingRecords || accountingRecords.length === 0) {
        logger.error('No accounting records found with specified filter');
        return res.status(404).json({ message: 'No accounting records found with specified filter' });
    }

    logger.info('Successfully fetched accounting record by specified filter');
    return res.status(200).json({ accountingRecords: accountingRecords, message: 'Successfully fetched accounting record by specified filter' });
};

export const updateAccountingRecord = async ( req: Request, res: Response ) => {
    const recordId = req.params.recordId;
    const update: AccountingRecord = req.body.update;

    const updatedRecord: AccountingRecord = await recordRepository.updateRecord(recordId, update);
    if (!updatedRecord || Object.keys(updatedRecord).length === 0) {
        logger.error('Failed to update accounting record');
        return res.status(404).json({ message: 'Failed to update accounting record' });
    }

    logger.info(`Successfully updated accounting record with id: ${recordId}`);
    return res.status(200).json({ updatedRecord: updatedRecord, message: `Successfully updated accounting record with id: ${recordId}` });
};

export const deleteAccountingRecord = async ( req: Request, res: Response ) => {
    const recordId = req.params.recordId;

    const deletedRecordId = await recordRepository.delete(recordId);
    if (!deletedRecordId || deletedRecordId === null) {
        logger.error(`Failed to delete accounting record with id: ${recordId}`);
        return res.status(500).json({ message: 'Failed to delete accounting record' });
    }

    logger.info(`Successfully deleted accounting record with id: ${deletedRecordId}`);
    return res.status(200).json({ recordId: deletedRecordId, message: 'Successfully deleted accounting record' });
};