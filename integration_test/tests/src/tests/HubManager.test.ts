import { waitForReact } from 'testcafe-react-selectors';
import { config } from '../config';
import { LandingMenu } from '../page-objects/components/LandingMenu';
import { HubManagerPage, DFSPRow } from '../page-objects/pages/HubManager';
import chance from 'chance';
import { Selector } from 'testcafe';

fixture `Hub Management Feature`
  .page`${config.connectionManagerEndpoint}`
  .beforeEach(async (t) => {
    await waitForReact();
    await t
      .click(LandingMenu.hubButton).wait(1000);
  });

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Able to add DFSP in DFSP Administration sub menu', async (t) => {
  // Navigate to Add DFSP feature
  await t.click(HubManagerPage.hubPageAdministrationDfspSubMenuButton).wait(1000);
  await t.click(HubManagerPage.hubPageAdministrationDfspSubMenuAddDfspButton).wait(1000);

  const randomDfspName = chance().company();
  await t.typeText(HubManagerPage.getAddDfspModalNameField, randomDfspName)
  // The UI automatically types out the ID when entering the name
  await t.click(HubManagerPage.getAddDfspModalMonetaryZoneField)
        .wait(1000)
        .click(Selector('.input-select__options-item__label').withText('Euro'))
  // Submit DFSP
  await t.click(HubManagerPage.getAddDfspModalSubmit).wait(2000);

  // Check DFSP exists in data list
  const rows = await HubManagerPage.getDFSPRows();
  const dfspExists = await Promise.all(rows.map((r: DFSPRow) => r.id.innerText));
  await t.expect(dfspExists).contains(randomDfspName);
});
