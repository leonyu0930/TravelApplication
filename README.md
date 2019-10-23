# TravelApplication
This is a sample React Web Application about submitting a Travel Application Form

## Getting Started

This web application has three parts:
1. Front-end: TravelApplicationWebApp (Developed by ReactJs and HTML)
	1. Boostrap 4.3.1
	2. Moment (To format date and time) 
	3. jQuery 3.0.0

2. Back-end: TravelApplicationWebAPI (Developed by .net Web API framework)

3. Database: DBScripts -> TraveAppDBScript.sql (To create a local Database Table)


## Deployment

1. TravelApplicationWebApp can be hosted in Insternet Information Service (IIS) or any environment support ReactJS and HTML

2. TravelApplicationWebAPI need be hosted in Insternet Information Service (IIS)

3. Local DB setup - The database need to be installed in Microsoft SQLserver.

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
