package world.moducare.domain.diagnosis.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiagnosticResult is a Querydsl query type for DiagnosticResult
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiagnosticResult extends EntityPathBase<DiagnosticResult> {

    private static final long serialVersionUID = -1657236778L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiagnosticResult diagnosticResult = new QDiagnosticResult("diagnosticResult");

    public final StringPath advice = createString("advice");

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final NumberPath<Float> dandruff = createNumber("dandruff", Float.class);

    public final NumberPath<Float> deadSkin = createNumber("deadSkin", Float.class);

    public final NumberPath<Float> erythema = createNumber("erythema", Float.class);

    public final NumberPath<Float> hairLoss = createNumber("hairLoss", Float.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final NumberPath<Float> inflammatory = createNumber("inflammatory", Float.class);

    public final world.moducare.domain.member.entity.QMember member;

    public final NumberPath<Float> sebum = createNumber("sebum", Float.class);

    public QDiagnosticResult(String variable) {
        this(DiagnosticResult.class, forVariable(variable), INITS);
    }

    public QDiagnosticResult(Path<? extends DiagnosticResult> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiagnosticResult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiagnosticResult(PathMetadata metadata, PathInits inits) {
        this(DiagnosticResult.class, metadata, inits);
    }

    public QDiagnosticResult(Class<? extends DiagnosticResult> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

