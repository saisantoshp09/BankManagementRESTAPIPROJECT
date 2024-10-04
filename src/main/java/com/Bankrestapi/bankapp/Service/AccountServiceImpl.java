package com.Bankrestapi.bankapp.Service;

import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.parsing.PassThroughSourceExtractor;
import org.springframework.stereotype.Service;

import com.Bankrestapi.bankapp.entity.Account;
import com.Bankrestapi.bankapp.repo.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

	
	@Autowired
	AccountRepository repo;
	
	@Override
	public Account createAccount(Account account) {
		Account account_saved=repo.save(account);
		return account_saved;
	}

	@Override
	public Account getAccountDetailsByAccountNumber(Long accountNumber) {
		// TODO Auto-generated method stub
		
		Optional<Account> account=repo.findById(accountNumber);
		
		if(account.isEmpty()) {
			throw new RuntimeException("Account is not Found");
		}
		Account account_found=account.get();
		return account_found;
	}

	@Override
	public List<Account> getAllAccountDetails() {
		// TODO Auto-generatefindalld method stub
		List<Account>listOfAccounts= repo.findAll();
		return listOfAccounts;
	}

	@Override
	public Account depositAmount(Long accountNumber, Double amount) {
		// TODO Auto-generated method stub
		
		Optional<Account> account=repo.findById(accountNumber);
		if(account.isEmpty())
		{
		  throw new RuntimeException("Account is not found");	
		}
		
		Account accountPresentBalance=account.get();
		Double totalBalance=accountPresentBalance.getAccount_balance()+amount;
		accountPresentBalance.setAccount_balance(totalBalance);
		repo.save(accountPresentBalance);
		return accountPresentBalance;
		
	}

	@Override
	public Account withdrwaAmount(Long acccountNumber, Double amount) {
		// TODO Auto-generated method stub
		Optional<Account> account=repo.findById(acccountNumber);
		if(account.isEmpty())
		{
			throw new RuntimeException("Account is not found");
		}
		Account accountPresentBalance=account.get();
		Double totalBalance=accountPresentBalance.getAccount_balance()-amount;
		accountPresentBalance.setAccount_balance(totalBalance);
		repo.save(accountPresentBalance);
		return accountPresentBalance;
		
	}

	@Override
	public void closeAccount(Long accountNumber) {
		// TODO Auto-generated method stub
		
	}

}
