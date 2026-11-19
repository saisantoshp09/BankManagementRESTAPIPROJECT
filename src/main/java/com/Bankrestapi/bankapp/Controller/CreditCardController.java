package com.Bankrestapi.bankapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Bankrestapi.bankapp.Service.CreditCardService;
import com.Bankrestapi.bankapp.entity.CreditCard;

@RestController
@RequestMapping("/creditcard")
public class CreditCardController {

	@Autowired
	CreditCardService service;

	@PostMapping("/create")
	public ResponseEntity<CreditCard> createCreditCard(@RequestBody CreditCard creditCard) {
		CreditCard createdCard = service.createCreditCard(creditCard);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
	}

	@GetMapping("/{cardId}")
	public CreditCard getCreditCardById(@PathVariable Long cardId) {
		CreditCard creditCard = service.getCreditCardDetailsById(cardId);
		return creditCard;
	}

	@GetMapping("/cardnumber/{cardNumber}")
	public CreditCard getCreditCardByCardNumber(@PathVariable String cardNumber) {
		CreditCard creditCard = service.getCreditCardDetailsByCardNumber(cardNumber);
		return creditCard;
	}

	@GetMapping("/getall")
	public List<CreditCard> getAllCreditCards() {
		List<CreditCard> allCreditCards = service.getAllCreditCards();
		return allCreditCards;
	}

	@PutMapping("/paybill/{cardId}/{amount}")
	public CreditCard payBill(@PathVariable Long cardId, @PathVariable Double amount) {
		CreditCard updatedCard = service.payBill(cardId, amount);
		return updatedCard;
	}

	@PutMapping("/transaction/{cardId}/{amount}")
	public CreditCard makeTransaction(@PathVariable Long cardId, @PathVariable Double amount) {
		CreditCard updatedCard = service.makeTransaction(cardId, amount);
		return updatedCard;
	}

	@GetMapping("/balance/{cardId}")
	public CreditCard getAvailableBalance(@PathVariable Long cardId) {
		CreditCard creditCard = service.getAvailableBalance(cardId);
		return creditCard;
	}

	@DeleteMapping("/close/{cardId}")
	public ResponseEntity<String> closeCreditCard(@PathVariable Long cardId) {
		service.closeCreditCard(cardId);
		return ResponseEntity.ok("Credit Card closed successfully");
	}

}

