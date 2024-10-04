Bank Account Management API
This project is a Bank Account Management application built using Spring Boot. It provides RESTful APIs to manage bank account details, including creating accounts, retrieving account information, and handling deposits and withdrawals.

Features
Create new bank accounts
Retrieve details of a specific account by account number
Get details of all accounts
Deposit money into an account
Withdraw money from an account
Technologies Used
Spring Boot for building the RESTful API
Java for the backend logic
Maven for project management and dependency handling
API Endpoints
API Endpoints
Below are the available API endpoints for managing bank accounts:

1. Create an Account
Endpoint: /account/create
Method: POST
Description: Creates a new bank account.
Request Body
{
"account_number": 2,
"account_holder_name": "Ganesh",
"account_balance": 4500
}
Response: The created account details.
2. Get Account by Account Number
Endpoint: /account/{accountNumber}
Method: GET
Description: Fetches details of a specific account by account number.
Path Parameter:
accountNumber: The account number of the account to be fetched.
Response: Account details.
3. Get All Accounts
Endpoint: /account/getallaccounts
Method: GET
Description: Retrieves details of all accounts.
Response: List of all account details.
4. Deposit Money
Endpoint: /account/deposit/{accountNumber}/{amount}
Method: PUT
Description: Deposits money into an account.
Path Parameters:
accountNumber: The account number of the account to deposit into.
amount: The amount of money to deposit.
Response: Updated account details with the new balance.
5. Withdraw Money
Endpoint: /account/withdraw/{accountNumber}/{amount}
Method: PUT
Description: Withdraws money from an account.
Path Parameters:
accountNumber: The account number of the account to withdraw from.
amount: The amount of money to withdraw.
Response: Updated account details with the new balance.
How to Run
Clone the Repository
git clone <https://github.com/saisantoshp09/BankManagementRESTAPIPROJECT.git>
cd bankapp
mvn clean install
mvn spring-boot:run
Access the API at http://localhost:8080/account.





