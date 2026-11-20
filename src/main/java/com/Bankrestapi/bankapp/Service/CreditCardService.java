package com.Bankrestapi.bankapp.Service;

import java.util.List;

import com.Bankrestapi.bankapp.entity.CreditCard;

public interface CreditCardService {

	public CreditCard createCreditCard(CreditCard creditCard);

	public CreditCard getCreditCardDetailsById(Long cardId);

	public CreditCard getCreditCardDetailsByCardNumber(String cardNumber);

	public List<CreditCard> getAllCreditCards();

	public CreditCard payBill(Long cardId, Double amount);

	public CreditCard makeTransaction(Long cardId, Double amount);

	public CreditCard getAvailableBalance(Long cardId);

	public void closeCreditCard(Long cardId);

}

