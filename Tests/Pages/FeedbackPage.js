class FeedbackPage{
    websiteFeedbackBtn = '//div[text()="Website Feedback »"]'
    submitBtn = '//button[text()="Submit"]'
    requiredFieldErr = '//p[@data-localization="validation-heading"]'
    overallLocator = '//label[@for="page-rating-3"]'
    topicLocator = '#topic'
    commentsLocator = '#verbatim'
    ThanksMsg = '//p[@data-localization="thank-you-heading"]'


    async switchToFeedbackWindow(){
        //Switching to go to the feedback submission from window
        const allWindows = await browser.getWindowHandles();
        const newWindow = await allWindows.slice(-1)[0];
        await browser.switchToWindow(newWindow);
    };
    async clickwebsiteFeedback(){
        await $(this.websiteFeedbackBtn).click();
    }
    async submitForm(){
        await browser.pause(2000)
        await $(this.submitBtn).scrollIntoView();
        await $(this.submitBtn).click();
    };
    async verifyErrorMsgDisplay(){
        const chai = await import('chai');
        const { expect } = chai;
        const requiredFieldErr = await $(this.requiredFieldErr).isDisplayed();
        expect(requiredFieldErr, 'requiredField error message is not displayed').to.be.true;

    };
    async selectRatingAndReview(){
        await $(this.overallLocator).click();
        await $(this.topicLocator).selectByVisibleText('Suggestion');
    };
    async addComments(comment){
        await $(this.commentsLocator).setValue(comment)
    };
    async VerifyThanksMsgDisplay(){
        const assert = require('assert')
        const ThanksMsg = await $(this.ThanksMsg);
        await ThanksMsg.waitForDisplayed()
        const ThanksMsgDisplay = await ThanksMsg.isDisplayed();
        assert.strictEqual(ThanksMsgDisplay, true, 'Form completion was not successful');
    };


};
module.exports = FeedbackPage;