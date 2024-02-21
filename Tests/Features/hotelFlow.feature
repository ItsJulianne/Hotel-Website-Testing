Feature: Hotel Flow TC1
    @ChildrenTravelers
    Scenario: Verify Child-age dropdowns are same as number of Children selected
        Given I am on hotel landing page
        When I change children traveler count to 2
        Then I verify there are 2 dropdowns displayed
            And I verify plus and minus buttons state
        When I change children traveler count to 6
        Then I verify there are 6 dropdowns displayed
            And I verify plus and minus buttons state
        When I change children traveler count to 0
        Then I verify there are 0 dropdowns displayed
            And I verify plus and minus buttons state
    @LanguageSwitch
    Scenario: Verify language can be changed successfully
        Given I am on hotel landing page
        When I select the language by index Español (Estados Unidos)
        Then I verify the language displayed is Español
        When I select the language by index English (United States)
        Then I verify the language displayed is English
    @ListyourProperty
    Scenario: Verify "List your Property" flow
        Given I am on hotel landing page
        When I click on listyourproperty
        Then I verify listoptions display
        When I click on privateresidence
        Then I verify step1of3 display
        When I enter 4 as bedroom
            And I enter 2.5 as bathroom
        When I click on next
        Then I verify locationelements display
        When I enter 121 in address field
            And I select 121 Golden Gate Avenue, San Francisco, CA from autosuggestion
        Then I verify mapelements display
    @FeedbackSubmissionError
    Scenario: Verify error is displayed when user submits the empty feedback form
        Given I am on hotel landing page
        When I click on support
            And I click on feedbacklink
            And I click on websiteFeedbackBtn
            And I click on submit
        Then I verify errormessage display
    @FeedbackCompletion
    Scenario: Verify user can submit feedback after completing the feedback form
        Given I am on hotel landing page
        When I click on support
            And I click on feedbacklink
            And I click on websiteFeedbackBtn
            And I select rating and review
            And I enter Design needs improvement in comments field
            And I click on submit
        Then I verify thankyoumessage display