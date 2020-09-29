import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GenericComponentsPage, GenericDeleteDialog, GenericUpdatePage } from './generic.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Generic e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genericComponentsPage: GenericComponentsPage;
  let genericUpdatePage: GenericUpdatePage;
  let genericDeleteDialog: GenericDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Generics', async () => {
    await navBarPage.goToEntity('generic');
    genericComponentsPage = new GenericComponentsPage();
    await browser.wait(ec.visibilityOf(genericComponentsPage.title), 5000);
    expect(await genericComponentsPage.getTitle()).to.eq('jhipsterGenericAplicationApp.generic.home.title');
    await browser.wait(ec.or(ec.visibilityOf(genericComponentsPage.entities), ec.visibilityOf(genericComponentsPage.noResult)), 1000);
  });

  it('should load create Generic page', async () => {
    await genericComponentsPage.clickOnCreateButton();
    genericUpdatePage = new GenericUpdatePage();
    expect(await genericUpdatePage.getPageTitle()).to.eq('jhipsterGenericAplicationApp.generic.home.createOrEditLabel');
    await genericUpdatePage.cancel();
  });

  it('should create and save Generics', async () => {
    const nbButtonsBeforeCreate = await genericComponentsPage.countDeleteButtons();

    await genericComponentsPage.clickOnCreateButton();

    await promise.all([
      genericUpdatePage.setFieldStringInput('fieldString'),
      genericUpdatePage.setFieldIntegerInput('5'),
      genericUpdatePage.setFieldLongInput('5'),
      genericUpdatePage.setFieldBigDecimalInput('5'),
      genericUpdatePage.setFieldFloatInput('5'),
      genericUpdatePage.setFieldDoubleInput('5'),
      genericUpdatePage.setFieldLocalDateInput('2000-12-31'),
      genericUpdatePage.setFieldZonedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      genericUpdatePage.setFieldDurationInput('PT12S'),
      genericUpdatePage.setFieldUUIDInput('64c99148-3908-465d-8c4a-e510e3ade974'),
      genericUpdatePage.setFieldBlobInput(absolutePath),
      genericUpdatePage.setFieldAnyBlobInput(absolutePath),
      genericUpdatePage.setFieldImageBlobInput(absolutePath),
      genericUpdatePage.setFieldTextBlobInput('fieldTextBlob'),
      genericUpdatePage.genericHistorySelectLastOption(),
      genericUpdatePage.genericManyToOneSelectLastOption(),
      // genericUpdatePage.genericManyToManySelectLastOption(),
    ]);

    expect(await genericUpdatePage.getFieldStringInput()).to.eq('fieldString', 'Expected FieldString value to be equals to fieldString');
    expect(await genericUpdatePage.getFieldIntegerInput()).to.eq('5', 'Expected fieldInteger value to be equals to 5');
    expect(await genericUpdatePage.getFieldLongInput()).to.eq('5', 'Expected fieldLong value to be equals to 5');
    expect(await genericUpdatePage.getFieldBigDecimalInput()).to.eq('5', 'Expected fieldBigDecimal value to be equals to 5');
    expect(await genericUpdatePage.getFieldFloatInput()).to.eq('5', 'Expected fieldFloat value to be equals to 5');
    expect(await genericUpdatePage.getFieldDoubleInput()).to.eq('5', 'Expected fieldDouble value to be equals to 5');
    const selectedFieldBoolean = genericUpdatePage.getFieldBooleanInput();
    if (await selectedFieldBoolean.isSelected()) {
      await genericUpdatePage.getFieldBooleanInput().click();
      expect(await genericUpdatePage.getFieldBooleanInput().isSelected(), 'Expected fieldBoolean not to be selected').to.be.false;
    } else {
      await genericUpdatePage.getFieldBooleanInput().click();
      expect(await genericUpdatePage.getFieldBooleanInput().isSelected(), 'Expected fieldBoolean to be selected').to.be.true;
    }
    expect(await genericUpdatePage.getFieldLocalDateInput()).to.eq(
      '2000-12-31',
      'Expected fieldLocalDate value to be equals to 2000-12-31'
    );
    expect(await genericUpdatePage.getFieldZonedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fieldZonedDateTime value to be equals to 2000-12-31'
    );
    expect(await genericUpdatePage.getFieldDurationInput()).to.contain('12', 'Expected fieldDuration value to be equals to 12');
    expect(await genericUpdatePage.getFieldUUIDInput()).to.eq(
      '64c99148-3908-465d-8c4a-e510e3ade974',
      'Expected FieldUUID value to be equals to 64c99148-3908-465d-8c4a-e510e3ade974'
    );
    expect(await genericUpdatePage.getFieldBlobInput()).to.endsWith(
      fileNameToUpload,
      'Expected FieldBlob value to be end with ' + fileNameToUpload
    );
    expect(await genericUpdatePage.getFieldAnyBlobInput()).to.endsWith(
      fileNameToUpload,
      'Expected FieldAnyBlob value to be end with ' + fileNameToUpload
    );
    expect(await genericUpdatePage.getFieldImageBlobInput()).to.endsWith(
      fileNameToUpload,
      'Expected FieldImageBlob value to be end with ' + fileNameToUpload
    );
    expect(await genericUpdatePage.getFieldTextBlobInput()).to.eq(
      'fieldTextBlob',
      'Expected FieldTextBlob value to be equals to fieldTextBlob'
    );

    await genericUpdatePage.save();
    expect(await genericUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genericComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Generic', async () => {
    const nbButtonsBeforeDelete = await genericComponentsPage.countDeleteButtons();
    await genericComponentsPage.clickOnLastDeleteButton();

    genericDeleteDialog = new GenericDeleteDialog();
    expect(await genericDeleteDialog.getDialogTitle()).to.eq('jhipsterGenericAplicationApp.generic.delete.question');
    await genericDeleteDialog.clickOnConfirmButton();

    expect(await genericComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
