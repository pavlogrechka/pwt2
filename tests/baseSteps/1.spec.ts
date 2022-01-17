import { test } from '@playwright/test';
import {authPWA} from './authPWA.spec.ts'

test('authPWA2', async () => {

  await authPWA()

})
