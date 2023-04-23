import { test, expect } from '@playwright/test';
import { readPdf } from '../utils/pdf';
import * as dotenv from 'dotenv';
dotenv.config();

const PDF_PATH = process.env.PDF_PATH;

test.describe('PDF', () => {
  test('read PDF', async () => {
    await readPdf(PDF_PATH).then(function (data) {
      expect(typeof data).toEqual('string');
      expect(data.length).toBeGreaterThan(0);
    });
  });
});
