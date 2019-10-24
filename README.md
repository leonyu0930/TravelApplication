# TravelApplication
This is a sample React Web Application about Travel Application Form submission

## Getting Started

This web application has three parts:
1. Front-end: TravelApplicationWebApp (Developed by ReactJs and HTML)
	1. Boostrap 4.3.1
	2. Moment (To format date and time) 
	3. jQuery 3.0.0

2. Back-end: TravelApplicationWebAPI (Developed by .net Web API framework)

3. Database: DBScripts -> TraveAppDBScript.sql (To create a local Database Table)
	1. Entity framework 


## Deployment (Local Testing)
1. Create a local database and tables
	1. Open Microsoft SQL Server Management
	2. Run the given SQLquery TraveAppDBScript.sql to creat the database and tables meanwhile some sample data will be created.

2. Configure Insternet Information Service (IIS)
	1. Create a new application pool and name as "TravelAppPool"
	2. In Advanced Setting, setting "Identity" to your location DB login account.

3. Deploy TravelApplicationWebApp 
	1. In Insternet Information Service (IIS)
		1. Sites -> Default Web Site
		2. Add a new application and name as "TravelAppWeb"
		3. Configure the application pool as "TravelAppPool"

4. Deploy TravelApplicationWebAPI 
	1. In Insternet Information Service (IIS)
		1. Sites -> Default Web Site
		2. Add a new application and name as "TravelAppWebAPI"
		3. Configure the application pool as "TravelAppPool"

5. For IIS Deploy Configuration, plese refer to image "IIS Deploy Image" folder in my GitHub repository				

## Running the tests

1. Form Validation
	1. Mandatory fields checking
	2. Email Formatting Validation
	3. Input length Validation (e.g. Minimum 3 characaters required)
	4. Name Formatting Validation (only allow a-z,A-Z,@ and ')
	5. Contact Number Formatting Validation (only allow 0-9)
	6. Passport Number Formatting Validation (only allow a-z, A-Z, 0-9)
2. Auto-Retrieving UEN of Company
	1. UEN should be the pre-defined data in database.
	2. Entering Company A in the form
		1. Test Data UEN "T01LL0001A" will be auto-populated.
3. Preview before submission
4. Real-time updating preview
5. Dashboard Login Page
	1. UserName : Admin
	2. Password : 12345
6. Dashboard (To display all submitted applications)

## Versioning

For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Yu Zhe** - *Initial work* - [leonyu0930](https://github.com/leonyu0930) 

## Acknowledgments

* This sample is only used for peronal testing purpose
