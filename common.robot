*** Keywords ***
Setup Browser
    # Setting search order is not really needed here, but given as an example
    # if you need to use multiple libraries containing keywords with duplicate names
    # set envirionment variables
    # Initialize Environment Variables                        ${ENVIRONMENT}
    Set Library Search Order    QForce                      QWeb
    Open Browser                about:blank                 ${OpenBrowser}
    SetConfig                   LineBreak                   ${EMPTY}                    #\ue000
    Evaluate                    random.seed()               random                      # initialize random generator
    SetConfig                   DefaultTimeout              50s                         #45s                        #sometimes salesforce is slow
    # adds a delay of 0.3 between keywords. This is helpful in cloud with limited resources.
    SetConfig                   Delay                       0.3