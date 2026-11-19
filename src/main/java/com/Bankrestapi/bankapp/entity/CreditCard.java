package com.Bankrestapi.bankapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table
public class CreditCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long card_id;
	
	@Column(name = "card_number")
	private String card_number;
	
	@Column
	private String cardholder_name;
	
	@Column
	private String cvv;
	
	@Column
	private LocalDate expiry_date;
	
	@Column
	private Double credit_limit;
	
	@Column
	private Double available_balance;
	
	@Column
	private Double current_balance;
	
	@Column
	private Double interest_rate;
	
	@Column
	private String card_status;
	
	public CreditCard() {
	}
	
	public CreditCard(String card_number, String cardholder_name, String cvv, LocalDate expiry_date,
			Double credit_limit, Double interest_rate) {
		this.card_number = card_number;
		this.cardholder_name = cardholder_name;
		this.cvv = cvv;
		this.expiry_date = expiry_date;
		this.credit_limit = credit_limit;
		this.available_balance = credit_limit;
		this.current_balance = 0.0;
		this.interest_rate = interest_rate;
		this.card_status = "ACTIVE";
	}

	public Long getCard_id() {
		return card_id;
	}

	public void setCard_id(Long card_id) {
		this.card_id = card_id;
	}

	public String getCard_number() {
		return card_number;
	}

	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}

	public String getCardholder_name() {
		return cardholder_name;
	}

	public void setCardholder_name(String cardholder_name) {
		this.cardholder_name = cardholder_name;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	public LocalDate getExpiry_date() {
		return expiry_date;
	}

	public void setExpiry_date(LocalDate expiry_date) {
		this.expiry_date = expiry_date;
	}

	public Double getCredit_limit() {
		return credit_limit;
	}

	public void setCredit_limit(Double credit_limit) {
		this.credit_limit = credit_limit;
	}

	public Double getAvailable_balance() {
		return available_balance;
	}

	public void setAvailable_balance(Double available_balance) {
		this.available_balance = available_balance;
	}

	public Double getCurrent_balance() {
		return current_balance;
	}

	public void setCurrent_balance(Double current_balance) {
		this.current_balance = current_balance;
	}

	public Double getInterest_rate() {
		return interest_rate;
	}

	public void setInterest_rate(Double interest_rate) {
		this.interest_rate = interest_rate;
	}

	public String getCard_status() {
		return card_status;
	}

	public void setCard_status(String card_status) {
		this.card_status = card_status;
	}

	@Override
	public String toString() {
		return "CreditCard [card_id=" + card_id + ", card_number=" + card_number + ", cardholder_name="
				+ cardholder_name + ", cvv=" + cvv + ", expiry_date=" + expiry_date + ", credit_limit=" + credit_limit
				+ ", available_balance=" + available_balance + ", current_balance=" + current_balance
				+ ", interest_rate=" + interest_rate + ", card_status=" + card_status + "]";
	}
	
}
