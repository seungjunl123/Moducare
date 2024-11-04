package world.moducare.domain.favorite.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavorite is a Querydsl query type for Favorite
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavorite extends EntityPathBase<Favorite> {

    private static final long serialVersionUID = 1230264625L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavorite favorite = new QFavorite("favorite");

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final world.moducare.domain.challengefeed.entity.QChallengeFeed feed;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final world.moducare.domain.member.entity.QMember member;

    public QFavorite(String variable) {
        this(Favorite.class, forVariable(variable), INITS);
    }

    public QFavorite(Path<? extends Favorite> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavorite(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavorite(PathMetadata metadata, PathInits inits) {
        this(Favorite.class, metadata, inits);
    }

    public QFavorite(Class<? extends Favorite> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.feed = inits.isInitialized("feed") ? new world.moducare.domain.challengefeed.entity.QChallengeFeed(forProperty("feed"), inits.get("feed")) : null;
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

