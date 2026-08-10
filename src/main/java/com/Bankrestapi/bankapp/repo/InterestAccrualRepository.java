package com.Bankrestapi.bankapp.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Bankrestapi.bankapp.entity.InterestAccrual;

@Repository
public interface InterestAccrualRepository extends JpaRepository<InterestAccrual, Long> {
	List<InterestAccrual> findByAccountAccountNumber(Long accountNumber);
}
