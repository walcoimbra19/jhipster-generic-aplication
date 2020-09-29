import { element, by, ElementFinder } from 'protractor';

export class GenericComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-generic div table .btn-danger'));
  title = element.all(by.css('jhi-generic div h2#page-heading span')).first();
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

export class GenericUpdatePage {
  pageTitle = element(by.id('jhi-generic-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fieldStringInput = element(by.id('field_fieldString'));
  fieldIntegerInput = element(by.id('field_fieldInteger'));
  fieldLongInput = element(by.id('field_fieldLong'));
  fieldBigDecimalInput = element(by.id('field_fieldBigDecimal'));
  fieldFloatInput = element(by.id('field_fieldFloat'));
  fieldDoubleInput = element(by.id('field_fieldDouble'));
  fieldBooleanInput = element(by.id('field_fieldBoolean'));
  fieldLocalDateInput = element(by.id('field_fieldLocalDate'));
  fieldZonedDateTimeInput = element(by.id('field_fieldZonedDateTime'));
  fieldDurationInput = element(by.id('field_fieldDuration'));
  fieldUUIDInput = element(by.id('field_fieldUUID'));
  fieldBlobInput = element(by.id('file_fieldBlob'));
  fieldAnyBlobInput = element(by.id('file_fieldAnyBlob'));
  fieldImageBlobInput = element(by.id('file_fieldImageBlob'));
  fieldTextBlobInput = element(by.id('field_fieldTextBlob'));

  genericHistorySelect = element(by.id('field_genericHistory'));
  genericManyToOneSelect = element(by.id('field_genericManyToOne'));
  genericManyToManySelect = element(by.id('field_genericManyToMany'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFieldStringInput(fieldString: string): Promise<void> {
    await this.fieldStringInput.sendKeys(fieldString);
  }

  async getFieldStringInput(): Promise<string> {
    return await this.fieldStringInput.getAttribute('value');
  }

  async setFieldIntegerInput(fieldInteger: string): Promise<void> {
    await this.fieldIntegerInput.sendKeys(fieldInteger);
  }

  async getFieldIntegerInput(): Promise<string> {
    return await this.fieldIntegerInput.getAttribute('value');
  }

  async setFieldLongInput(fieldLong: string): Promise<void> {
    await this.fieldLongInput.sendKeys(fieldLong);
  }

  async getFieldLongInput(): Promise<string> {
    return await this.fieldLongInput.getAttribute('value');
  }

  async setFieldBigDecimalInput(fieldBigDecimal: string): Promise<void> {
    await this.fieldBigDecimalInput.sendKeys(fieldBigDecimal);
  }

  async getFieldBigDecimalInput(): Promise<string> {
    return await this.fieldBigDecimalInput.getAttribute('value');
  }

  async setFieldFloatInput(fieldFloat: string): Promise<void> {
    await this.fieldFloatInput.sendKeys(fieldFloat);
  }

  async getFieldFloatInput(): Promise<string> {
    return await this.fieldFloatInput.getAttribute('value');
  }

  async setFieldDoubleInput(fieldDouble: string): Promise<void> {
    await this.fieldDoubleInput.sendKeys(fieldDouble);
  }

  async getFieldDoubleInput(): Promise<string> {
    return await this.fieldDoubleInput.getAttribute('value');
  }

  getFieldBooleanInput(): ElementFinder {
    return this.fieldBooleanInput;
  }

  async setFieldLocalDateInput(fieldLocalDate: string): Promise<void> {
    await this.fieldLocalDateInput.sendKeys(fieldLocalDate);
  }

  async getFieldLocalDateInput(): Promise<string> {
    return await this.fieldLocalDateInput.getAttribute('value');
  }

  async setFieldZonedDateTimeInput(fieldZonedDateTime: string): Promise<void> {
    await this.fieldZonedDateTimeInput.sendKeys(fieldZonedDateTime);
  }

  async getFieldZonedDateTimeInput(): Promise<string> {
    return await this.fieldZonedDateTimeInput.getAttribute('value');
  }

  async setFieldDurationInput(fieldDuration: string): Promise<void> {
    await this.fieldDurationInput.sendKeys(fieldDuration);
  }

  async getFieldDurationInput(): Promise<string> {
    return await this.fieldDurationInput.getAttribute('value');
  }

  async setFieldUUIDInput(fieldUUID: string): Promise<void> {
    await this.fieldUUIDInput.sendKeys(fieldUUID);
  }

  async getFieldUUIDInput(): Promise<string> {
    return await this.fieldUUIDInput.getAttribute('value');
  }

  async setFieldBlobInput(fieldBlob: string): Promise<void> {
    await this.fieldBlobInput.sendKeys(fieldBlob);
  }

  async getFieldBlobInput(): Promise<string> {
    return await this.fieldBlobInput.getAttribute('value');
  }

  async setFieldAnyBlobInput(fieldAnyBlob: string): Promise<void> {
    await this.fieldAnyBlobInput.sendKeys(fieldAnyBlob);
  }

  async getFieldAnyBlobInput(): Promise<string> {
    return await this.fieldAnyBlobInput.getAttribute('value');
  }

  async setFieldImageBlobInput(fieldImageBlob: string): Promise<void> {
    await this.fieldImageBlobInput.sendKeys(fieldImageBlob);
  }

  async getFieldImageBlobInput(): Promise<string> {
    return await this.fieldImageBlobInput.getAttribute('value');
  }

  async setFieldTextBlobInput(fieldTextBlob: string): Promise<void> {
    await this.fieldTextBlobInput.sendKeys(fieldTextBlob);
  }

  async getFieldTextBlobInput(): Promise<string> {
    return await this.fieldTextBlobInput.getAttribute('value');
  }

  async genericHistorySelectLastOption(): Promise<void> {
    await this.genericHistorySelect.all(by.tagName('option')).last().click();
  }

  async genericHistorySelectOption(option: string): Promise<void> {
    await this.genericHistorySelect.sendKeys(option);
  }

  getGenericHistorySelect(): ElementFinder {
    return this.genericHistorySelect;
  }

  async getGenericHistorySelectedOption(): Promise<string> {
    return await this.genericHistorySelect.element(by.css('option:checked')).getText();
  }

  async genericManyToOneSelectLastOption(): Promise<void> {
    await this.genericManyToOneSelect.all(by.tagName('option')).last().click();
  }

  async genericManyToOneSelectOption(option: string): Promise<void> {
    await this.genericManyToOneSelect.sendKeys(option);
  }

  getGenericManyToOneSelect(): ElementFinder {
    return this.genericManyToOneSelect;
  }

  async getGenericManyToOneSelectedOption(): Promise<string> {
    return await this.genericManyToOneSelect.element(by.css('option:checked')).getText();
  }

  async genericManyToManySelectLastOption(): Promise<void> {
    await this.genericManyToManySelect.all(by.tagName('option')).last().click();
  }

  async genericManyToManySelectOption(option: string): Promise<void> {
    await this.genericManyToManySelect.sendKeys(option);
  }

  getGenericManyToManySelect(): ElementFinder {
    return this.genericManyToManySelect;
  }

  async getGenericManyToManySelectedOption(): Promise<string> {
    return await this.genericManyToManySelect.element(by.css('option:checked')).getText();
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

export class GenericDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-generic-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-generic'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
