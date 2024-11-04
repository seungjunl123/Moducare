package world.moducare.domain.diary.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHeadDiary is a Querydsl query type for HeadDiary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHeadDiary extends EntityPathBase<HeadDiary> {

    private static final long serialVersionUID = 1717165375L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHeadDiary headDiary = new QHeadDiary("headDiary");

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final world.moducare.domain.member.entity.QMember member;

    public final EnumPath<HeadType> type = createEnum("type", HeadType.class);

    public QHeadDiary(String variable) {
        this(HeadDiary.class, forVariable(variable), INITS);
    }

    public QHeadDiary(Path<? extends HeadDiary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHeadDiary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHeadDiary(PathMetadata metadata, PathInits inits) {
        this(HeadDiary.class, metadata, inits);
    }

    public QHeadDiary(Class<? extends HeadDiary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

