*** Settings ***
Documentation                   OCM Business scenario
Library                         QForce
Library                         String
Library                         QWeb
Library                         BuiltIn
Library                         QVision
Library                         FakerLibrary
Resource                        common.robot

*** Test Cases ***
UserCreation
    Open Browser    about:blank    chrome
    GoTo            https://orgfarm-fae880852c-dev-ed.develop.lightning.force.com
