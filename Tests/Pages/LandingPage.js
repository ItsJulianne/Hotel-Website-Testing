class LandingPage {

    //ChildrenTravelers
    signInWindow = '//h4[text()="Hotels.com Rewards is now One Key™"]'
    signInBtn = '//button[text()="Sign in"]'
    travelersBtn = '//button[@data-stid="open-room-picker"]'
    inputField = '#traveler_selector_children_step_input-0'
    plusBtn = '//input[contains(@id, "children")]/following-sibling::button'
    minusBtn = '//input[contains(@id, "children")]/preceding-sibling::button'
    allDropdowns = `[id^="age-traveler_selector_children_age_selector-0-"]`
    targetInput = 0;
    //Languages switch
    languageLink = '//button[@data-stid="button-type-picker-trigger"]'
    languageSelect = '#language-selector'
    saveBtn = '//button[contains(@class, "button-floating-full-width")]'
    //List Property
    listPropertylink = '//a[@data-stid="listYourProperty-link"]'
    //FeedbackSubmission
    supportLink = '//a[@data-stid="support-cs-link"]'
    FeedbackLink = '//a[text()="Feedback"]'

    //ChildrenTravelers
    async handlingPopUp() {
        //Handle pop up that blocks the desired element of interation
        const isWindowDisplayed = await $(this.signInWindow).isDisplayed();
        if (isWindowDisplayed) {
            await $(this.signInBtn).click();
            console.log('Menu is displayed, clicked "Sign in"');
        } else {
            console.log('Menu is not displayed, click skipped');
        }
    };
    async updateChaildCount(newTarget) {
        //Click travelers picker only when it isn't already open
        const TravelerPickerOpen = await $(this.inputField).isDisplayed();
        if (!TravelerPickerOpen) {
            await $(this.travelersBtn).click();
        }
        //Updating child count according to desired input
        this.targetInput = newTarget;
        let value = parseInt(await $(this.inputField).getAttribute('value'));
        while (value !== this.targetInput) {
            if (value < this.targetInput) {
                const plusButton = await $(this.plusBtn);
                await plusButton.waitForClickable({ timeout: 5000 });
                await plusButton.click();
            } else if (value > this.targetInput) {
                const minusButton = await $(this.minusBtn);
                await minusButton.waitForClickable({ timeout: 5000 });
                await minusButton.click();
            }
            value = parseInt(await $(this.inputField).getAttribute('value'));
        }
    };
    async DropdownDisplay() {
        //Verify number of dropdowns 
        await $$(this.allDropdowns);
        const displayedDropdowns = await $$(this.allDropdowns).filter(async dropdown => await dropdown.isDisplayed());
        const displayedDropdownsCount = displayedDropdowns.length;
        const assert = require('assert')
        assert.strictEqual(displayedDropdownsCount, this.targetInput, `Dropdowns for ${this.targetInput} is not as expected`);
        console.log(`Displayed dropdowns for ${this.targetInput} is correct.`);
    };
    async ButtonsState() {
        //Verify minus and plus buttons state
        const assert = require('assert')
        const isPlusBtnEnabled = await $(this.plusBtn).isEnabled();
        const isMinusBtnEnabled = await $(this.minusBtn).isEnabled()
        if (this.targetInput === 6) {
            assert.strictEqual(isPlusBtnEnabled, false, `Plus button for input ${this.targetInput} is expected to be disabled`);
        } else {
            assert.strictEqual(isPlusBtnEnabled, true, `Plus button for input ${this.targetInput} is disabled`);
        }
        if (this.targetInput === 0) {
            assert.strictEqual(isMinusBtnEnabled, false, `Minus button for input ${this.targetInput} is expected to be disabled`);
        } else {
            assert.strictEqual(isMinusBtnEnabled, true, `Minus button for input ${this.targetInput} is disabled`);
        }
    };
    //LanguageSwitch
    async SelectLanguage(languageIndex) {
        //Select desired language 
        await $(this.languageLink).click();
        await $(this.languageSelect).selectByVisibleText(languageIndex);
        await $(this.saveBtn).click();
    };
    async VerifyLanguageDisplayed(expectedText) {
        //Verify expected language display after selection 
        const chai = await import('chai');
        const { expect } = chai;
        const languageText = await $(this.languageLink).getText();
        expect(languageText, 'Text does not match expectation').to.equal(expectedText);
    };
    //ListProperty
    async ClickListPropertyLink() {
        await $(this.listPropertylink).click();
        const allWindowHandle = await browser.getWindowHandles();
        const newWindowHandle = await allWindowHandle[allWindowHandle.length - 1]
        await browser.switchToWindow(newWindowHandle);
    };
    //FeedbackSubmission
    async clickSupportLink() {
        await $(this.supportLink).click();
    };
    async clickFeedbackLink() {
        const feedbackLink = await $(this.FeedbackLink);
        await feedbackLink.scrollIntoView();
        await feedbackLink.click();
    };
};
module.exports = LandingPage;