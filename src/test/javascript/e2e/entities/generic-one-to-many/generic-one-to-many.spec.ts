import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  GenericOneToManyComponentsPage,
  GenericOneToManyDeleteDialog,
  GenericOneToManyUpdatePage,
} from './generic-one-to-many.page-object';

const expect = chai.expect;

describe('GenericOneToMany e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genericOneToManyComponentsPage: GenericOneToManyComponentsPage;
  let genericOneToManyUpdatePage: GenericOneToManyUpdatePage;
  let genericOneToManyDeleteDialog: GenericOneToManyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GenericOneToManies', async () => {
    await navBarPage.goToEntity('generic-one-to-many');
    genericOneToManyComponentsPage = new GenericOneToManyComponentsPage();
    await browser.wait(ec.visibilityOf(genericOneToManyComponentsPage.title), 5000);
    expect(await genericOneToManyComponentsPage.getTitle()).to.eq('jhipsterGenericAplicationApp.genericOneToMany.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(genericOneToManyComponentsPage.entities), ec.visibilityOf(genericOneToManyComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GenericOneToMany page', async () => {
    await genericOneToManyComponentsPage.clickOnCreateButton();
    genericOneToManyUpdatePage = new GenericOneToManyUpdatePage();
    expect(await genericOneToManyUpdatePage.getPageTitle()).to.eq('jhipsterGenericAplicationApp.genericOneToMany.home.createOrEditLabel');
    await genericOneToManyUpdatePage.cancel();
  });

  it('should create and save GenericOneToManies', async () => {
    const nbButtonsBeforeCreate = await genericOneToManyComponentsPage.countDeleteButtons();

    await genericOneToManyComponentsPage.clickOnCreateButton();

    await promise.all([
      genericOneToManyUpdatePage.setFieldOneToManyInput('fieldOneToMany'),
      genericOneToManyUpdatePage.genericManyToOneSelectLastOption(),
    ]);

    expect(await genericOneToManyUpdatePage.getFieldOneToManyInput()).to.eq(
      'fieldOneToMany',
      'Expected FieldOneToMany value to be equals to fieldOneToMany'
    );

    await genericOneToManyUpdatePage.save();
    expect(await genericOneToManyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genericOneToManyComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GenericOneToMany', async () => {
    const nbButtonsBeforeDelete = await genericOneToManyComponentsPage.countDeleteButtons();
    await genericOneToManyComponentsPage.clickOnLastDeleteButton();

    genericOneToManyDeleteDialog = new GenericOneToManyDeleteDialog();
    expect(await genericOneToManyDeleteDialog.getDialogTitle()).to.eq('jhipsterGenericAplicationApp.genericOneToMany.delete.question');
    await genericOneToManyDeleteDialog.clickOnConfirmButton();

    expect(await genericOneToManyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
