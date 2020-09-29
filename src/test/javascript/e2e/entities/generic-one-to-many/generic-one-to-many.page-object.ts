import { element, by, ElementFinder } from 'protractor';

export class GenericOneToManyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-generic-one-to-many div table .btn-danger'));
  title = element.all(by.css('jhi-generic-one-to-many div h2#page-heading span')).first();
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

export class GenericOneToManyUpdatePage {
  pageTitle = element(by.id('jhi-generic-one-to-many-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fieldOneToManyInput = element(by.id('field_fieldOneToMany'));

  genericSelect = element(by.id('field_generic'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFieldOneToManyInput(fieldOneToMany: string): Promise<void> {
    await this.fieldOneToManyInput.sendKeys(fieldOneToMany);
  }

  async getFieldOneToManyInput(): Promise<string> {
    return await this.fieldOneToManyInput.getAttribute('value');
  }

  async genericSelectLastOption(): Promise<void> {
    await this.genericSelect.all(by.tagName('option')).last().click();
  }

  async genericSelectOption(option: string): Promise<void> {
    await this.genericSelect.sendKeys(option);
  }

  getGenericSelect(): ElementFinder {
    return this.genericSelect;
  }

  async getGenericSelectedOption(): Promise<string> {
    return await this.genericSelect.element(by.css('option:checked')).getText();
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

export class GenericOneToManyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-genericOneToMany-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-genericOneToMany'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
