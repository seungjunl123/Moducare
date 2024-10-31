package world.moducare.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import world.moducare.domain.challenge.entity.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
