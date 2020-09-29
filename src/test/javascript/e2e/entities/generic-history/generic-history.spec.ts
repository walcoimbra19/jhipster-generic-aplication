import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GenericHistoryComponentsPage, GenericHistoryDeleteDialog, GenericHistoryUpdatePage } from './generic-history.page-object';

const expect = chai.expect;

describe('GenericHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genericHistoryComponentsPage: GenericHistoryComponentsPage;
  let genericHistoryUpdatePage: GenericHistoryUpdatePage;
  let genericHistoryDeleteDialog: GenericHistoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GenericHistories', async () => {
    await navBarPage.goToEntity('generic-history');
    genericHistoryComponentsPage = new GenericHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(genericHistoryComponentsPage.title), 5000);
    expect(await genericHistoryComponentsPage.getTitle()).to.eq('jhipsterGenericAplicationApp.genericHistory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(genericHistoryComponentsPage.entities), ec.visibilityOf(genericHistoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GenericHistory page', async () => {
    await genericHistoryComponentsPage.clickOnCreateButton();
    genericHistoryUpdatePage = new GenericHistoryUpdatePage();
    expect(await genericHistoryUpdatePage.getPageTitle()).to.eq('jhipsterGenericAplicationApp.genericHistory.home.createOrEditLabel');
    await genericHistoryUpdatePage.cancel();
  });

  it('should create and save GenericHistories', async () => {
    const nbButtonsBeforeCreate = await genericHistoryComponentsPage.countDeleteButtons();

    await genericHistoryComponentsPage.clickOnCreateButton();

    await promise.all([
      genericHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      genericHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      genericHistoryUpdatePage.languageSelectLastOption(),
    ]);

    expect(await genericHistoryUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await genericHistoryUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );

    await genericHistoryUpdatePage.save();
    expect(await genericHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genericHistoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GenericHistory', async () => {
    const nbButtonsBeforeDelete = await genericHistoryComponentsPage.countDeleteButtons();
    await genericHistoryComponentsPage.clickOnLastDeleteButton();

    genericHistoryDeleteDialog = new GenericHistoryDeleteDialog();
    expect(await genericHistoryDeleteDialog.getDialogTitle()).to.eq('jhipsterGenericAplicationApp.genericHistory.delete.question');
    await genericHistoryDeleteDialog.clickOnConfirmButton();

    expect(await genericHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
