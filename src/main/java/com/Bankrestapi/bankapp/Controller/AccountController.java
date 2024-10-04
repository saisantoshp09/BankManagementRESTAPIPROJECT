package com.Bankrestapi.bankapp.Controller;

import java.security.PublicKey;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Bankrestapi.bankapp.Service.AccountService;
import com.Bankrestapi.bankapp.entity.Account;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
	AccountService service;
	
	@PostMapping("/create")
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		
		Account createAccount=service.createAccount(account);
		return ResponseEntity.status(HttpStatus.CREATED).body(createAccount);
		
		
}
	
	@GetMapping("/{accountNumber}")
	public Account getAccountByAccountNumber(@PathVariable Long accountNumber)
	{
		Account account=service.getAccountDetailsByAccountNumber(accountNumber);
		
		
		return account;
		
	}
	
	@GetMapping("/getallaccounts")
	public List<Account> getllAccountDetails(){
		List<Account> allAccountDetails=service.getAllAccountDetails();
	 return allAccountDetails;
	
	
	}
	
	@PutMapping("/deposit/{accountNumber}/{amount}")
	public Account depositAmount(@PathVariable Long accountNumber,@PathVariable Double amount) {
		Account depost_amount=service.depositAmount(accountNumber, amount);
		return depost_amount;
	}


     @PutMapping("/withdraw/{accountNumber}/{amount}")
	 public Account withdrwaAmount(@PathVariable Long accountNumber,@PathVariable Double amount)
	 {
    	 Account withdraw_amount=service.withdrwaAmount(accountNumber, amount);
 		return withdraw_amount;
	 }










}
