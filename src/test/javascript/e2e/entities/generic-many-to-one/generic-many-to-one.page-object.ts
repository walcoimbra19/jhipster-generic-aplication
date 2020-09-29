import { element, by, ElementFinder } from 'protractor';

export class GenericManyToOneComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-generic-many-to-one div table .btn-danger'));
  title = element.all(by.css('jhi-generic-many-to-one div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class GenericManyToOneUpdatePage {
  pageTitle = element(by.id('jhi-generic-many-to-one-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fieldManyToOneInput = element(by.id('field_fieldManyToOne'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFieldManyToOneInput(fieldManyToOne: string): Promise<void> {
    await this.fieldManyToOneInput.sendKeys(fieldManyToOne);
  }

  async getFieldManyToOneInput(): Promise<string> {
    return await this.fieldManyToOneInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class GenericManyToOneDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-genericManyToOne-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-genericManyToOne'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
