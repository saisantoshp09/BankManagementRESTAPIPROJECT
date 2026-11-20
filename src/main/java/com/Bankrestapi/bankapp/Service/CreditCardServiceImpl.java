package com.Bankrestapi.bankapp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Bankrestapi.bankapp.entity.CreditCard;
import com.Bankrestapi.bankapp.repo.CreditCardRepository;

@Service
public class CreditCardServiceImpl implements CreditCardService {

	@Autowired
	CreditCardRepository repo;

	@Override
	public CreditCard createCreditCard(CreditCard creditCard) {
		CreditCard savedCard = repo.save(creditCard);
		return savedCard;
	}

	@Override
	public CreditCard getCreditCardDetailsById(Long cardId) {
		Optional<CreditCard> creditCard = repo.findById(cardId);

		if (creditCard.isEmpty()) {
			throw new RuntimeException("Credit Card not found");
		}
		return creditCard.get();
	}

	@Override
	public CreditCard getCreditCardDetailsByCardNumber(String cardNumber) {
		CreditCard creditCard = repo.findByCardNumber(cardNumber);

		if (creditCard == null) {
			throw new RuntimeException("Credit Card not found with card number: " + cardNumber);
		}
		return creditCard;
	}

	@Override
	public List<CreditCard> getAllCreditCards() {
		List<CreditCard> creditCards = repo.findAll();
		return creditCards;
	}

	@Override
	public CreditCard payBill(Long cardId, Double amount) {
		Optional<CreditCard> creditCard = repo.findById(cardId);

		if (creditCard.isEmpty()) {
			throw new RuntimeException("Credit Card not found");
		}

		CreditCard card = creditCard.get();

		if (amount <= 0) {
			throw new RuntimeException("Payment amount must be greater than 0");
		}

		if (amount > card.getCurrent_balance()) {
			throw new RuntimeException("Payment amount cannot exceed current balance");
		}

		// Reduce current balance and increase available balance
		Double newCurrentBalance = card.getCurrent_balance() - amount;
		Double newAvailableBalance = card.getCredit_limit() - newCurrentBalance;

		card.setCurrent_balance(newCurrentBalance);
		card.setAvailable_balance(newAvailableBalance);

		repo.save(card);
		return card;
	}

	@Override
	public CreditCard makeTransaction(Long cardId, Double amount) {
		Optional<CreditCard> creditCard = repo.findById(cardId);

		if (creditCard.isEmpty()) {
			throw new RuntimeException("Credit Card not found");
		}

		CreditCard card = creditCard.get();

		if (amount <= 0) {
			throw new RuntimeException("Transaction amount must be greater than 0");
		}

		if (amount > card.getAvailable_balance()) {
			throw new RuntimeException("Insufficient credit limit. Available balance: " + card.getAvailable_balance());
		}

		// Increase current balance and decrease available balance
		Double newCurrentBalance = card.getCurrent_balance() + amount;
		Double newAvailableBalance = card.getCredit_limit() - newCurrentBalance;

		card.setCurrent_balance(newCurrentBalance);
		card.setAvailable_balance(newAvailableBalance);

		repo.save(card);
		return card;
	}

	@Override
	public CreditCard getAvailableBalance(Long cardId) {
		Optional<CreditCard> creditCard = repo.findById(cardId);

		if (creditCard.isEmpty()) {
			throw new RuntimeException("Credit Card not found");
		}
		return creditCard.get();
	}

	@Override
	public void closeCreditCard(Long cardId) {
		if (!repo.existsById(cardId)) {
			throw new RuntimeException("Credit Card not found");
		}

		Optional<CreditCard> creditCard = repo.findById(cardId);
		if (creditCard.isPresent()) {
			CreditCard card = creditCard.get();
			if (card.getCurrent_balance() > 0) {
				throw new RuntimeException("Cannot close card with outstanding balance");
			}
			card.setCard_status("CLOSED");
			repo.save(card);
		}
	}

}

