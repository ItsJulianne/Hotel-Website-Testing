class ListProperty {

    whatToListHeadline = '//p[text()="What would you like to list?"]'
    lodgingLocator = '#classification_lodging'
    privateResidencyLocator = '#classification_privateResidence'
    cookies = '#onetrust-policy-text'
    closeBtn = '//button[@class="onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon"]'
    steps1of3 = '//div[text()="Step 1 of 3"]'
    nextBtn = '//div[@class="bed-and-bath__bottom"]//button'
    steps2of3Headline = '//div[text()="Step 2 of 3"]'
    locationHeadline = '//div[contains(@class, "location")]//h1'
    locationInput = '#locationTypeAhead'
    everyAddress = '//ul[contains(@class, "field-select")]//li'
    mapLocator = '//div[@class="google-map-view map-container"]'
    mapPinLocator = '//div[contains(@style, "position: absolute; cursor")]//img'
    mapFooterLocator = '//span[@class="map-footer"]'

    async handlingCookiesPopup(){
        //Managing the cookies popup blocking the privateREsidency element
        const cookiesPopupDisplay = await $(this.cookies).isDisplayed();
        if(cookiesPopupDisplay){
            await $(this.closeBtn).click();
            await browser.pause(2000)
        };
        if(!cookiesPopupDisplay){
            console.log('The cookies pop up is not displayed anymore')
        }; 
    }
    async verifyListOptionsDisplay() {
        await this.handlingCookiesPopup();
        const chai = await import('chai');
        const { expect } = chai;
        const [
            whatToListHeadlineDisplay,
            lodgingDisplay,
            privateResidencyDisplay
        ] = await Promise.all([
            $(this.whatToListHeadline).isDisplayed(),
            $(this.lodgingLocator).isDisplayed(),
            $(this.privateResidencyLocator).isDisplayed(),
        ]);
        expect(whatToListHeadlineDisplay, 'New page headline "whatToList" is not displayed').to.be.true;
        expect(lodgingDisplay, 'Lodging element is not displayed').to.be.true;
        expect(privateResidencyDisplay, 'Private Residency element is not displayed').to.be.true;       
    };
    async clickPrivateResidenceLink(){
        await $(this.privateResidencyLocator).click();
    };
    async verifyStep1of3Display(){
        const chai = await import('chai');
        const { expect } = chai;
        const step1of3Display = await $(this.steps1of3).isDisplayed();
        expect(step1of3Display, 'Step 1 of 3 headline is not displayed').to.be.true;
    };
    async adjustRoomCount(target, roomInput, roomPlus, roomMinus) {
        const epsilon = 0.01;  
        let currentValue = parseFloat(await roomInput.getAttribute('value'));
        while (Math.abs(currentValue - target) > epsilon) {
            if (currentValue < target) {
                await roomPlus.click();
            } else if (currentValue > target) {
                await roomMinus.click();
            }
            currentValue = parseFloat(await roomInput.getAttribute('value'));
        }
    };
    async clickNextButton(){
        await $(this.nextBtn).click();
    };
    async verifyLocationElementsDisplay() {
        const chai = await import('chai');
        const { expect } = chai;
        const steps2of3Display = await $(this.steps2of3Headline).isDisplayed();
        expect(steps2of3Display, 'Steps 2 of 3 element is not displayed').to.be.true;
        const locationHeadlineDisplay = await $(this.locationHeadline).isDisplayed();
        expect(locationHeadlineDisplay, "(Where's your place located) element is not displayed").to.be.true;
        await browser.pause(2000)
    };
    async enterAddress(addressValue){
        await $(this.locationInput).setValue(addressValue);
    };
    async selectAddress(targetLocation){
        await browser.waitUntil(() => $(this.everyAddress).isDisplayed());
        const everyAddress = await $$(this.everyAddress);
        for (let address of everyAddress) {
           const addressText = await address.getText();
           console.log(addressText);
           if (addressText.includes(targetLocation)) {
               await address.click();
               break;
           }
        }
   };
    async verifyMapElementsDisplay() {
        const chai = await import('chai');
        const { expect } = chai;
        const map = await $(this.mapLocator);
        const mapPin = await $(this.mapPinLocator);
        const mapFooter = await $(this.mapFooterLocator);
        await map.waitForDisplayed();
        expect(await map.isDisplayed(), 'Map is not displayed').to.be.true;
        expect(await mapPin.isDisplayed(), 'Map Pin is not displayed').to.be.true;
        expect(await mapFooter.isDisplayed(), 'Map Footer is not displayed').to.be.true;
    };  
};
module.exports = ListProperty;