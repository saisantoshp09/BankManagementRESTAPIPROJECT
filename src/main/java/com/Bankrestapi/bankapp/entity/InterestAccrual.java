package com.Bankrestapi.bankapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "interest_accruals")
public class InterestAccrual {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accrual_id;

	@ManyToOne
	@JoinColumn(name = "account_number", nullable = false)
	private Account account;

	@Column
	private Double interest_rate;

	@Column
	private Double principal_amount;

	@Column
	private Double interest_earned;

	@Column
	private LocalDateTime accrual_date;

	@Column
	private String accrual_period;

	public InterestAccrual() {
	}

	public InterestAccrual(Account account, Double interest_rate, Double principal_amount,
			Double interest_earned, String accrual_period) {
		this.account = account;
		this.interest_rate = interest_rate;
		this.principal_amount = principal_amount;
		this.interest_earned = interest_earned;
		this.accrual_date = LocalDateTime.now();
		this.accrual_period = accrual_period;
	}

	public Long getAccrual_id() {
		return accrual_id;
	}

	public void setAccrual_id(Long accrual_id) {
		this.accrual_id = accrual_id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Double getInterest_rate() {
		return interest_rate;
	}

	public void setInterest_rate(Double interest_rate) {
		this.interest_rate = interest_rate;
	}

	public Double getPrincipal_amount() {
		return principal_amount;
	}

	public void setPrincipal_amount(Double principal_amount) {
		this.principal_amount = principal_amount;
	}

	public Double getInterest_earned() {
		return interest_earned;
	}

	public void setInterest_earned(Double interest_earned) {
		this.interest_earned = interest_earned;
	}

	public LocalDateTime getAccrual_date() {
		return accrual_date;
	}

	public void setAccrual_date(LocalDateTime accrual_date) {
		this.accrual_date = accrual_date;
	}

	public String getAccrual_period() {
		return accrual_period;
	}

	public void setAccrual_period(String accrual_period) {
		this.accrual_period = accrual_period;
	}

	@Override
	public String toString() {
		return "InterestAccrual [accrual_id=" + accrual_id + ", account_number="
				+ account.getAccount_number() + ", interest_rate=" + interest_rate
				+ ", principal_amount=" + principal_amount + ", interest_earned=" + interest_earned
				+ ", accrual_date=" + accrual_date + ", accrual_period=" + accrual_period + "]";
	}
}
