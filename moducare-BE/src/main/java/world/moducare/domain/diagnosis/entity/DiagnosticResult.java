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
    private int hairLoss;

    @Column(name = "dandruff", nullable = false)
    private int dandruff;

    @Column(name = "inflammatory", nullable = false)
    private int inflammatory;

    @Column(name = "erythema", nullable = false)
    private int erythema;

    @Column(name = "sebum", nullable = false)
    private int sebum;

    @Column(name = "deadskin", nullable = false)
    private int deadSkin;

    @Column(name = "comparison", nullable = false)
    private int comparison;

    @Column(name = "result", nullable = false, columnDefinition = "TEXT")
    private String result;

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
