import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  GenericManyToOneComponentsPage,
  GenericManyToOneDeleteDialog,
  GenericManyToOneUpdatePage,
} from './generic-many-to-one.page-object';

const expect = chai.expect;

describe('GenericManyToOne e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genericManyToOneComponentsPage: GenericManyToOneComponentsPage;
  let genericManyToOneUpdatePage: GenericManyToOneUpdatePage;
  let genericManyToOneDeleteDialog: GenericManyToOneDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GenericManyToOnes', async () => {
    await navBarPage.goToEntity('generic-many-to-one');
    genericManyToOneComponentsPage = new GenericManyToOneComponentsPage();
    await browser.wait(ec.visibilityOf(genericManyToOneComponentsPage.title), 5000);
    expect(await genericManyToOneComponentsPage.getTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToOne.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(genericManyToOneComponentsPage.entities), ec.visibilityOf(genericManyToOneComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GenericManyToOne page', async () => {
    await genericManyToOneComponentsPage.clickOnCreateButton();
    genericManyToOneUpdatePage = new GenericManyToOneUpdatePage();
    expect(await genericManyToOneUpdatePage.getPageTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToOne.home.createOrEditLabel');
    await genericManyToOneUpdatePage.cancel();
  });

  it('should create and save GenericManyToOnes', async () => {
    const nbButtonsBeforeCreate = await genericManyToOneComponentsPage.countDeleteButtons();

    await genericManyToOneComponentsPage.clickOnCreateButton();

    await promise.all([genericManyToOneUpdatePage.setFieldManyToOneInput('fieldManyToOne')]);

    expect(await genericManyToOneUpdatePage.getFieldManyToOneInput()).to.eq(
      'fieldManyToOne',
      'Expected FieldManyToOne value to be equals to fieldManyToOne'
    );

    await genericManyToOneUpdatePage.save();
    expect(await genericManyToOneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genericManyToOneComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GenericManyToOne', async () => {
    const nbButtonsBeforeDelete = await genericManyToOneComponentsPage.countDeleteButtons();
    await genericManyToOneComponentsPage.clickOnLastDeleteButton();

    genericManyToOneDeleteDialog = new GenericManyToOneDeleteDialog();
    expect(await genericManyToOneDeleteDialog.getDialogTitle()).to.eq('jhipsterGenericAplicationApp.genericManyToOne.delete.question');
    await genericManyToOneDeleteDialog.clickOnConfirmButton();

    expect(await genericManyToOneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
