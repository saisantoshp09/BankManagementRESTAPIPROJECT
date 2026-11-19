package com.Bankrestapi.bankapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Bankrestapi.bankapp.entity.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

	@Query("SELECT c FROM CreditCard c WHERE c.card_number = :cardNumber")
	CreditCard findByCardNumber(@Param("cardNumber") String cardNumber);

}
