const lodash = require("lodash");

async function gettitleListText(data) {
  let titleList = [];
  for (let i = 0; i < data.length; i++) {
    let a = await browser.getText(data[i]);
    titleList.push(a);
  }
  return titleList;
}
function convertNumber(data) {
  let a = data.map((item) => Number(item));
  return a;
}

describe("Ecosia.org Demo", function () {
  before(async (browser) =>
    browser
      .url("https://inter-apps.symper.vn/#/")
      .assert.visible("#input-20")
      .setValue("#input-20", "hanhdth@symper.vn")
      .assert.visible("#password")
      .setValue("#password", "Symper@123BA")
      .click("button[type=button]")
      .waitForElementVisible(
        ".v-icon.notranslate.collapse.icon-group.v-icon--link.mdi.mdi-file-document-edit-outline.theme--light"
      )
      .click(
        ".v-icon.notranslate.collapse.icon-group.v-icon--link.mdi.mdi-file-document-edit-outline.theme--light"
      )
      .waitForElementVisible(".v-list-item__title.fm.fs-13:first-child")
      .click(".v-list-item__title.fm.fs-13:first-child")
  );

  it("check by sort", async function (browser) {
    const data = await browser.findElements(
      ".ag-body-viewport.ag-layout-normal.ag-row-no-animation [aria-colindex='2'][col-id='id']"
    );
    let a = await gettitleListText(data);
    a = convertNumber(a);
    a = lodash.orderBy(a, "DESC");
    await browser
      .findElement(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .waitForElementVisible(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .click(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .waitForElementVisible(".pb-1.dropdown-item.grey-hover:first-child")
      .click(".pb-1.dropdown-item.grey-hover:first-child");
    // const data1 = await browser.findElements(
    //   ".ag-body-viewport.ag-layout-normal.ag-row-no-animation [aria-colindex='2'][col-id='id']"
    // );
    let c = await gettitleListText(data);
    c = convertNumber(c);
    console.log(c, a);
    expect(c).to.deep.equal(a);
  });

  it("check by filter", async function (browser) {
    const data1 = await browser.findElements(
      ".ag-body-viewport.ag-layout-normal.ag-row-no-animation [aria-colindex='2'][col-id='id']"
    );
    let a = await gettitleListText(data1);
    await browser
      .findElement(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .waitForElementVisible(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .click(
        "[aria-colindex='2'][col-id='id'] .fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
      )
      .waitForElementVisible(
        ".w-100.v-btn.v-btn--depressed.theme--light.v-size--small"
      )
      .click(".w-100.v-btn.v-btn--depressed.theme--light.v-size--small")
      .waitForElementVisible(
        ".v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active .v-list-item--link.v-list-item.v-list-item--link.theme--light:nth-child(4)"
      )
      .click(
        ".v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active .v-list-item--link.v-list-item.v-list-item--link.theme--light:nth-child(4)"
      )
      .waitForElementVisible(
        ".v-input.sym-small-size.mt-2.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined .v-text-field__slot input"
      )
      .setValue(
        ".v-input.sym-small-size.mt-2.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined .v-text-field__slot input",
        "3776"
      )
      .click(
        ".float-right.v-btn.v-btn--depressed.theme--light.v-size--small.primary"
      );
    const data2 = await browser.findElements(
      ".ag-body-viewport.ag-layout-normal.ag-row-no-animation [aria-colindex='2'][col-id='id']"
    );
    let b = await gettitleListText(data2);
    console.log(b);
    expect(a).to.deep.include(b);
  });
  after((browser) => browser.end());
});
