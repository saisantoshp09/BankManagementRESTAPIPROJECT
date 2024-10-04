package com.Bankrestapi.bankapp.Service;

import java.util.List;

import com.Bankrestapi.bankapp.entity.Account;

public interface AccountService {
	public Account createAccount(Account account);
	public Account getAccountDetailsByAccountNumber(Long accountNumber);
	public List<Account> getAllAccountDetails();
	public Account depositAmount(Long accountNumber,Double amount);
	public Account withdrwaAmount(Long acccountNumber,Double amount);
	public void closeAccount(Long accountNumber);

}
