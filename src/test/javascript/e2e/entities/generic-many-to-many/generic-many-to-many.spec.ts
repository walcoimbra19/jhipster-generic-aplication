import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  GenericManyToManyComponentsPage,
  GenericManyToManyDeleteDialog,
  GenericManyToManyUpdatePage,
} from './generic-many-to-many.page-object';

const expect = chai.expect;

describe('GenericManyToMany e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genericManyToManyComponentsPage: GenericManyToManyComponentsPage;
  let genericManyToManyUpdatePage: GenericManyToManyUpdatePage;
  let genericManyToManyDeleteDialog: GenericManyToManyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GenericManyToManies', async () => {
    await navBarPage.goToEntity('generic-many-to-many');
    genericManyToManyComponentsPage = new GenericManyToManyComponentsPage();
    await browser.wait(ec.visibilityOf(genericManyToManyComponentsPage.title), 5000);
    expect(await genericManyToManyComponentsPage.getTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToMany.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(genericManyToManyComponentsPage.entities), ec.visibilityOf(genericManyToManyComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GenericManyToMany page', async () => {
    await genericManyToManyComponentsPage.clickOnCreateButton();
    genericManyToManyUpdatePage = new GenericManyToManyUpdatePage();
    expect(await genericManyToManyUpdatePage.getPageTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToMany.home.createOrEditLabel');
    await genericManyToManyUpdatePage.cancel();
  });

  it('should create and save GenericManyToManies', async () => {
    const nbButtonsBeforeCreate = await genericManyToManyComponentsPage.countDeleteButtons();

    await genericManyToManyComponentsPage.clickOnCreateButton();

    await promise.all([genericManyToManyUpdatePage.setFieldManyToManyInput('fieldManyToMany')]);

    expect(await genericManyToManyUpdatePage.getFieldManyToManyInput()).to.eq(
      'fieldManyToMany',
      'Expected FieldManyToMany value to be equals to fieldManyToMany'
    );

    await genericManyToManyUpdatePage.save();
    expect(await genericManyToManyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genericManyToManyComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GenericManyToMany', async () => {
    const nbButtonsBeforeDelete = await genericManyToManyComponentsPage.countDeleteButtons();
    await genericManyToManyComponentsPage.clickOnLastDeleteButton();

    genericManyToManyDeleteDialog = new GenericManyToManyDeleteDialog();
    expect(await genericManyToManyDeleteDialog.getDialogTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToMany.delete.question');
    await genericManyToManyDeleteDialog.clickOnConfirmButton();

    expect(await genericManyToManyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
