const FeedbackPage = require("../Pages/FeedbackPage");
const LandingPage = require("../Pages/LandingPage");
const ListProperty = require("../Pages/ListProperty");
const landingpage = new LandingPage();
const listproperty = new ListProperty();
const feedbackpage = new FeedbackPage();
const { Given, When, Then } = require("@wdio/cucumber-framework");

//ChildrenTravelers
Given(/^I am on hotel landing page$/, async function () {
    await browser.url('https://www.hotels.com/');
    await landingpage.handlingPopUp()
});
When(/^I change children traveler count to (\d+)$/, async function (newTarget) {
    await landingpage.updateChaildCount(newTarget)
});
Then(/^I verify there are (\d+) dropdowns displayed$/, async function (expectedDropdown) {
    await landingpage.DropdownDisplay(expectedDropdown);
});
Then(/^I verify plus and minus buttons state$/, async function () {
    await landingpage.ButtonsState();
});
//LanguageSwitch
When(/^I select the language by index (.+)$/, async function (languageIndex) {
    await landingpage.SelectLanguage(languageIndex);
});
Then(/^I verify the language displayed is (.+)$/, async function (languageDisplayed) {
    await landingpage.VerifyLanguageDisplayed(languageDisplayed)
});
//ListProperty
When(/^I click on (.+)$/, async function (linkName) {
    switch (linkName) {
        case "listyourproperty":
            await landingpage.ClickListPropertyLink();
            break;
        case "privateresidence":
            await listproperty.clickPrivateResidenceLink();
            break;
        case "next":
            await listproperty.clickNextButton();
            break;
        case "support":
            await landingpage.clickSupportLink();
            break;
        case "feedbacklink":
            await landingpage.clickFeedbackLink();
            await feedbackpage.switchToFeedbackWindow();
            break;
        case "websiteFeedbackBtn":
            await feedbackpage.clickwebsiteFeedback();
            break;
        case "submit":
            await feedbackpage.submitForm();
            break;
        default:
            break;
    }
});
Then(/^I verify (.+) display$/, async function (pageElements) {
    switch (pageElements) {
        case "listoptions":
            await listproperty.verifyListOptionsDisplay();
            break;
        case "step1of3":
            await listproperty.verifyStep1of3Display();
            break;
        case "locationelements":
            await listproperty.verifyLocationElementsDisplay();
            break;
        case "mapelements":
            await listproperty.verifyMapElementsDisplay();
            break;
        case "errormessage":
            await feedbackpage.verifyErrorMsgDisplay();
            break;
        case "thankyoumessage":
            await feedbackpage.VerifyThanksMsgDisplay();
            break;
        default:
            break;
    };
});
When(/^I enter (\d+(?:\.\d+)?) as (.+)$/, async function (input, room) {
    const bedroomInput = await $('input[name="bedroom-count"]');
    const bathroomInput = await $('input[name="bathroom-count');
    const bedroomPlus = await $('button[aria-label="Increase bedrooms"]');
    const bedroomMinus = await $('button[aria-label="Decrease bedrooms"]');
    const bathroomPlus = await $('button[aria-label="Increase bathrooms"]');
    const bathroomMinus = await $('button[aria-label="Decrease bathrooms"]');
    if (room === 'bedroom') {
        await listproperty.adjustRoomCount(input, bedroomInput, bedroomPlus, bedroomMinus);
    } else if (room === 'bathroom') {
        await listproperty.adjustRoomCount(input, bathroomInput, bathroomPlus, bathroomMinus);
    } else {
        throw new Error(`Unsupported room type: ${room}`);
    }
});
When(/^I enter (\d+) in address field$/, async function (addressValue) {
    await listproperty.enterAddress(addressValue);
});
When(/^I select (.+) from autosuggestion$/, async function (targetLocation) {
    await listproperty.selectAddress(targetLocation)
});
//FeedbackCompletion
When(/^I select rating and review$/, async function () {
    await feedbackpage.selectRatingAndReview();
});
When(/^I enter (.+) in comments field$/, async function(comment){
    await feedbackpage.addComments(comment)
})
