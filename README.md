# PCF_getAddressIO
A PowerApps Component Framework solution for Address (UK) lookups via post code

## Get Started
1. First ensure you have installed the [PowerApps CLI](https://aka.ms/PowerAppsCLI)
2. run `npm install` to download the required npm packages
3. Use `npm run build` to build/compile the source code
4. Use `npm run start` to run the component within the PCF Test Harness
4. In a developer command prompt run `msbuild /t:rebuild` from within the Solutions folder to package the solution

## Usage

NB. More detailed usage instructions are coming soon.

1. Get an API Key from https://getaddress.io/
2. Install the solution
    - either using the solution package generated in the [Get Started](#Get-Started) section
    - or via the latest [release](releases)
3. On a form with address controls change the post code fields control to use this getAddressIO control
4. Bind the control properties to your address fields *

*At present you cannot bind the control to the out of the box address fields [see here](https://powerusers.microsoft.com/t5/PowerApps-Ideas/Enable-binding-to-OOB-Address-Fields/idi-p/302387)
I have built the control to support 2 methods of mapping the control output to the out of the box address fields.
- Option 1: Map the individual address properties to custom fields and then have onchange events to copy the value to the out of the box fields.
- Option 2: Map the JSON property to a single custom string field and then have javascript to parse the JSON on change and write the corresponding values to the out of the box address fields