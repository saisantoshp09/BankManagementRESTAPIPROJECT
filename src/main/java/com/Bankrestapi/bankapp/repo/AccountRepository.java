package com.Bankrestapi.bankapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Bankrestapi.bankapp.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
