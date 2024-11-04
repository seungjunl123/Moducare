package world.moducare.domain.stress.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStressResult is a Querydsl query type for StressResult
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStressResult extends EntityPathBase<StressResult> {

    private static final long serialVersionUID = -1490841826L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStressResult stressResult = new QStressResult("stressResult");

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final world.moducare.domain.member.entity.QMember member;

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public QStressResult(String variable) {
        this(StressResult.class, forVariable(variable), INITS);
    }

    public QStressResult(Path<? extends StressResult> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStressResult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStressResult(PathMetadata metadata, PathInits inits) {
        this(StressResult.class, metadata, inits);
    }

    public QStressResult(Class<? extends StressResult> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

