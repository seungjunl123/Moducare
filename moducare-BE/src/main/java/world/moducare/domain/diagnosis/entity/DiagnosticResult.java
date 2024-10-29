package world.moducare.domain.diagnosis.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import world.moducare.domain.member.entity.Member;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diagnostic_result")
public class DiagnosticResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private Long id;

    @Column(name = "img_src", nullable = false, columnDefinition = "TEXT")
    private String image;

    @Column(name = "advice", nullable = false, columnDefinition = "TEXT")
    private String advice;

    @Column(name = "hairloss", nullable = false)
    private float hairLoss;

    @Column(name = "dandruff", nullable = false)
    private float dandruff;

    @Column(name = "inflammatory", nullable = false)
    private float inflammatory;

    @Column(name = "erythema", nullable = false)
    private float erythema;

    @Column(name = "sebum", nullable = false)
    private float sebum;

    @Column(name = "deadskin", nullable = false)
    private float deadSkin;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul"));
    }

    // relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx", nullable = false)
    private Member member;
}
