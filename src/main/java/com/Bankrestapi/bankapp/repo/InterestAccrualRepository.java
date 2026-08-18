package com.Bankrestapi.bankapp.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.Bankrestapi.bankapp.entity.InterestAccrual;

@Repository
public interface InterestAccrualRepository extends JpaRepository<InterestAccrual, Long> {
	@Query("SELECT ia FROM InterestAccrual ia WHERE ia.account.account_number = :accountNumber")
	List<InterestAccrual> findByAccountAccountNumber(@Param("accountNumber") Long accountNumber);
}
