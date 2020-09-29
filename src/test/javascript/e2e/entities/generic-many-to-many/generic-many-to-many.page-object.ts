import { element, by, ElementFinder } from 'protractor';

export class GenericManyToManyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-generic-many-to-many div table .btn-danger'));
  title = element.all(by.css('jhi-generic-many-to-many div h2#page-heading span')).first();
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

export class GenericManyToManyUpdatePage {
  pageTitle = element(by.id('jhi-generic-many-to-many-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fieldManyToManyInput = element(by.id('field_fieldManyToMany'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFieldManyToManyInput(fieldManyToMany: string): Promise<void> {
    await this.fieldManyToManyInput.sendKeys(fieldManyToMany);
  }

  async getFieldManyToManyInput(): Promise<string> {
    return await this.fieldManyToManyInput.getAttribute('value');
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

export class GenericManyToManyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-genericManyToMany-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-genericManyToMany'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
