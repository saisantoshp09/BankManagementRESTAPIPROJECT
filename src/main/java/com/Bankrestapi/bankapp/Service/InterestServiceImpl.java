package com.Bankrestapi.bankapp.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Bankrestapi.bankapp.entity.Account;
import com.Bankrestapi.bankapp.entity.InterestAccrual;
import com.Bankrestapi.bankapp.repo.AccountRepository;
import com.Bankrestapi.bankapp.repo.InterestAccrualRepository;

@Service
public class InterestServiceImpl implements InterestService {

	@Autowired
	private InterestAccrualRepository interestRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Override
	public InterestAccrual calculateAndAccrueInterest(Long accountNumber, Double interestRate) {
		Optional<Account> account = accountRepo.findById(accountNumber);
		if (account.isEmpty()) {
			throw new RuntimeException("Account not found");
		}

		Account acc = account.get();
		Double principal = acc.getAccount_balance();
		Double interestEarned = (principal * interestRate) / 100.0;

		InterestAccrual accrual = new InterestAccrual(acc, interestRate, principal,
				interestEarned, "MONTHLY");

		acc.setAccount_balance(principal + interestEarned);
		accountRepo.save(acc);

		return interestRepo.save(accrual);
	}

	@Override
	public List<InterestAccrual> getInterestHistory(Long accountNumber) {
		Optional<Account> account = accountRepo.findById(accountNumber);
		if (account.isEmpty()) {
			throw new RuntimeException("Account not found");
		}

		return interestRepo.findByAccountAccountNumber(accountNumber);
	}

	@Override
	public Double getTotalInterestEarned(Long accountNumber) {
		Optional<Account> account = accountRepo.findById(accountNumber);
		if (account.isEmpty()) {
			throw new RuntimeException("Account not found");
		}

		List<InterestAccrual> accruals = interestRepo.findByAccountAccountNumber(accountNumber);
		Double totalInterest = 0.0;

		for (InterestAccrual accrual : accruals) {
			totalInterest += accrual.getInterest_earned();
		}

		return totalInterest;
	}
}
