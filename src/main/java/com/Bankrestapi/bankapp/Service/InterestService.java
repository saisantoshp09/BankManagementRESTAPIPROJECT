package com.Bankrestapi.bankapp.Service;

import com.Bankrestapi.bankapp.entity.InterestAccrual;
import java.util.List;

public interface InterestService {
	public InterestAccrual calculateAndAccrueInterest(Long accountNumber, Double interestRate);
	public List<InterestAccrual> getInterestHistory(Long accountNumber);
	public Double getTotalInterestEarned(Long accountNumber);
}
