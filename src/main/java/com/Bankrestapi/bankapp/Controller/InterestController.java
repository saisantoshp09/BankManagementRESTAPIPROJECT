package com.Bankrestapi.bankapp.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Bankrestapi.bankapp.Service.InterestService;
import com.Bankrestapi.bankapp.entity.InterestAccrual;

@RestController
@RequestMapping("/interest")
public class InterestController {

	@Autowired
	private InterestService interestService;

	@PostMapping("/accrue/{accountNumber}/{interestRate}")
	public ResponseEntity<InterestAccrual> accrueInterest(
			@PathVariable Long accountNumber,
			@PathVariable Double interestRate) {
		InterestAccrual accrual = interestService.calculateAndAccrueInterest(accountNumber,
				interestRate);
		return ResponseEntity.status(HttpStatus.CREATED).body(accrual);
	}

	@GetMapping("/history/{accountNumber}")
	public ResponseEntity<List<InterestAccrual>> getInterestHistory(
			@PathVariable Long accountNumber) {
		List<InterestAccrual> history = interestService.getInterestHistory(accountNumber);
		return ResponseEntity.status(HttpStatus.OK).body(history);
	}

	@GetMapping("/total/{accountNumber}")
	public ResponseEntity<Double> getTotalInterestEarned(
			@PathVariable Long accountNumber) {
		Double totalInterest = interestService.getTotalInterestEarned(accountNumber);
		return ResponseEntity.status(HttpStatus.OK).body(totalInterest);
	}
}
