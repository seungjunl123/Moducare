package world.moducare.domain.mychallenge.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMyChallenge is a Querydsl query type for MyChallenge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMyChallenge extends EntityPathBase<MyChallenge> {

    private static final long serialVersionUID = -1874149729L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMyChallenge myChallenge = new QMyChallenge("myChallenge");

    public final world.moducare.domain.challenge.entity.QChallenge challenge;

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final world.moducare.domain.member.entity.QMember member;

    public final EnumPath<Status> status = createEnum("status", Status.class);

    public QMyChallenge(String variable) {
        this(MyChallenge.class, forVariable(variable), INITS);
    }

    public QMyChallenge(Path<? extends MyChallenge> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMyChallenge(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMyChallenge(PathMetadata metadata, PathInits inits) {
        this(MyChallenge.class, metadata, inits);
    }

    public QMyChallenge(Class<? extends MyChallenge> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new world.moducare.domain.challenge.entity.QChallenge(forProperty("challenge")) : null;
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

